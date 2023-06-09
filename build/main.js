// Clock + Countdown Timer for Obs
define(["require", "exports", "./Timer", "./Clock", "./Stopwatch"], function (require, exports, Timer_1, Clock_1, Stopwatch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.main = void 0;
    function main() {
        let gadgets = [
            new Clock_1.Clock(),
            new Timer_1.Timer(),
            new Stopwatch_1.Stopwatch(),
        ];
        document.addEventListener("click", (event) => {
            gadgets[0].input("Click");
            // ui.setMessage("text1", "click");
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "m") {
                let g = gadgets.shift();
                if (g)
                    gadgets.push(g);
            }
            else {
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
    exports.main = main;
});
