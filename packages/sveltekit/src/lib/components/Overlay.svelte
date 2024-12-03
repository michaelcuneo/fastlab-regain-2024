<script lang="ts">
  let leaf: leafType[]= [];

  for (let i = 0; i < 50; i++) {
    leaf.push({
      height: Math.floor(Math.random() * (500 - 200) + 200),
      width: Math.floor(Math.random() * (500 - 200) + 200),
      top: Math.floor(Math.random() * (1180 - -100) + -100),
      left: Math.floor(Math.random() * (2020 - -100) + -100),
      scale: Math.random() * (1 - 0.6) + 0.6,
      opacity: Math.random() * (0.88 - 0.6) + 0.6,
      rotate: Math.floor(Math.random() * (180 - -180) + -180),
    });
  }
</script>

<overlay>
  {#each leaf as leave}
    <vector>
      <svg
        style="
          --height: {leave.height}px;
          --width: {leave.width}px;
          --top: {leave.top}px;
          --left: {leave.left}px;
          --scale: {leave.scale};
          --opacity: {leave.opacity};
          --rotate: {leave.rotate}deg;
        "
        width={leave.width}
        height={leave.height}
        viewBox="0 0 537 333"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M283.174 286.931C359.482 372.675 535.025 282.16 530.692 158.092C526.36 34.024 424.505 4.0085 282.631 8.96282C140.758 13.9171 52.236 136.085 5.35312 171.295C129.109 336.408 206.866 201.188 283.174 286.931Z"
          fill="#132B13"
        />
      </svg>
    </vector>
  {/each}
</overlay>

<style>
  overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
  }
  svg {
    position: absolute;
    width: var(width);
    height: var(height);
    top: var(--top);
    left: var(--left);
    opacity: var(--opacity);
    mix-blend-mode: screen;
    transform: rotate(var(--rotate)) scale(var(--scale));
    -webkit-animation: spin 300s linear infinite;
    -moz-animation: spin 300s linear infinite;
    animation: spin 300s linear infinite;
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
