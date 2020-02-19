import {DragPane, CodeEdit, MinesweeperGame} from "./Interfaces/CustomElements";
import ApplicationInstance from "./ApplicationInstance";

export enum App {
    MINESWEEPER = "ms-app",
    CLOCK = "clock-app",
    CONSOLE = "console-app",
    LATEST_ARTICLE_VIEW = "latest-article-view",
};

export default class AppIconController {

    public iconRef: NodeListOf<HTMLDivElement>;
    public parentEl: HTMLDivElement;

    public msApp: ApplicationInstance<MinesweeperGame.Element>;
    public clockApp: ApplicationInstance;
    public markdownEditor: ApplicationInstance<CodeEdit.Element>;
    public latestArticleView: ApplicationInstance;

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

        this.markdownEditor = new ApplicationInstance(App.CONSOLE, "markdown-editor", "Markdown Editor", this.parentEl);
        this.markdownEditor.applicationEl.mode = CodeEdit.Mode.javascript;

        this.latestArticleView = new ApplicationInstance(App.LATEST_ARTICLE_VIEW, "latest-blog-article", "Latest Blog Article", this.parentEl);
        this.latestArticleView.openApp(); // open on page load
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
            case "markdown-editor-app":
                this.markdownEditor.openApp();
                break;
            case "blog-latest-view":
                this.latestArticleView.openApp();
            default:
                break;
        }
    };

}