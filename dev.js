import { style } from "./src/variables";

function dev() {
    devCheck()

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === '`') {
            localStorage.toshinoDev = 'yes'
            console.info('You are a dev now!')
            devCheck()
        }
    });

    function applyDevStyles() {
        style.innerHTML += [`
            .dev {
                display: block !important
            }`
        ].join("\n")
    }

    function devCheck() {
        if (localStorage.toshinoDev && localStorage.toshinoDev === 'yes') {
            applyDevStyles()
        }
    }

}

export { dev }