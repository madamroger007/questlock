<script module lang="ts">
  // Interface data notifikasi
  export interface NotificationItem {
    id: number;
    title: string;
    description: string;
    isUnread: boolean;
    time: string;
    type?: "quest" | "lock" | "system";
  }
</script>

<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import BellIcon from "@tabler/icons-svelte/icons/bell";
  import CheckIcon from "@tabler/icons-svelte/icons/check";
  import TrashIcon from "@tabler/icons-svelte/icons/trash";
  import CheckCheckIcon from "@tabler/icons-svelte/icons/checks";
  import Tooltip from "$lib/components/Tooltip.svelte";
  let notifications: NotificationItem[] = [
    {
      id: 1,
      title: "Quest Selesai!",
      description: "Anda mendapatkan +50 XP dari quest 'Belajar SvelteKit'.",
      isUnread: true,
      time: "2m lalu",
      type: "quest",
    },
    {
      id: 2,
      title: "Game Diblokir",
      description:
        "Valorant.exe telah ditutup paksa karena Waktu Fokus sedang aktif.",
      isUnread: true,
      time: "1j lalu",
      type: "lock",
    },
    {
      id: 3,
      title: "Peringatan Waktu",
      description: "Waktu fokus Anda tersisa 10 menit lagi.",
      isUnread: false,
      time: "3j lalu",
      type: "system",
    },
    {
      id: 4,
      title: "Level Up!",
      description: "Selamat! Anda baru saja naik ke Level 5 Explorer.",
      isUnread: false,
      time: "Kemarin",
      type: "quest",
    },
  ];

  // State Filter: "all" | "unread" | "read"
  let filterStatus: "all" | "unread" | "read" = "all";

  // Reactive Values
  $: unreadCount = notifications.filter((n) => n.isUnread).length;

  $: filteredNotifications = notifications.filter((n) => {
    if (filterStatus === "unread") return n.isUnread;
    if (filterStatus === "read") return !n.isUnread;
    return true; // "all"
  });

  // Actions
  function markAllAsRead() {
    notifications = notifications.map((n) => ({ ...n, isUnread: false }));
  }

  function clearAllNotifications() {
    notifications = [];
  }

  function toggleReadStatus(id: number, event: Event) {
    event.stopPropagation();
    notifications = notifications.map((n) =>
      n.id === id ? { ...n, isUnread: !n.isUnread } : n,
    );
    console.log(`Toggled read status for notification ID: ${id}`);
  }

  function deleteNotification(id: number, event: Event) {
    event.stopPropagation();
    notifications = notifications.filter((n) => n.id !== id);
  }
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors outline-none"
  >
    <Tooltip content={"Notifications"}>
      <BellIcon class="size-5" />
      {#if unreadCount > 0}
        <span class="absolute top-3 right-3 flex h-2 w-2">
          <span
            class="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"
          ></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-rose-500"
          ></span>
        </span>
      {/if}
    </Tooltip>
  </DropdownMenu.Trigger>

  <DropdownMenu.Content align="end" class="w-80 sm:w-96 p-0 shadow-2xl">
    <div
      class="flex items-center justify-between p-3.5 border-b border-slate-200 dark:border-slate-800"
    >
      <div class="flex items-center gap-2">
        <span class="text-sm font-bold text-slate-900 dark:text-slate-100">
          Notifikasi
        </span>
        {#if unreadCount > 0}
          <span
            class="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20"
          >
            {unreadCount} baru
          </span>
        {/if}
      </div>

      <div class="flex items-center gap-1">
        {#if unreadCount > 0}
          <button
            on:click={markAllAsRead}
            title="Tandai semua dibaca"
            class="p-1.5 text-xs text-sky-500 hover:bg-sky-500/10 rounded-md transition-colors flex items-center gap-1 font-medium"
          >
            <CheckCheckIcon class="size-4" />
            <span class="hidden sm:inline">Baca Semua</span>
          </button>
        {/if}

        {#if notifications.length > 0}
          <button
            on:click={clearAllNotifications}
            title="Bersihkan semua notifikasi"
            class="p-1.5 text-xs text-rose-500 hover:bg-rose-500/10 rounded-md transition-colors flex items-center gap-1 font-medium"
          >
            <TrashIcon class="size-4" />
            <span class="hidden sm:inline">Clear Notif</span>
          </button>
        {/if}
      </div>
    </div>

    <div
      class="flex items-center justify-between px-3 py-2 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800"
    >
      <span class="text-xs text-slate-500 font-medium">Filter Status:</span>
      <select
        bind:value={filterStatus}
        class="text-xs font-medium bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-sky-500"
      >
        <option value="all">Semua ({notifications.length})</option>
        <option value="unread">Belum Dibaca ({unreadCount})</option>
        <option value="read"
          >Sudah Dibaca ({notifications.length - unreadCount})</option
        >
      </select>
    </div>

    <div
      class="max-h-[320px] overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60"
    >
      {#if filteredNotifications.length === 0}
        <div class="p-8 text-center space-y-1">
          <p class="text-sm font-semibold text-slate-400">
            Tidak ada notifikasi
          </p>
          <p class="text-xs text-slate-500">
            {#if filterStatus === "unread"}
              Semua notifikasi telah dibaca.
            {:else if filterStatus === "read"}
              Belum ada notifikasi yang dibaca.
            {:else}
              Kotak notifikasi Anda bersih!
            {/if}
          </p>
        </div>
      {:else}
        {#each filteredNotifications as notif (notif.id)}
          <div
            class={`group relative flex items-start justify-between p-3.5 transition-colors ${
              notif.isUnread
                ? "bg-sky-500/5 dark:bg-sky-500/10 hover:bg-sky-500/10 dark:hover:bg-sky-500/15"
                : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
            }`}
          >
            <div class="space-y-1 pr-6 flex-1">
              <div class="flex items-center gap-2">
                {#if notif.isUnread}
                  <span class="w-2 h-2 rounded-full bg-sky-500 shrink-0"></span>
                {/if}
                <span
                  class={`text-xs font-bold ${
                    notif.isUnread
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-600 dark:text-slate-400"
                  }`}
                >
                  {notif.title}
                </span>
                <span class="text-[10px] text-slate-400 font-normal">
                  • {notif.time}
                </span>
              </div>
              <p
                class="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed"
              >
                {notif.description}
              </p>
            </div>

            <div
              class="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity"
            >
              <button
                on:click={(e) => toggleReadStatus(notif.id, e)}
                title={notif.isUnread
                  ? "Tandai sudah dibaca"
                  : "Tandai belum dibaca"}
                class="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded transition-colors"
              >
                <CheckIcon
                  class={`size-3.5 ${!notif.isUnread ? "text-emerald-500" : ""}`}
                />
              </button>
              <button
                on:click={(e) => deleteNotification(notif.id, e)}
                title="Hapus notifikasi ini"
                class="p-1 hover:bg-rose-500/10 text-slate-400 hover:text-rose-500 rounded transition-colors"
              >
                <TrashIcon class="size-3.5" />
              </button>
            </div>
          </div>
        {/each}
      {/if}
    </div>

    {#if notifications.length > 0}
      <div
        class="p-2 border-t border-slate-200 dark:border-slate-800 text-center bg-slate-50/50 dark:bg-slate-900/40"
      >
        <span class="text-[11px] text-slate-400">
          Menampilkan {filteredNotifications.length} dari {notifications.length} notifikasi
        </span>
      </div>
    {/if}
  </DropdownMenu.Content>
</DropdownMenu.Root>
