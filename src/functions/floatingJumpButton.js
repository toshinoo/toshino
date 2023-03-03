import { qs } from "../utils"

function floatingJumpButton() {
    qs('body').insertAdjacentHTML('beforeend', 
    `
        <div class="toshino-floating-buttons">
            <a href="#">
                <button class="toshino-floating-button" type="button"> 
                    Top
                </button>
            </a>

            <a href="#bottom">
                <button class="toshino-floating-button" type="button"> 
                    Bottom
                </button>
            </a>
        </div>
    `)
}

export { floatingJumpButton }