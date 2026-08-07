<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils";

  // props button is content tag element, content is string
  let { content }: { content: string } = $props();
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger
      class={cn(buttonVariants({ variant: "ghost" }), "size-10")}
    >
      <slot />
    </Tooltip.Trigger>
    <Tooltip.Content>
      <p>{content}</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
