<script lang="ts">
  import { onMount } from "svelte";
  import { getURL } from "./getURL";

  let url: string;

  onMount(async () => {
    url = await getURL(image);
  });

  export let image: string;
</script>

<img src={url} alt={url} width="320px" height="auto" />

<style>
  img {
    width: 100%;
    border: 1px solid black;
  }
</style>
