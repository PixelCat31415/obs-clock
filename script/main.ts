// Clock + Countdown Timer for Obs

import { Gadget } from "./Gadget";
import { Timer } from "./Timer";
import { Clock } from "./Clock";
import { Stopwatch } from "./Stopwatch";

export function main() {
    let gadgets: Array<Gadget> = [
        new Clock(),
        new Timer(),
        new Stopwatch(),
    ];

    document.addEventListener("click", (event) => {
        gadgets[0].input("Click");
        // ui.setMessage("text1", "click");
    });
    document.addEventListener("keydown", (event) => {
        if(event.key === "m") {
            let g = gadgets.shift();
            if(g) gadgets.push(g);
        } else {
            gadgets[0].input(event.key);
            // ui.setMessage("text1", "keydown");
            // ui.setMessage("text2", `'${event.key}'`);
        }
    });

    function timer_loop() {
        gadgets[0].render();
    }
    let job_id = setInterval(timer_loop, 100);
}
