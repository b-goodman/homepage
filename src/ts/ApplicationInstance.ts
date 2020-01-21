import {DragPane} from "./Interfaces/CustomElements";
import AppIconController, {App} from "./AppIconController";

export default class ApplicationInstance<AppType extends HTMLElement = HTMLElement> {

    public appID: App;
    public applicationEl: AppType;
    public paneWrapperEl: DragPane.Element;
    public parentEl: HTMLDivElement;

    constructor(app: App, tagName: string, paneHeading: string, parentEl: HTMLDivElement){
        this.appID = app;
        this.parentEl = parentEl;

        this.applicationEl = document.createElement(tagName) as AppType;
        this.paneWrapperEl = document.createElement("drag-pane") as DragPane.Element;
        this.paneWrapperEl.heading = paneHeading;
        this.paneWrapperEl.id = app;
        this.paneWrapperEl.className = "app-pane";
    }

    public openApp(){
        if (!AppIconController.openApps.has(this.appID)) {

            this.paneWrapperEl.appendChild(this.applicationEl);
            this.parentEl.appendChild(this.paneWrapperEl);

            AppIconController.openApps.set(this.appID, this.paneWrapperEl);
            AppIconController.activeApp = this.appID;

            this.paneWrapperEl.addEventListener("remove", () => {
                AppIconController.openApps.delete(this.appID);
            }, {once: true});

            this.paneWrapperEl.addEventListener("click", () => {
                if (AppIconController.activeApp !== this.appID && AppIconController.openApps.size > 1)
                this.moveToTop(this.appID);
            });
        }else {
            (AppIconController.openApps.get(this.appID) as DragPane.Element)?.toggleMinimized();
        }
    }

    private moveToTop = (app: App) => {
        AppIconController.openApps.forEach( (value, key) => {
            value.style.zIndex = "1";
        });
        AppIconController.openApps.get(app)!.style.zIndex = "2";
        AppIconController.activeApp = app;
    };
}