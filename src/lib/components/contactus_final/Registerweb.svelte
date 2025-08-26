<script>
	import { toast, Toaster } from 'svelte-sonner';
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Icon from '@iconify/svelte';
	import { countries, phoneNumberPatterns } from '$lib/data/constants.js';
	export let data;

	let showSuccesDiv = false;
	let selectedCountry = null;
	let highlightedIndex = -1;
	let dropdownEl;
	let type = 'company';
	let subject = '';
	let form = {};
	let loading = false;
	let submitting = false;
	let showFailureDiv = false;
	let ProfileEmailVerified;
	let isDataAvailable = false;
	let isLoading = false;
	let authedUserEmailVerified = data?.profile?.isEmailVerified;
	let form3;
	let verificationMessage = '';
	let emailSent = false;
	let displayMessage = '';
	let enteredOtp = '';
	let enteredOtpemail = '';
	let isOtpVerified = false;
	let institute = '';
	function setType(selectedType) {
		errors = {};
		type = selectedType;
	}
	let errors = {};
	let name;
	let lastname;
	let email;
	let phone = '';
	let country = '';
	let company = '';
	let message;
	let captchaInput = '';
	let captcha = '';
	let showDropdown = false;
	let isValid = false;
	let department = '';
	let loadingotp = false;
	const handleResendOtpemail = () => {
		if (!loadingotp) {
			form3.requestSubmit();
			// startTimer();
		}
	};

	let filteredCountries = countries;

	let searchTerm = '';
	const generateCaptcha = () => {
		captcha = Math.random().toString(36).substring(2, 8).toUpperCase();
	};

	onMount(() => {
		generateCaptcha();
		filteredCountries = [...countries];
		if (data && data?.profile) {
			name = `${data?.profile?.firstName || ''} `.trim();
			lastname = `${data?.profile?.lastName || ''}`.trim();
			email = data?.profile?.email || '';
			phone = data?.profile?.cellPhone || '';
			company = data?.profile?.companyName || '';

			const profileCountry = data.profile.country?.trim();
			if (profileCountry) {
				const foundCountry = countries.find(
					(c) => c.name.toLowerCase() === profileCountry.toLowerCase()
				);
				if (foundCountry) {
					country = foundCountry.name;
				}
			}

			isDataAvailable = true;
		} else {
			name = '';
			lastname = '';
			email = data?.email || '';
			phone = '';
			company = '';
			country = '';
			isDataAvailable = false;

			if (data?.email) {
				email = data.email;
				const reloadFlag = sessionStorage.getItem('emailReloaded');
				if (!reloadFlag) {
					sessionStorage.setItem('emailReloaded', 'true');
					location.reload();
				} else {
					sessionStorage.removeItem('emailReloaded');
				}
			}
		}

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	});
	const validateCaptcha = () => {
		if (captchaInput === captcha) {
			errors = { ...errors };
			delete errors.captcha;
			return true;
		} else {
			errors = {
				...errors,
				captcha: 'Captcha does not match'
			};
			return false;
		}
	};
	errors = { ...errors };
	function getCountryByCode(input) {
		const country = countries.find((c) => c.code === input || c.name === input);

		return country ? country.name : null;
	}

	function getPhonePattern(countryCode) {
		const countryName = getCountryByCode(countryCode);
		if (!countryName) return '^[0-9]+$';
		const regex = phoneNumberPatterns[countryName];
		return regex || '^[0-9]+$';
	}
	const validateField = (fieldName) => {
		if (!fieldName || fieldName === 'name') {
			if (!name) {
				errors.name = '*Required';
			} else if (name.length < 3) {
				errors.name = 'Name must be at least 3 characters';
			} else if (!/^[A-Za-z\s]+$/.test(name)) {
				errors.name = 'Please enter a valid name';
			} else {
				delete errors.name;
			}
			errors = { ...errors };
		}

		if (!fieldName || fieldName === 'subject') {
			if (!subject) {
				errors.subject = '*Required';
			} else if (subject.length < 3) {
				errors.subject = 'Subject name must be at least 3 characters';
			} else if (!/^[A-Za-z0-9@.,\s&-]+$/.test(subject)) {
				errors.subject = 'Please enter a valid subject';
			} else if (/^\d+$/.test(subject)) {
				errors.subject = 'Subject name cannot contain only numbers';
			} else {
				delete errors.subject;
			}
		}
		if (!fieldName || fieldName === 'email') {
			if (!email) {
				errors.email = '*Required';
			} else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email)) {
				errors.email = 'Please enter a valid email address.';
			} else if (email.split('@')[1].includes('gamil')) {
				errors.email = 'Email domain cannot be gmail.com.';
			} else {
				delete errors.email;
			}
		}

		if (!fieldName || fieldName === 'message') {
			if (!message) {
				errors.message = 'Message is required';
			} else if (message.length < 10) {
				errors.message = 'Please enter a message with at least 10 characters.';
			} else if (!/^[A-Za-z0-9\s&\-.,!@():;"']+$/.test(message)) {
				errors.message = 'Please enter a valid message';
			} else if (/<script.*?>.*?<\/script>/i.test(message)) {
				errors.message = 'Scripts are not allowed';
			} else if (/<[^>]*>/i.test(message)) {
				errors.message = 'HTML tags are not allowed';
			} else {
				delete errors.message;
			}
		}

		if (!fieldName || fieldName === 'country') {
			if (!country || country === '') {
				errors.country = 'Please select a country';
			} else {
				delete errors.country;
			}
		}
		if (!fieldName || fieldName === 'phone') {
			if (!country && !phone) {
				errors.phone = '*Required';
				return;
			}

			if (!country) {
				errors.phone = 'Please select the country before entering the phone number';
				return;
			}

			const countryDetails = getCountryByCode(country);

			if (!countryDetails) {
				errors.phone = 'Invalid country selected. Please reselect country.';
				errors.country = 'Invalid country selected';
			} else {
				const phonePattern = getPhonePattern(country);
				if (!phonePattern) {
					errors.phone = 'Phone number pattern for country not found';
				} else {
					const phoneRegex = new RegExp(phonePattern);
					if (!phoneRegex.test(phone)) {
						const countryName = countryDetails.name || country || 'selected country';
						errors.phone = `Please enter a valid phone number for ${countryName}.`;
					} else {
						delete errors.phone;
					}
				}
			}
		}
		if (Object.keys(errors).length > 0) {
			isValid = false;
		}
	};
	function handleClickOutside(event) {
		if (!event.target.closest('.dropdown-container')) {
			showDropdown = false;
		}
	}
	function validatePhoneNumber(countryCode, phone) {
		if (!phone || !countryCode || phone.trim() === '') {
			return false;
		}

		const country = getCountryByCode(countryCode);

		console.log('Validating phone number for country:', country);

		if (!country) {
			errors.phone = 'Invalid country selected';
			errors.country = 'Invalid country selected';
			return false;
		}

		const phonePattern = getPhonePattern(countryCode);
		if (!phonePattern) {
			errors.phone = 'Phone number pattern for country not found';
			return false;
		}

		const phoneRegex = new RegExp(phonePattern);

		if (!phoneRegex.test(phone)) {
			errors.phone = `Please enter a valid phone number for ${country}.`;
			return false;
		} else {
			errors.phone = '';
			return true;
		}
	}

	$: if (country) {
		validateField('phone');
	}
	function formValid() {
		console.log('Errors before validation:', errors);

		validateField('name');
		validateField('subject');
		validateField('email');
		validateField('phone');
		validateField('country');
		validateField('message');
		validateCaptcha();
		const isEmailVerified = ProfileEmailVerified;
		const isValid =
			Object.keys(errors).length === 0 && (isEmailVerified || authedUserEmailVerified === true);
		return isValid;
	}
	const handlesubmit = async (data) => {
		if (!formValid()) {
			if (Object.keys(errors).length > 0) {
				toast.error('Please fill all the required fields.');
				cancel();
				return;
			}
			if (!(ProfileEmailVerified || authedUserEmailVerified === true)) {
				toast.error('Please verify your email to proceed');
				cancel();
				return;
			}

			cancel();
			return;
		}

		try {
			const result = await submitForm(data);
			console.log(result, 'result');
			submitting = true;
			return async ({ result }) => {
				if (result.type === 'success') {
					form = result.data;
					showSuccesDiv = true;
					submitting = false;
					window.scrollTo({ top: 0, behavior: 'smooth' });
				}
			};
		} catch (error) {
			console.error('Error submitting form:', error);
			showFailureDiv = true;
			submitting = false;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const submitForm = async (data) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({ type: 'success', data: { success: true } });
			});
		});
	};
	function selectCountry(selectedCountry) {
		country = selectedCountry.name;
		// filteredCountries = countries;
		searchTerm = `${selectedCountry.name} `;
		showDropdown = false;
		highlightedIndex = -1;
		validateField('country');
		validatePhoneNumber(country, phone);

		delete errors.country;
		// console.log('Selected Country:', country);
	}

	function filterCountries() {
		filteredCountries = countries.filter(
			(country) =>
				country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				country.code.replace('+', '').includes(searchTerm.replace('+', '').toLowerCase())
		);
		if (
			filteredCountries.length === 1 &&
			(filteredCountries[0].name.toLowerCase() === searchTerm.toLowerCase() ||
				filteredCountries[0].code.replace('+', '').toLowerCase() ===
					searchTerm.replace('+', '').toLowerCase())
		) {
			selectCountry(filteredCountries[0]);
		} else {
			showDropdown = filteredCountries.length > 0;
		}
	}
	function handleKeyDown(event) {
		const exactCountryMatch = countries.some((c) => c.name === country && c.name === searchTerm);
		if (
			exactCountryMatch &&
			!(
				event.key === 'Backspace' ||
				event.key === 'Delete' ||
				event.key === 'ArrowLeft' ||
				event.key === 'ArrowRight' ||
				event.key === 'Home' ||
				event.key === 'End' ||
				event.key === 'Tab' ||
				event.key === 'Escape' ||
				event.ctrlKey ||
				event.key === 'ArrowUp' ||
				event.key === 'ArrowDown'
			)
		) {
			const input = document.querySelector('input[name="country"]');
			if (input && (input.selectionStart !== input.selectionEnd || input.selectionStart === 0)) {
				return true;
			}
			event.preventDefault();
			return false;
		}

		if (showDropdown) {
			switch (event.key) {
				case 'ArrowDown':
					event.preventDefault();
					if (filteredCountries.length > 0) {
						highlightedIndex = (highlightedIndex + 1) % filteredCountries.length;
						scrollToHighlighted();
					}
					break;
				case 'ArrowUp':
					event.preventDefault();
					if (filteredCountries.length > 0) {
						highlightedIndex =
							highlightedIndex <= 0 ? filteredCountries.length - 1 : highlightedIndex - 1;
						scrollToHighlighted();
					}
					break;
			}
		} else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			showDropdown = true;
			if (filteredCountries.length > 0) {
				highlightedIndex = 0;
			}
			event.preventDefault();
		}
		if (event.key === 'Enter') {
			if (highlightedIndex >= 0 && highlightedIndex < filteredCountries.length) {
				selectCountry(filteredCountries[highlightedIndex]);
				event.preventDefault();
			} else if (searchTerm) {
				selectCountry(filteredCountries[0]);
				event.preventDefault();
			}
		} else if (event.key === 'Escape') {
			showDropdown = false;
			highlightedIndex = -1;
		}
	}
	function scrollToHighlighted() {
		if (!dropdownEl) return;
		const items = dropdownEl.querySelectorAll('li');
		if (items[highlightedIndex]) {
			items[highlightedIndex].scrollIntoView({
				block: 'nearest'
			});
		}
	}
	function toggleDropdown() {
		showDropdown = !showDropdown;
		if (showDropdown) {
			if (country.length > 0) {
				searchTerm = country;
				filterCountriesWithoutAutoSelect();
			} else {
				filteredCountries = countries;
			}
		}
	}
	function handleInputChange(event) {
		searchTerm = event.target.value;
		country = event.target.value;
		const isDeleting =
			event.inputType === 'deleteContentBackward' || event.inputType === 'deleteContentForward';
		filterCountriesWithoutAutoSelect();
		showDropdown = filteredCountries.length > 0;

		if (searchTerm.length > 0 && !isDeleting) {
			const codeSearch = searchTerm.replace('+', '').trim();
			if (codeSearch.length > 0) {
				const exactCodeMatches = filteredCountries.filter(
					(country) => country.code.replace('+', '') === codeSearch
				);

				if (exactCodeMatches.length === 1) {
					selectCountry(exactCodeMatches[0]);
					return;
				}
			}

			const countriesStartingWith = filteredCountries.filter((country) =>
				country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
			);

			if (countriesStartingWith.length === 1) {
				selectCountry(countriesStartingWith[0]);
			}
		}
	}

	function filterCountriesWithoutAutoSelect() {
		const countriesStartingWith = countries.filter((country) =>
			country.name.toLowerCase().startsWith(searchTerm.toLowerCase())
		);

		const countriesContaining = countries.filter(
			(country) =>
				!country.name.toLowerCase().startsWith(searchTerm.toLowerCase()) &&
				country.name.toLowerCase().includes(searchTerm.toLowerCase())
		);

		filteredCountries = [...countriesStartingWith, ...countriesContaining];
		const codeMatches = countries.filter((country) =>
			country.code.replace('+', '').includes(searchTerm.replace('+', '').toLowerCase())
		);
		codeMatches.forEach((country) => {
			if (!filteredCountries.some((c) => c.name === country.name)) {
				filteredCountries.push(country);
			}
		});
	}
</script>

<div class="bg-cover relative flex items-center justify-center">
	<div class="relative w-full mx-auto px-4 py-8">
		<div class="flex justify-center items-center min-h-screen">
			{#if showSuccesDiv}
				<div class="text-center">
					<div
						class="backdrop-blur-sm bg-black/90 rounded-2xl shadow-2xl p-6 sm:p-8 mx-auto max-w-sm"
					>
						<div class="text-4xl sm:text-5xl text-green-500 mb-4 animate-bounce">✓</div>
						<h3 class="text-xl sm:text-2xl font-bold text-gray-800 mb-4">Thank You!</h3>
						<p class="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
							Your message has been sent successfully. Our team will get back to you shortly.
						</p>
						<!-- svelte-ignore a11y-missing-attribute -->
						<a
							onclick="location.reload(); return false;"
							class="inline-block bg-gradient-to-r from-primary-600 to-primary-600 hover:from-primary-700 hover:to-primary-700 text-black font-semibold py-2 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg text-sm"
						>
							Send Another Message
						</a>
					</div>
				</div>
			{:else}
				<div class=" w-full max-w-5xl p-4 sm:p-6 md:p-8">
					<div class="text-center mb-6 sm:mb-8">
						<h2
							class="text-2xl sm:text-3xl font-bold text-black mb-2 tracking-tight text-primary-500"
						>
							Secure Your Spot Today
						</h2>
					</div>

					<form method="POST" action="?/contactus" use:enhance={handlesubmit}>
						<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
							<!-- Name Field -->
							<div class="space-y-1">
								<label for="name" class="text-black-500 font-medium mb-1 text-sm">
									Your Name <span class="text-red-400">*</span>
								</label>
								<div class="relative group">
									<input
										type="text"
										id="name"
										name="name"
										bind:value={name}
										placeholder="john"
										maxlength="50"
										class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
										on:input={(e) => {
											e.target.value = e.target.value.replace(/^\s+/, '');
											name = e.target.value;
											if (!name) {
												errors.name = '*Required';
											} else if (name.length < 3) {
												errors.name = 'Name must be at least 3 characters';
											} else if (!/^[A-Za-z\s]+$/.test(name)) {
												errors.name = 'Please enter a valid username';
											} else {
												delete errors.name;
											}
											validateField('name');
											errors = { ...errors };
										}}
									/>
								</div>
								{#if errors?.name}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors?.name}
									</p>
								{/if}
							</div>

							<!-- Email Field with Verification -->
							<div class="space-y-1">
								<!-- <form
                  action="?/verifyemail"
                  bind:this={form3}
                  method="POST"
                  use:enhance={({}) => {
                    return async ({ result }) => {
                      isLoading = false;
                      console.log("result", result);
                      if (result.data?.status === 200) {
                        ProfileEmailVerified = result.data.isEmailVerified;
                        if (authedUserEmailVerified === true) {
                          ProfileEmailVerified = true;
                        }
                        verificationMessage = result.data.message;
                        if (verificationMessage.includes("Verification email sent successfully. Please check your inbox.")) {
                          displayMessage = "Please check your inbox.";
                          emailSent = true;
                          enteredOtp = "";
                          isOtpVerified = false;
                        } else {
                          displayMessage = verificationMessage;
                          emailSent = false;
                          isOtpVerified = false;
                        }
                        toast.success(verificationMessage);
                      } else {
                        toast.error(result.data.message);
                        ProfileEmailVerified = result.data.isEmailVerified;
                        emailSent = false;
                      }
                    };
                  }}
                  class="w-full"
                  on:submit={() => {
                    isLoading = true;
                  }}
                > -->
								<label for="email" class="text-black font-medium mb-1 text-sm">
									Email Address <span class="text-red-400">*</span>
								</label>
								<div class="relative group">
									<input
										type="email"
										id="email"
										name="email"
										bind:value={email}
										placeholder="johndeo@gmail.com"
										class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
										on:input={(e) => {
											e.target.value = e.target.value.replace(/^\s+/, '');
											email = e.target.value;
											email = email.trim();
											validateField('email');
											errors.email = !email
												? '*Required'
												: !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(email) ||
													  email.split('@')[1].includes('gamil')
													? 'Please enter a valid email address'
													: '';
										}}
									/>
								</div>
								{#if errors?.email}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors.email}
									</p>
								{/if}
								<!-- </form> -->

								<input type="hidden" name="email" id="email" bind:value={email} />
							</div>

							<!-- Phone Number Field -->
							<div class="space-y-1">
								<label for="phone" class="text-black font-medium mb-1 text-sm">
									Phone Number <span class="text-red-400">*</span>
								</label>
								<div class="relative flex">
									<div class="relative w-24 sm:w-28">
										<input
											type="text"
											name="country"
											bind:value={country}
											placeholder="+91"
											on:input={handleInputChange}
											on:click={toggleDropdown}
											on:keydown={handleKeyDown}
											class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-l-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
										/>
										{#if showDropdown}
											<div
												bind:this={dropdownEl}
												class="absolute w-64 sm:w-80 mt-1 backdrop-blur-lg bg-black/90 border border-black/30 rounded-lg z-50 shadow-2xl"
											>
												<ul class="max-h-48 overflow-y-auto text-xs sm:text-sm">
													{#each filteredCountries as country, index}
														<!-- svelte-ignore a11y-click-events-have-key-events -->
														<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
														<li
															on:click={() => selectCountry(country)}
															class="px-3 py-2 cursor-pointer text-gray-800 {highlightedIndex ===
															index
																? 'bg-primary-100'
																: 'hover:bg-primary-50'} transition-colors"
														>
															{country.name}({country.code})
														</li>
													{/each}
													{#if filteredCountries.length === 0}
														<div class="flex items-center px-3 py-2">
															<span class="text-red-500 text-sm mr-2">ℹ️</span>
															<span class="text-gray-800 text-xs">No matching countries found!</span
															>
														</div>
													{/if}
												</ul>
											</div>
										{/if}
									</div>
									<div class="flex-1">
										<input
											type="tel"
											id="phone"
											name="phone"
											bind:value={phone}
											class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-r-lg border-l-0 focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
											placeholder="987543210"
											on:input={() => {
												phone = phone.replace(/[^0-9]/g, '').trim();
												validateField('phone');
												validatePhoneNumber(country, phone);
											}}
										/>
									</div>
								</div>
								{#if errors?.phone}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors.phone}
									</p>
								{/if}
							</div>
							<div class="space-y-1">
								<label for="subject" class="block text-black font-medium text-sm">
									Institution Name
								</label>
								<div class="relative group">
									<input
										type="text"
										id="subject"
										name="subject"
										bind:value={institute}
										placeholder="Institution Name "
										class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
										on:input={(e) => {
											e.target.value = e.target.value.replace(/^\s+/, '');
											subject = e.target.value;
											if (!subject) {
												errors.subject = '*Required';
											} else if (subject.length < 3) {
												errors.subject = 'Subject name must be at least 3 characters';
											} else if (!/^[A-Za-z0-9@.,\s&-]+$/.test(subject)) {
												errors.subject = 'Please enter a valid subject';
											} else if (/^\d+$/.test(subject)) {
												errors.subject = 'Subject name cannot contain only numbers';
											} else {
												delete errors.subject;
											}
											errors = { ...errors };
											validateField('subject');
										}}
									/>
								</div>
								{#if errors?.subject}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors.subject}
									</p>
								{/if}
							</div>
							<div class="space-y-1">
								<label for="subject" class="block text-black font-medium text-sm">
									Department <span class="text-red-400">*</span>
								</label>
								<div class="relative group">
									<input
										type="text"
										id="department"
										name="department"
										bind:value={department}
										placeholder="Department"
										class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
										on:input={(e) => {
											e.target.value = e.target.value.replace(/^\s+/, '');
											department = e.target.value;
											if (!department) {
												errors.department = '*Required';
											} else if (department.length < 3) {
												errors.department = 'Department name must be at least 3 characters';
											} else if (!/^[A-Za-z0-9@.,\s&-]+$/.test(department)) {
												errors.department = 'Please enter a valid subject';
											} else if (/^\d+$/.test(department)) {
												errors.department = 'Department name cannot contain only numbers';
											} else {
												delete errors.department;
											}
											errors = { ...errors };
											validateField('department');
										}}
									/>
								</div>
								{#if errors?.department}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors.department}
									</p>
								{/if}
							</div>

							<!-- Subject Field -->
							<div class="space-y-1">
								<label for="subject" class="block text-black font-medium text-sm">
									Designation <span class="text-red-400">*</span>
								</label>
								<div class="relative group">
									<input
										type="text"
										id="subject"
										name="subject"
										bind:value={subject}
										placeholder="Subject"
										class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 text-sm"
										on:input={(e) => {
											e.target.value = e.target.value.replace(/^\s+/, '');
											subject = e.target.value;
											if (!subject) {
												errors.subject = '*Required';
											} else if (subject.length < 3) {
												errors.subject = 'Subject name must be at least 3 characters';
											} else if (!/^[A-Za-z0-9@.,\s&-]+$/.test(subject)) {
												errors.subject = 'Please enter a valid subject';
											} else if (/^\d+$/.test(subject)) {
												errors.subject = 'Subject name cannot contain only numbers';
											} else {
												delete errors.subject;
											}
											errors = { ...errors };
											validateField('subject');
										}}
									/>
								</div>
								{#if errors?.subject}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors.subject}
									</p>
								{/if}
							</div>

							<!-- Message Field -->
							<div class="md:col-span-2 space-y-1">
								<label for="message" class="block text-black font-medium text-sm">
									Your Message <span class="text-red-400">*</span>
								</label>
								<div class="relative group">
									<textarea
										id="message"
										name="message"
										placeholder="Write your message here..."
										bind:value={message}
										rows="4"
										class="w-full px-3 py-2 backdrop-blur-sm bg-black/20 border border-black/30 rounded-lg focus:outline-none focus:ring-0 focus:ring-primary-400 focus:border-transparent placeholder-black/60 text-black transition-all duration-300 hover:bg-black/25 resize-none text-sm"
										maxlength="200"
										on:input={(e) => {
											e.target.value = e.target.value.replace(/^\s+/, '');
											message = e.target.value;
											validateField('message');
											errors = { ...errors };
											errors.message = !message
												? '*Required'
												: message.length < 10
													? "Please enter a message that's at least 10 characters long."
													: /<script.*?>.*?<\/script>/i.test(message)
														? 'Script tags are not allowed.'
														: /<[^>]*>/i.test(message)
															? 'HTML tags are not allowed.'
															: !/^[A-Za-z0-9\s.,!?@()\-:;"'&$#*/]+$/.test(message)
																? 'Please enter a valid message.'
																: '';
										}}
									></textarea>
								</div>
								{#if errors?.message}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors.message}
									</p>
								{/if}
							</div>
						</div>

						<!-- CAPTCHA Section -->
						<div class="mt-6 flex justify-center">
							<div class="backdrop-blur-sm rounded-lg p-3 border border-black/30 w-full max-w-md">
								<div
									class="flex items-center justify-between bg-black/30 p-3 rounded-lg mb-3 backdrop-blur-sm"
								>
									<div class="flex gap-1 font-bold text-lg tracking-widest text-black">
										{#each captcha.split('') as char}
											<span class="bg-black/20 px-2 py-1 rounded text-sm">{char}</span>
										{/each}
									</div>
									<button
										type="button"
										on:click={generateCaptcha}
										class="bg-primary-500 hover:bg-primary-600 text-black rounded-lg p-2 transition-colors duration-300 shadow-lg"
									>
										<Icon icon="bx:refresh" class="w-5 h-5" />
									</button>
								</div>
								<input
									type="text"
									bind:value={captchaInput}
									placeholder="Enter captcha"
									class="w-full backdrop-blur-sm bg-black/20 border border-black/30 p-3 rounded-lg text-center placeholder-black/60 text-black focus:outline-none focus:ring-0 focus:ring-primary-400 transition-all duration-300 text-sm"
									on:input={validateCaptcha}
								/>
								{#if errors?.captcha}
									<p
										class="text-red-400 text-xs mt-1 bg-red-900/30 px-2 py-1 rounded backdrop-blur-sm"
									>
										{errors?.captcha}
									</p>
								{/if}
							</div>
						</div>

						<!-- Submit Button -->
						<div class="flex justify-center mt-8">
							<button
								type="submit"
								class="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-500 hover:from-primary-700 hover:to-primary-700 text-black font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl flex justify-center items-center text-sm"
								disabled={submitting}
							>
								{#if submitting}
									<span class="inline-block animate-spin mr-2">⟳</span>
									Sending...
								{:else}
									Send Message
								{/if}
							</button>
						</div>
					</form>
				</div>
			{/if}
		</div>
	</div>
</div>

<Toaster position="bottom-right" richColors />
