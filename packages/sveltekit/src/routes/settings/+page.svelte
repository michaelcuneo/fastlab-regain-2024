<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { enhance } from '$app/forms';
	import Card, { Content as CardContent } from '@smui/card';
	import Dialog, { Title as DialogTitle, Content as DialogContent, Actions } from '@smui/dialog';
	import Button, { Label as ButtonLabel } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Switch from '@smui/switch';
	import FormField from '@smui/form-field';
	import { activeAreas, user, userGroups } from '$lib/utils/store';
	import { goto } from '$app/navigation';

	let disabled: boolean = $state(false);
	let updates: boolean = $state(true);
	let chat: boolean = $state(true);
	let open: boolean = $state(false);

	$effect(() => {
		userGroups?.current.map((group: any) => {
			console.log(group);
			// Hard coded for now, but will be dynamic in the future.
			if (group.groupID === activeAreas.current[0].id) activeAreas.current[0].status = true;
			if (group.groupID === activeAreas.current[1].id) activeAreas.current[1].status = true;
			if (group.groupID === activeAreas.current[2].id) activeAreas.current[2].status = true;
			if (group.groupID === activeAreas.current[3].id) activeAreas.current[3].status = true;
			if (group.groupID === activeAreas.current[4].id) activeAreas.current[4].status = true;
			if (group.groupID === activeAreas.current[5].id) activeAreas.current[5].status = true;
			if (group.groupID === activeAreas.current[6].id) activeAreas.current[6].status = true;
		});

		disabled =
			!activeAreas.current[0].status &&
			!activeAreas.current[1].status &&
			!activeAreas.current[2].status &&
			!activeAreas.current[3].status &&
			!activeAreas.current[4].status &&
			!activeAreas.current[5].status &&
			!activeAreas.current[6].status;
	});

	const activateArea = async (area: string) => {
		switch (area) {
			case 'head':
				activeAreas.current[0].status = !activeAreas.current[0].status;
				break;
			case 'shoulder':
				activeAreas.current[1].status = !activeAreas.current[1].status;
				break;
			case 'arm':
				activeAreas.current[2].status = !activeAreas.current[2].status;
				break;
			case 'chest':
				activeAreas.current[3].status = !activeAreas.current[3].status;
				break;
			case 'stomach':
				activeAreas.current[4].status = !activeAreas.current[4].status;
				break;
			case 'legs':
				activeAreas.current[5].status = !activeAreas.current[5].status;
				break;
			case 'hands':
				activeAreas.current[6].status = !activeAreas.current[6].status;
				break;
			default:
				return;
		}
	};

	let submitted: boolean = $state(false);

	const onSubmit = () => {
		submitted = true;
	};

	let { data, form }: { data: PageData; form: ActionData } = $props();
</script>

<div class="settings">
	<LayoutGrid>
				<Cell span={4}>
			<Card>
				<CardContent>
					<h4>Area Selector</h4>
					<div class="selector">
						<div class="human-body">
							<svg
								class="head"
								role="button"
								tabindex="0"
								onclick={() => activateArea('head')}
								onkeydown={() => activateArea('head')}
								data-position="head"
								xmlns="http://www.w3.org/2000/svg"
								width="56.594"
								height="95.031"
								viewBox="0 0 56.594 95.031"
							>
								<path
									class={activeAreas.current[0].status ? 'active' : ''}
									d="M15.92 68.5l8.8 12.546 3.97 13.984-9.254-7.38-4.622-15.848zm27.1 0l-8.8 12.546-3.976 13.988 9.254-7.38 4.622-15.848zm6.11-27.775l.108-11.775-21.16-14.742L8.123 26.133 8.09 40.19l-3.24.215 1.462 9.732 5.208 1.81 2.36 11.63 9.72 11.018 10.856-.324 9.56-10.37 1.918-11.952 5.207-1.81 1.342-9.517zm-43.085-1.84l-.257-13.82L28.226 11.9l23.618 15.755-.216 10.37 4.976-17.085L42.556 2.376 25.49 0 10.803 3.673.002 24.415z"
								/>
							</svg>
							<svg
								class="shoulder"
								role="button"
								tabindex="0"
								onclick={() => activateArea('shoulder')}
								onkeydown={() => activateArea('shoulder')}
								data-position="shoulder"
								xmlns="http://www.w3.org/2000/svg"
								width="109.532"
								height="46.594"
								viewBox="0 0 109.532 46.594"
							>
								<path
									class={activeAreas.current[1].status ? 'active' : ''}
									d="M38.244-.004l1.98 9.232-11.653 2.857-7.474-2.637zm33.032 0l-1.98 9.232 11.653 2.857 7.474-2.637zm21.238 10.54l4.044-2.187 12.656 14 .07 5.33S92.76 10.66 92.515 10.535zm-1.285.58c-.008.28 17.762 18.922 17.762 18.922l.537 16.557-6.157-10.55L91.5 30.988 83.148 15.6zm-74.224-.58L12.962 8.35l-12.656 14-.062 5.325s16.52-17.015 16.764-17.14zm1.285.58C18.3 11.396.528 30.038.528 30.038L-.01 46.595l6.157-10.55 11.87-5.056L26.374 15.6z"
								/>
							</svg>
							<svg
								class="arm"
								role="button"
								tabindex="0"
								onclick={() => activateArea('arm')}
								onkeydown={() => activateArea('arm')}
								data-position="arm"
								xmlns="http://www.w3.org/2000/svg"
								width="156.344"
								height="119.25"
								viewBox="0 0 156.344 119.25"
							>
								<path
									class={activeAreas.current[2].status ? 'active' : ''}
									d="M21.12 56.5a1.678 1.678 0 0 1-.427.33l.935 8.224 12.977-13.89 1.2-8.958A168.2 168.2 0 0 0 21.12 56.5zm1.387 12.522l-18.07 48.91 5.757 1.333 19.125-39.44 3.518-22.047zm-5.278-18.96l2.638 18.74-17.2 46.023L.01 113.05l6.644-35.518zm118.015 6.44a1.678 1.678 0 0 0 .426.33l-.934 8.222-12.977-13.89-1.2-8.958A168.2 168.2 0 0 1 135.24 56.5zm-1.39 12.52l18.073 48.91-5.758 1.333-19.132-39.44-3.52-22.05zm5.28-18.96l-2.64 18.74 17.2 46.023 2.658-1.775-6.643-35.518zm-103.1-12.323a1.78 1.78 0 0 1 .407-.24l3.666-27.345L33.07.015l-7.258 10.58-6.16 37.04.566 4.973a151.447 151.447 0 0 1 15.808-14.87zm84.3 0a1.824 1.824 0 0 0-.407-.24l-3.666-27.345L123.3.015l7.258 10.58 6.16 37.04-.566 4.973a151.447 151.447 0 0 0-15.822-14.87zM22.288 8.832l-3.3 35.276-2.2-26.238zm111.79 0l3.3 35.276 2.2-26.238z"
								/>
							</svg>
							<svg
								class="chest"
								role="button"
								tabindex="0"
								onclick={() => activateArea('chest')}
								onkeydown={() => activateArea('chest')}
								data-position="chest"
								xmlns="http://www.w3.org/2000/svg"
								width="86.594"
								height="45.063"
								viewBox="0 0 86.594 45.063"
							>
								<path
									class={activeAreas.current[3].status ? 'active' : ''}
									d="M19.32 0l-9.225 16.488-10.1 5.056 6.15 4.836 4.832 14.07 11.2 4.616 17.85-8.828-4.452-34.7zm47.934 0l9.225 16.488 10.1 5.056-6.15 4.836-4.833 14.07-11.2 4.616-17.844-8.828 4.45-34.7z"
								/>
							</svg>
							<svg
								class="stomach"
								role="button"
								tabindex="0"
								onclick={() => activateArea('stomach')}
								onkeydown={() => activateArea('stomach')}
								data-position="stomach"
								xmlns="http://www.w3.org/2000/svg"
								width="75.25"
								height="107.594"
								viewBox="0 0 75.25 107.594"
							>
								<path
									class={activeAreas.current[4].status ? 'active' : ''}
									d="M19.25 7.49l16.6-7.5-.5 12.16-14.943 7.662zm-10.322 8.9l6.9 3.848-.8-9.116zm5.617-8.732L1.32 2.15 6.3 15.6zm-8.17 9.267l9.015 5.514 1.54 11.028-8.795-5.735zm15.53 5.89l.332 8.662 12.286-2.665.664-11.826zm14.61 84.783L33.28 76.062l-.08-20.53-11.654-5.736-1.32 37.5zM22.735 35.64L22.57 46.3l11.787 3.166.166-16.657zm-14.16-5.255L16.49 35.9l1.1 11.25-8.8-7.06zm8.79 22.74l-9.673-7.28-.84 9.78L-.006 68.29l10.564 14.594 5.5.883 1.98-20.735zM56 7.488l-16.6-7.5.5 12.16 14.942 7.66zm10.32 8.9l-6.9 3.847.8-9.116zm-5.617-8.733L73.93 2.148l-4.98 13.447zm8.17 9.267l-9.015 5.514-1.54 11.03 8.8-5.736zm-15.53 5.89l-.332 8.662-12.285-2.665-.664-11.827zm-14.61 84.783l3.234-31.536.082-20.532 11.65-5.735 1.32 37.5zm13.78-71.957l.166 10.66-11.786 3.168-.166-16.657zm14.16-5.256l-7.915 5.514-1.1 11.25 8.794-7.06zm-8.79 22.743l9.673-7.28.84 9.78 6.862 12.66-10.564 14.597-5.5.883-1.975-20.74z"
								/>
							</svg>
							<svg
								class="legs"
								role="button"
								tabindex="0"
								onclick={() => activateArea('legs')}
								onkeydown={() => activateArea('legs')}
								data-position="legs"
								xmlns="http://www.w3.org/2000/svg"
								width="93.626"
								height="286.625"
								viewBox="0 0 93.626 286.625"
							>
								<path
									class={activeAreas.current[5].status ? 'active' : ''}
									d="M17.143 138.643l-.664 5.99 4.647 5.77 1.55 9.1 3.1 1.33 2.655-13.755 1.77-4.88-1.55-3.107zm20.582.444l-3.32 9.318-7.082 13.755 1.77 12.647 5.09-14.2 4.205-7.982zm-26.557-12.645l5.09 27.29-3.32-1.777-2.656 8.875zm22.795 42.374l-1.55 4.88-3.32 20.634-.442 27.51 4.65 26.847-.223-34.39 4.87-13.754.663-15.087zM23.34 181.24l1.106 41.267 8.853 33.28-9.628-4.55-16.045-57.8 5.533-36.384zm15.934 80.536l-.664 18.415-1.55 6.435h-4.647l-1.327-4.437-1.55-.222.332 4.437-5.864-1.778-1.55-.887-6.64-1.442-.22-5.214 6.418-10.87 4.426-5.548 10.844-4.437zM13.63 3.076v22.476l15.71 31.073 9.923 30.85L38.23 66.1zm25.49 30.248l.118-.148-.793-2.024L21.9 12.992l-1.242-.44L31.642 40.93zM32.865 44.09l6.812 17.6 2.274-21.596-1.344-3.43zM6.395 61.91l.827 25.34 12.816 35.257-3.928 10.136L3.5 88.133zM30.96 74.69l.345.826 6.47 15.48-4.177 38.342-6.594-3.526 5.715-35.7zm45.5 63.953l.663 5.99-4.647 5.77-1.55 9.1-3.1 1.33-2.655-13.755-1.77-4.88 1.55-3.107zm-20.582.444l3.32 9.318 7.08 13.755-1.77 12.647-5.09-14.2-4.2-7.987zm3.762 29.73l1.55 4.88 3.32 20.633.442 27.51-4.648 26.847.22-34.39-4.867-13.754-.67-15.087zm10.623 12.424l-1.107 41.267-8.852 33.28 9.627-4.55 16.046-57.8-5.533-36.384zM54.33 261.777l.663 18.415 1.546 6.435h4.648l1.328-4.437 1.55-.222-.333 4.437 5.863-1.778 1.55-.887 6.638-1.442.222-5.214-6.418-10.868-4.426-5.547-10.844-4.437zm25.643-258.7v22.476L64.26 56.625l-9.923 30.85L55.37 66.1zM54.48 33.326l-.118-.15.793-2.023L71.7 12.993l1.24-.44L61.96 40.93zm6.255 10.764l-6.812 17.6-2.274-21.595 1.344-3.43zm26.47 17.82l-.827 25.342-12.816 35.256 3.927 10.136 12.61-44.51zM62.64 74.693l-.346.825-6.47 15.48 4.178 38.342 6.594-3.527-5.715-35.7zm19.792 51.75l-5.09 27.29 3.32-1.776 2.655 8.875zM9.495-.007l.827 21.373-7.028 42.308-3.306-34.155zm2.068 27.323L26.24 59.707l3.307 26-6.2 36.58L9.91 85.046l-.827-38.342zM84.103-.01l-.826 21.375 7.03 42.308 3.306-34.155zm-2.066 27.325L67.36 59.707l-3.308 26 6.2 36.58 13.436-37.24.827-38.34z"
								/>
							</svg>
							<svg
								class="hands"
								role="button"
								tabindex="0"
								onclick={() => activateArea('hands')}
								onkeydown={() => activateArea('hands')}
								data-position="hands"
								xmlns="http://www.w3.org/2000/svg"
								width="205"
								height="38.938"
								viewBox="0 0 205 38.938"
							>
								<path
									class={activeAreas.current[6].status ? 'active' : ''}
									d="M21.255-.002l2.88 6.9 8.412 1.335.664 12.458-4.427 17.8-2.878-.22 2.8-11.847-2.99-.084-4.676 12.6-3.544-.446 4.4-12.736-3.072-.584-5.978 13.543-4.428-.445 6.088-14.1-2.1-1.25-7.528 12.012-3.764-.445L12.4 12.9l-1.107-1.78L.665 15.57 0 13.124l8.635-7.786zm162.49 0l-2.88 6.9-8.412 1.335-.664 12.458 4.427 17.8 2.878-.22-2.8-11.847 2.99-.084 4.676 12.6 3.544-.446-4.4-12.736 3.072-.584 5.978 13.543 4.428-.445-6.088-14.1 2.1-1.25 7.528 12.012 3.764-.445L192.6 12.9l1.107-1.78 10.628 4.45.665-2.447-8.635-7.786z"
								/>
							</svg>
						</div>
					</div>
					<div class="legend">
						<h4>You must pick at least one area to continue.</h4>
						<Button type="submit" {disabled} variant="raised" onclick={() => goto('/exercises')}>Show me my exercises</Button>
					</div>
					<!--
					<div class="legend">
						<form class="form" method="POST" action="?/saveSettings" use:enhance={onSubmit}>
							<input type="hidden" name="email" value={user.current.email} />
							<input type="hidden" name="head" value={activeAreas.current[0].status} />
							<input type="hidden" name="shoulder" value={activeAreas.current[1].status} />
							<input type="hidden" name="arm" value={activeAreas.current[2].status} />
							<input type="hidden" name="chest" value={activeAreas.current[3].status} />
							<input type="hidden" name="stomach" value={activeAreas.current[4].status} />
							<input type="hidden" name="legs" value={activeAreas.current[5].status} />
							<input type="hidden" name="hands" value={activeAreas.current[6].status} />
							<Button type="submit" {disabled} variant="raised">SAVE AREAS</Button>
						</form>
					</div>
					-->
				</CardContent>
			</Card>
		</Cell>
		<Cell span={8}>
			<Card>
				<CardContent>
					<h4>Settings</h4>
					<p>
						Select the areas where you are affected by stroke on the human area selector, and we can
						use this information to carefully select specific exercises to help target problematic
						areas, to help you regain in every way.
					</p>
					<p>
						Once you have selected all the areas affected by your Stroke, Save the settings, and you
						are finished, you will then be forwarded to the exercises area.
					</p>
					<h4>You can come back</h4>
					<p>
						Please be aware that you can come back into these settings and adjust your problem areas
						to recieve different exercises at any time, but picking them properly from the start of
						your 3 month rehabilitation provides more effective results for you, and more reliable
						research results, for us.
					</p>
					<h4>Legend</h4>
					<p>
						Use the following legend to assign areas, <span class="off">BLUE</span> is unaffected,
						<span class="on">ORANGE</span> is affected.
					</p>
					<h4>Notifications</h4>
					<div>
						<FormField>
							<Switch bind:checked={updates} />
							{#snippet label()}
								RECEIVE EMAIL NOTIFICATIONS FROM FASTLAB
							{/snippet}
						</FormField>
					</div>
					<div>
						<FormField>
							<Switch bind:checked={chat} />
							{#snippet label()}
								ALLOW HELP CHAT
							{/snippet}
						</FormField>
					</div>
					<h4>OPT OUT</h4>
					<div>
						<p>
							If you feel like you do not want to be a part of this research anymore, you can click
							this button, and we will permanently delete all of your data. This will permanently
							delete all record of your participation with Regain, and log you out.
						</p>
						<Button class="error-button" variant="raised" onclick={() => (open = !open)}
							>PERMANENTLY REMOVE ALL OF MY DATA</Button
						>
					</div>
				</CardContent>
			</Card>
		</Cell>
	</LayoutGrid>
</div>

<Dialog bind:open aria-labelledby="default-focus-title" aria-describedby="default-focus-content">
	<DialogTitle id="default-focus-title">WARNING</DialogTitle>
	<DialogContent id="default-focus-content">
		<p>Are you sure you want to delete all of your data, and discontinue Regain?</p>
		<p>This procedure is unrecoverable.</p>
	</DialogContent>
	<Actions>
		<Button onclick={() => (open = !open)}>
			<ButtonLabel>NO</ButtonLabel>
		</Button>
		<form class="form" method="POST" action="?/removeData" use:enhance={onSubmit}>
			<Button class="error-button" type="submit" variant="raised">
				<ButtonLabel>YES, REMOVE MY REGAIN ACCOUNT</ButtonLabel>
			</Button>
		</form>
	</Actions>
</Dialog>

<style>
	.settings {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		z-index: 0;
	}
	.selector {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.legend {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0rem 1rem;
		height: auto;
		color: var(--color-surface);
	}
	.off {
		padding: 0.4rem;
		font-weight: 700;
		background-color: #57c9d5;
		color: var(--color-text);
	}
	.on {
		padding: 0.4rem;
		font-weight: 700;
		background-color: #ff7d16;
		color: var(--color-text);
	}
	.human-body {
		position: relative;
		height: 600px;
		width: 300px;
	}
	.human-body svg:hover {
		cursor: pointer;
	}
	.human-body svg:hover path {
		fill: #132a13;
	}
	path.active {
		fill: #ff7d16;
	}
	.human-body svg {
		position: absolute;
		left: 50%;
		fill: #57c9d5;
		outline: none;
	}
	.human-body svg.head {
		margin-left: -28.5px;
		top: -6px;
	}
	.human-body svg.shoulder {
		margin-left: -53.5px;
		top: 69px;
	}
	.human-body svg.arm {
		margin-left: -78px;
		top: 112px;
	}
	.human-body svg.chest {
		margin-left: -43.5px;
		top: 88px;
	}
	.human-body svg.stomach {
		margin-left: -37.5px;
		top: 130px;
	}
	.human-body svg.legs {
		margin-left: -46.5px;
		top: 205px;
	}
	.human-body svg.hands {
		margin-left: -102.5px;
		top: 224px;
	}
</style>
