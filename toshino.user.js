// ==UserScript==
// @name        toshino
// @namespace   Violentmonkey Scripts
// @match       *://boards.4channel.org/*/*
// @match       *://boards.4chan.org/*/*
// @grant       none
// @version     0.12
// @author      - https://github.com/toshinoo/toshino
// @description  4chan quality of life tweaks
// ==/UserScript==


'use strict';

function qs(selector, all) {
    if(!all) {
      return document.querySelector(selector)
    } else {
      return document.querySelectorAll(selector)
    }
}

const navBar = qs('#boardNavDesktop');
const pageList = qs('.pagelist.desktop');
const links = qs('a[target]', 'all');
const pageJump = qs('.pageJump');

const toshinoImg = `data:image/jpeg;base64,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`;

function removeDeferers() {
  console.log('removingdeferers');
    links.forEach((link) => {
        if (link.href.startsWith('https://sys.4channel.org/derefer?')) {
          link.removeAttribute('target');
          link.href = decodeURIComponent(link.href.replace('https://sys.4channel.org/derefer?url=', ''));
      }
    });
}

function movePageList() {
    if (pageList) {
        pageList.style.top = `${navBar.clientHeight}px`;
        pageList.style.position = 'fixed';
        pageList.style.right = '0';
        
        window.addEventListener("resize", (event) => {
          pageList.style.top = `${navBar.clientHeight}px`;
        });
      
        window.onscroll = function() {
              if ((window.innerHeight + window.scrollY + 30) >= document.body.scrollHeight) {
                pageList.style.position = 'unset';
              } else {
                pageList.style.position = 'fixed';
              }
        };
      }
}

function hideNamefags() {

    const threads = qs("div.thread[id]", "all");


      threads.forEach(thread => {
        const config = { attributes: false, childList: true, subtree: false };

        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
              if (mutation.type === "childList") {
                lookForANamefag(mutation.addedNodes);
                console.log("A child node has been added or removed.");
              }
            }
          };
    
        const observer = new MutationObserver(callback);
    
          observer.observe(thread, config);
      });

    const replies = qs("div.post.reply[id]", "all");
    lookForANamefag(replies);

}

const parser = new DOMParser();

function lookForANamefag(where) {
    where.forEach(reply => {
        const parsed = parser.parseFromString(reply.innerHTML.toString(), 'text/html');
        const name = parsed.querySelector("span.name");

        if (reply.classList.contains("replyContainer")) {
            reply = reply.firstChild;
        }

        if (name.innerHTML !== "Anonymous") {
            reply.parentElement.style.display = 'none';
        }
    });
}

function detectSamefaggedThread() {
    if (qs('.thread-stats')) {
        const replies = qs('.ts-replies').innerHTML;
        const posters = qs('.ts-ips').innerHTML;

        // this formula is retarded
        const samefagScore = posters - 1 * (replies / 2);

        if (Math.sign(samefagScore) === -1) {
            alert("this thread may be samefagged");
        }

    }
}

function floatingJumpButton() {
    qs('body').insertAdjacentHTML('beforeend', 
    `
        <div class="toshino-floating-buttons">
            <a href="#">
                <button class="toshino-floating-button" type="button"> 
                    Top
                </button>
            </a>

            <a href="#bottom">
                <button class="toshino-floating-button" type="button"> 
                    Bottom
                </button>
            </a>
        </div>
    `);
}

function improvedImageHover() {
    document.querySelector('style').innerHTML += [
        `
        #image-hover {
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
        }
    `
    ].join("\n");
}

function menu() {

    createMenu();

    function addOption(name, description, callback) {

        qs('toshino-menu');

        if (description.endsWith("!wip")) {
            description = description.replace("!wip", '');

        // create checkbox for the menu
            qs('toshino-options-body').insertAdjacentHTML('beforeend', 
            `<label for="toshino-${name}">
                <input id="toshino-${name}" data-toshino-${name} type="checkbox"></input>
                ${description} <span class="toshino-wip"> WIP </span>
            </label>`);
        } else {
        // create checkbox for the menu
            qs('toshino-options-body').insertAdjacentHTML('beforeend', 
            `<label for="toshino-${name}">
                <input id="toshino-${name}" data-toshino-${name} type="checkbox"></input>
                ${description}
            </label>`);
        }

        // if none is set, set to disabled on initial script install
        if (!localStorage[name]) {
            localStorage[name] = 'disabled';
        }

        if (localStorage[name] === 'disabled') {
            qs(`[data-toshino-${name}`).checked = false;
        } else {
            callback();
            qs(`[data-toshino-${name}`).checked = true;
        }

        qs(`[data-toshino-${name}`).addEventListener("click", () => {
            
            if (localStorage[name] === 'disabled') {
                callback();
                localStorage[name] = 'enabled';
            } else {
                qs('.applyToshino').removeAttribute('disabled');
                localStorage[name] = 'disabled';
            }

            console.log(`${name} set to ${localStorage[name]}`);
        });
        
    }

    function createMenu() {
        pageJump.insertAdjacentHTML('beforeend', `<a href="#!" class="toshino"> Toshino </a>`);

        document.body.insertAdjacentHTML('beforeend', `<toshino-menu></toshino-menu>`);
        qs('toshino-menu').insertAdjacentHTML('beforeend', `<toshino-options> <div> <img alt="Toshino Kyoko!" src="${toshinoImg}"/> </div> 
        
        <toshino-options-body>
            <h1> Toshino </h1>
            </toshino-options-body>
        </toshino-options>`);

        // fix for pages that don't have the style tag present
        document.body.insertAdjacentHTML('afterbegin', '<style></style>');

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
                transform: scale(.7);
                transition: transform .3s
            }

            toshino-menu.visible toshino-options {
                transform: scale(1);
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

        addOption('links', 'Strip 4chan links from tracking', removeDeferers);
        addOption('pageList', 'Move pagination to the top of the page', movePageList);
        addOption('namefags', 'Hide namefags\' posts', hideNamefags);
        addOption('samefagged', 'Show samefag score !wip', detectSamefaggedThread);
        addOption('floatingButton', 'Add a scroll to top/bottom button !wip', floatingJumpButton);
        addOption('improvedHover', 'Center hovered images !wip', improvedImageHover);

        qs('toshino-options-body').insertAdjacentHTML('beforeend', `<button class="closeToshino" type="button"> Close </button>`);
        qs('toshino-options-body').insertAdjacentHTML('beforeend', `<button onclick="location.reload()" disabled class="applyToshino" type="button"> Apply </button>`);

        const toshinoMenu = qs('toshino-menu');

        qs('.pageJump .toshino').addEventListener("click", (e) => {
            e.preventDefault();
            toshinoMenu.classList.toggle("visible");
        });

        qs('toshino-options button.closeToshino').addEventListener("click", () => {
            toshinoMenu.classList.toggle("visible");
        });

    }

}

menu();
