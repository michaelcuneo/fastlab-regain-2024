<script lang="ts">
  import Card, {
    Actions,
    Content,
    ActionIcons,
    Media,
    PrimaryAction,
    MediaContent,
  } from "@smui/card";
  import IconButton, { Icon } from "@smui/icon-button";
  import { goto } from "$app/navigation";
  import { currentExercise, currentMode, user } from '$lib/utils/store';

  let open: boolean = $state(false);
  let url: string = $state('');

  let { exercise }: { exercise: Exercise } = $props();
</script>

<Card class="card-display" style="min-width: auto;">
  <PrimaryAction
    onclick={() => {
      currentMode.current = 'display';
      currentExercise.current = exercise;
      goto(`/admin/exercises/${exercise.id}`);
    }}
  >
    <Media class="card-media-square" aspectRatio="square">
      <MediaContent>
        <div>
          <div style="background-image: url({url});"></div>
        </div>
      </MediaContent>
    </Media>
    <Content>
      <h2>
        {exercise.title}
      </h2>
    </Content>
  </PrimaryAction>
  {#if user}
    <Actions>
      <ActionIcons>
        <IconButton
          onclick={() => (open = !open)}
          aria-label="Delete Exercise"
          title="Delete Exercise"
        >
          <Icon class="material-icons">delete</Icon>
        </IconButton>
      </ActionIcons>
    </Actions>
  {/if}
</Card>

<!--
  <DeleteModal object={exercise} type="exercise" bind:open />
-->
