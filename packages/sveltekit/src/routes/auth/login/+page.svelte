<script lang="ts">
	import Button from '@smui/button';
	import Card from '@smui/card';
	import CircularProgress from '@smui/circular-progress';
	import Textfield from '@smui/textfield';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

  let value: string | null = $state(null);
	let submitted: boolean = $state(false);
	let disabled: boolean = $state(false);

	const onSubmit = () => {
		submitted = true;
	};

	$effect(() => {
		disabled = !value;
	});
	
	let { form }: { form: ActionData } = $props();
</script>

{#if submitted && !form?.success}
	<div class="wrapper">
		<CircularProgress style="height: 32px; width: 32px;" indeterminate />
	</div>
{/if}
{#if !submitted && !form?.success}
	<div class="wrapper">
		<Card>
			<form class="form" method="POST" action="?/magicLinks" use:enhance={onSubmit}>
				<h4>LOGIN WITH YOUR EMAIL</h4>
				<Textfield variant="outlined" id="email" type="email" bind:value label="email" />
				<Button type="submit" {disabled} variant="outlined">SEND MAGIC LINK</Button>
			</form>
		</Card>
	</div>
{:else if form?.success}
	<div class="wrapper">
		<h3>
			An email has been sent to {value}, click on the link in the email to sign in.
		</h3>
	</div>
{:else if form?.error}
	<div class="wrapper">
		<Card>
			<h3>{form.error}</h3>
		</Card>
	</div>
{/if}

<style>
	.wrapper {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		width: 100vw;
		z-index: 0;
	}
	.form {
		display: flex;
		flex-direction: column;
		width: 300px;
		background: var(--surface-color);
		padding: 0.8rem;
		margin: 0.8rem;
		border-radius: 10px;
	}
	h3 {
		line-height: 0.8rem;
		color: white;
	}
	h4 {
		line-height: 0.4rem;
	}
</style>
