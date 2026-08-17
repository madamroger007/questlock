<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import AuthLayout from "$lib/components/layout/auth-layout.svelte";
  
  type CallbackState = "processing" | "success" | "recovery" | "error";

  let state: CallbackState = "processing";
  let statusMessage = "Membaca data keamanan...";
  let errorMessage = "";
  let desktopUrl = "";

  onMount(async () => {
    if (!browser) return;

    try {
      const searchParams = new URLSearchParams(window.location.search);

      const hashParams = new URLSearchParams(window.location.hash.substring(1));

      const type = searchParams.get("type") || hashParams.get("type");

      const accessToken =
        hashParams.get("access_token") ||
        searchParams.get("access_token") ||
        searchParams.get("token");

      if (type === "signup") {
        if (!accessToken) {
          throw new Error("Token konfirmasi email tidak ditemukan.");
        }

        statusMessage = "Email berhasil dikonfirmasi. Menyiapkan akun...";

        localStorage.removeItem("pending_email");

        state = "success";

        statusMessage =
          "Email berhasil dikonfirmasi. Silakan login ke QuestLock.";

        window.history.replaceState(
          {},
          document.title,
          "/auth/callback?type=signup",
        );

        return;
      }

      if (type === "recovery") {
        if (!accessToken) {
          throw new Error("Token pemulihan tidak ditemukan.");
        }

        desktopUrl = `questlock-desktop://reset-password?token=${encodeURIComponent(
          accessToken,
        )}`;

        state = "recovery";

        statusMessage =
          "Akses pemulihan diterima. Silakan lanjutkan di aplikasi QuestLock.";

        return;
      }

      throw new Error("Tipe callback tidak dikenali.");
    } catch (error) {
      console.error("[Auth Callback]", error);

      state = "error";

      errorMessage =
        error instanceof Error ? error.message : "Kesalahan sistem.";

      statusMessage = "Terjadi masalah saat memproses autentikasi.";
    }
  });

  function goToDesktop() {
    if (!desktopUrl) {
      console.error("Desktop URL tidak tersedia.");

      return;
    }

    window.location.href = desktopUrl;
  }

  function goToLogin() {
    goto("/login");
  }
</script>

<AuthLayout>
  <div
    class="w-full max-w-md rounded-2xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl"
  >
    {#if state === "processing"}
      <div
        class="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-sky-500 border-t-transparent"
      ></div>

      <h1 class="text-xl font-bold text-white">Memproses Data...</h1>

      <p class="mt-2 text-slate-400">
        {statusMessage}
      </p>
    {:else if state === "success"}
      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-500/50 bg-emerald-500/20"
      >
        <span class="text-3xl">✅</span>
      </div>

      <h1 class="text-2xl font-bold text-emerald-400">
        Email Berhasil Dikonfirmasi
      </h1>

      <p class="mt-3 leading-relaxed text-slate-300">
        {statusMessage}
      </p>

      <button
        type="button"
        onclick={goToLogin}
        class="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-4 font-semibold text-white transition-all hover:bg-emerald-500"
      >
        Lanjut ke Login
      </button>
    {:else if state === "recovery"}
      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-sky-500/50 bg-sky-500/20"
      >
        <span class="text-3xl">🔑</span>
      </div>

      <h1 class="text-2xl font-bold text-sky-400">Akses Diterima</h1>

      <p class="mb-8 mt-3 leading-relaxed text-slate-300">
        {statusMessage}
      </p>

      <button
        type="button"
        onclick={goToDesktop}
        class="block w-full rounded-xl bg-sky-600 px-4 py-4 text-md font-bold text-white shadow-lg shadow-sky-500/30 transition-all hover:bg-sky-500"
      >
        Buka Aplikasi QuestLock 🚀
      </button>

      <p class="mt-5 text-xs text-slate-500">
        Pastikan aplikasi QuestLock sudah terinstal di perangkat ini.
      </p>
    {:else if state === "error"}
      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-red-500/50 bg-red-500/20"
      >
        <span class="text-3xl">❌</span>
      </div>

      <h1 class="text-2xl font-bold text-red-400">Verifikasi Gagal</h1>

      <p class="mt-3 text-slate-300">
        {statusMessage}
      </p>

      {#if errorMessage}
        <div
          class="mt-4 rounded-lg border border-red-800 bg-red-950/50 p-3 text-left text-xs text-red-300"
        >
          {errorMessage}
        </div>
      {/if}

      <button
        type="button"
        onclick={goToLogin}
        class="mt-6 w-full rounded-xl bg-slate-700 px-4 py-4 font-semibold text-white transition-all hover:bg-slate-600"
      >
        Kembali ke Login
      </button>
    {/if}
  </div>
</AuthLayout>
