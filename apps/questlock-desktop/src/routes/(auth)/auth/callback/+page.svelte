<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let statusMessage = "Memproses pemulihan akun...";

  onMount(() => {
    // 1. Ambil hash (#access_token=...&type=recovery) dan query parameters dari URL Supabase
    const hash = window.location.hash.substring(1);
    const hashParams = new URLSearchParams(hash);
    const searchParams = new URLSearchParams(window.location.search);

    // Token recovery bisa berada di hash atau search params tergantung konfigurasi Supabase
    const accessToken =
      hashParams.get("access_token") || searchParams.get("token");

    const type = hashParams.get("type") || searchParams.get("type");

    // signup
    if (type === "signup") {
      statusMessage = "Akun berhasil dibuat! Mengarahkan ke halaman login...";
      setTimeout(() => goto("/login"), 10000);
    } else if (type === "recovery") {
      statusMessage =
        "Token pemulihan diterima. Mengarahkan ke halaman reset password...";
      setTimeout(() => goto(`/reset-password?token=${accessToken}`), 10000);
    } else {
      statusMessage = "Tipe callback tidak valid. Silakan coba lagi.";
      setTimeout(() => goto("/login"), 10000);
    }
    // recovery
  });
</script>

<div
  class="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 text-center"
>
  <div
    class="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl space-y-4"
  >
    <div
      class="w-10 h-10 border-4 border-sky-500 border-t-transparent rounded-full animate-spin mx-auto"
    ></div>

    <h1 class="text-xl font-bold text-slate-100">QuestLock Security</h1>

    <p class="text-xs text-slate-400">
      {statusMessage}
    </p>

    <div class="pt-2">
      <a href="/l" class="text-xs text-sky-400 hover:underline">
        Kembali ke Halaman Login
      </a>
    </div>
  </div>
</div>
