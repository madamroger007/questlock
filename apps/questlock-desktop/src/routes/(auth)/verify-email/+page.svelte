<script lang="ts">
  import { onMount } from "svelte";
  import { page as pageStore } from "$app/stores";
  import { goto } from "$app/navigation";
  import { authStore, setAuthSession } from "$lib/stores/authStore";
  import { authApi } from "$lib/api/auth";
  import AuthLayout from "$lib/components/auth/AuthLayout.svelte";
  import AuthCard from "$lib/components/auth/AuthCard.svelte";
  import OtpInput from "$lib/components/auth/OtpInput.svelte";

  let token = "";
  let loading = false;
  let message = "";
  let isError = false;
  let activeEmail = "";

  // Ambil tipe verifikasi dari URL query (?type=signup atau ?type=email)
  $: verifyType = $pageStore.url.searchParams.get("type") || "signup";

  onMount(() => {
    // Ambil dari store atau cadangan localStorage jika store kosong akibat refresh
    activeEmail =
      $authStore.pendingEmail || localStorage.getItem("pending_email") || "";

    if (!activeEmail) {
      isError = true;
      message =
        "Sesi email tidak ditemukan. Silakan masukkan ulang email Anda.";
      setTimeout(() => goto("/sign-in"), 3000);
    }
  });

  async function handleVerify() {
    if (!activeEmail) {
      isError = true;
      message = "Email tidak boleh kosong!";
      return;
    }

    loading = true;
    message = "";
    isError = false;

    try {
      // Panggil API verifikasi dengan email yang dipastikan terisi lengkap
      const res = await authApi.verifyEmail({
        email: activeEmail,
        token,
        type: verifyType === "signup" ? "signup" : "email",
      });

      // Bersihkan email cadangan setelah sukses
      localStorage.removeItem("pending_email");

      if (verifyType === "signup") {
        message =
          "Email berhasil diverifikasi! Memindahkan ke halaman login...";
        setTimeout(() => goto("/sign-in"), 2000);
      } else {
        if (res.data && res.data.session) {
          console.log("Session data:", res.data);
          setAuthSession(
            res.data.session.accessToken,
            res.data.session.refreshToken,
            res.data.user,
          );
        }
        message = "Verifikasi berhasil! Mengalihkan ke Dashboard...";
        setTimeout(() => goto("/"), 1500);
      }
    } catch (err: any) {
      isError = true;
      message = err.message || "Kode verifikasi salah atau sudah kadaluarsa.";
    } finally {
      loading = false;
    }
  }
</script>

<AuthLayout
  title="Verifikasi OTP"
  subtitle={`Masukkan 6 digit kode yang dikirimkan ke ${activeEmail || "email Anda"}`}
>
  <AuthCard>
    {#if message}
      <div
        class={`mb-4 p-3 text-xs sm:text-sm rounded-xl text-center ${isError ? "bg-red-500/10 border border-red-500/20 text-red-400" : "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"}`}
      >
        {message}
      </div>
    {/if}

    <form on:submit|preventDefault={handleVerify} class="space-y-4">
      <OtpInput bind:value={token} length={6} />

      <button
        type="submit"
        disabled={loading || token.length < 6 || !activeEmail}
        class="w-full py-3 px-4 bg-gradient-to-r from-sky-600 to-sky-500 hover:from-sky-500 hover:to-sky-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-sky-600/20 active:scale-[0.99] transition-all disabled:opacity-50"
      >
        {loading ? "Memverifikasi..." : "Verifikasi OTP"}
      </button>
    </form>

    <div class="mt-6 text-center text-xs text-slate-400">
      <a href="/sign-in" class="hover:underline text-slate-400"
        >Kembali ke Login</a
      >
    </div>
  </AuthCard>
</AuthLayout>
