function qs(selector, all) {
    if(!all) {
      return document.querySelector(selector)
    } else {
      return document.querySelectorAll(selector)
    }
}

export {qs}