<script lang="ts">
  import { onMount } from "svelte";
  import Leaves from "./Leaves.svelte";

  let isMounted: boolean = false;
  let growthFrame: HTMLElement;

  onMount(() => {
    isMounted = true;
  });
</script>

<growth-frame bind:this={growthFrame}>
  <svg
    id="grow_frame"
    data-name="bg-leaves"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 500 500"
  >
    <defs>
      <style>
        .background {
          position: relative;
          fill: #cfe6e8;
        }
      </style>
    </defs>
    <rect
      class="background"
      x="30.7"
      y="30.7"
      width="438.6"
      height="438.6"
      rx="7.8"
    />
  </svg>
  {#if growthFrame !== undefined}
    <Leaves {growthFrame} />
  {/if}
</growth-frame>

<style>
  growth-frame {
    display: flex;
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
