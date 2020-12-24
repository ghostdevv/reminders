<script>
    export let creditsShown;
</script>

<div class="backlay" on:click={() => creditsShown = false}></div>

<main>
    <div class="inner">
        <div class="close">
            <span on:click={() => creditsShown = false}>x</span>
        </div>
        <div class="text">
            <span class="title">Credits</span>
            <span>Thanks to <a href="https://www.flaticon.com/">flaticon</a> for the logo</span>
            <span>Icons by <a href="https://fontawesome.com/">Font Awesome</a></span>
        </div>
        <div class="text">
            <span class="title">Stack</span>
            <span>Svelte 3</span>
            <span>JavaScript</span>
            <span>HTML</span>
            <span>SCSS</span>
        </div>
        <div class="text">
            <span class="title">Info</span>
            <span>Made by <a href="https://github.com/ghostdevv">GHOST</a></span>
            <span>The repo can be found <a href="https://github.com/ghostdevv/reminders" target="_blank">here</a></span>
        </div>
    </div>
</main>

<style lang="scss">
    main {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 1000;
        padding: 8px;

        background-color: #f7f4f4;
        border: 1px solid rgb(110, 110, 110);
        border-radius: 4px;
        
        .inner {
            padding: 8px 16px;
            width: 100%;
            height: 100%;

            position: relative;

            .text {
                display: flex;
                flex-flow: column nowrap;

                a {
                    color: blue;

                    &:hover {
                        color: navy;
                    }
                }

                > span {
                    font-size: 1.7rem;
                    margin-left: 4px;

                    &:before {
                        content: '- '
                    }

                    &.title {
                        font-size: 3rem;
                        margin-left: 0px;

                        &:before {
                            content: ''
                        }
                    }
                }
            }

            .close {
                position: absolute;
                top: 0;
                right: 0;
                
                span {
                    opacity: 0.8;
                    font-size: 2rem;
                    padding: 8px;
                    margin-top: 8px;
                    cursor: pointer;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
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