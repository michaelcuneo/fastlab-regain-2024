<script lang="ts">
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content, Actions, PrimaryAction, Media, MediaContent } from '@smui/card';
	import { Icon } from '@smui/icon-button';
	import { calculateRealTime } from '$lib/utils/helpers';

	import {
		interaction,
		pain,
		difficult,
		isHalfway,
		isCompleted,
	} from '$lib/utils/store';

	import type { PageData } from './$types';

	let selectedVideo: Exercise | undefined = $state(undefined);

	const addPauseMessage = () => {
		interaction.current = ([
			{
				closeIcon: false,
				message:
					'Did you pause this video to catch up, or is Regain causing you discomfort or pain?',
				stayOn: true,
				buttons: [
					{
						title: 'Just Catching Up',
						result: 'catchup'
					},
					{
						title: 'Difficulty',
						result: 'difficult'
					},
					{
						title: 'Pain',
						result: 'pain'
					}
				]
			}
		]);
	};

	const addContinueMessage = () => {
		interaction.current = ([
			{
				closeIcon: false,
				message: "You're doing well... carry on",
				stayOn: false,
				buttons: []
			}
		]);
	};

	const addComplimentMessage = (type: string) => {
		interaction.current = ([
			{
				closeIcon: false,
				message: 'Tell us how much ' + type + " on the meter above, you'll be yourself in no time.",
				stayOn: false,
				buttons: []
			}
		]);
	};

	const addHalfwayMessage = () => {
		interaction.current = ([
			{
				closeIcon: false,
				message: "You're half way there, continue doing this exercise for as long as you like!",
				stayOn: false,
				buttons: []
			}
		]);
		isHalfway.current = (false);
	};

	let handleResult = (e: CustomEvent) => {
		if (e.detail.button === 'catchup') {
			interaction.current = ([]);
			addContinueMessage();
		} else if (e.detail.button === 'pain') {
			interaction.current = ([]);
			pain.current = 0;
			addComplimentMessage('pain');
		} else if (e.detail.button === 'difficult') {
			interaction.current = ([]);
			difficult.current = 0;
			addComplimentMessage('difficulty');
		}
	};

	const addCompletedMessage = () => {
		interaction.current = ([
			{
				closeIcon: false,
				message: "You did it... You completed an exercise, check out how far you've come!",
				stayOn: false,
				buttons: []
			}
		]);

		isCompleted.current = false;

		setTimeout(() => {
			goto('/progress');
		}, 4000);
	};

	$effect(() => {
		selectedVideo = {
			id: '',
			title: '',
			createdAt: '',
			updatedAt: '',
			time: 0
		}

		halfway && addHalfwayMessage();
		paused && addPauseMessage();
		completed && addCompletedMessage();
		console.log(data);
	})

	let { data, halfway, paused, completed }: { data: PageData, halfway: boolean, paused: boolean, completed: boolean } = $props();
</script>

<LayoutGrid>
	{#each data.exercises as exercise}
		<Cell span={3}>
			<Card style="border-radius: 16px;">
				<PrimaryAction
					onclick={() => {
						selectedVideo = exercise;
					}}
				>
					<Media class="card-media-16x9" aspectRatio="16x9">
						<MediaContent>
							<img src={exercise.image} alt={exercise.imaage} />
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
</LayoutGrid>

<!--
<div class="information-area" in:fly={{ y: 200, duration: 2000 }} out:fade>
	{#each interaction.current as message}
		{#if message}
			<Information bind:newMessage={message} on:buttonClicked={(e) => handleResult(e)} />
		{/if}
	{/each}
</div>
-->

<style>
	.information-area {
		position: absolute;
		background: rgba(255, 255, 255, 0.1);
		margin-top: 90px;
		bottom: 13px;
		left: 13px;
		right: 23px;
		flex-direction: column;
	}
	.information-area:nth-child(1) {
		margin: 90px;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
