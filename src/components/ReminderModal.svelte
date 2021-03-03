<script>
    import { createEventDispatcher } from 'svelte';

    export let title;
    export let content;
    export let editing;

    let showErrors;

    $: missingTitle = !title || title.trim() == '';
    $: missingContent = !content || content.trim() == '';

    const dispatch = createEventDispatcher();

    function saveAndExit() {
        if (missingTitle || missingContent) return (showErrors = true);

        dispatch('save');

        editing = false;
    }

    function cancel() {
        dispatch('delete');
    }
</script>

<div class="backlay" on:click={cancel} />

<main>
    <div class="input">
        <div>
            <label for="title">Title *</label>
            <input
                type="text"
                id="title"
                bind:value={title}
                class:error={missingTitle && showErrors} />
        </div>
        <div>
            <label for="content">Content *</label>
            <textarea
                for="content"
                bind:value={content}
                class:error={missingContent && showErrors} />
        </div>
    </div>
    <div class="button-row">
        <button on:click={saveAndExit}>Save and Close</button>
        <button on:click={cancel}>Cancel</button>
    </div>
</main>

<style lang="scss">
    main {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;

        background-color: #f7f4f4;
        padding: 16px 24px;
        border: 1px solid rgb(110, 110, 110);
        border-radius: 4px;

        > div {
            margin: 8px 0px;
        }

        .input {
            width: 100%;
            display: flex;
            flex-flow: column nowrap;
            justify-content: center;

            min-width: 300px;

            > div {
                width: 100%;
                display: flex;
                flex-flow: column nowrap;
                justify-content: center;

                margin: 2px 0px;

                label {
                    font-size: 2rem;
                }

                textarea,
                input {
                    color: black;
                    font-size: 1.5rem;

                    border: 1px solid black;
                    border-radius: 4px;

                    &:focus {
                        border-width: 2px;
                    }
                }

                textarea {
                    min-height: 120px;
                    min-width: 100%;
                }

                .error {
                    border-color: red;
                }
            }
        }

        .button-row {
            display: flex;
            justify-content: center;
            align-items: center;

            > * {
                margin: 0px 4px;
            }

            width: 100%;
        }
    }

    input[type='text'] {
        width: 100%;
        padding: 6px;
    }

    button {
        padding: 6px 12px;
    }

    .backlay {
        width: 100%;
        height: 100%;

        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;

        background-color: black;
        opacity: 0.3;
    }
</style>
