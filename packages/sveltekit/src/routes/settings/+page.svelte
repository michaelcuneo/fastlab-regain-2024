<script lang="ts">
	import HumanSelector from '$lib/components/HumanSelector.svelte';
	import { onMount } from 'svelte';
	// import { modifyUserAreas, downloadUser, setupUserExercises } from '$lib/utils/store';
	import { user, usersettings, exercises, isLanding, activeAreas } from '$lib/utils/store';
	import { goto } from '$app/navigation';

	let disabled = $state();

	$effect(() => {
		if ($usersettings?.groups?.items?.length >= 0) {
			$usersettings.groups.items.map((group: any) => {
				if (group.groupID === $activeAreas[0].id) $activeAreas[0].status = true;
				if (group.groupID === $activeAreas[1].id) $activeAreas[1].status = true;
				if (group.groupID === $activeAreas[2].id) $activeAreas[2].status = true;
				if (group.groupID === $activeAreas[3].id) $activeAreas[3].status = true;
				if (group.groupID === $activeAreas[4].id) $activeAreas[4].status = true;
				if (group.groupID === $activeAreas[5].id) $activeAreas[5].status = true;
				if (group.groupID === $activeAreas[6].id) $activeAreas[6].status = true;
			});
		}

		disabled = () => {
			!$activeAreas[0].status &&
				!$activeAreas[1].status &&
				!$activeAreas[2].status &&
				!$activeAreas[3].status &&
				!$activeAreas[4].status &&
				!$activeAreas[5].status &&
				!$activeAreas[6].status;
		};
	});

	const activateArea = async (area: string) => {
		switch (area) {
			case 'head':
				$activeAreas[0].status = !$activeAreas[0].status;
				break;
			case 'shoulder':
				$activeAreas[1].status = !$activeAreas[1].status;
				break;
			case 'arm':
				$activeAreas[2].status = !$activeAreas[2].status;
				break;
			case 'chest':
				$activeAreas[3].status = !$activeAreas[3].status;
				break;
			case 'stomach':
				$activeAreas[4].status = !$activeAreas[4].status;
				break;
			case 'legs':
				$activeAreas[5].status = !$activeAreas[5].status;
				break;
			case 'hands':
				$activeAreas[6].status = !$activeAreas[6].status;
				break;
			default:
				return;
		}
	};

	const handleSave = async () => {
		// await modifyUserAreas($usersettings, $activeAreas);
		// await downloadUser($user);
		// await setupUserExercises($exercises, $usersettings);
		goto('/exercises');
	};
</script>

<div class="settings">
	<div class="wrap">
		<HumanSelector {activateArea} activeAreas={$activeAreas} {handleSave} />
	</div>
</div>

<style>
	.settings {
		display: flex;
		position: relative;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 88px);
		background: rgba(255, 255, 255, 0.1);
		width: 100vw;
		z-index: 0;
	}
	.wrap {
		display: flex;
		padding: 2rem;
		align-items: center;
		justify-content: center;
		height: 800px;
		background-color: var(--color-white);
		border-radius: 16px;
	}
</style>
