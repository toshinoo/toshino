import { replies, threads } from "../variables"


function hideNamefags() {

      threads.forEach(thread => {
        const config = { attributes: false, childList: true, subtree: false };

        const callback = (mutationList, observer) => {
            for (const mutation of mutationList) {
              if (mutation.type === "childList") {
                lookForANamefag(mutation.addedNodes)
                console.log("A child node has been added or removed.");
              }
            }
          }
    
        const observer = new MutationObserver(callback);
    
          observer.observe(thread, config);
      });

    lookForANamefag(replies)

}

const parser = new DOMParser();

function lookForANamefag(where) {
    where.forEach(reply => {
        const parsed = parser.parseFromString(reply.innerHTML.toString(), 'text/html')
        const name = parsed.querySelector("span.name")

        if (reply.classList.contains("replyContainer")) {
            reply = reply.firstChild
        }

        if (name.innerHTML !== "Anonymous") {
            reply.parentElement.style.display = 'none'
        }
    });
}

export { hideNamefags }