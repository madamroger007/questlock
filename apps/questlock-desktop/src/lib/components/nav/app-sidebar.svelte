<script lang="ts">
  import Icon from "$lib/components/icon.svelte";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import NavMain from "./nav-main.svelte";
  import NavSecondary from "./nav-secondary.svelte";
  import NavUser from "./nav-user.svelte";
  import type { ComponentProps } from "svelte";
  import { NavbarData } from "$lib/components/nav/data.d";
  let { ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root collapsible="icon" {...restProps}>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-2 mt-3">
          {#snippet child({ props })}
            <a href="/" {...props}>
              <Icon />
              <span class="text-lg font-semibold">QuestLock</span>
            </a>
          {/snippet}
        </Sidebar.MenuButton>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
  <Sidebar.Content>
    <NavMain items={NavbarData.navMain} />
    <NavSecondary items={NavbarData.navSecondary} class="mt-auto" />
  </Sidebar.Content>
  <Sidebar.Footer>
    <NavUser user={NavbarData.user} />
  </Sidebar.Footer>
</Sidebar.Root>
