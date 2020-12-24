<script>
	import Settings from './Components/Settings.svelte';
	import Reminder from './Components/Reminder.svelte';
	import Credits from './Components/Credits.svelte';
	import { webhookURL, userID, pingOnSend } from './stores/settings.js';
	import { sendWebhook } from './helpers/SendWebhook.js';
	import { reminders } from './stores/reminders';
	import { slide } from 'svelte/transition';

	userID.load();
	webhookURL.load();
	pingOnSend.load();
	reminders.useLocalStorage();

	let settingsShown = false;
	let creditsShown = false;
	
	const openSettings = () => settingsShown = true;
	const clear = () => $reminders = [];

	function newReminder() {
		$reminders = [{
			id: $reminders.length,
			title: '',
			content: '',
			sent: false,
			timestamp: Date.now(),
			new: true
		}, ...$reminders];
	};

	let pingPromise;

	function sendPing() {
		pingPromise = sendWebhook($webhookURL, {
			content: `<@${$userID}>`
		});
	}
</script>

{#if settingsShown}
	<Settings bind:settingsShown />
{:else}
	{#if !$webhookURL}
		<div class="missingWebhookUrl">
			<span class="title">Error!</span>
			<span>No webhook url found. Open the <span class="link" on:click={openSettings}>settings</span> window to set one</span>
		</div>
	{:else}
		{#if creditsShown}
			<Credits bind:creditsShown />
		{/if}
		<div class="top-buttons">
			<i class="fas fa-info-circle" on:click={() => creditsShown = true}></i>
			<i class="fas fa-cog" on:click={openSettings}></i>
		</div>

		<main>
			<span>Reminders</span>
			
			<div class="button-row">
				<button on:click={newReminder}>New</button>
				<button on:click={clear}>Clear</button>
				{#if $userID}
					{#await pingPromise}
						<button>Sending...</button>
					{:then}
						<button on:click={sendPing}>Send a ping</button>
					{:catch}
						<button>There was a error in sending your ping</button>
					{/await}
				{/if}
			</div>

			<div class="reminders">
				{#each $reminders as data (data.id)}
					<div transition:slide>
						<Reminder {data} />
					</div>
				{/each}
			</div>
		</main>
	{/if}
{/if}

<style lang="scss">
	main {
		padding: 8px;

		> span {
			font-size: 4rem;
			display: block;
		}

		> div {
			padding: 4px 0px;
			width: 100%;
		}

		.reminders {
			display: flex;
			width: 100%;
			flex-flow: column nowrap;
		}
	}

	button {
        padding: 6px 12px;
    }

	.top-buttons {
		position: absolute;
		top: 0;
		right: 0;
		padding: 6px;

		i {
			font-size: 2rem;
			padding: 4px;
			cursor: pointer;
			opacity: 0.8;
		
			&:hover {
				opacity: 1;
			}
		}
	}

	.missingWebhookUrl {
		padding: 8px;
		
		.title {
			color: red;
			font-weight: 400;
			font-size: 3rem;
		}

		.link {
			color: blue;
			cursor: pointer;
		}

		.link:hover {
			text-decoration: underline;
		}

		> span {
			display: block;
			font-size: 2rem;
		}
	}
</style>