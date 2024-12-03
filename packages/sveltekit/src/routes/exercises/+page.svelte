<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { fade, fly } from 'svelte/transition';
	import Information from '$lib/components/Information.svelte';
	import VideoSelector from '$lib/components/VideoSelector.svelte';
	import { API, graphqlOperation } from '@aws-amplify/api';
	import { getUser } from '../graphql/queries';
	import {
		error,
		user,
		userExercises,
		exercises,
		usersettings,
		messages,
		pain,
		difficult,
		isHalfway,
		isCompleted
	} from '$lib/utils/store';

	const downloadUser = () =>
		(
			API.graphql(
				graphqlOperation(getUser, {
					id: $user.attributes.sub
				})
			) as any
		)
			.then((res: any) => {
				usersettings.set(res.data.getUser);
			})
			.catch((err: any) => {
				error.set({
					status: true,
					message: 'Error retrieving UserSettings.'
				});
			});

	const createUserExercises = () => {
		let groupExercises = [];
		console.log($exercises[0].exerciseGroups.items);
		for (let i = 0; i < $exercises.length; i++) {
			for (let j = 0; j < $exercises[i].exerciseGroups.items.length; j++) {
				for (let k = 0; k < $usersettings.groups.items.length; k++) {
					if (
						$usersettings.groups.items[k].groupID === $exercises[i].exerciseGroups.items[j].groupID
					) {
						groupExercises.push($exercises[i]);
					}
				}
			}
		}
		let uniqueExercises = [...new Set(groupExercises)];
		userExercises.set(uniqueExercises);
	};

	const addPauseMessage = () => {
		messages.set([
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
		messages.set([
			{
				closeIcon: false,
				message: "You're doing well... carry on",
				stayOn: false,
				buttons: []
			}
		]);
	};

	const addComplimentMessage = (type) => {
		messages.set([
			{
				closeIcon: false,
				message: 'Tell us how much ' + type + " on the meter above, you'll be yourself in no time.",
				stayOn: false,
				buttons: []
			}
		]);
	};

	const addHalfwayMessage = () => {
		messages.set([
			{
				closeIcon: false,
				message: "You're half way there, continue doing this exercise for as long as you like!",
				stayOn: false,
				buttons: []
			}
		]);
		isHalfway.set(false);
	};

	let handleResult = (e) => {
		if (e.detail.button === 'catchup') {
			messages.set([]);
			addContinueMessage();
		} else if (e.detail.button === 'pain') {
			messages.set([]);
			pain.set(true);
			addComplimentMessage('pain');
		} else if (e.detail.button === 'difficult') {
			messages.set([]);
			difficult.set(true);
			addComplimentMessage('difficulty');
		}
	};

	const addCompletedMessage = () => {
		messages.set([
			{
				closeIcon: false,
				message: "You did it... You completed an exercise, check out how far you've come!",
				stayOn: false,
				buttons: []
			}
		]);
		isCompleted.set(false);
		setTimeout(() => {
			push('/progress');
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
<information-area in:fly={{ y: 200, duration: 2000 }} out:fade>
	{#each $messages as message}
		{#if message}
			<Information bind:message on:buttonClicked={(e) => handleResult(e)} />
		{/if}
	{/each}
</information-area>

<style>
	information-area {
		position: absolute;
		background: rgba(255, 255, 255, 0.1);
		margin-top: 90px;
		bottom: 13px;
		left: 13px;
		right: 23px;
		flex-direction: column;
	}
	information-area:nth-child(1) {
		margin: 90px;
	}
</style>
