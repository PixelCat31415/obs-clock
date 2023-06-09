// Clock class for a clock (yes it's just a clock)

import { Gadget } from "./Gadget";
import { ui } from "./Ui";

export class Clock implements Gadget {
    public render() {
        let time = new Date(Date.now());
        let date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
        ui.setMessage("text1", date);
        ui.setMessage("text2", "clock");
        ui.setNumber("clock1", time.getHours());
        ui.setNumber("clock2", time.getMinutes());
        ui.setNumber("clock3", time.getSeconds());
        ui.setProgress(null);
    }

    public input(key: string) {}
}
