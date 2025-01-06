<script lang="ts">
	import { onMount } from 'svelte';
	import { user } from '$lib/utils/store';

	onMount(() => {
		user.set(data);
	});

	let { data }: { data: any } = $props();
</script>

<div class="wrapper">
	<h1>Successfully Logged in...</h1>
</div>

<style>
	.wrapper {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 88px);
		background: rgba(255, 255, 255, 0.1);
		width: 100vw;
		z-index: 0;
	}
</style>
