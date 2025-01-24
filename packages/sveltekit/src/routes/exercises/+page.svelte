<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import Information from '$lib/components/Information.svelte';
	import VideoSelector from '$lib/components/VideoSelector.svelte';
	import {
		interaction,
		pain,
		difficult,
		isHalfway,
		isCompleted
	} from '$lib/utils/store';

	const downloadUser = () => {

	};

	const createUserExercises = () => {

	};

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

	$: halfway && addHalfwayMessage();
	$: paused && addPauseMessage();
	$: completed && addCompletedMessage();

	onMount(() => {
		downloadUser();
		createUserExercises();
	});

	export let halfway: boolean;
	export let paused: boolean;
	export let completed: boolean;
</script>

<VideoSelector />
<div class="information-area" in:fly={{ y: 200, duration: 2000 }} out:fade>
	{#each interaction.current as message}
		{#if message}
			<Information bind:newMessage={message} on:buttonClicked={(e) => handleResult(e)} />
		{/if}
	{/each}
</div>

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
</style>
