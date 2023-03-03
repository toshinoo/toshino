import { pageJump, toshinoImg } from "./variables"
import { qs } from "./utils"
import { removeDeferers } from "./functions/removeDeferers"
import { movePageList } from "./functions/movePageList";
import { hideNamefags } from "./functions/hideNamefags";
import { detectSamefaggedThread } from "./functions/detectSamefaggedThread";
import { floatingJumpButton } from "./functions/floatingJumpButton";
import { improvedImageHover } from "./functions/improvedImageHover";


function menu() {

    createMenu()

    function addOption(name, description, callback) {

        const toshinoMenu = qs('toshino-menu')

        if (description.endsWith("!wip")) {
            description = description.replace("!wip", '')

        // create checkbox for the menu
            qs('toshino-options-body').insertAdjacentHTML('beforeend', 
            `<label for="toshino-${name}">
                <input id="toshino-${name}" data-toshino-${name} type="checkbox"></input>
                ${description} <span class="toshino-wip"> WIP </span>
            </label>`)
        } else {
        // create checkbox for the menu
            qs('toshino-options-body').insertAdjacentHTML('beforeend', 
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
        pageJump.insertAdjacentHTML('beforeend', `<a href="#!" class="toshino"> Toshino </a>`)

        document.body.insertAdjacentHTML('beforeend', `<toshino-menu></toshino-menu>`)
        qs('toshino-menu').insertAdjacentHTML('beforeend', `<toshino-options> <div> <img alt="Toshino Kyoko!" src="${toshinoImg}"/> </div> 
        
        <toshino-options-body>
            <h1> Toshino </h1>
            </toshino-options-body>
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
                
                toshino-menu.visible {display: flex; opacity: 1; pointer-events: auto!important}
            
            toshino-options {
                overflow: hidden;
                border-radius: 3px;
                background: #111;
            }

            /*
            toshino-options-body::after {
                width:2px;
                height: 100%;
                content: "";
                position:absolute;
                bottom:0;
                left:0;
                background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 50%, rgba(220,20,60,1) 50%, rgba(220,20,60,1) 100%);
            }*/

            toshino-options-body {
                position: relative;

                box-sizing: border-box; max-width: 300px;  display:flex; flex-wrap: wrap;
                padding: 1rem;
            }

            toshino-options-body h1 {
                margin-top:0;
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
                margin-top: 1rem;
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

            @media only screen and (max-width: 500px) {
                .toshino-floating-buttons {
                    top: unset !important;
                    bottom: 15%;
                }
            }
            
            `
        ].join("\n");

        addOption('links', 'Strip 4chan links from tracking', removeDeferers)
        addOption('pageList', 'Move pagination to the top of the page', movePageList)
        addOption('namefags', 'Hide namefags\' posts', hideNamefags)
        addOption('samefagged', 'Show samefag score !wip', detectSamefaggedThread)
        addOption('floatingButton', 'Add a scroll to top/bottom button !wip', floatingJumpButton)
        addOption('improvedHover', 'Center hovered images !wip', improvedImageHover)

        qs('toshino-options-body').insertAdjacentHTML('beforeend', `<button class="closeToshino" type="button"> Close </button>`)
        qs('toshino-options-body').insertAdjacentHTML('beforeend', `<button onclick="location.reload()" disabled class="applyToshino" type="button"> Apply </button>`)

        const toshinoMenu = qs('toshino-menu')

        qs('.pageJump .toshino').addEventListener("click", (e) => {
            e.preventDefault()
            toshinoMenu.classList.toggle("visible")
        })

        qs('toshino-options button.closeToshino').addEventListener("click", () => {
            toshinoMenu.classList.toggle("visible")
        })

    }

}


export {menu}