import {links} from "../variables";

function removeDeferers() {
  console.log('removingdeferers');
    links.forEach((link) => {
        if (link.href.startsWith('https://sys.4channel.org/derefer?')) {
          link.removeAttribute('target')
          link.href = decodeURIComponent(link.href.replace('https://sys.4channel.org/derefer?url=', ''))
      }
    })
}

export {removeDeferers}