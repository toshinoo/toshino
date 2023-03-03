function improvedImageHover() {
    document.querySelector('style').innerHTML += [
        `
        #image-hover {
            top: 50%;
            left: 50%;
            margin-right: -50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
        }
    `
    ].join("\n")
}

export { improvedImageHover }