<script lang="ts">
  import { goto } from "$app/navigation";
  import { authStore } from "$lib/stores/authStore";
  import AuthLayout from "$lib/components/layout/auth-layout.svelte";
  import AuthCard from "$lib/components/card/auth-card.svelte";

  let email = "";

  $: email = $authStore.pendingEmail || "";

  function goToLogin() {
    goto("/login");
  }

  function goToRegister() {
    goto("/register");
  }
</script>

<AuthLayout
  title="Cek Email Anda"
  subtitle="Satu langkah lagi untuk mengaktifkan akun QuestLock"
>
  <AuthCard>
    <div class="text-center">
      <div
        class="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10"
      >
        <span class="text-3xl">✉️</span>
      </div>

      <h1 class="text-xl font-bold text-white">
        Konfirmasi Email
      </h1>

      <p class="mt-3 text-sm leading-relaxed text-slate-400">
        Kami telah mengirimkan link konfirmasi ke:
      </p>

      {#if email}
        <p class="mt-2 break-all font-semibold text-sky-400">
          {email}
        </p>
      {/if}

      <p class="mt-5 text-sm leading-relaxed text-slate-400">
        Silakan buka email tersebut dan klik tombol
        <strong class="text-slate-300">
          Confirm Email
        </strong>
        untuk mengaktifkan akun Anda.
      </p>

      <div
        class="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-left"
      >
        <p class="text-xs leading-relaxed text-amber-300">
          <strong>Perhatian:</strong>
          Anda belum dapat login sebelum email berhasil dikonfirmasi.
        </p>
      </div>

      <button
        type="button"
        onclick={goToLogin}
        class="mt-6 w-full rounded-xl bg-sky-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-500"
      >
        Ke Halaman Login
      </button>

      <button
        type="button"
        onclick={goToRegister}
        class="mt-3 w-full rounded-xl bg-slate-800 px-4 py-3 text-sm font-semibold text-slate-300 transition hover:bg-slate-700"
      >
        Gunakan Email Lain
      </button>
    </div>
  </AuthCard>
</AuthLayout>