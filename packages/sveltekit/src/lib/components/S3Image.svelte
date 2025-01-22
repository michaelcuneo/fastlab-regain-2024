<script lang="ts">
  import { onMount } from "svelte";

  let url: string;

  onMount(async () => {
    url = await fetch(image)
      .then(res => res.json());
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
