<script lang="ts">
	import { isEmpty } from '$lib/utils/helpers';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content, Actions, PrimaryAction, Media, MediaContent } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { Icon } from '@smui/common';
	import { difficult, pain, userExercises } from '$lib/utils/store';
	import { calculateRealTime } from '$lib/utils/helpers';
	import S3Video from './S3Video.svelte';
	import S3Image from './S3Image.svelte';
	import Difficulty from './Difficulty.svelte';
	import Pain from './Pain.svelte';

	let selectedVideo: Exercise | undefined = $state(undefined);

	$effect(() => {
		selectedVideo = {
			id: '',
			title: '',
			createdAt: '',
			updatedAt: '',
			time: 0
		}
	})
</script>

<div class="wrapper">
	<LayoutGrid>
		{#if selectedVideo?.id !== ''}
			<Cell span={8}>
				<S3Video key={selectedVideo?.video?.key} width="100%" height="100%" autoplay={true} />
			</Cell>
			<Cell span={4}>
				{#if difficult.current}
					<Difficulty video={selectedVideo} />
				{/if}
				{#if pain.current}
					<Pain video={selectedVideo} />
				{/if}
				<Card style="border-radius: 16px;">
					<h2 class="mdc-typography--headline6" style="margin: 1em;">
						{selectedVideo?.title}
						{calculateRealTime(selectedVideo?.time)}
					</h2>
					<Content>
						<p>{selectedVideo?.description}</p>
					</Content>
					<Actions fullBleed>
						<Button
							onclick={() =>
								(selectedVideo = {
									id: '',
									title: '',
									createdAt: '',
									updatedAt: '',
									time: 0
								})}
						>
							<i class="material-icons" aria-hidden="true">arrow_backward</i>
							<Label>Return to the video selection screen</Label>
						</Button>
					</Actions>
				</Card>
			</Cell>
		{/if}
		{#if selectedVideo?.id === ''}
			{#if !isEmpty(userExercises.current)}
				{#each userExercises.current as exercise}
					<Cell span={3}>
						<Card style="border-radius: 16px;">
							<PrimaryAction
								onclick={() => {
									selectedVideo = exercise;
								}}
							>
								<Media class="card-media-16x9" aspectRatio="16x9">
									<MediaContent>
										<S3Image image={exercise.thumbnail.key} />
									</MediaContent>
								</Media>
								<Content style="padding: 1rem;">
									<subtitle>
										<h2 class="mdc-typography--headline6">
											{exercise.title}
										</h2>
										<h3 class="mdc-typography--headline3">
											{exercise.description}
										</h3>
										<time>
											{calculateRealTime(exercise.time)}<Icon class="material-icons">timer</Icon>
										</time>
									</subtitle>
								</Content>
							</PrimaryAction>
						</Card>
					</Cell>
				{/each}
			{/if}
		{/if}
	</LayoutGrid>
</div>

<style>
	.wrapper {
		display: flex;
		position: relative;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		width: 100vw;
		z-index: 0;
	}
	time {
		display: flex;
		width: 80px;
		justify-content: space-between;
		align-items: center;
	}
	subtitle {
		display: flex;
		width: 100%;
		flex-direction: column;
	}
</style>
