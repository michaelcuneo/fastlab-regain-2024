<script>
	import Fastlab from '$lib/images/Fastlab_LLR.svg';
</script>

<div class="wrap">
	<h6>&copy; 2025</h6>
	<a href="https://fastlab.soci.org.au/"
		><img src={Fastlab} alt={Fastlab} height="140px" width="auto" /></a
	>
	<h6>
		<a href="/admin">v2.0.0 | </a>
		<a href="/tos">Terms of Service | </a>
		<a href="/privacy">Privacy Policy | </a>
		<a href="/contact">Contact</a>
	</h6>
</div>

<style>
	.wrap {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: var(--color-text);
	}
	img {
		height: 140px;
		padding: 1em;
	}
	a {
		text-decoration: none;
		height: 140px;
	}
	a:visited {
		color: var(--color-surface);
	}
	h6 {
		padding-top: 12px;
	}
</style>
