import { pageJump, toshinoImg } from "./variables"
import { qs } from "./utils"
import { removeDeferers } from "./functions/removeDeferers"
import { movePageList } from "./functions/movePageList";
import { hideNamefags } from "./functions/hideNamefags";
import { detectSamefaggedThread } from "./functions/detectSamefaggedThread";
import { floatingJumpButton } from "./functions/floatingJumpButton";
import { improvedImageHover } from "./functions/improvedImageHover";
import { moveBacklinksDown } from "./functions/moveBacklinksDown";
import { fileFunctions } from "./functions/fileFunctions";
import { hideSideArrows } from "./functions/hideSideArrows";
import { allThreads } from "./functions/allThreads";
import { dev } from "./dev";


function menu() {

    createMenu()

    function addOption(name, description, callback, category) {

     //   const toshinoMenu = qs('toshino-menu')

        let injectTo = qs('toshino-options-body')
        let injectWhere = 'beforeend'

            // this bullshit has to be rewritten, the variable names don't match anymore
        if (category) {
            const header = qs(`[data-categoryname='${category}']`)
            let classes = ''
            if (category === 'dev') {
                classes = 'dev'
            }

            if (!header) {
                qs('toshino-options-body').insertAdjacentHTML('beforeend', `
                <h2 class="${category}">
                    ${category}
                </h2>

                <category data-categoryname="${category}" class="${classes}">
                </category>
            `)
            injectTo = qs(`[data-categoryname='${category}']`)
            } else {
                injectTo = header
                injectWhere = "beforeend" // not a ternary operator because it makes more sense like this
            }

        }


        if (description.endsWith("!wip")) {
            description = description.replace("!wip", '')

        // create checkbox for the menu
        injectTo.insertAdjacentHTML(injectWhere, 
            `<label for="toshino-${name}">
                <input id="toshino-${name}" data-toshino-${name} type="checkbox"></input>
                ${description} <span class="toshino-wip"> WIP </span>
            </label>`)
        } else {
        // create checkbox for the menu
        injectTo.insertAdjacentHTML(injectWhere, 
            `<label for="toshino-${name}">
                <input id="toshino-${name}" data-toshino-${name} type="checkbox"></input>
                ${description}
            </label>`)
        }

        // if none is set, set to disabled on initial script install
        if (!localStorage[name]) {
            localStorage[name] = 'disabled'
        }

        if (localStorage[name] === 'disabled') {
            qs(`[data-toshino-${name}`).checked = false
        } else {
            callback()
            qs(`[data-toshino-${name}`).checked = true
        }

        qs(`[data-toshino-${name}`).addEventListener("click", () => {
            
            if (localStorage[name] === 'disabled') {
                callback()
                localStorage[name] = 'enabled'
            } else {
                qs('.applyToshino').removeAttribute('disabled')
                localStorage[name] = 'disabled'
            }

            console.log(`${name} set to ${localStorage[name]}`);
        })
        
    }

    function createMenu() {

        dev()

        pageJump.insertAdjacentHTML('beforeend', `<a href="#!" class="toshino"> Toshino </a>`)

        document.body.insertAdjacentHTML('beforeend', `<toshino-menu></toshino-menu>`)
        qs('toshino-menu').insertAdjacentHTML('beforeend', `<toshino-options> <div> <img alt="Toshino Kyoko!" src="${toshinoImg}"/> </div> 
        
            <toshino-options-body>
                <h1> Toshino </h1>
            </toshino-options-body>
            <toshino-options-footer>
                <toshino-options-footer-buttons>
                </toshino-options-footer-buttons>
                <toshino-options-footer-links>
                </toshino-options-footer-links>
            </toshino-options-footer>
        </toshino-options>`)

        // fix for pages that don't have the style tag present
        document.body.insertAdjacentHTML('afterbegin', '<style></style>')

        document.querySelector('style').innerHTML += [
            `toshino-menu {
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                 z-index: 9002; position: fixed; top: 0; left:0;  height: 100vh; background: rgba(0,0,0,0.7); justify-content: center; align-items: center; opacity:0;
                transition: opacity .25s; width:100%;
                pointer-events: none; display: flex;
                color: #c5c8c6
            } 

            category {
                width: 100%;
            }

            category.dev, h2.dev {
                display: none
            }
                
            toshino-menu.visible {display: flex; opacity: 1; pointer-events: auto!important}

            toshino-options {
                overflow: hidden;
                border-radius: 3px;
                background: #111;
                transform: scale(.7);
                transition: transform .3s
            }

            toshino-menu.visible toshino-options {
                transform: scale(1);
            }

            toshino-options-body {
                position: relative;
                box-sizing: border-box; max-width: 300px;  display:flex; flex-wrap: wrap;
                padding: 1rem;
                padding-bottom: 0;
            }

            toshino-options-footer {
                justify-content: space-between;
                position: relative;
                box-sizing: border-box; max-width: 300px;  display:flex; flex-wrap: wrap; align-items: center;
                padding: 1rem;
            }

            toshino-options-body h1 {
                width: 100%;
                margin: 0;
            }

            toshino-options-body h2 {
                text-transform: capitalize;
                font-weight: normal;
                font-size: 1rem;
                color: #acacac;
                margin: 0;
                margin-top: 0px;
                margin-bottom: 0px;
                margin-top: .8rem;
                margin-bottom: .35rem;
            }

            toshino-options label, toshino-options div {
                display: flex;
                width: 100%
            }

           .toshino-wip {
            opacity: .5;
            font-size: 10px;
            margin-left: .2rem;
           }

            toshino-menu button {
                cursor: pointer;
                border: 0;
                background: #2f2f2f;
                border-radius: 4px;
                padding: .4rem;
                color: black;
                color: white;
                font-weight: 600;
                font-family: inherit;
                margin-right: .25rem;
                box-shadow: 0px 0px 0px 0 transparent;
                transition: box-shadow 0.15s;
            }

            toshino-menu button:focus {
                box-shadow: 0px 0px 0px 2px #aaa;
            }


            toshino-menu button[disabled] {
                cursor: auto;
                opacity: .4;
            }

            .toshino-floating-button {
                width: 100%;
                cursor: pointer;
                border: 0;
                background: #2f2f2f;
                padding: .4rem;
                color: black;
                color: white;
                font-weight: 600;
                font-family: inherit;
            }

            .toshino-floating-buttons {
                display: flex;
                flex-direction: column;
                justify-content: center;
                position: fixed;
                right: 0;
                top: 50%;
            }

            #threadWatcherExtension a {
                display:block;
                width: 100%
            }

            .extendedTWlink {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis "(...)";
            }

            @media only screen and (max-width: 500px) {
                .toshino-floating-buttons {
                    top: unset !important;
                    bottom: 23%;
                }
            }
            
            `
        ].join("\n");

        addOption('pageList', 'Move pagination to the top of the page', movePageList, 'functional')
        addOption('hideSideArrows', 'Hide side arrows', hideSideArrows, 'cosmetic')
        addOption('namefags', 'Hide namefags\' posts', hideNamefags, 'functional')
        addOption('floatingButton', 'Add a scroll to top/bottom button', floatingJumpButton, 'functional')
        addOption('improvedHover', 'Center hovered images', improvedImageHover, 'cosmetic')
        addOption('links', 'Strip 4chan links from tracking', removeDeferers, 'functional')

        addOption('moveBacklinksDown', 'Move backlinks below replies !wip', moveBacklinksDown, 'cosmetic')
        addOption('fileFunctions', 'Additional file functions !wip', fileFunctions, 'functional')


        addOption('allThreads', 'Better thread watcher !wip', allThreads, 'functional')

        addOption('samefagged', 'Show samefag score !wip', detectSamefaggedThread, 'dev')


        qs('toshino-options-footer-buttons').insertAdjacentHTML('beforeend', `<button class="closeToshino" type="button"> Close </button>`)
        qs('toshino-options-footer-buttons').insertAdjacentHTML('beforeend', `<button onclick="location.reload()" disabled class="applyToshino" type="button"> Apply </button>`)

        qs('toshino-options-footer-links').insertAdjacentHTML('beforeend',
        `
            <a href="https://github.com/toshinoo/toshino" target="_blank"> Code </a> <span> / </span>
            <a href="https://github.com/toshinoo/toshino/issues" target="_blank"> Issues </a> <span> / </span>
             <a href="https://github.com/toshinoo/toshino/discussions" target="_blank"> Talk </a> 
        `)


        const toshinoMenu = qs('toshino-menu')

        qs('.toshino').addEventListener("click", (e) => {
            e.preventDefault()
            toshinoMenu.classList.toggle("visible")
        })

        qs('toshino-options button.closeToshino').addEventListener("click", () => {
            toshinoMenu.classList.toggle("visible")
        })

    }

}


export {menu}