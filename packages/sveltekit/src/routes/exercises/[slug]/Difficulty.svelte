<script lang="ts">
	import { difficult } from '$lib/utils/store';
	import Card, { Content, Actions } from '@smui/card';
	import Button from '@smui/button';

	const handleDifficult = (difficulty: number) => {
		difficult.current = difficulty;
		
		// TODO: Save the difficulty to the database with the video ID and user ID and timestamp.

	};

	let { video }: { video: Exercise | undefined } = $props();
</script>

<Card style="border-radius: 16px;">
	<h2 class="mdc-typography--headline6" style="margin: 1em;">Complexity</h2>
	<Content>
		<p>How hard was it to perform this task today?</p>
	</Content>
	<Actions fullBleed>
		<Button style="background: #69B34C" onclick={() => handleDifficult(1)}>Easy</Button>
		<Button style="background: #ACB334" onclick={() => handleDifficult(2)}>2</Button>
		<Button style="background: #FAB733" onclick={() => handleDifficult(3)}>3</Button>
		<Button style="background: #FF8E15" onclick={() => handleDifficult(4)}>4</Button>
		<Button style="background: #FF4E11" onclick={() => handleDifficult(5)}>5</Button>
		<Button style="background: #FF0D0D" onclick={() => handleDifficult(6)}>Hard</Button>
	</Actions>
</Card>
<spacer></spacer>

<style>
	spacer {
		display: flex;
		padding: 1em;
	}
</style>
