<script lang="ts">
  import { goto } from "$app/navigation";
  import { authApi } from "$lib/api/auth";
  import { authStore } from "$lib/stores/authStore";
  import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
  import AuthCard from "$lib/components/auth/AuthCard.svelte";
  import InputGroup from "$lib/components/auth/InputGroup.svelte";

  let name = "";
  let email = "";
  let password = "";
  let confirmPassword = "";
  let loading = false;
  let errorMessage = "";

  async function handleRegister() {
    if (password !== confirmPassword) {
      errorMessage = "Konfirmasi password tidak cocok!";
      return;
    }

    loading = true;
    errorMessage = "";
    try {
      await authApi.register({ email, password, confirmPassword, name });
      authStore.update((s) => ({ ...s, pendingEmail: email }));
      goto("/verify-email?type=signup");
    } catch (err: any) {
      errorMessage = err.message || "Pendaftaran gagal";
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
        class="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm rounded-xl text-center"
      >
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleRegister} class="space-y-4">
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
        class="w-full mt-2 py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-600/20 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {loading ? "Mendaftarkan..." : "Sign Up"}
      </button>
    </form>

    <p class="mt-6 text-center text-xs text-slate-400">
      Sudah punya akun?
      <a href="/sign-in" class="text-sky-400 font-semibold hover:underline ml-1"
        >Sign In</a
      >
    </p>
  </AuthCard>
</AuthLayout>
