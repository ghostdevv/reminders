<script>
    import ReminderModal from './ReminderModal.svelte';
    import { reminders } from '../stores/reminders';
    import { webhookURL, userID, pingOnSend } from '../stores/settings.js';
    import { sendWebhook } from '../helpers/SendWebhook.js';

    export let data = {};

    let showContent = data.new;
    let editing = data.new;
    let sending = false;

    function save(sent = false) {
        data = {
            ...data,
            sent,
            timestamp: Date.now(),
            new: false
        };

        $reminders = [
            ...$reminders.filter(x => x.id != data.id),
            data
        ].sort((a, b) => b.id - a.id);
    };

    function send() {
        sending = true;

        sendWebhook($webhookURL, {
            content: $userID && $pingOnSend ? `<@${$userID}>` : undefined,
            embeds: [{
                title: `New Reminder`,
                fields: [
                    {
                        name: 'Title:',
                        value: data.title
                    },
                    {
                        name: 'Content:',
                        value: data.content
                    },
                    {
                        name: 'Time:',
                        value: new Date(data.timestamp).toGMTString()
                    },
                ],
                color: '16250100'
            }]
        })
        .then(res => {
            sending = false;
            data.sent = true;

            save(true);
        })
        .catch(e => {
            console.log(`There was a issue sending a reminder with id ${data.id} ^^`);

            sending = false;
            data.sent = false;
        })
    };

    function del() {
        $reminders = $reminders.filter(x => x.id != data.id);
    };
</script>

{#if editing}
    <ReminderModal bind:title={data.title} bind:content={data.content} bind:editing on:save={() => save()} on:delete={del} />
{/if}

<main>
    <div class="top">
        <input type="text" placeholder="Title..." bind:value={data.title} disabled={!editing} />
        <div class="button-row">
            {#if !data.sent}
                {#if sending}
                    <i class="fas fa-spinner spin"></i>
                {:else}
                    <i class="fas fa-paper-plane" on:click={send}></i>
                {/if}
            {/if}
            <i class="fas fa-pencil-alt" on:click={() => editing = !editing}></i>
            <i class="fas" class:fa-chevron-down={!showContent} class:fa-chevron-up={showContent} on:click={() => showContent = !showContent}></i>
        </div>
    </div>
    {#if showContent}
        <div class="content">
            <span role="textbox">{data.content}</span>
        </div>
    {/if}
</main>

<style lang="scss">
    .spin {
        animation: spin 1s infinite linear;
    }

    @keyframes spin {
        from {transform:rotate(0deg);}
        to {transform:rotate(360deg);}
    }

    main {
        width: 100%;
        background-color: #f7f4f4;
        padding: 8px;
        border: 1px solid rgb(110, 110, 110);
        border-radius: 4px;
        margin: 4px 0px;

        .top {
            display: flex;
            justify-content: space-between;
            align-items: center;

            > input[type="text"] {
                font-size: 2rem;
                border: none;
                background-color: rgba(0, 0, 0, 0);
                padding: 2px;
                opacity: 1;
                font-weight: 400;

                flex-grow: 1;

                &:focus {
                    outline: none;
                }
            }

            .button-row {
                display: flex;
                justify-content: flex-end;
                align-items: center;
            }

            i {
                padding: 0px 4px;
                font-size: 1.5rem;
                opacity: 0.8;
                cursor: pointer;

                &:hover {
                    opacity: 1;
                }
            }
        }

        .content {
            display: flex;
            flex-flow: column nowrap;
            padding: 2px;
            
            > span {
                display: block;
                font-size: 1.5rem;
                border: none;
                outline: none;
                width: 100%;
                padding: 2px;
                flex-grow: 1;
            }
        }
    }
</style>