<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
  import { calculateRealTime } from '$lib/utils/calculateRealTime';
	import { lazyLoad } from '$lib/utils/lazyload';
	import Card, { PrimaryAction, Media, MediaContent, Content } from '@smui/card'
	import { Icon } from '@smui/common';
	import { Cell } from '@smui/layout-grid';

	let loaded: boolean = $state(false);
	let form: HTMLFormElement;
	let action: { success: boolean, key: string } = $state({ success: false, key: '' });

	$effect(() => {
		form.addEventListener('submit', (e) => {
			console.log('submitting form');
			e.preventDefault();
		}, { once: true });
	});

	let { exercise }: { exercise: Exercise } = $props();
</script>

<form style="display: none;" bind:this={form} method="POST" action="?/getKey" use:enhance={({ cancel }) => {
	if (loaded) cancel();
	return async ({ result }: { result: any }) => {
		if (result.data.url) {
			action = { success: result.status === 200, key: result.data.url }
			loaded = true;
		}
	}
}}>
	<input type="hidden" name="key" value={exercise.imageKey} />
</form>
  
<Cell span={ 3 }>
	<Card style="border-radius: 16px; height: 100%;">
		<PrimaryAction
			onclick={() => {
				goto(`/exercises/${exercise.id}`);
			}}
		>
			<Media class="card-media-16x9" aspectRatio="16x9">
				<MediaContent>
					<div use:lazyLoad onisVisible={() => {
						if (loaded) return;
						form.requestSubmit();
					}}>
						{#if action.success === true}
							<img src={action.key} alt="Video Thumbnail" loading="lazy" />
						{:else}
							<div class="loader"></div>
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
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		animation: pulse 2s infinite;
	}
	@keyframes pulse {
	  0%, 100% {
    	background-color: hsl(0, 0%, 95%);
  	}
  	50% {
	    background-color: hsl(0, 0%, 90%);
	  }
	}
</style>