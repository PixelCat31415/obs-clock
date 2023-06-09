// Stopwatch class for a stopwatch, with precision to seconds

import { Gadget } from "./Gadget";
import { ui } from "./Ui";

enum StopwatchStatus {
    Running,
    Paused,
    Zero,
}

export class Stopwatch implements Gadget {
    private status: StopwatchStatus;
    private t_elapsed: number;
    private t_last_start: number;

    constructor() {
        this.status = StopwatchStatus.Zero;
        this.t_elapsed = 0;
        this.t_last_start = 0;
    }

    private reset() {
        this.status = StopwatchStatus.Zero;
        this.t_elapsed = 0;
        this.t_last_start = 0;
    }

    private start() {
        this.status = StopwatchStatus.Running;
        this.t_last_start = Date.now();
    }

    private pause() {
        this.t_elapsed += Date.now() - this.t_last_start;
        this.status = StopwatchStatus.Paused;
    }

    private getElapsed() {
        if(this.status === StopwatchStatus.Running) {
            return this.t_elapsed + Date.now() - this.t_last_start;
        } else {
            return this.t_elapsed;
        }
    }

    public render() {
        let text1 = "";
        if(this.status === StopwatchStatus.Running) {
            text1 = "RUNNING";
        } else if(this.status === StopwatchStatus.Paused) {
            text1 = "PAUSED";
        }
        ui.setMessage("text1", text1);
        ui.setMessage("text2", "stopwatch");
        ui.setProgress(null);
        ui.renderClock(this.getElapsed());
    }

    public input(key: string) {
        if(this.status === StopwatchStatus.Running) {
            if(key === " ") {
                this.pause();
            }
        } else if(this.status === StopwatchStatus.Paused) {
            if(key === " ") {
                this.start();
            } else if(key === "r") {
                this.reset();
            }
        } else if(this.status === StopwatchStatus.Zero) {
            if(key === " ") {
                this.start();
            }
        }
    }
}
