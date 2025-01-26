<script lang="ts">
  import { fly } from 'svelte/transition';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Card, { Content, Actions } from '@smui/card';
	import Button, { Label } from '@smui/button';
	import { Icon } from '@smui/common';
	import { difficult, pain } from '$lib/utils/store';
	import { calculateRealTime } from '$lib/utils/helpers';
  import Information from '$lib/components/Information.svelte';
  import Difficulty from './Difficulty.svelte';
	import Pain from './Pain.svelte';

  let { selectedVideo }: { selectedVideo: Exercise } = $props();
</script>

<LayoutGrid>
  <Cell span={8}>
    <!--<S3Video key={selectedVideo?.video?.key} width="100%" height="100%" autoplay={true} />-->
  </Cell>
  <Cell span={4}>
    {#if difficult.current}
      <Difficulty video={selectedVideo} />
    {/if}
    {#if pain.current}
      <Pain video={selectedVideo} />
    {/if}
    <Card style="border-radius: 16px;">
      <h2 class="mdc-typography--headline6" style="margin: 1em;">
        {selectedVideo?.title}
        {calculateRealTime(selectedVideo?.time)}
      </h2>
      <Content>
        <p>{selectedVideo?.description}</p>
      </Content>
      <Actions fullBleed>
        <Button
          onclick={() =>
            (selectedVideo = {
              id: '',
              title: '',
              createdAt: '',
              updatedAt: '',
              time: 0
            })}
        >
          <i class="material-icons" aria-hidden="true">arrow_backward</i>
          <Label>Return to the video selection screen</Label>
        </Button>
      </Actions>
    </Card>
  </Cell>
</LayoutGrid>

<div class="information-area" in:fly={{ y: 200, duration: 2000 }} out:fade>
	{#each interaction.current as message}
		{#if message}
			<Information bind:newMessage={message} on:buttonClicked={(e) => handleResult(e)} />
		{/if}
	{/each}
</div>

<style>
	.information-area {
		position: absolute;
		background: rgba(255, 255, 255, 0.1);
		margin-top: 90px;
		bottom: 13px;
		left: 13px;
		right: 23px;
		flex-direction: column;
	}
	.information-area:nth-child(1) {
		margin: 90px;
	}
</style>
