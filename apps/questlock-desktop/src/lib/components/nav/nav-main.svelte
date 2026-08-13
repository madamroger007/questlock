<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import type { Icon } from "@tabler/icons-svelte";
  import * as m from "$lib/paraglide/messages";
  let { items }: { items: { title: string; url: string; icon?: Icon }[] } =
    $props();
</script>

<Sidebar.Group>
  <Sidebar.GroupContent class="flex flex-col gap-2">
    <Sidebar.Menu>
      {#each items as item (item.title)}
        <Sidebar.MenuItem>
          <Sidebar.MenuButton
            tooltipContent={item.title}
            onclick={() => (window.location.href = item.url)}
          >
            {#if item.icon}
              <item.icon />
            {/if}
            <span>{item.title}</span>
          </Sidebar.MenuButton>
        </Sidebar.MenuItem>
      {/each}
      {m["sidebar.main.app"]()}
    </Sidebar.Menu>
  </Sidebar.GroupContent>
</Sidebar.Group>
