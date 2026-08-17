import { spawn } from 'node:child_process';
import process from 'node:process';

const isWindows = process.platform === 'win32';

let dockerProcess = null;
let desktopProcess = null;
let shuttingDown = false;

function run(command, args, options = {}) {
    const child = spawn(command, args, {
        stdio: 'inherit',
        shell: isWindows,
        ...options,
    });

    return child;
}

function waitForExit(child) {
    return new Promise((resolve) => {
        child.once('exit', (code, signal) => {
            resolve({ code, signal });
        });
    });
}

async function cleanup() {
    if (shuttingDown) {
        return;
    }

    shuttingDown = true;

    console.log('\n');
    console.log('========================================');
    console.log(' Stopping QuestLock development stack');
    console.log('========================================');

    // Stop Tauri
    if (desktopProcess && !desktopProcess.killed) {
        console.log('[CLEANUP] Stopping desktop...');

        try {
            desktopProcess.kill('SIGTERM');
        } catch {
            // Process may already be stopped.
        }
    }

    // Stop Docker Compose
    console.log('[CLEANUP] docker compose down...');

    await new Promise((resolve) => {
        const child = run('docker', ['compose', 'down']);

        child.once('exit', () => {
            resolve();
        });
    });

    // Stop Supabase
    console.log('[CLEANUP] supabase stop...');

    await new Promise((resolve) => {
        const child = run(
            'pnpm',
            ['--dir', 'apps/backend', 'exec', 'supabase', 'stop']
        );

        child.once('exit', () => {
            resolve();
        });
    });

    console.log('[CLEANUP] Development stack stopped.');

    process.exit(0);
}

async function start() {
    console.log('========================================');
    console.log(' Starting QuestLock development stack');
    console.log('========================================');

    /*
     * 1. Start Supabase
     *
     * Important:
     * `supabase start` exits with code 0 after the
     * containers are successfully started.
     *
     * Therefore we await it instead of putting it
     * inside concurrently.
     */
    console.log('[SUPABASE] Starting...');

    const supabase = run(
        'pnpm',
        ['--dir', 'apps/backend', 'exec', 'supabase', 'start']
    );

    const supabaseResult = await waitForExit(supabase);

    if (supabaseResult.code !== 0) {
        console.error(
            `[SUPABASE] Failed with exit code ${supabaseResult.code}`
        );

        await cleanup();
        return;
    }

    console.log('[SUPABASE] Ready.');

    /*
     * 2. Start Docker Compose
     */
    console.log('[DOCKER] Starting...');

    dockerProcess = run('docker', ['compose', 'up']);

    /*
     * 3. Start Tauri
     */
    console.log('[DESKTOP] Starting...');

    desktopProcess = run(
        'pnpm',
        ['--filter', 'questlock-desktop', 'tauri', 'dev']
    );

    /*
     * If Docker exits unexpectedly,
     * stop the entire development environment.
     */
    dockerProcess.once('exit', async (code) => {
        if (shuttingDown) {
            return;
        }

        console.error(
            `[DOCKER] exited with code ${code ?? 'unknown'}`
        );

        await cleanup();
    });

    /*
     * If Tauri exits normally or unexpectedly,
     * cleanup everything.
     */
    desktopProcess.once('exit', async (code) => {
        if (shuttingDown) {
            return;
        }

        console.log(
            `[DESKTOP] exited with code ${code ?? 'unknown'}`
        );

        await cleanup();
    });
}

/*
 * Ctrl+C
 */
process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);

/*
 * Windows console close
 */
process.on('SIGHUP', cleanup);

start().catch(async (error) => {
    console.error('[DEV] Fatal error:', error);

    await cleanup();
});