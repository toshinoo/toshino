import { qs } from "../utils"
import { threads } from "../variables"

function fileFunctions() {
    createButtons()
    attachListeners()
}


function createButtons() {
    threads.forEach(thread => {
        const fileText = thread.querySelector(".fileText")
        fileText.insertAdjacentHTML('beforeend', `
            <span> [ </span> 
                <a data-threadid="${thread.id}" class="toshino-EX" title="Expand all images in this thread" href="#"> EX </a>
            <span> ] </span>
        `)
    });
}

function attachListeners() {
    qs('.toshino-EX').addEventListener("click", (e) => {
        e.preventDefault()
        expandAllImages(e.target.dataset.threadid)
    })
}

function expandAllImages(threadid) {
    const thread = qs(`#${threadid}`)
    const files = thread.querySelectorAll(".file")
    files.forEach(file => {
        // native 4chan image expansion
        ImageExpansion.expand(file.querySelector('.fileThumb').firstChild)

 //     file.querySelector('.fileThumb').firstChild.click()
    });
}

export { fileFunctions }