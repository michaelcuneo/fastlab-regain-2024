<script lang="ts">
	import { isEmpty } from '$lib/helpers/aws';
	import { difficult, pain, userExercises } from '$lib/helpers/store';
	import { calculateRealTime } from '$lib/helpers/helpers';
	import S3Video from './S3Video.svelte';
	import S3Image from './S3Image.svelte';
	import Difficulty from './Difficulty.svelte';
	import Pain from './Pain.svelte';

	let selectedVideo: exerciseType;
	$: selectedVideo = {
		id: '',
		title: '',
		time: 0
	};
</script>

<wrapper>
	<LayoutGrid>
		{#if selectedVideo.id !== ''}
			<Cell span={8}>
				<S3Video key={selectedVideo?.video?.key} width="100%" height="100%" autoplay={true} />
			</Cell>
			<Cell span={4}>
				{#if $difficult}
					<Difficulty video={selectedVideo} />
				{/if}
				{#if $pain}
					<Pain video={selectedVideo} />
				{/if}
				<Card style="border-radius: 16px;">
					<h2 class="mdc-typography--headline6" style="margin: 1em;">
						{selectedVideo.title}
						{calculateRealTime(selectedVideo.time)}
					</h2>
					<Content>
						<p>{selectedVideo.description}</p>
					</Content>
					<Actions fullBleed>
						<Button
							on:click={() =>
								(selectedVideo = {
									id: '',
									title: '',
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
		{#if selectedVideo.id === ''}
			{#if !isEmpty($userExercises)}
				{#each $userExercises as exercise}
					<Cell span={3}>
						<Card style="border-radius: 16px;">
							<PrimaryAction
								on:click={() => {
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
</wrapper>

<style>
	wrapper {
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
