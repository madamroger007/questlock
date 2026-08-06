<script lang="ts">
  import { authApi } from '$lib/api/auth';
  import AuthLayout from '$lib/components/auth/AuthLayout.svelte';
  import AuthCard from '$lib/components/auth/AuthCard.svelte';
  import InputGroup from '$lib/components/auth/InputGroup.svelte';

  let email = '';
  let loading = false;
  let successMessage = '';
  let errorMessage = '';

  async function handleForgotPassword() {
    loading = true;
    errorMessage = '';
    successMessage = '';
    try {
      await authApi.forgotPassword({ email });
      successMessage = 'Tautan pemulihan telah dikirim. Periksa inbox email Anda.';
    } catch (err: any) {
      errorMessage = err.message || 'Gagal menguraikan instruksi reset password.';
    } finally {
      loading = false;
    }
  }
</script>

<AuthLayout title="Lupa Password" subtitle="Masukkan alamat email Anda untuk menerima instruksi pemulihan akun">
  <AuthCard>
    {#if errorMessage}
      <div class="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm rounded-xl text-center">
        {errorMessage}
      </div>
    {/if}

    {#if successMessage}
      <div class="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm rounded-xl text-center">
        {successMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleForgotPassword} class="space-y-4">
      <InputGroup id="email" label="Email" type="email" bind:value={email} placeholder="nama@domain.com" required />

      <button
        type="submit"
        disabled={loading}
        class="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-600/20 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {loading ? 'Mengirim...' : 'Kirim Tautan Reset'}
      </button>
    </form>

    <p class="mt-6 text-center text-xs text-slate-400">
      <a href="/sign-in" class="text-sky-400 font-semibold hover:underline">Kembali ke Sign In</a>
    </p>
  </AuthCard>
</AuthLayout>