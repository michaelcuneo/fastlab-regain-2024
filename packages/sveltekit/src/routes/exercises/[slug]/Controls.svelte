<script lang="ts">
	import Card, { Actions } from '@smui/card';
	import IconButton from '@smui/icon-button';
  
  let { videoElement }: { videoElement: HTMLVideoElement | undefined } = $props();
</script>

<Card style="border-radius: 16px;">
	<Actions>
    <div class="spacer">
      <IconButton style="background: gray" onclick={() => { if (videoElement) videoElement.currentTime = 0 }} class="material-icons">reply_all</IconButton>
    </div>
    <div class="spacer">
      <IconButton style="background: gray" onclick={() => videoElement?.play()} class="material-icons">play_arrow</IconButton>
    </div>
    <div class="spacer">
      <IconButton style="background: #69B34C" onclick={() => videoElement?.pause()} class="material-icons">pause</IconButton>
    </div>
	</Actions>
</Card>

<style>
	.spacer {
		display: flex;
		padding: 1em;
	}
</style>
