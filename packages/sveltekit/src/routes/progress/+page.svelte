<script lang="ts">
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content } from '@smui/card';
	import Polar from '$lib/components/Polar.svelte';

	let progress: number = $state(0);
	let slider: string = $state("0%");

	$effect(() => {
		slider = 100 - progress + '%';
	});
</script>

<div class="layout">
	<LayoutGrid>
		<Cell span={4}>
			<Card>
				<Content>
					<h5>Overall Progress</h5>
					<p>{progress}%</p>
				</Content>
			</Card>
		</Cell>
		<Cell span={4}>
			<Card>
				<Content>
					<h5>Area Progress</h5>
					<Polar />
				</Content>
			</Card>
		</Cell>
		<Cell span={4}>
			<Card>
				<Content>
					<h5>Timed Progress</h5>

				</Content>
			</Card>
		</Cell>
	</LayoutGrid>
</div>

<style>
	.layout {
		display: flex;
		background: rgba(255, 255, 255, 0.1);
		height: 100%;
	}
	h5 {
		margin: 1rem;
	}
	p {
		margin: 1rem;
		font-size: var(--step-2)
	}
</style>
