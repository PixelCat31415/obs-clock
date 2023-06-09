// user interface manipulation

class Ui {
    public setMessage(id: string, msg: string) {
        let elem = document.getElementById(id);
        if (elem) elem.innerHTML = msg;
    }

    public setNumber(id: string, num: number) {
        let msg: string;
        if (num >= 0) {
            num = Math.floor(num);
            msg = `${Math.floor(num / 10) % 10}${num % 10}`;
        } else {
            msg = "--";
        }
        let elem = document.getElementById(id);
        if (elem) elem.innerHTML = msg;
    }

    public setUnderline(id: string, ul: boolean) {
        let elem = document.getElementById(id);
        if(!elem) return;
        if(ul) elem.style.textDecoration = "solid underline black 10px";
        else   elem.style.textDecoration = "none";
    }

    // null for hiding progress bar
    public setProgress(ratio: number | null) {
        let bar = document.getElementById("progress");
        if(!bar) return;

        if(ratio == null) {
            bar.style.visibility = "hidden";
        } else {
            bar.style.visibility = "visible";
            
            // clamp
            ratio = Math.min(1, ratio);
            ratio = Math.max(0, ratio);

            let bar_l = document.getElementById("progress1");
            let bar_r = document.getElementById("progress2");
            if(bar_l && bar_r) {
                bar_l.style.flexGrow = `${ratio}`;
                bar_r.style.flexGrow = `${1 - ratio}`;
            }
        }
    }

    // time is in milliseconds
    public renderClock(time: number) {
        this.setNumber("clock1", Math.floor(time / (1000 * 3600)));
        this.setNumber("clock2", Math.floor(time / (1000 * 60)) % 60);
        this.setNumber("clock3", Math.floor(time / 1000) % 60);
    }

    // TODO: color interpolation
}

export const ui = new Ui();
