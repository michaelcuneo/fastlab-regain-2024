<script>
	import UON from '$lib/images/UoN_Black.svg';
	import Fastlab from '$lib/images/Fastlab_LLR.svg';
	import { Button } from '@michaelcuneo/svelte-components';
	import { goto } from '$app/navigation';
</script>

<div class="welcome">
	<div class="card">
		<h2>Welcome to Regain</h2>
		<p>
			Regain was designed and developed by FASTlab, at the University of Newcastle, for Medical
			Research.
		</p>
		<p>Stroke is the second highest cause of death and disability worldwide.</p>
		<p>
			While rehabilitation programs are intended to support stroke survivors, and promote recovery
			after they leave the hospital, current rehabilitation programs typically provide only static
			written instructions and lack the ability to keep them engaged with the program.
		</p>
		<p>
			We present an mHealth artifact that builds on behavior change theory to increase stroke
			survivors` engagement in rehabilitation programs.
		</p>
		<p>
			We employed a co-design methodology to identify design requirements for the stroke
			rehabilitation mHealth artifact, addressing stroke survivors` needs and incorporating
			expertise of healthcare providers.
		</p>
		<p>
			Guided by these requirements, we developed design principles for the artifact pertaining to
			visual assets that are essential in immersing users in the design. We carried out a two-stage
			development process by having workshops and interviews with experts.
		</p>
		<p>
			Following this, a prototype was developed and evaluated in a series of workshops with multiple
			stakeholders
		</p>
		<p>This is the third iteration.</p>
		<div class="wrap">
			<a href="https://www.newcastle.edu.au/"
				><img src={UON} alt={UON} height="140px" width="auto" /></a
			>
			<a href="https://fastlab.soci.org.au/"
				><img src={Fastlab} alt={Fastlab} height="140px" width="auto" /></a
			>
			v1.0.0
		</div>
	</div>
</div>

<style>
	.welcome {
		display: flex;
		flex-direction: column;
		height: calc(100vh - 88px);
		align-items: center;
		justify-content: space-around;
		background: rgba(255, 255, 255, 0.1);
	}
	img {
		height: 140px;
		padding: 1em;
	}
	.wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.card {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		background: white;
		margin: 2em;
		padding: 2em;
		box-shadow:
			inset 0px -2px 2px rgba(0, 0, 0, 0.25),
			inset 0px 2px 2px rgba(0, 0, 0, 0.25);
		border-radius: 16px;
	}
	a {
		height: 140px;
	}
	p {
		margin: 1em;
	}
	h2 {
		margin-left: 1em;
	}
</style>
