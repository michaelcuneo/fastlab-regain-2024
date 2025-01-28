<script lang="ts">
	import { goto } from '$app/navigation';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { difficult, pain } from '$lib/utils/store';
	import { calculateRealTime } from '$lib/utils/calculateRealTime';
	import Video from '$lib/components/Video.svelte';
	import Messages from './Messages.svelte';
	import Controls from './Controls.svelte';
	import Guage from './Guage.svelte';
	import type { PageData } from '../$types';

	let videoElement: HTMLVideoElement | undefined = $state();

	let { data }: { data: PageData } = $props();
</script>

<div class="exercise">
	<LayoutGrid>
		<Cell span={8}>
			<Video bind:videoElement src={data?.exercises.video} width="100%" height="100%" autoplay />
		</Cell>
		<Cell span={4}>
			<Card style="border-radius: 16px;">
				<Content>
					<h3 class="mdc-typography--headline6">
						{data?.exercises?.title}
						{calculateRealTime(data?.exercises?.time)}
					</h3>
					<p>{data?.exercises?.description}</p>
				</Content>
				<Actions fullBleed>
					<Button onclick={() => goto(`/exercises`)}>
						<i class="material-icons" aria-hidden="true">arrow_backward</i>
						<Label>Return to the video selection screen</Label>
					</Button>
				</Actions>
			</Card>
			<div class="guage">
				<Controls {videoElement} />
			</div>
			{#if difficult.current || pain.current}
				<div class="guage">
					<Guage video={data?.exercises} type={pain.current ? 'pain' : 'difficult'} />
				</div>
			{/if}
		</Cell>
	</LayoutGrid>
	<Messages />
</div>

<style>
	.exercise {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		z-index: 0;
	}
	.guage {
		margin-top: 1em;
	}
</style>
