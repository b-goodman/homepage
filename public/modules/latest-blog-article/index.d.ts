declare class LatestBlogArticle extends HTMLElement {
    static get observedAttributes(): never[];
    constructor();
    connectedCallback(): void;
    private iframeRef;
}

export default LatestBlogArticle;
