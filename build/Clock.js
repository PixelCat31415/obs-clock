// Clock class for a clock (yes it's just a clock)
define(["require", "exports", "./Ui"], function (require, exports, Ui_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Clock = void 0;
    class Clock {
        render() {
            let time = new Date(Date.now());
            let date = `${time.getFullYear()}-${time.getMonth() + 1}-${time.getDate()}`;
            Ui_1.ui.setMessage("text1", date);
            Ui_1.ui.setMessage("text2", "clock");
            Ui_1.ui.setNumber("clock1", time.getHours());
            Ui_1.ui.setNumber("clock2", time.getMinutes());
            Ui_1.ui.setNumber("clock3", time.getSeconds());
            Ui_1.ui.setProgress(null);
        }
        input(key) { }
    }
    exports.Clock = Clock;
});
