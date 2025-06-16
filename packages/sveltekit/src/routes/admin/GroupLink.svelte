<script lang="ts">
	import Card, { Actions, Content, ActionIcons, PrimaryAction } from '@smui/card';
	import { goto } from '$app/navigation';
	import IconButton, { Icon } from '@smui/icon-button';
	import { currentGroup, currentMode, user } from '$lib/utils/store';

	let open: boolean = $state(false);

	let { group }: { group: Group } = $props();
</script>

<Card style="border-radius: 16px; height: 100%;">
	<PrimaryAction
		onclick={() => {
			currentMode.current = 'display';
			currentGroup.current = group;
			goto(`/admin/groups/${group.id}`);
		}}
	>
		<Content style="padding: 1rem;">
			<h2>
				{group.area}
			</h2>
		</Content>
	</PrimaryAction>
	{#if user}
		<Actions>
			<ActionIcons>
				<IconButton onclick={() => (open = !open)} aria-label="Delete Group" title="Delete Group">
					<Icon class="material-icons">delete</Icon>
				</IconButton>
			</ActionIcons>
		</Actions>
	{/if}
</Card>

<!--
<DeleteModal object={group} type="group" bind:open />
-->
