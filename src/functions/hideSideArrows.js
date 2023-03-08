import { style } from "../variables"


function hideSideArrows() {
    style.innerHTML += [
        `
            div.post div.file .fileThumb {
                margin-left: 0;
            }
            .sideArrows {
                display: none;   
            }
        `
    ].join("\n")
}

export { hideSideArrows }