<script>
	import Paper, { Title, Subtitle, Content } from '@smui/paper';
</script>

<div class="wrapper">
	<Paper style="width: 800px; margin: 2rem;">
		<Title>Terms of Service</Title>
		<Subtitle>
			<strong>Effective Date:</strong> 28/01/2025
		</Subtitle>

		<Content>
			<h4>1. Introduction</h4>
			<p>
				Regain is a research project developed by FASTlab aimed at helping individuals who have
				suffered from a stroke to recover more quickly. The app provides rehabilitation exercises
				and guidance to users, as well as collects data to improve stroke recovery methods. The use
				of this app is governed by the terms outlined here. This is a global service, and it applies
				to users worldwide.
			</p>
		</Content>

		<Content>
			<h4>2. Eligibility</h4>
			<section>
				<p>To use Regain, you must:</p>
				<ul>
					<li>
						Be at least 18 years of age or have the consent of a parent or guardian if under 18.
					</li>
					<li>
						Not be barred from using the application under the laws of your country of residence.
					</li>
					<li>
						Agree to the collection and use of your personal and health data as described in the <a
							href="#">Privacy Policy</a
						>.
					</li>
				</ul>
				<p>
					By using this application, you confirm that all information you provide is accurate and
					complete.
				</p>
			</section>
		</Content>

		<Content>
			<section>
				<h4>3. Medical Disclaimer</h4>
				<p>
					Regain is a research tool designed to aid in rehabilitation after a stroke and has been
					guided by medical professionals, but is <strong
						>not a substitute for professional medical care</strong
					>. You should always consult with a qualified healthcare provider before making decisions
					regarding your health or treatment. The app does not diagnose, or treat, any medical
					condition.
				</p>
			</section>
		</Content>

		<Content>
			<section>
				<h4>4. User Responsibilities</h4>
				<p>You agree to:</p>
				<ul>
					<li>Use Regain for personal, non-commercial purposes only.</li>
					<li>
						Follow all instructions provided by the app and comply with any guidance from healthcare
						professionals.
					</li>
					<li>
						Not misuse the app, including but not limited to attempting to reverse-engineer, hack,
						or otherwise alter the functionality of the app.
					</li>
					<li>Report any issues or concerns to FASTlab promptly.</li>
				</ul>
			</section>
		</Content>

		<Content>
			<section>
				<h4>5. Data Collection and Use</h4>
				<p>
					By using Regain, you agree to the collection of certain data, including but not limited
					to:
				</p>
				<ul>
					<li>Health and performance data related to your rehabilitation exercises.</li>
					<li>Demographic and location data (subject to consent).</li>
					<li>Any feedback or survey data you voluntarily provide.</li>
				</ul>
				<p>
					The data collected will be used for research purposes to improve stroke rehabilitation
					methods. All data will be anonymized and handled according to our <a href="#"
						>Privacy Policy</a
					> and in compliance with applicable data protection laws (e.g., GDPR, HIPAA).
				</p>
			</section>
		</Content>

		<Content>
			<section>
				<h4>6. Intellectual Property</h4>
				<p>
					All intellectual property rights in the app, including but not limited to software,
					content, design, and branding, are owned by FASTlab or licensed to us. You are granted a
					limited, non-exclusive, non-transferable, revocable license to use the app for its
					intended purposes.
				</p>
				<p>You may not:</p>
				<ul>
					<li>
						Copy, modify, distribute, or create derivative works based on the app or any of its
						content.
					</li>
					<li>Use any of our trademarks or logos without explicit permission.</li>
				</ul>
			</section>
		</Content>

		<Content>
			<section>
				<h4>7. Termination</h4>
				<p>
					FASTlab reserves the right to suspend or terminate your access to the app at any time if
					you breach these terms, or for any reason, including but not limited to technical issues
					or withdrawal of the research project.
				</p>
				<p>
					Upon termination, you must cease all use of the app. Any data collected prior to
					termination may still be used in accordance with the <a href="#">Privacy Policy</a> and research
					objectives.
				</p>
			</section>
		</Content>

		<Content>
			<section>
				<h4>8. Limitation of Liability</h4>
				<p>To the fullest extent permitted by law:</p>
				<ul>
					<li>
						FASTlab is not liable for any indirect, incidental, or consequential damages arising
						from your use of Regain.
					</li>
					<li>
						The app is provided "as-is," without warranties of any kind, either express or implied.
					</li>
					<li>You assume all risks associated with the use of the app and its content.</li>
				</ul>
			</section>
		</Content>
		<Content>
			<section>
				<h4>9. Changes to the Terms</h4>
				<p>
					FASTlab reserves the right to modify these Terms of Service at any time. We will notify
					you of any material changes through the app or other reasonable means. Your continued use
					of the app following the changes indicates your acceptance of the updated terms.
				</p>
			</section>
		</Content>
		<Content>
			<section>
				<h4>10. Governing Law and Jurisdiction</h4>
				<p>
					These terms are governed by the laws of [Insert Jurisdiction]. You agree that any dispute
					arising from the use of the app will be resolved in the courts of [Insert Jurisdiction],
					without regard to conflict of law principles.
				</p>
			</section>
		</Content>
		<Content>
			<section>
				<h4>11. Contact Information</h4>
				<p>
					If you have any questions or concerns regarding these Terms of Service, please contact us
					at:
				</p>
				<address>
					<strong>FASTlab</strong><br />
					Q Building, University of Newcastle, Australia<br />
					<a href="mailto:paul.eggelstone@newcastle.edu.au">paul.egglestone@newcastle.edu.au</a><br
					/>
				</address>
			</section>
		</Content>
	</Paper>
</div>

<style>
	.wrapper {
		display: flex;
		position: relative;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.1);
		z-index: 0;
	}
	h4 {
		margin-top: 1.5rem;
	}
	ul {
		margin-bottom: 0.5rem;
	}
	address {
		margin-top: 1rem;
	}
</style>
