import { navBar, pageList } from "../variables";

function movePageList() {
    if (pageList) {
        pageList.style.top = `${navBar.clientHeight}px`;
        pageList.style.position = 'fixed'
        pageList.style.right = '0'
        
        window.addEventListener("resize", (event) => {
          pageList.style.top = `${navBar.clientHeight}px`;
        });
      
        window.onscroll = function() {
              if ((window.innerHeight + window.scrollY + 30) >= document.body.scrollHeight) {
                pageList.style.position = 'unset';
              } else {
                pageList.style.position = 'fixed';
              }
        }
      }
}

export {movePageList}