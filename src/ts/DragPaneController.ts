export default class DragPaneController {

    public parentEl: HTMLDivElement;

    public dockedQty: number = 0;

    public dockedEl: Set<HTMLElement> = new Set();

    public readonly dragBarHeight = 40;

    constructor(){
        this.parentEl = document.querySelector<HTMLDivElement>("#main")!;

        this.parentEl.addEventListener('toggleminimize', (event: Event) => {
            if ((event.target! as any).minimized) {
                this.handleMinimize(event);
            } else {
                this.handleMaximize(event);
            }
        });

        window.addEventListener("resize", this.handleWindowResize)

    }

    private handleMinimize = (event: Event) => {
        const el = (event.target! as HTMLElement);
        const initialPos = {top: el.style.top, left: el.style.left};
        el.dataset.initialPos = JSON.stringify(initialPos);
        el.style.top = `${window.innerHeight - this.dragBarHeight - 20}px`;
        el.style.left = `${this.dockedQty * 20}px`;
        this.dockedQty ++;
        this.dockedEl.add(el);
    };

    private handleMaximize = (event: Event) => {
        const el = (event.target! as HTMLElement);
        this.dockedQty --;
        this.dockedEl.delete(el);
        const initialPos = el.dataset.initialPos;
        if (initialPos) {
            const initialPosObj = JSON.parse(initialPos);
            el.style.top = initialPosObj.top;
            el.style.left = initialPosObj.left;
        };
    };

    private handleWindowResize = () => {
        this.dockedEl.forEach( (el) => {
            el.style.top = `${window.innerHeight - this.dragBarHeight - 20}px`;
        });
    };
}