<script lang="ts">
	import { Button, Card, Loader } from '@michaelcuneo/svelte-components';
	import { Label } from '@michaelcuneo/meltui-components';
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let dirty: boolean;
	let invalid: boolean;
	let focused: boolean;
	let value: string = '';
	let submitted = false;

	const onSubmit = () => {
		console.log('submitting');
		submitted = true;
	};

	$: disabled = focused || !value || !dirty || invalid;

	/** @type {import('./$types').ActionData} */
	export let form: ActionData;
</script>

{#if submitted && !form?.success}
	<div class="wrapper">
		<Loader size="64px" />
	</div>
{/if}
{#if !submitted && !form?.success}
	<div class="wrapper">
		<Card>
			<form class="form" method="POST" action="?/magicLinks" use:enhance={onSubmit}>
				<h4>LOGIN WITH YOUR EMAIL</h4>
				<p>
					<Label forId="email" label="Email"></Label>
					<input id="email" type="email" bind:value name="email" />
				</p>
				<p>
					<Button type="submit" variant="outlined">SEND MAGIC LINK</Button>
				</p>
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
		height: calc(100vh - 88px);
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
	p {
		display: flex;
		flex-direction: column;
		width: 100%;
	}
	h3 {
		line-height: 0.8rem;
		color: white;
	}
	h4 {
		line-height: 0.4rem;
	}
</style>
