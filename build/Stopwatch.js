// Stopwatch class for a stopwatch, with precision to seconds
define(["require", "exports", "./Ui"], function (require, exports, Ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Stopwatch = void 0;
    var StopwatchStatus;
    (function (StopwatchStatus) {
        StopwatchStatus[StopwatchStatus["Running"] = 0] = "Running";
        StopwatchStatus[StopwatchStatus["Paused"] = 1] = "Paused";
        StopwatchStatus[StopwatchStatus["Zero"] = 2] = "Zero";
    })(StopwatchStatus || (StopwatchStatus = {}));
    class Stopwatch {
        constructor() {
            this.status = StopwatchStatus.Zero;
            this.t_elapsed = 0;
            this.t_last_start = 0;
        }
        reset() {
            this.status = StopwatchStatus.Zero;
            this.t_elapsed = 0;
            this.t_last_start = 0;
        }
        start() {
            this.status = StopwatchStatus.Running;
            this.t_last_start = Date.now();
        }
        pause() {
            this.t_elapsed += Date.now() - this.t_last_start;
            this.status = StopwatchStatus.Paused;
        }
        getElapsed() {
            if (this.status === StopwatchStatus.Running) {
                return this.t_elapsed + Date.now() - this.t_last_start;
            }
            else {
                return this.t_elapsed;
            }
        }
        render() {
            let text1 = "";
            if (this.status === StopwatchStatus.Running) {
                text1 = "RUNNING";
            }
            else if (this.status === StopwatchStatus.Paused) {
                text1 = "PAUSED";
            }
            Ui_1.ui.setMessage("text1", text1);
            Ui_1.ui.setMessage("text2", "stopwatch");
            Ui_1.ui.setProgress(null);
            Ui_1.ui.renderClock(this.getElapsed());
        }
        input(key) {
            if (this.status === StopwatchStatus.Running) {
                if (key === " ") {
                    this.pause();
                }
            }
            else if (this.status === StopwatchStatus.Paused) {
                if (key === " ") {
                    this.start();
                }
                else if (key === "r") {
                    this.reset();
                }
            }
            else if (this.status === StopwatchStatus.Zero) {
                if (key === " ") {
                    this.start();
                }
            }
        }
    }
    exports.Stopwatch = Stopwatch;
});
