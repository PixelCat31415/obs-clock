// Timer class for a countdown timer

import { Gadget } from "./Gadget";
import { ui } from "./Ui";

enum TimerStatus {
    Ongoing,
    Paused,
    Finished,
    Edit,
}

enum DisplayMode {
    Forward,
    Backward,
}

export class Timer implements Gadget {
    private status: TimerStatus;
    private display: DisplayMode;
    private t_start: number;
    private t_paused: number;
    private t_last_pause: number;
    private t_total: number;
    private edit_mode: number;
    private edit: Array<number>;
    private last_edit: boolean;

    constructor() {
        this.status = TimerStatus.Paused;
        this.display = DisplayMode.Backward;

        this.t_total = 5 * 60 * 60 * 1000;  // 5 hours
        this.t_start = this.t_paused = this.t_last_pause = 0;

        this.edit_mode = 0;
        this.edit = [0, 0, 0];
        this.last_edit = false;
    }

    private reset(total: number | null) {
        if (total !== null) {
            this.t_total = total;
        }
        this.status = TimerStatus.Paused;
        this.t_start = this.t_last_pause = Date.now();
        this.t_paused = 0;
    }

    private resume() {
        this.status = TimerStatus.Ongoing;
        this.t_paused += Date.now() - this.t_last_pause;
    }

    private pause() {
        this.tick();
        this.status = TimerStatus.Paused;
        this.t_last_pause = Date.now();
    }

    private getRemaining() {
        let elapsed: number = 0;
        if(this.status === TimerStatus.Ongoing) {
            elapsed = Date.now() - this.t_start - this.t_paused;
        } else {
            elapsed = this.t_last_pause - this.t_start - this.t_paused;
        }
        return this.t_total - elapsed;
    }

    private tick() {
        if (this.status !== TimerStatus.Ongoing) return;

        let rem = this.getRemaining();
        if (rem <= 0) {
            this.status = TimerStatus.Finished;
            this.t_paused = 0;
            this.t_last_pause = this.t_start + this.t_total;
        }
    }

    public render() {
        this.tick();

        let text1 = "";
        let time: number;

        if (this.display === DisplayMode.Backward) {
            time = this.getRemaining();
        } else {
            time = this.t_total - this.getRemaining();
        }

        for (let i = 0; i < 3; i++) ui.setUnderline(`clock${i + 1}`, false);

        if (this.status === TimerStatus.Ongoing) {
            let ms_due = Date.now() + this.getRemaining();
            let due = new Date(ms_due).toTimeString().substring(0, 8);
            text1 = `DUE ${due}`;
        } else if (this.status === TimerStatus.Paused) {
            text1 = "PAUSED";
        } else if (this.status === TimerStatus.Finished) {
            text1 = "TIME'S UP";
        } else {
            text1 = "SET TIMER";
            time = 0;
            for (let i of this.edit) time = time * 60 + i;
            time = time * 1000;
            ui.setUnderline(`clock${this.edit_mode + 1}`, true);
        }

        ui.renderClock(time);
        ui.setMessage("text1", text1);
        ui.setMessage("text2", "timer");
        ui.setProgress(1 - this.getRemaining() / this.t_total);
    }

    public input(key: string) {
        if (this.status === TimerStatus.Ongoing) {
            if (key === " ") {
                this.pause();
            }
        } else if (this.status === TimerStatus.Paused) {
            if (key === " ") {
                this.resume();
            } else if (key === "r") {
                this.reset(null);
            } else if (key === "e") {
                this.status = TimerStatus.Edit;
            }
        } else if (this.status === TimerStatus.Finished) {
            if (key === "r") {
                this.reset(null);
            } else if (key === "e") {
                this.status = TimerStatus.Edit;
            }
        } else if (this.status === TimerStatus.Edit) {
            if (!isNaN(Number(key))) {
                let num = Number(key);
                if (!this.last_edit) {
                    this.last_edit = true;
                    this.edit[this.edit_mode] = num;
                } else {
                    let k = this.edit[this.edit_mode];
                    k = k * 10 + num;
                    if (this.edit_mode == 0) {
                        k = Math.min(k, 99);
                    } else {
                        k = Math.min(k, 59);
                    }
                    this.edit[this.edit_mode] = k;
                }
            } else if(key.startsWith("Arrow")) {
                let mode = this.edit_mode;
                if (key === "ArrowLeft") mode--;
                if (key === "ArrowRight") mode++;
                mode = Math.min(mode, 2);
                mode = Math.max(mode, 0);

                this.last_edit = false;
                this.edit_mode = mode;
            } else if (key === "Enter") {
                let total = 0;
                for (let i of this.edit) total = total * 60 + i;
                this.reset(total * 1000);
                this.edit_mode = 0;
                this.edit = [0, 0, 0];
                this.last_edit = false;
            } else if (key === "e" || key === "Escape") {
                if (this.getRemaining() <= 0) {
                    this.status = TimerStatus.Finished;
                } else {
                    this.status = TimerStatus.Paused;
                }
                this.edit_mode = 0;
                this.edit = [0, 0, 0];
                this.last_edit = false;
            }
        }

        // toggle display mode
        if (key === "d") {
            if (this.display === DisplayMode.Backward) {
                this.display = DisplayMode.Forward;
            } else {
                this.display = DisplayMode.Backward;
            }
        }
    }
}
