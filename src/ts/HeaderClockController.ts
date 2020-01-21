export default class HeaderClockController {

    el: HTMLDivElement;

    is24Hr: boolean = true;
    monthFormat: "short"|"long" = "short";

    dayNames: Map<number, string> = new Map([
        [0, "Sunday"],
        [1, "Monday"],
        [2, "Tuesday"],
        [3, "Wednesday"],
        [4, "Thursday"],
        [5, "Friday"],
        [6, "Saturday"],
    ]);

    monthNames: Map<number, {long:string, short:string}> = new Map([
        [0, {long:"January", short:"Jan"}],
        [1, {long:"February", short:"Feb"}],
        [2, {long:"March", short:"Mar"}],
        [3, {long:"April", short:"Apr"}],
        [4, {long:"May", short:"May"}],
        [5, {long:"June", short:"Jun"}],
        [6, {long:"July", short:"Jul"}],
        [7, {long:"August", short:"Aug"}],
        [8, {long:"September", short:"Sep"}],
        [9, {long:"October", short:"Oct"}],
        [10, {long:"November", short:"Nov"}],
        [10, {long:"December", short:"Dec"}],
    ]);

    constructor(){
        this.el = document.querySelector<HTMLDivElement>("#header-clock")!;
        this.setDateTime();
        window.setInterval(() => this.setDateTime(), 1000);
    }

    public buildDateTime(){
        const date = new Date();
        const dayName = this.dayNames.get(date.getDay());
        const dateNumber = date.getDate();
        const monthName = this.monthNames.get(date.getMonth())![this.monthFormat];
        const hours = (this.is24Hr ? date.getHours() : date.getHours()%12).toString();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        return `${dayName} ${monthName} ${dateNumber} ${hours}:${minutes}:${seconds}`
    }

    public setDateTime(){
        this.el.innerText = this.buildDateTime();
    }
}