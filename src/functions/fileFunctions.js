import { qs } from "../utils"
import { threads, replies } from "../variables"

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
    })

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
            e.preventDefault()
            expandAllImages(e.target.dataset.threadid)
        })
    });
}

function expandAllImages(threadid) {
    const thread = qs(`#${threadid}`)
    const files = thread.querySelectorAll(".file")
    files.forEach(file => {
        console.log(file);
        // native 4chan image expansion
        ImageExpansion.expand(file.querySelector('.fileThumb').firstChild)

        // use this if the native option breaks for some reason
   //     if (!file.classList.contains("image-expanded")) {
    //        file.querySelector('.fileThumb').firstChild.click()
  //      }
    });
}

function downloadImage(params) {
    
}

export { fileFunctions }