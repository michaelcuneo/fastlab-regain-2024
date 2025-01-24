<script lang="ts">
	import Button from '@smui/button';
	import Card, { Content } from '@smui/card';
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

{#if submitted && !form?.error && !form?.success}
	<div class="wrapper">
		<Card>
			<Content>
				<div style="display: flex; flex-direction: column; align-items: center;">
					<CircularProgress style="height: 32px; width: 32px;" indeterminate />
					<p>Please wait.</p>
					<h5>
						Sending an email to {value}
					</h5>
				</div>
			</Content>
		</Card>
	</div>
{/if}
{#if !submitted && !form?.success}
	<div class="wrapper">
		<Card>
			<Content>
				<form class="form" method="POST" action="?/magicLinks" use:enhance={onSubmit}>
					<h4>LOGIN WITH YOUR EMAIL</h4>
					<p>Simply use your email to sign in and an account will be created instantly for you.</p>
					<p>If you already have an account, use this same email, to get back in to Regain.</p>
					<p>A login link will be sent each time to this email address.</p>
					<p>Click on the link in the email, and you will be automatically logged in to Regain.</p>
					<Textfield variant="outlined" id="email" type="email" input$name="email" bind:value label="email" />
					<Button style="margin-top: 2rem;" type="submit" {disabled} variant="raised">SEND MAGIC LINK</Button>
				</form>
			</Content>
		</Card>
	</div>
{:else if form?.success}
	<div class="wrapper">
		<Card>
			<Content>
				<h5>An email has been sent to {value}</h5>
				<p>Click on the link in this email, to login to Regain</p>
			</Content>
		</Card>
	</div>
{:else if form?.error}
	<div class="wrapper">
		<Card>
			<Content>
				<h4>{form.error}</h4>
				<p>For further information, ask a question in, <a href="/help">help</a></p>
			</Content>
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
	}
	h4 {
		line-height: 0rem;
	}
	h5 {
		line-height: 0rem;
	}
</style>
