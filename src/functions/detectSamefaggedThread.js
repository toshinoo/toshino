import { qs } from "../utils";

function detectSamefaggedThread() {
    if (qs('.thread-stats')) {
        const replies = qs('.ts-replies').innerHTML
        const posters = qs('.ts-ips').innerHTML

        // this formula is retarded
        const samefagScore = posters - 1 * (replies / 2)

        if (Math.sign(samefagScore) === -1) {
            alert("this thread may be samefagged")
        }

    }
}

export { detectSamefaggedThread }