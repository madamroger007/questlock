import fs from "node:fs";
import path from "node:path";

const name = process.argv[2];

if (!name) {
    console.log("Usage:");
    console.log("pnpm seed:new users");
    process.exit(1);
}

const now = new Date();

const timestamp =
    `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")
    }${String(now.getDate()).padStart(2, "0")
    }${String(now.getHours()).padStart(2, "0")
    }${String(now.getMinutes()).padStart(2, "0")
    }`;

const filename = `${timestamp}_${name}.sql`;


const dir = path.join(process.cwd(), "supabase", "seed");

if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

const file = path.join(dir, `${filename}`);

if (fs.existsSync(file)) {
    console.log("Seed already exists.");
    process.exit(1);
}

fs.writeFileSync(
    file,
    `-- Seed: ${name}\n\n`
);

console.log(`Created ${file}`);