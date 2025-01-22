<script>
	import Card, { Content, Media, MediaContent } from '@smui/card';
	import Tree from '$lib/images/tree.jpeg';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
</script>

<div class="welcome">
	<LayoutGrid>
		<Cell span={6}>
			<Card>
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
				</Content>
			</Card>
		</Cell>
		<Cell span={6}>
			<Card>
				<Media style="background-image: url({Tree}); background-repeat: no-repeat; background-position: left;" aspectRatio="square">
					<MediaContent>
						<h2
							class="mdc-typography--headline6"
							style="color: #fff; position: absolute; bottom: 16px; left: 16px; margin: 0;"
						>
							Regain your abilities
						</h2>
					</MediaContent>
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
	img {
		position: absolute;
		top: 0;
		width: 300px;
		bottom: 0;
		left: 0;
		right: 0;
		margin: 0;
	}
</style>
