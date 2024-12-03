<script lang="ts">
	import { difficult } from '$lib/helpers/store';

	const handleDifficult = (difficulty: number) => {
		console.log(difficulty, video);
		// Set the difficulty for this video for this timestamp for the client.
		difficult.set(difficulty);
	};

	let { video }: { video: exerciseType } = $props();
</script>

<!--
<Card style="border-radius: 16px;">
	<h2 class="mdc-typography--headline6" style="margin: 1em;">Complexity</h2>
	<Content>
		<p>How hard was it to perform this task today?</p>
	</Content>
	<Actions fullBleed>
		<Button style="background: #69B34C" on:click={() => handleDifficult(1)}>Easy</Button>
		<Button style="background: #ACB334" on:click={() => handleDifficult(2)}>2</Button>
		<Button style="background: #FAB733" on:click={() => handleDifficult(3)}>3</Button>
		<Button style="background: #FF8E15" on:click={() => handleDifficult(4)}>4</Button>
		<Button style="background: #FF4E11" on:click={() => handleDifficult(5)}>5</Button>
		<Button style="background: #FF0D0D" on:click={() => handleDifficult(6)}>Hard</Button>
	</Actions>
</Card>
<spacer></spacer>
-->

<style>
	spacer {
		display: flex;
		padding: 1em;
	}
</style>
