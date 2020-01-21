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

export namespace CodeEdit {
    export enum Mode {
        htmlmixed = "htmlmixed",
        javascript = "javascript",
        typescript = "typescript",
        markdown = "markdown"
    }
    export interface Element extends HTMLElement {
        mode: Mode;
        storageKey: string | undefined;
    }
}
