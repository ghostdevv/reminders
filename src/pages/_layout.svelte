<script>
    import { webhookURL } from '@/stores/settings.js';
    webhookURL.load();
</script>

{#if $webhookURL}
    <slot />
{:else}
    <div class="missingWebhookUrl">
        <span class="title">Error!</span>
        <span>No webhook url found. Open the
            <a href="/settings">settings</a>
            window to set one</span>
    </div>
{/if}

<style lang="scss">
    .missingWebhookUrl {
        padding: 8px;

        .title {
            color: red;
            font-weight: 400;
            font-size: 3rem;
        }

        a {
            color: blue;

            &:hover {
                text-decoration: underline;
            }
        }

        > span {
            display: block;
            font-size: 2rem;
        }
    }
</style>
