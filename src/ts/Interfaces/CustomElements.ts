export namespace DragPane {
    export interface Element extends HTMLElement {
        heading: string;
        toggleMinimized: () => void;
    }
}

export namespace MinesweeperGame {
    export interface Element extends HTMLElement {
        width: number;
        height: number;
        scale: number;
    }
}