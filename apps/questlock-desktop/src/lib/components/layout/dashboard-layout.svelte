<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/nav/app-sidebar.svelte";
  import SiteHeader from "$lib/components/header/site-header.svelte";
  let { children } = $props();
</script>

<section>
  <Sidebar.Provider
    style="--sidebar-width: calc(var(--spacing) * 72); --header-height: calc(var(--spacing) * 12); "
  >
    <AppSidebar variant="inset" />
    <Sidebar.Inset>
      <SiteHeader />
      {@render children()}
    </Sidebar.Inset>
  </Sidebar.Provider>
</section>
