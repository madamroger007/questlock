<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { authApi } from "$lib/api/auth";
  import AuthLayout from "$lib/components/layout/auth-layout.svelte";
  import AuthCard from "$lib/components/card/auth-card.svelte";
  import InputGroup from "$lib/components/input/input-group.svelte";

  let newPassword = "";
  let confirmPassword = "";
  let loading = false;
  let errorMessage = "";
  let accessToken: string | null = null;

  onMount(() => {
    const hash = window.location.hash;

    if (!hash) {
      errorMessage =
        "Sesi pemulihan tidak ditemukan. Silakan ulangi proses lupa password.";
      return;
    }

    const params = new URLSearchParams(hash.substring(1));
    accessToken = params.get("access_token");

    if (!accessToken) {
      errorMessage =
        "Sesi pemulihan tidak ditemukan. Silakan ulangi proses lupa password.";
    }

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname + window.location.search,
    );
  });

  async function handleResetPassword() {
    if (newPassword !== confirmPassword) {
      errorMessage = "Konfirmasi password baru tidak cocok!";
      return;
    }

    if (!accessToken) {
      errorMessage = "Token pemulihan tidak valid.";
      return;
    }

    loading = true;
    errorMessage = "";
    try {
      await authApi.resetPassword(accessToken, { newPassword });
      accessToken = null;

      alert(
        "Password berhasil diubah! Silakan login dengan password baru Anda.",
      );
      goto("/login");
    } catch (err: any) {
      errorMessage = err.message || "Gagal memperbarui password.";
    } finally {
      loading = false;
    }
  }
</script>

<AuthLayout
  title="Reset Password"
  subtitle="Masukkan password baru yang aman untuk akun QuestLock Anda"
>
  <AuthCard>
    {#if errorMessage}
      <div
        class="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm rounded-xl text-center"
      >
        {errorMessage}
      </div>
    {/if}

    <form on:submit|preventDefault={handleResetPassword} class="space-y-4">
      <InputGroup
        id="newPassword"
        label="Password Baru"
        type="password"
        bind:value={newPassword}
        placeholder="Minimal 8 karakter"
        required
      />
      <InputGroup
        id="confirmPassword"
        label="Konfirmasi Password Baru"
        type="password"
        bind:value={confirmPassword}
        placeholder="Ketik ulang password baru"
        required
      />

      <button
        type="submit"
        disabled={loading || !accessToken}
        class="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-600/20 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {loading ? "Memperbarui..." : "Simpan Password Baru"}
      </button>
    </form>
  </AuthCard>
</AuthLayout>
