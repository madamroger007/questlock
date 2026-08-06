<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { authApi } from "$lib/api/auth";
  import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
  import AuthCard from "$lib/components/auth/AuthCard.svelte";
  import InputGroup from "$lib/components/auth/InputGroup.svelte";

  let newPassword = "";
  let confirmPassword = "";
  let loading = false;
  let errorMessage = "";
  let recoveryToken: string | null = null;

  onMount(() => {
    // Ambil token dari localStorage yang dikirim oleh /auth/callback
    recoveryToken = localStorage.getItem("recovery_token");
    if (!recoveryToken) {
      errorMessage = "Sesi pemulihan tidak ditemukan. Silakan ulangi proses lupa password.";
    }
  });

  async function handleResetPassword() {
    if (newPassword !== confirmPassword) {
      errorMessage = "Konfirmasi password baru tidak cocok!";
      return;
    }

    if (!recoveryToken) {
      errorMessage = "Token pemulihan tidak valid.";
      return;
    }

    loading = true;
    errorMessage = "";
    try {
      await authApi.resetPassword(recoveryToken, { newPassword });
      
      // Hapus token setelah sukses digunakan
      localStorage.removeItem("recovery_token");
      
      alert("Password berhasil diubah! Silakan login dengan password baru Anda.");
      goto("/sign-in");
    } catch (err: any) {
      errorMessage = err.message || "Gagal memperbarui password.";
    } finally {
      loading = false;
    }
  }
</script>

<AuthLayout title="Reset Password" subtitle="Masukkan password baru yang aman untuk akun QuestLock Anda">
  <AuthCard>
    {#if errorMessage}
      <div class="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm rounded-xl text-center">
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleResetPassword} class="space-y-4">
      <InputGroup id="newPassword" label="Password Baru" type="password" bind:value={newPassword} placeholder="Minimal 8 karakter" required />
      <InputGroup id="confirmPassword" label="Konfirmasi Password Baru" type="password" bind:value={confirmPassword} placeholder="Ketik ulang password baru" required />

      <button
        type="submit"
        disabled={loading || !recoveryToken}
        class="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-600/20 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {loading ? "Memperbarui..." : "Simpan Password Baru"}
      </button>
    </form>
  </AuthCard>
</AuthLayout>