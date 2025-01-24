<script>
  import Card, {
    Actions,
    Content,
    ActionIcons,
    PrimaryAction,
  } from "@smui/card";
  import { goto } from '$app/navigation';
  import IconButton, { Icon } from "@smui/icon-button";
  import { currentGroup, currentMode, user } from '$lib/utils/store';

  $: open = false;

  export let group;
</script>

<Card class="card-display" style="min-width: auto;">
  <PrimaryAction
    onclick={() => {
      currentMode.current = 'display';
      currentGroup.current = group;
      goto(`/admin/groups/${group.id}`);
    }}
  >
    <Content>
      <h2>
        {group.title}
      </h2>
    </Content>
  </PrimaryAction>
  {#if user}
    <Actions>
      <ActionIcons>
        <IconButton
          onclick={() => (open = !open)}
          aria-label="Delete Group"
          title="Delete Group"
        >
          <Icon class="material-icons">delete</Icon>
        </IconButton>
      </ActionIcons>
    </Actions>
  {/if}
</Card>

<!--
<DeleteModal object={group} type="group" bind:open />
-->

