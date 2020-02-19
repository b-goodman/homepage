declare class MarkdownEditor extends HTMLElement {
    static get observedAttributes(): never[];
    constructor();
    connectedCallback(): void;
    disconnecetdCallback(): void;
    private handleConversion;
    private codeEditRef;
    private outputRef;
}

export default MarkdownEditor;
