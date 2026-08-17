<script lang="ts">
  import { goto } from "$app/navigation";
  import { authApi } from "$lib/api/auth/auth";
  import { setPendingEmail } from "$lib/stores/authStore";
  import AuthLayout from "$lib/components/layout/auth-layout.svelte";
  import AuthCard from "$lib/components/card/auth-card.svelte";
  import InputGroup from "$lib/components/input/input-group.svelte";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";

  let loading = false;
  let errorMessage = "";

  async function handleRegister() {
    if (loading) return;

    errorMessage = "";

    if (password !== confirmPassword) {
      errorMessage = "Password dan konfirmasi password tidak sama.";
      return;
    }

    if (password.length < 8) {
      errorMessage = "Password minimal 8 karakter.";
      return;
    }

    loading = true;

    try {
      const normalizedEmail = email.trim().toLowerCase();

      const res = await authApi.register({
        email: normalizedEmail,
        password,
        confirmPassword,
        name: name.trim(),
      });

      if (res.data?.requiresEmailVerification) {
        setPendingEmail(normalizedEmail);

        goto("/register/email-sent");
        return;
      }

      goto("/login");
    } catch (err: unknown) {
      errorMessage =
        err instanceof Error
          ? err.message
          : "Registrasi gagal. Silakan coba lagi.";
    } finally {
      loading = false;
    }
  }
</script>

<AuthLayout
  title="Buat Akun QuestLock"
  subtitle="Gabung dan tingkatkan produktivitas Anda lewat sistem gamifikasi"
>
  <AuthCard>
    {#if errorMessage}
      <div
        class="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-center text-xs text-red-400 sm:text-sm"
      >
        {errorMessage}
      </div>
    {/if}

    <form
      on:submit|preventDefault={handleRegister}
      class="space-y-4"
    >
      <InputGroup
        id="name"
        label="Nama Lengkap"
        type="text"
        bind:value={name}
        placeholder="Nama Anda"
        required
      />

      <InputGroup
        id="email"
        label="Email"
        type="email"
        bind:value={email}
        placeholder="nama@domain.com"
        required
      />

      <InputGroup
        id="password"
        label="Password"
        type="password"
        bind:value={password}
        placeholder="Minimal 8 karakter"
        required
      />

      <InputGroup
        id="confirmPassword"
        label="Konfirmasi Password"
        type="password"
        bind:value={confirmPassword}
        placeholder="Ketik ulang password"
        required
      />

      <button
        type="submit"
        disabled={loading}
        class="mt-2 w-full rounded-xl bg-gradient-to-r from-sky-600 to-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition-all hover:from-sky-500 hover:to-sky-400 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Mendaftarkan..." : "Sign Up"}
      </button>
    </form>

    <p class="mt-6 text-center text-xs text-slate-400">
      Sudah punya akun?

      <a
        href="/login"
        class="ml-1 font-semibold text-sky-400 hover:underline"
      >
        Sign In
      </a>
    </p>
  </AuthCard>
</AuthLayout>