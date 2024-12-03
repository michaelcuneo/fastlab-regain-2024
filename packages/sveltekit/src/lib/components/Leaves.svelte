<script lang="ts">
  let leaf: Array<leafType>;

  const addLeaves = () => {
    let rect = growthFrame.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {
      leaf.push({
        height: Math.floor(Math.random() * (60 - 10) + 60),
        width: 0,
        top: Math.floor(
          Math.random() * (growthFrame.offsetWidth - -rect.x) + -rect.x
        ),
        left: Math.floor(
          Math.random() * (growthFrame.offsetWidth - -rect.x) + -rect.x
        ),
        scale: Math.random() * (1 - 0.6) + 0.6,
        opacity: 1,
        rotate: Math.floor(Math.random() * (180 - -180) + -180),
      });
    }

    return leaf;
  };

  export let growthFrame: any;
</script>

{#await addLeaves()}
  loading
{:then leaf}
  {#each leaf as leave, i}
    <svg
      class="leaf-frame"
      id="leaf_{i}"
      style="
        --height: {leave.height}px;
        --top: {leave.top}px;
        --left: {leave.left}px;
        --scale: {leave.scale};
        --opacity: {leave.opacity};
        --rotate: {leave.rotate}deg;
      "
      height={leave.height}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <style>
          .leaf {
            fill: #96d5b6;
          }
        </style>
      </defs>
      <path
        class="leaf"
        d="M34.31,14.12c4.09,12.32,7.3,34.16-6.13,31.55S26.82,23.8,34.31,14.12Z"
      />
    </svg>
  {/each}
{/await}

<style>
  .leaf-frame {
    position: absolute;
    height: var(--height);
    top: var(--top);
    left: var(--left);
    opacity: var(--opacity);
    transform: rotate(var(--rotate)) scale(var(--scale));
    -webkit-animation: spin 30s linear infinite;
    -moz-animation: spin 30s linear infinite;
    animation: spin 30s linear infinite;
    z-index: 0;
  }
  @-moz-keyframes spin {
    100% {
      -moz-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }
  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
</style>
