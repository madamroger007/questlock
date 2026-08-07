<script lang="ts">
  let {
    className = "bg-transparent border-0 shadow-none w-8 h-8 rounded-full",
  }: { className?: string } = $props();
</script>

<div class={className}>
  <img class={className} src="/icon.png" alt="@icon" />
</div>
