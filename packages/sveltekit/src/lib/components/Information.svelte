<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isEmpty } from '$lib/utils/helpers';
	import { messages } from '$lib/utils/store';

	const dispatch = createEventDispatcher();

	const handleRemoveMessage = () => {
		$messages = [];
	};

	const handleMessageTimeout = () => {
		setTimeout(() => {
			if (message.stayOn === false) {
				$messages = [];
			}
		}, 5000);
	};

	handleMessageTimeout();

	const buttonClicked = (event: MouseEvent) =>
		dispatch('buttonClicked', {
			button: event
		});

	export let message: messageType;
</script>

<information>
	<message>
		{#if message.closeIcon}
			<IconButton
				style="padding: 0; margin: 0;"
				class="material-icons"
				on:click={handleRemoveMessage}>remove_circle</IconButton
			>
		{/if}
		<statement>{message.message}</statement>
		{#if !isEmpty(message.buttons)}
			{#each message.buttons as button}
				<Button variant="raised" on:click={() => buttonClicked(button.result)}
					>{button.title}</Button
				>
			{/each}
		{/if}
	</message>
</information>

<style>
	information {
		display: flex;
		flex-direction: row;
		height: 90px;
		align-items: center;
		justify-content: space-between;
		background: #ffffff;
		border: 3px solid #dadada;
		box-sizing: border-box;
		border-radius: 25px;
	}
	message {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: 'Roboto', sans-serif;
		font-size: 18px;
		font-weight: 700;
		line-height: 26px;
		color: #132a13;
	}
	statement {
		padding: 0rem 1rem;
	}
</style>
