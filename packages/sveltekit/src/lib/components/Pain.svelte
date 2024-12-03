<script lang="ts">
  import { pain } from "$lib/utils/store";

  const handlePain = (pains: number) => {
    console.log(pains, video);
    // Set the pain for this video for this timestamp for the client.
    pain.value = pains;
  };

  export let video: exerciseType;
</script>

<Card style="border-radius: 16px;">
  <h2 class="mdc-typography--headline6" style="margin: 1em;">Pain</h2>
  <Content>
    <p>How painful was it to perform this task today?</p>
  </Content>
  <Actions fullBleed>
    <Button style="background: #69B34C" on:click={() => handlePain(1)}
      >NONE</Button
    >
    <Button style="background: #ACB334" on:click={() => handlePain(2)}>2</Button
    >
    <Button style="background: #FAB733" on:click={() => handlePain(3)}>3</Button
    >
    <Button style="background: #FF8E15" on:click={() => handlePain(4)}>4</Button
    >
    <Button style="background: #FF4E11" on:click={() => handlePain(5)}>5</Button
    >
    <Button style="background: #FF0D0D" on:click={() => handlePain(6)}
      >PAINFUL</Button
    >
  </Actions>
</Card>
<spacer></spacer>

<style>
  spacer {
    display: flex;
    padding: 1em;
  }
</style>
