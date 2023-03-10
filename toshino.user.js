// ==UserScript==
// @name        toshino
// @namespace   Violentmonkey Scripts
// @match       *://boards.4channel.org/*/*
// @match       *://boards.4chan.org/*/*
// @grant       none
// @version     0.27
// @author      toshino developer
// @run-at      document-end
// @homepageURL https://github.com/toshinoo/toshino
// @downloadURL https://github.com/toshinoo/toshino/raw/main/toshino.user.js
// @description 4chan quality of life tweaks
// @icon https://raw.githubusercontent.com/toshinoo/toshino/main/icon.png
// ==/UserScript==


'use strict';

function qs(selector, all) {
    if(!all) {
      return document.querySelector(selector)
    } else {
      return document.querySelectorAll(selector)
    }
}

qs('#boardNavDesktop');
const pageList = qs('.pagelist.desktop');
const links = qs('a[target]', 'all');
const threadWatcher = qs('#threadWatcher');

let boardNav = qs('#boardNavMobile');
let pageJump = qs('.pageJump');

if (window.getComputedStyle(document.querySelector('#navtopright')).getPropertyValue('display') !== 'none') {
    pageJump = qs('#navtopright');
    boardNav = qs('#boardNavDesktop');
}

const threads = qs("div.thread[id]", "all");
const replies = qs("div.post.reply[id]", "all");
const style = document.querySelector('style');

const toshinoImg = `data:image/jpeg;base64,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`;

function removeDeferers() {
    links.forEach((link) => {
        if (link.href.startsWith('https://sys.4channel.org/derefer?')) {
          link.removeAttribute('target');
          link.href = decodeURIComponent(link.href.replace('https://sys.4channel.org/derefer?url=', ''));
      }
    });
}

function movePageList() {
    if (pageList) {
        pageList.style.top = `${boardNav.clientHeight}px`;
        pageList.style.position = 'fixed';
        pageList.style.right = '0';
        
        window.addEventListener("resize", (event) => {
          pageList.style.top = `${boardNav.clientHeight}px`;
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
    if (qs('.thread-stats') && qs('.ts-ips')) {
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
    style.innerHTML += [
        `
        #image-hover {
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    `
    ].join("\n");
}

function moveBacklinksDown() {
    style.innerHTML += [
        `
        .backlink {
            position:absolute;
            bottom: 0;
            left: 0;
            padding: .25rem;
            margin-bottom: .2rem;
        }

        .post.op .backlink {
            position: initial;
        }

        .post.reply {
            position: relative;
            padding-bottom: .3rem;
        }

        .fileThumb > img {
            margin-bottom: 10px;
        }

    `
    ].join("\n");
}

function fileFunctions() {
    createButtons();
    attachListeners();
}


function createButtons() {
    threads.forEach(thread => {
        const fileText = thread.querySelector(".fileText");
        fileText.insertAdjacentHTML('beforeend', `
            <span> [ </span> 
                <a data-threadid="${thread.id}" class="toshino-EX" title="Expand all images in this thread" href="#"> EX </a>
            <span> ] </span>
        `);
    });

    /*
    replies.forEach(reply => {
        const fileText = reply.querySelector(".fileText")
        if (fileText) {
            fileText.insertAdjacentHTML('beforeend', `
            <span> [ </span> 
                <a title="Download file" class="toshino-DL" href="#"> DL </a>
            <span> ] </span>
        `)
        }
    })*/
}

function attachListeners() {
    qs('.toshino-EX', "all").forEach(expander => {
        expander.addEventListener("click", (e) => {
            e.preventDefault();
            expandAllImages(e.target.dataset.threadid);
        });
    });
}

function expandAllImages(threadid) {
    const thread = qs(`#${threadid}`);
    const files = thread.querySelectorAll(".file");
    files.forEach(file => {
        console.log(file);
        // native 4chan image expansion
    //    ImageExpansion.expand(file.querySelector('.fileThumb').firstChild)

//use this if the native option breaks for some reason
       if (!file.classList.contains("image-expanded")) {
            file.querySelector('.fileThumb').firstChild.click();
       }
    });
}

function hideSideArrows() {
    style.innerHTML += [
        `
            div.post div.file .fileThumb {
                margin-left: 0;
            }
            .sideArrows {
                display: none;   
            }
        `
    ].join("\n");
}

function allThreads() {
    if (threadWatcher) {

        threadWatcher.querySelector('#watchList').insertAdjacentHTML('afterbegin', `<div id='twHeader'> Watched </div>`);

        threadWatcher.insertAdjacentHTML('beforeend', `
            <div id='twHeader'> Subjects </div>
            <ul id="threadWatcherExtension" style="margin:0; padding:0;">
            <div id='twHeader'> Other </div>
            </ul>
        `);

        let threadsArray = [];
        threads.forEach(thread => {
            const subject = thread.querySelector('.subject');
            const url = thread.querySelector('.replylink');
            const content = thread.querySelector('blockquote.postMessage');

            if (subject && url && content) {
                threadsArray.push(
                    {
                        'subject': subject.textContent,
                        'url': url.href,
                        'content': content.textContent
                    }
                );
            } else if (content && url) {
                threadsArray.push(
                    {
                        'url': url.href,
                        'content': content.innerHTML
                    }
                );  
            } else if (localStorage.betterTWThreads) {
                threadsArray = JSON.parse(localStorage.betterTWThreads);
            }
        });

        localStorage.betterTWThreads = JSON.stringify(threadsArray);

        const extension = qs('#threadWatcherExtension');
        
        threadsArray.forEach(thread => {
            let insertTo = 'afterbegin';
            if (!thread.subject) {
                insertTo = 'beforeend';
            }
            extension.insertAdjacentHTML(insertTo, `<a class="extendedTWlink" href="${thread.url}"> ${thread.subject || thread.content} </a>`);
        });
    } else {
        alert("Better thread watcher is enabled, but thread watcher is not enabled in 4chan's settings!");
    }
}

function dev() {
    devCheck();

    document.addEventListener('keydown', function(event) {
        if (event.ctrlKey && event.key === '`') {
            localStorage.toshinoDev = 'yes';
            console.info('You are a dev now!');
            devCheck();
        }
    });

    function applyDevStyles() {
        style.innerHTML += [`
            .dev {
                display: block !important
            }`
        ].join("\n");
    }

    function devCheck() {
        if (localStorage.toshinoDev && localStorage.toshinoDev === 'yes') {
            applyDevStyles();
        }
    }

}

function menu() {

    createMenu();

    function addOption(name, description, callback, category) {

     //   const toshinoMenu = qs('toshino-menu')

        let injectTo = qs('toshino-options-body');
        let injectWhere = 'beforeend';

            // this bullshit has to be rewritten, the variable names don't match anymore
        if (category) {
            const header = qs(`[data-categoryname='${category}']`);
            let classes = '';
            if (category === 'dev') {
                classes = 'dev';
            }

            if (!header) {
                qs('toshino-options-body').insertAdjacentHTML('beforeend', `
                <h2 class="${category}">
                    ${category}
                </h2>

                <category data-categoryname="${category}" class="${classes}">
                </category>
            `);
            injectTo = qs(`[data-categoryname='${category}']`);
            } else {
                injectTo = header;
                injectWhere = "beforeend"; // not a ternary operator because it makes more sense like this
            }

        }


        if (description.endsWith("!wip")) {
            description = description.replace("!wip", '');

        // create checkbox for the menu
        injectTo.insertAdjacentHTML(injectWhere, 
            `<label for="toshino-${name}">
                <input id="toshino-${name}" data-toshino-${name} type="checkbox"></input>
                ${description} <span class="toshino-wip"> WIP </span>
            </label>`);
        } else {
        // create checkbox for the menu
        injectTo.insertAdjacentHTML(injectWhere, 
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

        dev();

        pageJump.insertAdjacentHTML('beforeend', `<a href="#!" class="toshino"> Toshino </a>`);

        document.body.insertAdjacentHTML('beforeend', `<toshino-menu></toshino-menu>`);
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

        addOption('pageList', 'Move pagination to the top of the page', movePageList, 'functional');
        addOption('hideSideArrows', 'Hide side arrows', hideSideArrows, 'cosmetic');
        addOption('namefags', 'Hide namefags\' posts', hideNamefags, 'functional');
        addOption('floatingButton', 'Add a scroll to top/bottom button', floatingJumpButton, 'functional');
        addOption('improvedHover', 'Center hovered images', improvedImageHover, 'cosmetic');
        addOption('links', 'Strip 4chan links from tracking', removeDeferers, 'functional');

        addOption('moveBacklinksDown', 'Move backlinks below replies !wip', moveBacklinksDown, 'cosmetic');
        addOption('fileFunctions', 'Additional file functions !wip', fileFunctions, 'functional');


        addOption('allThreads', 'Better thread watcher !wip', allThreads, 'functional');

        addOption('samefagged', 'Show samefag score !wip', detectSamefaggedThread, 'dev');


        qs('toshino-options-footer-buttons').insertAdjacentHTML('beforeend', `<button class="closeToshino" type="button"> Close </button>`);
        qs('toshino-options-footer-buttons').insertAdjacentHTML('beforeend', `<button onclick="location.reload()" disabled class="applyToshino" type="button"> Apply </button>`);

        qs('toshino-options-footer-links').insertAdjacentHTML('beforeend',
        `
            <a href="https://github.com/toshinoo/toshino" target="_blank"> Code </a> <span> / </span>
            <a href="https://github.com/toshinoo/toshino/issues" target="_blank"> Issues </a> <span> / </span>
             <a href="https://github.com/toshinoo/toshino/discussions" target="_blank"> Talk </a> 
        `);


        const toshinoMenu = qs('toshino-menu');

        qs('.toshino').addEventListener("click", (e) => {
            e.preventDefault();
            toshinoMenu.classList.toggle("visible");
        });

        qs('toshino-options button.closeToshino').addEventListener("click", () => {
            toshinoMenu.classList.toggle("visible");
        });

    }

}

menu();
