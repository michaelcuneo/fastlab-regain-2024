<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { isEmpty } from '$lib/utils/helpers';
	import { interaction } from '$lib/utils/store';
	import IconButton from '@smui/icon-button';
	import Button from '@smui/button';

	const dispatch = createEventDispatcher();

	const handleRemoveMessage = () => {
		interaction.current = [];
	};

	const handleMessageTimeout = () => {
		setTimeout(() => {
			if (newMessage.stayOn === false) {
				interaction.current = [];
			}
		}, 5000);
	};

	handleMessageTimeout();

	const buttonClicked = (event: string) =>
		dispatch('buttonClicked', {
			button: event
		});

	let {
		newMessage = $bindable()
	}: {
		newMessage: Information
	} = $props();
</script>

<div class="information">
	<div class="message">
		{#if newMessage.closeIcon}
			<IconButton
				style="padding: 0; margin: 0;"
				class="material-icons"
				onclick={handleRemoveMessage}>remove_circle</IconButton
			>
		{/if}
		<statement>{newMessage.message}</statement>
		{#if newMessage.buttons && !isEmpty(newMessage.buttons)}
			{#each newMessage.buttons as button}
				<Button variant="raised" onclick={() => buttonClicked(button.result)}
					>{button.title}</Button
				>
			{/each}
		{/if}
	</div>
</div>

<style>
	.information {
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
	.message {
		display: flex;
		flex-direction: row;
		align-items: center;
		font-family: 'Roboto', sans-serif;
		font-size: 18px;
		font-weight: 700;
		line-height: 26px;
		color: #132a13;
	}
</style>
