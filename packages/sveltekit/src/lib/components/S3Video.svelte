<script lang="ts">
	import { onMount } from 'svelte';
	import { isPaused, isHalfway, isCompleted } from '$lib/utils/store';

	import { downloadFile } from '$lib/utils/setup';

	let videoComponent: HTMLVideoElement;
	let time: number = $state(0);
	let duration: number = $state(0);
	let paused: boolean = $state(false);
	let videoSrc: string = $state('');
	let showControls: boolean = true;
	let showControlsTimeout: any;
	let lastMouseDown: any;

	const handleMove = (e: any) => {
		clearTimeout(showControlsTimeout);
		showControlsTimeout = setTimeout(() => (showControls = false), 2500);
		showControls;

		if (!duration) return;
		if (e.type !== 'touchmove' && !(e.buttons & 1)) return;

		const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		const { left, right } = videoComponent.getBoundingClientRect();
		time = (duration * (clientX - left)) / (right - left);
	};

	// we can't rely on the built-in click event, because it fires
	// after a drag — we have to listen for clicks ourselves
	const handleMousedown = () => {
		lastMouseDown = new Date();
	};

	const handleMouseup = (e: any) => {
		isPaused.value = false;
		let date = new Date();
		if ((date as any) - lastMouseDown < 300) {
			if (paused) e.target.play();
			else e.target.pause();
		}
	};

	onMount(async () => {
		const src: string = (await downloadFile(key)) || '';
		videoSrc = src;
	});

	$effect(() => {
		if (time > duration / 2) {
			isHalfway.value = true;
		}
		if (Math.round(time) == Math.round(duration)) {
			isCompleted.value = true;
		}
		paused ? (isPaused.value = true) : (isPaused.value = false);
	});

	let {
		key,
		width,
		height,
		autoplay
	}: { key: string; width: string; height: string; autoplay: boolean } = $props();
</script>

<container>
	<playback-animation>
		<svg class="playback-icons">
			<use class="hidden" href="#play-icon" />
			<use href="#pause" />
		</svg>
	</playback-animation>

	<video
		bind:this={videoComponent}
		onmousemove={handleMove}
		ontouchmove={handleMove}
		onmousedown={handleMousedown}
		onmouseup={handleMouseup}
		bind:currentTime={time}
		bind:duration
		bind:paused
		src={videoSrc}
		{autoplay}
		{width}
		{height}
		controls
		loop
	>
		<track kind="captions" />
	</video>
</container>

<style>
	container {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	playback-animation {
		pointer-events: none;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-left: -40px;
		margin-top: -40px;
		width: 80px;
		height: 80px;
		border-radius: 80px;
		background-color: rgba(0, 0, 0, 0.6);
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0;
	}
</style>
