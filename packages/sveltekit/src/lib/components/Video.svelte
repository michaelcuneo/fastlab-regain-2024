<script lang="ts">
	import { isPaused, isHalfway, isCompleted } from '$lib/utils/store';

	let time: number = $state(0);
	let duration: number = $state(0);
	let paused: boolean = $state(false);
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
		const rect = videoElement?.getBoundingClientRect();
		if (rect) {
			const { left, right } = rect;
			time = (duration * (clientX - left)) / (right - left);
		}
	};

	// we can't rely on the built-in click event, because it fires
	// after a drag — we have to listen for clicks ourselves
	const handleMousedown = () => {
		lastMouseDown = new Date();
	};

	const handleMouseup = (e: any) => {
		isPaused.current = false;
		let date = new Date();
		if ((date as any) - lastMouseDown < 300) {
			if (paused) e.target.play();
			else e.target.pause();
		}
	};

	$effect(() => {
		if (time > duration / 2) {
			isHalfway.current = true;
		}
		if (Math.round(time) == Math.round(duration)) {
			isCompleted.current = true;
		}
		paused ? (isPaused.current = true) : (isPaused.current = false);
	});

	let {
		videoElement = $bindable(),
		src,
		width,
		height,
		autoplay
	}: {
		videoElement: HTMLVideoElement | undefined;
		src: string;
		width: string;
		height: string;
		autoplay: boolean;
	} = $props();
</script>

<div class="container">
	<div class="playback-animation">
		<svg class="playback-icons">
			<use class="hidden" href="#play-icon" />
			<use href="#pause" />
		</svg>
	</div>

	<video
		bind:this={videoElement}
		onmousemove={handleMove}
		ontouchmove={handleMove}
		onmousedown={handleMousedown}
		onmouseup={handleMouseup}
		bind:currentTime={time}
		bind:duration
		bind:paused
		{src}
		{autoplay}
		{width}
		{height}
		controls={false}
		loop
		muted
	>
		<track kind="captions" />
	</video>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		border-radius: 16px;
		justify-content: center;
		align-items: center;
	}
	video {
		border-radius: 16px;
		pointer-events: none;
	}
	.playback-animation {
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
