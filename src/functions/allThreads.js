import { qs } from "../utils"
import { threads, threadWatcher } from "../variables"

if (threadWatcher) {
    threadWatcher.querySelector('#watchList').insertAdjacentHTML('afterbegin', `<div id='twHeader'> Watched </div>`)

    threadWatcher.insertAdjacentHTML('beforeend', `
        <div id='twHeader'> Subjects </div>
        <ul id="threadWatcherExtension" style="margin:0; padding:0;">
        <div id='twHeader'> Other </div>
        </ul>
    `)
} else {
    alert("Better thread watcher is enabled, but thread watcher is not enabled in 4chan's settings!")
}

function allThreads() {
    let threadsArray = []
    threads.forEach(thread => {
        const subject = thread.querySelector('.subject')
        const url = thread.querySelector('.replylink')
        const content = thread.querySelector('blockquote.postMessage')
        console.log(content.textContent);

        if (subject && url && content) {
            threadsArray.push(
                {
                    'subject': subject.textContent,
                    'url': url.href,
                    'content': content.textContent
                }
            )
        } else if (content) {
            threadsArray.push(
                {
                    'url': url.href,
                    'content': content.innerHTML
                }
            )  
        }
    })

    const extension = qs('#threadWatcherExtension')
    
    threadsArray.forEach(thread => {
        let insertTo = 'afterbegin'
        if (!thread.subject) {
            insertTo = 'beforeend'
        }
        extension.insertAdjacentHTML(insertTo, `<a class="extendedTWlink" href="${thread.url}"> ${thread.subject || thread.content} </a>`)
    });

}

export { allThreads }