function moveBacklinksDown() {
    document.querySelector('style').innerHTML += [
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
    ].join("\n")
}

export { moveBacklinksDown }