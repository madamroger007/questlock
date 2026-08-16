<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { authApi } from "$lib/api/auth";

  type CallbackState = "processing" | "success" | "recovery" | "error";

  let state: CallbackState = "processing";
  let statusMessage = "Memverifikasi email Anda...";
  let errorMessage = "";

  onMount(async () => {
    try {
      const searchParams = new URLSearchParams(window.location.search);

      const hashParams = new URLSearchParams(window.location.hash.substring(1));

      const type = searchParams.get("type") || hashParams.get("type");
      const code = searchParams.get("code");

      const accessToken =
        hashParams.get("access_token") || searchParams.get("token");

      if (type === "signup") {
        if (!code) {
          throw new Error("Kode konfirmasi email tidak ditemukan.");
        }

        statusMessage = "Konfirmasi email sedang diproses...";

        await authApi.exchangeCode(code);

        localStorage.removeItem("pending_email");

        state = "success";

        statusMessage = "Email berhasil dikonfirmasi.";
        return;
      }

      /*
       * ============================
       * PASSWORD RECOVERY
       * ============================
       */
      if (type === "recovery") {
        if (!accessToken) {
          throw new Error("Token pemulihan tidak ditemukan.");
        }

        state = "recovery";

        statusMessage = "Token pemulihan berhasil diterima.";

        goto(`/reset-password?token=${encodeURIComponent(accessToken)}`);

        return;
      }

      throw new Error("Tipe callback tidak valid.");
    } catch (error) {
      console.error("Auth callback error:", error);

      state = "error";

      errorMessage =
        error instanceof Error ? error.message : "Konfirmasi email gagal.";

      statusMessage = "Terjadi masalah saat memverifikasi email.";
    }
  });

  function goToLogin() {
    goto("/login");
  }

  function retryLogin() {
    goto("/login");
  }
</script>

<div
  class="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6"
>
  <div
    class="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl text-center"
  >
    {#if state === "processing"}
      <!-- Processing -->
      <div
        class="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"
      ></div>

      <h1 class="text-xl font-bold">QuestLock Security</h1>

      <p class="text-sm text-slate-400 mt-3">
        {statusMessage}
      </p>
    {:else if state === "success"}
      <!-- Success -->
      <div
        class="w-14 h-14 mx-auto rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5"
      >
        <span class="text-2xl text-emerald-400"> ✓ </span>
      </div>

      <h1 class="text-xl font-bold">Email Berhasil Dikonfirmasi</h1>

      <p class="text-sm text-slate-400 mt-3">
        {statusMessage}
      </p>

      <p class="text-xs text-slate-500 mt-2">
        Akun Anda sudah aktif. Silakan login menggunakan email dan password
        Anda.
      </p>

      <button
        type="button"
        on:click={goToLogin}
        class="w-full mt-6 py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm rounded-xl transition-colors"
      >
        Lanjutkan ke Login
      </button>
    {:else if state === "recovery"}
      <!-- Recovery -->
      <div
        class="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"
      ></div>

      <h1 class="text-xl font-bold">Password Recovery</h1>

      <p class="text-sm text-slate-400 mt-3">
        {statusMessage}
      </p>
    {:else if state === "error"}
      <!-- Error -->
      <div
        class="w-14 h-14 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-5"
      >
        <span class="text-2xl text-red-400"> ! </span>
      </div>

      <h1 class="text-xl font-bold">Verifikasi Gagal</h1>

      <p class="text-sm text-slate-400 mt-3">
        {statusMessage}
      </p>

      {#if errorMessage}
        <div
          class="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs"
        >
          {errorMessage}
        </div>
      {/if}

      <button
        type="button"
        on:click={retryLogin}
        class="w-full mt-6 py-3 px-4 bg-sky-600 hover:bg-sky-500 text-white font-semibold text-sm rounded-xl transition-colors"
      >
        Kembali ke Login
      </button>
    {/if}

    {#if state !== "recovery"}
      <div class="mt-6">
        <a
          href="/login"
          class="text-xs text-slate-500 hover:text-sky-400 transition-colors"
        >
          Kembali ke halaman login
        </a>
      </div>
    {/if}
  </div>
</div>
