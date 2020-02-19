const getLatestArticleSummary = () => {
    const requestOptions = {
        method: 'GET',
    };
    return fetch("https://blog.thebgoodman.com/api/latestArticles?limit=1&order=descending", requestOptions)
        .then(response => response.text())
        .then(result => { return JSON.parse(result); })
        .catch(error => console.log('error', error));
};

var css = "#latest-article{width:99.4%;height:91.9%}";

class LatestBlogArticle extends HTMLElement {
    constructor() {
        super();
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${css}</style>
            <iframe id="latest-article"><iframe/>
        `;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.iframeRef = shadowRoot.querySelector("#latest-article");
    }
    static get observedAttributes() {
        return [];
    }
    connectedCallback() {
        getLatestArticleSummary()
            .then((latestArticleSummary) => {
            this.iframeRef.src = `https://blog.thebgoodman.com/article/${latestArticleSummary[0].canonicalTitle}`;
        });
    }
}
window.customElements.define("latest-blog-article", LatestBlogArticle);

export default LatestBlogArticle;
