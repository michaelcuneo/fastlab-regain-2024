<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
  import { calculateRealTime } from '$lib/utils/helpers';
	import { lazyLoad } from '$lib/utils/lazyload';
	import Card, { PrimaryAction, Media, MediaContent, Content } from '@smui/card'
	import CircularProgress from '@smui/circular-progress';
	import { Icon } from '@smui/common';
	import { Cell } from '@smui/layout-grid';

	let load: boolean = $state(false);
	let form: HTMLFormElement;
	let action: { success: boolean, key: string } = $state({ success: false, key: '' });

	let { exercise }: { exercise: Exercise } = $props();
</script>
  
<Cell span={ 3 }>
	<Card style="border-radius: 16px;">
		<PrimaryAction
			onclick={() => {
				goto(`/exercises/${exercise.id}`);
			}}
		>
			<Media class="card-media-16x9" aspectRatio="16x9">
				<MediaContent>
					<div use:lazyLoad onisVisible={() => {
						form.requestSubmit();
						load = true;
					}}>
						<form bind:this={form} method="POST" action="?/getKey" use:enhance={({ cancel }) => {
							if (action.success) {
								cancel();
							};
							return async ({ result }: { result: any }) => {
								action = { success: result.status === 200, key: result.data.url }
							}
						}}>
						<input type="hidden" name="key" value={exercise.imageKey} />
						{#if action.key !== ''}
							<img src={action.key} alt="Video Thumbnail" loading="lazy" />
						{:else}
						<div class="loader">
							<CircularProgress style="height: 32px; width: 32px;" indeterminate />
						</div>
						{/if}
					</div>
				</MediaContent>
			</Media>
			<Content style="padding: 1rem;">
				<div class="subtitle">
					<h3 class="mdc-typography--headline6">
						{exercise.title}
					</h3>
					<p class="mdc-typography--headline3">
						{exercise.description}
					</p>
					<div class="time">
						{calculateRealTime(exercise.time)}<Icon class="material-icons">timer</Icon>
					</div>
				</div>
			</Content>
		</PrimaryAction>
	</Card>
</Cell>

<style>
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.time {
    display: flex;
    width: 80px;
    justify-content: space-between;
    align-items: center;
	}
	.subtitle {
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.loader {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
</style>