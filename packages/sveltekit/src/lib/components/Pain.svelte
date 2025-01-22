<script lang="ts">
  import { pain } from "$lib/utils/store";
  import Card, { Content, Actions } from "@smui/card";
  import Button from "@smui/button";

  const handlePain = (pains: number) => {
    pain.set(pains);
  };

  let { video }: { video: Exercise | undefined } = $props();
</script>

<Card style="border-radius: 16px;">
  <h2 class="mdc-typography--headline6" style="margin: 1em;">Pain</h2>
  <Content>
    <p>How painful was it to perform this task today?</p>
  </Content>
  <Actions fullBleed>
    <Button style="background: #69B34C" onclick={() => handlePain(1)}
      >NONE</Button
    >
    <Button style="background: #ACB334" onclick={() => handlePain(2)}>2</Button
    >
    <Button style="background: #FAB733" onclick={() => handlePain(3)}>3</Button
    >
    <Button style="background: #FF8E15" onclick={() => handlePain(4)}>4</Button
    >
    <Button style="background: #FF4E11" onclick={() => handlePain(5)}>5</Button
    >
    <Button style="background: #FF0D0D" onclick={() => handlePain(6)}
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
