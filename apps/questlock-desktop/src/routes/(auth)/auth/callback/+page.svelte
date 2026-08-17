<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { goto } from "$app/navigation";
  import AuthLayout from "$lib/components/layout/auth-layout.svelte";

  // State dasar
  let state = "processing";
  let statusMessage = "Membaca data keamanan...";
  let errorMessage = "";
  let desktopUrl = "";

  onMount(async () => {
    if (!browser) {
      console.error("Auth callback hanya dapat dijalankan di browser.");
      // return;
    }

    try {
      const searchParams = new URLSearchParams(window.location.search);
      const hashParams = new URLSearchParams(window.location.hash.substring(1));

      const type = searchParams.get("type") || hashParams.get("type");
      const code = searchParams.get("code");
      const accessToken =
        hashParams.get("access_token") || searchParams.get("token");

      if (type === "signup") {
        if (!code) throw new Error("Kode konfirmasi tidak ditemukan.");
        statusMessage = "Memverifikasi email ke server...";

        // Import aman agar tidak merusak SSR
        const { authApi } = await import("$lib/api/auth/auth");
        await authApi.exchangeCode(code);

        if (typeof window !== "undefined") {
          localStorage.removeItem("pending_email");
        }

        state = "success";
        statusMessage = "Email berhasil dikonfirmasi.";
        return;
      }

      if (type === "recovery") {
        if (!accessToken) throw new Error("Token pemulihan tidak ditemukan.");

        // Membentuk URL untuk buka Desktop
        desktopUrl = `questlock-desktop://reset-password?token=${encodeURIComponent(accessToken)}`;

        // Paksa ubah tampilan ke mode recovery
        state = "recovery";
        statusMessage = "Akses diterima. Silakan lanjut ke aplikasi.";
        return;
      }

      throw new Error("Tipe callback tidak dikenali.");
    } catch (error) {
      console.error("Auth callback error:", error);
      state = "error";
      errorMessage =
        error instanceof Error ? error.message : "Kesalahan sistem.";
      statusMessage = "Terjadi masalah saat verifikasi.";
    }
  });
  function goToDesktop() {
    if (desktopUrl) {
      window.location.href = desktopUrl;
    } else {
      console.error("Desktop URL tidak tersedia.");
    }
  }
  function goToLogin() {
    goto("/login");
  }
</script>

<AuthLayout>
  <div
    class="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-md w-full shadow-2xl text-center"
  >
    {#if state === "processing"}
      <div
        class="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto mb-5"
      ></div>
      <h1 class="text-xl font-bold">Memproses Data...</h1>
      <p class="text-slate-400 mt-2">{statusMessage}</p>
    {:else if state === "recovery"}
      <div
        class="w-16 h-16 mx-auto rounded-full bg-sky-500/20 border border-sky-500/50 flex items-center justify-center mb-5 shadow-[0_0_15px_rgba(14,165,233,0.5)]"
      >
        <span class="text-3xl">🔑</span>
      </div>

      <h1 class="text-2xl font-bold text-sky-400">Akses Diterima</h1>
      <p class="text-slate-300 mt-3 mb-8 leading-relaxed">
        Data verifikasi valid! Klik tombol di bawah ini untuk mereset password
        langsung di dalam aplikasi QuestLock.
      </p>

      <button
        onclick={() => goToDesktop()}
        class="block w-full py-4 px-4 bg-sky-600 hover:bg-sky-500 text-white font-bold text-md rounded-xl transition-all shadow-lg shadow-sky-500/30 transform hover:scale-105"
      >
        Buka Aplikasi QuestLock 🚀
      </button>

      <p class="text-xs text-slate-500 mt-5">
        Pastikan aplikasi QuestLock sudah terinstal di perangkat ini.
      </p>
    {:else if state === "success"}
      <div
        class="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mb-5"
      >
        <span class="text-3xl">✅</span>
      </div>
      <h1 class="text-2xl font-bold text-emerald-400">Verifikasi Berhasil</h1>
      <p class="text-slate-300 mt-3 mb-6">{statusMessage}</p>

      <button
        onclick={() => goToLogin()}
        class="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all"
      >
        Lanjut ke Login
      </button>
    {:else if state === "error"}
      <div
        class="w-16 h-16 mx-auto rounded-full bg-red-500/20 border border-red-500/50 flex items-center justify-center mb-5"
      >
        <span class="text-3xl">❌</span>
      </div>
      <h1 class="text-2xl font-bold text-red-400">Terjadi Kesalahan</h1>
      <p class="text-slate-300 mt-3">{statusMessage}</p>
      {#if errorMessage}
        <div
          class="mt-4 p-3 bg-red-950/50 border border-red-800 rounded-lg text-red-300 text-xs"
        >
          {errorMessage}
        </div>
      {/if}

      <button
        onclick={() => goToLogin()}
        class="w-full mt-6 py-4 px-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all"
      >
        Kembali
      </button>
    {/if}
  </div>
</AuthLayout>
