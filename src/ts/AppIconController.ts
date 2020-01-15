import {DragPane, MinesweeperGame} from "./CustomElements";

enum App {
    MINESWEEPER = "ms-app",
};

export default class AppIconController {

    public iconRef: NodeListOf<HTMLDivElement>;
    public parentEl: HTMLDivElement;

    public openApps: Map<App, HTMLElement> = new Map();


    constructor(){
        this.iconRef = document.querySelectorAll<HTMLDivElement>(".click-icon");
        this.parentEl = document.querySelector<HTMLDivElement>("#main")!;

        this.iconRef.forEach( (el) => {
            el.addEventListener("dblclick", this.handleIconDblClick);
        })
    }

    private handleIconDblClick = (event: MouseEvent) => {
        const appID = (event.currentTarget as HTMLDivElement).id;
        switch (appID) {
            case "ms-app":
                this.openMsApp();
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

            const msGame = document.createElement("minesweeper-game") as MinesweeperGame.Element;
            msGame.width = 10;
            msGame.height = 10;
            msGame.scale = 0.6;

            pane.appendChild(msGame);
            this.parentEl.appendChild(pane);

            this.openApps.set(App.MINESWEEPER, pane);
            pane.addEventListener("remove", () => {
                this.openApps.delete(App.MINESWEEPER);
            }, {once: true})
        } else {
            (this.openApps.get(App.MINESWEEPER) as DragPane.Element)?.toggleMinimized();
        }
    };

}