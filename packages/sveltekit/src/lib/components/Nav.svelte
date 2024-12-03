<script lang="ts">
	import { cubicInOut } from 'svelte/easing';
	import { fadeScale, isEmpty } from '$lib/utils/helpers';
	import { user, usersettings, isLanding } from '$lib/utils/store';
	import { goto } from '$app/navigation';

	let open: boolean = $state(false);

	let handleLanding = () => {
		$isLanding = true;
	};

	const handleLogout = () => {
		// Auth.signOut();
		goto('/');
	};

	$effect(() => {
		open = true;
	});
</script>

{#if $isLanding == false}
	<nav
		transition:fadeScale={{
			delay: 250,
			duration: 1000,
			easing: cubicInOut,
			baseScale: 0.5
		}}
	>
		<a aria-label="landing" href="/" onclick={handleLanding}>
			<svg
				width="163"
				height="40"
				viewBox="0 0 163 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<rect opacity="0.8" width="163" height="40" fill="url(#pattern_logo)" />
				<defs>
					<pattern id="pattern_logo" patternContentUnits="objectBoundingBox" width="1" height="1">
						<use xlink:href="#logo_nav" transform="scale(0.00613497 0.025)" />
					</pattern>
					<image
						id="logo_nav"
						width="163"
						height="40"
						xlink:href="data:image/png;base64,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"
					/>
				</defs>
			</svg>
		</a>
		<p>
			<a class="nav" href="/">Home</a>
			<a class="nav" href="/about">About</a>
			<a class="nav" href="/help">Help</a>
			{#if !isEmpty($user)}
				{#if usersettings.value.onboard === false}
					<a class="nav" href="/progress">Progress</a>
					<a class="nav" href="/exercises">Exercises</a>
					<a class="nav" href="/settings">Settings</a>
				{/if}
				<a class="nav" href="/auth/logout">Logout</a>
			{/if}
		</p>
	</nav>
{/if}

<!--
<Dialog
	bind:open
	aria-labelledby="default-focus-title"
	aria-describedby="default-focus-content"
>
	<DialogTitle id="default-focus-title">WARNING</DialogTitle>
	<Content id="default-focus-content">
		<p>Are you sure you want to sign out?</p>
	</Content>
	<Actions>
		<Button on:click={handleLogout}>
			<ButtonLabel>YES, SIGN ME OUT</ButtonLabel>
		</Button>
		<Button on:click={() => (open = !open)}>
			<ButtonLabel>NO</ButtonLabel>
		</Button>
	</Actions>
</Dialog>
-->

<style>
	nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 88px;
		font-weight: 800;
		padding: 0 1em;
	}

	p {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: flex-end;
		margin: 0;
		padding: 0;
		width: 100%;
	}

	a {
		display: block;
		text-decoration: none;
		color: var(--color-text);
		padding: 0.6em 1.2em;
		margin: 0 0.5em;
		z-index: 999;
	}

	a.nav {
		display: block;
		text-decoration: none;
		color: var(--color-text);
		border: 2px solid var(--color-text);
		border-radius: 8px;
		padding: 0.6em 1.2em;
		z-index: 999;
	}

	a:visited {
		text-decoration: none;
		color: var(--color-text);
		display: block;
	}

	a:hover {
		text-decoration: none;
		color: var(--color-primary);
		display: block;
	}
</style>
