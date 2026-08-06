<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { authStore, clearAuthSession } from "$lib/stores/authStore";
  import { Button } from "$lib/components/ui/button";

  onMount(() => {
    // Proteksi Halaman: Jika belum login, lempar ke /sign-in
    if (!$authStore.accessToken) {
      goto("/sign-in");
    }
  });

  function handleLogout() {
    clearAuthSession();
    goto("/sign-in");
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen p-6">
  <div
    class="p-8 bg-slate-900 border border-slate-800 rounded-xl space-y-4 text-center max-w-lg"
  >
    <h1 class="text-3xl font-bold text-sky-400">
      Selamat Datang di QuestLock Dashboard!
    </h1>
    <p class="text-slate-400 text-sm">
      Sistem Pengontrol Perangkat & Gamifikasi Produktivitas Anda siap
      digunakan.
    </p>

    <Button onclick={handleLogout} variant="destructive" class="mt-4">
      Logout
    </Button>
  </div>
</div>
