import { qs } from "../utils"
import { threads, threadWatcher } from "../variables"


function allThreads() {
    if (threadWatcher) {

        threadWatcher.querySelector('#watchList').insertAdjacentHTML('afterbegin', `<div id='twHeader'> Watched </div>`)

        threadWatcher.insertAdjacentHTML('beforeend', `
            <div id='twHeader'> Subjects </div>
            <ul id="threadWatcherExtension" style="margin:0; padding:0;">
            <div id='twHeader'> Other </div>
            </ul>
        `)

        let threadsArray = []
        threads.forEach(thread => {
            const subject = thread.querySelector('.subject')
            const url = thread.querySelector('.replylink')
            const content = thread.querySelector('blockquote.postMessage')

            if (subject && url && content) {
                threadsArray.push(
                    {
                        'subject': subject.textContent,
                        'url': url.href,
                        'content': content.textContent
                    }
                )
            } else if (content && url) {
                threadsArray.push(
                    {
                        'url': url.href,
                        'content': content.innerHTML
                    }
                )  
            } else if (localStorage.betterTWThreads) {
                threadsArray = JSON.parse(localStorage.betterTWThreads);
            }
        })

        localStorage.betterTWThreads = JSON.stringify(threadsArray)

        const extension = qs('#threadWatcherExtension')
        
        threadsArray.forEach(thread => {
            let insertTo = 'afterbegin'
            if (!thread.subject) {
                insertTo = 'beforeend'
            }
            extension.insertAdjacentHTML(insertTo, `<a class="extendedTWlink" href="${thread.url}"> ${thread.subject || thread.content} </a>`)
        });
    } else {
        alert("Better thread watcher is enabled, but thread watcher is not enabled in 4chan's settings!")
    }
}

export { allThreads }