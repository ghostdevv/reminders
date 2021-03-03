<script>
    import { Router } from '@roxi/routify';
    import { routes } from '../.routify/routes';

    if ('serviceWorker' in navigator) {
        import('workbox-window').then(async ({ Workbox }) => {
            const wb = new Workbox('/service-worker.js');
            const registration = await wb.register();

            // Reload the page if the PWA has been updated. Change strategy if needed.
            wb.addEventListener('redundant', () => {
                location.reload();
                console.log('updated app');
            });
        });
    }
</script>

<Router {routes} />

<style global lang="scss">
    @import 'style/global.scss';
</style>
