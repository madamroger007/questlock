<script lang="ts">
  import { goto } from "$app/navigation";
  import { authApi } from "$lib/api/auth/auth";
  import AuthLayout from "$lib/components/layout/auth-layout.svelte";
  import AuthCard from "$lib/components/card/auth-card.svelte";
  import InputGroup from "$lib/components/input/input-group.svelte";
  import { authStore, setPendingEmail } from "$lib/stores/authStore";
  let email = "";
  let password = "";
  let loading = false;
  let errorMessage = "";

  async function handleLogin() {
    loading = true;
    errorMessage = "";
    try {
      const res = await authApi.login({ email, password });
      if (res.data.requiresOtp) {
        setPendingEmail(email);

        goto("/verify-email?type=email");
      }
    } catch (err: any) {
      errorMessage = err.message || "Login gagal, periksa email dan password.";
    } finally {
      loading = false;
    }
  }
</script>

<AuthLayout title="QuestLock" subtitle="Masuk ke akun Anda">
  <AuthCard>
    {#if errorMessage}
      <div
        class="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl text-center"
      >
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleLogin} class="space-y-4">
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
        placeholder="••••••••"
        required
      />
      <div class="flex justify-end">
        <a
          href="/forgot-password"
          class="text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >Lupa password?</a
        >
      </div>

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm rounded-xl transition-all"
      >
        {loading ? "Memeriksa..." : "Lanjutkan ke OTP"}
      </button>

      <div class="mt-4 text-center text-sm text-slate-400">
        Belum punya akun?
        <a
          href="/register"
          class="text-sky-400 hover:text-sky-300 transition-colors">Daftar</a
        >
      </div>
    </form>
  </AuthCard>
</AuthLayout>
