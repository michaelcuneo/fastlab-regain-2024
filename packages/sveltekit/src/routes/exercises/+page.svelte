<script lang="ts">
	import LayoutGrid from '@smui/layout-grid';
	import Exercise from './Exercise.svelte';

	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="exercises">
	<LayoutGrid>
		{#each data.exercises as exercise}
			<Exercise {exercise} />
		{/each}
	</LayoutGrid>
</div>

<style>
	.exercises {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		z-index: 0;
	}
	</style>