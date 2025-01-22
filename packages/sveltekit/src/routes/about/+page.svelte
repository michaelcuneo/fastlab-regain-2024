<script>
	import Card, { Content, Media, MediaContent } from '@smui/card';
	import Button from '@smui/button';
	import Tree from '$lib/images/tree.jpeg';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { goto } from '$app/navigation';
</script>

<div class="welcome">
	<LayoutGrid>
		<Cell span={6}>
			<Card style="border-radius: 8px;">
				<Content>
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
				<Button variant="raised" onclick={() => goto("/auth/login")}>Start to Regain</Button>
				</Content>
			</Card>
		</Cell>
		<Cell span={6}>
			<Card style="border-radius: 8px;">
				<Media style="background-image: url({Tree}); background-repeat: no-repeat; background-position: left;" aspectRatio="square">
				</Media>
			</Card>
		</Cell>
	</LayoutGrid>
</div>

<style>
	.welcome {
		display: flex;
		background: rgba(255, 255, 255, 0.1);
		position: relative;
		height: 100%;
	}
</style>
