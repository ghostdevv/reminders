<script>
	import Settings from './Components/Settings.svelte';
	import Reminder from './Components/Reminder.svelte';
	import { webhookURL, userID } from './stores/settings.js';
	import { reminders } from './stores/reminders';

	userID.useLocalStorage();
	webhookURL.useLocalStorage();
	reminders.useLocalStorage();

	let settingsShown = false;
	
	const openSettings = () => settingsShown = true;
	const clear = () => $reminders = [];

	function newReminder() {
		$reminders = [{
			id: $reminders.length,
			title: 'Title goes here',
			content: 'Content goes here',
			sent: false,
			timestamp: Date.now(),
		}, ...$reminders];
	};
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
		<div class="settingsButton">
			<i class="fas fa-cog" on:click={openSettings}></i>
		</div>

		<main>
			<span>Reminders</span>
			
			<div class="button-row">
				<button on:click={newReminder}>New</button>
				<button on:click={clear}>Clear</button>
			</div>

			<div class="reminders">
				{#each $reminders as data}
					<Reminder {data} />
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

	.settingsButton {
		position: absolute;
		top: 0;
		right: 0;
		padding: 4px;

		i {
			font-size: 2rem;
			padding: 8px;
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