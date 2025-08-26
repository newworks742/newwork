<script>
	import Icon from '@iconify/svelte';
	import { PUBLIC_WEBSITE_NAME } from '$env/static/public';
	import Oem from './Oem.svelte';
</script>

<div class="mx-auto w-full lg:w-11/12 max-w-7xl px-4 pb-10 space-y-8 text-description">
	<section class=" rounded-lg">
		<h4 class="text-xl sm:text-2xl font-semibold text-heading mb-6 text-center lg:text-left">
			About Us
		</h4>
		<div class="flex flex-col-reverse lg:flex-row items-center gap-8">
			<div class="w-full lg:w-1/2 space-y-4 text-sm sm:text-base text-justify">
				<p>
					<strong>{PUBLIC_WEBSITE_NAME} Technologies</strong> is a leading provider of Industrial, Academic, and Research Solutions, specializing in Test & Measurement, Industrial Automation, 5G/6G Wireless Technology, and AI-driven IoT solutions. Established in 2018, we empower industries, academia, and research institutions through cutting-edge technologies, expert-driven training, and innovative system integration.
				</p>
				<p>
					As a trusted partner in Distribution, System Integration, Training & Skills Development, and E-Learning Services, we bridge the gap between emerging technologies and real-world applications. Our collaborations with global technology leaders enable us to deliver state-of-the-art solutions that accelerate innovation and digital transformation.
				</p>
				<!-- <p>
					Our platform provides access to over 15+ million electronic components, complete with comprehensive engineering data to support your design and procurement processes.
				</p> -->
				<!-- <p>
					We ship globally and are a trusted partner for sourcing and design engineers across industries.
				</p> -->
			</div>
			<div class="w-full lg:w-1/2 flex justify-center">
				<img src="/aboutpages.png" alt="About Us"
					class="rounded-lg w-full max-w-md aspect-video object-cover"/>
			</div>
		</div>

 <div class=" p-4 w-full">
        <div class=" mt-4 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <!-- Vision Card -->
            <div class="bg-white rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-500">
                <div class="flex items-center gap-4 mb-6">
                    <svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    <h2 class="text-xl md:text-2xl font-bold text-primary-500">Vision</h2>
                    <div class="flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"></div>
                </div>
                <div class="text-gray-700 text-base  leading-relaxed">
                    We are driven by the vision to emerge as an advanced center for skills & product development catering to the needs of the industry and academia by utilizing modern problem-solving methodologies.
                </div>
            </div>

            <!-- Mission Card -->
            <div class="bg-white rounded-2xl p-6 md:p-8 shadow-2xl hover:shadow-3xl transform hover:-translate-y-2 transition-all duration-300 border-t-4 border-primary-500">
                <div class="flex items-center gap-4 mb-6">
                    <svg class="w-6 h-6 text-primary-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9z"/>
                    </svg>
                    <h2 class="text-xl md:text-2xl font-bold text-primary-500">Mission</h2>
                    <div class="flex-1 h-0.5 bg-gradient-to-r from-primary-500 to-transparent"></div>
                </div>
               <div class="text-gray-700 text-base  leading-relaxed">
                    At DigiToad, we are deeply committed to catalyzing the evolution of R&D, empowering dynamic product/solution development, and ultimately propelling the innovation landscape forward in India.
                </div>
            </div>
        </div>
    </div>
<Oem />
	</section>

</div>
