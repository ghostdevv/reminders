<script>
    import { webhookURL, userID, pingOnSend } from '@/stores/settings.js';
    import { goto } from '@roxi/routify';

    let saveButtonText = 'Save';

    function close() {
        $goto('/');
    };

    webhookURL.load();
    userID.load();
    pingOnSend.load();

    function save() {
        webhookURL.save();
        userID.save();
        pingOnSend.save();

        saveButtonText = 'Saved!';
        setTimeout(() => saveButtonText = 'Save', 700);
    };
</script>

<main>
    <span>Settings</span>

    <div class="settings">
        <div>
            <label for="webhook">Webhook URL</label>
            <input id="webhook" type="text" placeholder="Webhook URL" bind:value={$webhookURL} />
        </div>
        <div>
            <label for="uid">User ID</label>
            <input id="uid" type="text" placeholder="User ID" bind:value={$userID} />
        </div>
        <div class="row">
            <input type="checkbox" id="ping" bind:checked={$pingOnSend} />
            <label for="ping">Ping on reminder send</label>
        </div>
    </div>

    <button on:click={save}>{saveButtonText}</button>
    <button on:click={close}>Close</button>
</main>

<style lang="scss">
    main {
        padding: 8px;
        width: 100%;

        > span {
            font-size: 4rem;
            display: block;
        }

        .settings {
            padding: 8px 0px;
            width: 100%;

            > div {
                display: flex;
                flex-flow: column nowrap;
                font-size: 2rem;
                width: 100%;
                padding-top: 8px;
            }

            > div.row {
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
            
                > * {
                   margin-left: 4px; 
                }
            }

            > div:first-child {
                padding-top: 0px;
            }
        }
    }

    button {
        padding: 6px 12px;
    }

    input[type="text"] {
        width: 100%;
        padding: 4px;
    }
</style>