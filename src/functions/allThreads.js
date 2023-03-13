import { threads } from "../variables"


function allThreads() {
    threads.forEach(thread => {
        console.log(thread);
    });
}

export { allThreads }