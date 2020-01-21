import {DragPane, CodeEdit, MinesweeperGame} from "./Interfaces/CustomElements";
import ApplicationInstance from "./ApplicationInstance";

export enum App {
    MINESWEEPER = "ms-app",
    CLOCK = "clock-app",
    CONSOLE = "console-app",
};

export default class AppIconController {

    public iconRef: NodeListOf<HTMLDivElement>;
    public parentEl: HTMLDivElement;

    public msApp: ApplicationInstance<MinesweeperGame.Element>;
    public clockApp: ApplicationInstance;
    public consoleApp: ApplicationInstance<CodeEdit.Element>;

    public static openApps: Map<App, HTMLElement> = new Map();
    public static activeApp: App|undefined = undefined;


    constructor(){
        this.iconRef = document.querySelectorAll<HTMLDivElement>(".click-icon");
        this.parentEl = document.querySelector<HTMLDivElement>("#main")!;

        this.iconRef.forEach( (el) => {
            el.addEventListener("dblclick", this.handleIconDblClick);
        });


        this.msApp = new ApplicationInstance<MinesweeperGame.Element>(App.MINESWEEPER, "minesweeper-game", "Minesweeper", this.parentEl);
        this.msApp.applicationEl.width = 10;
        this.msApp.applicationEl.height = 10;
        this.msApp.applicationEl.scale = 0.6;

        this.clockApp = new ApplicationInstance(App.CLOCK, "date-clock", "Clock", this.parentEl);

        this.consoleApp = new ApplicationInstance(App.CONSOLE, "code-edit", "Console", this.parentEl);
        this.consoleApp.applicationEl.mode = CodeEdit.Mode.javascript;
    }

    private handleIconDblClick = (event: MouseEvent) => {
        const appID = (event.currentTarget as HTMLDivElement).dataset.appName;
        switch (appID) {
            case "ms-app":
                this.msApp.openApp();
                break;
            case "clock-app":
                this.clockApp.openApp();
                break;
            case "console-app":
                this.consoleApp.openApp();
                break;
            default:
                console.log(appID);
                break;
        }
    };

}