import {DragPane, MinesweeperGame} from "./Interfaces/CustomElements";

enum App {
    MINESWEEPER = "ms-app",
    CLOCK = "clock-app",
};

export default class AppIconController {

    public iconRef: NodeListOf<HTMLDivElement>;
    public parentEl: HTMLDivElement;

    public openApps: Map<App, HTMLElement> = new Map();

    public activeApp: App|undefined = undefined;


    constructor(){
        this.iconRef = document.querySelectorAll<HTMLDivElement>(".click-icon");
        this.parentEl = document.querySelector<HTMLDivElement>("#main")!;

        this.iconRef.forEach( (el) => {
            el.addEventListener("dblclick", this.handleIconDblClick);
        });
    }

    private moveToTop = (app: App) => {
        // this.parentEl.appendChild(el)
        this.openApps.forEach( (value, key) => {
            value.style.zIndex = "1";
        });
        this.openApps.get(app)!.style.zIndex = "2";
        this.activeApp = app;
    };

    private handleIconDblClick = (event: MouseEvent) => {
        const appID = (event.currentTarget as HTMLDivElement).id;
        switch (appID) {
            case "ms-app":
                this.openMsApp();
                break;
            case "clock-app":
                this.openClockApp();
                break;
            default:
                console.log(appID);
                break;
        }
    };

    private openMsApp(){
        if (!this.openApps.has(App.MINESWEEPER)) {
            const pane = document.createElement("drag-pane") as DragPane.Element;
            pane.heading = "Minesweeper";
            pane.id = App.MINESWEEPER;
            pane.className = "app-pane";

            const msGame = document.createElement("minesweeper-game") as MinesweeperGame.Element;
            msGame.width = 10;
            msGame.height = 10;
            msGame.scale = 0.6;

            pane.appendChild(msGame);
            this.parentEl.appendChild(pane);

            this.openApps.set(App.MINESWEEPER, pane);
            this.activeApp = App.MINESWEEPER;

            pane.addEventListener("remove", () => {
                this.openApps.delete(App.MINESWEEPER);
            }, {once: true});

            pane.addEventListener("click", () => {
                if (this.activeApp !== App.MINESWEEPER && this.openApps.size > 1 )
                this.moveToTop(App.MINESWEEPER);
            });
        } else {
            (this.openApps.get(App.MINESWEEPER) as DragPane.Element)?.toggleMinimized();
        }
    };

    private openClockApp(){
        if (!this.openApps.has(App.CLOCK)) {
            const pane = document.createElement("drag-pane") as DragPane.Element;
            pane.heading = "Clock";
            pane.id = App.CLOCK;
            pane.className = "app-pane";

            const clock = document.createElement("date-clock");

            pane.appendChild(clock);
            this.parentEl.appendChild(pane);

            this.openApps.set(App.CLOCK, pane);
            this.activeApp = App.CLOCK;

            pane.addEventListener("remove", () => {
                this.openApps.delete(App.CLOCK);
            }, {once: true});

            pane.addEventListener("click", () => {
                if (this.activeApp !== App.CLOCK && this.openApps.size > 1)
                this.moveToTop(App.CLOCK);
            });

        }else {
            (this.openApps.get(App.CLOCK) as DragPane.Element)?.toggleMinimized();
        }
    }

}