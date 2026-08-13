<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import CoinIcon from "@tabler/icons-svelte/icons/coin";
  import SettingsIcon from "@tabler/icons-svelte/icons/settings";
  import { NavbarData } from "$lib/components/nav/data.d";
  import Tooltip from "$lib/components/Tooltip.svelte";
  import ThemeButton from "$lib/components/button/theme-button.svelte";
  import NotificationDropdown from "$lib/components/dropdown/notification.svelte";
</script>

<header class="sticky top-0 z-10 h-(--header-height)">
  <div
    class="flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) data-[collapsible=icon]/sidebar-wrapper:h bg-(--header) "
  >
    <div class="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
      <Sidebar.Trigger class="-ms-1" />
      <Separator
        orientation="vertical"
        class="mx-2 data-[orientation=vertical]:h-4"
      />

      <h1 class="text-base font-medium">
        {NavbarData.navMain[
          window.location.pathname as keyof typeof NavbarData.navMain
        ] || "Dashboard"}
      </h1>

      <div class="ms-auto flex items-center gap-1">
        <div class="flex items-center">
          <Tooltip content={"Get more coins"}>
            <button
              class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
            >
              <CoinIcon class="size-5 text-amber-500" />
            </button>
          </Tooltip>
          <span class="text-sm font-medium mr-2">{NavbarData.user.coins}</span>
        </div>

        <Tooltip content={"Settings"}>
          <button
            class="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors"
          >
            <SettingsIcon class="size-5" />
          </button>
        </Tooltip>

        <NotificationDropdown />

        <Tooltip content={"Toggle theme"}>
          <div class="ml-1">
            <ThemeButton />
          </div>
        </Tooltip>
      </div>
    </div>
  </div>
</header>
