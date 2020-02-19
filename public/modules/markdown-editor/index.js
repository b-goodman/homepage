/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var options = {
    omitExtraWLInCodeBlocks: true,
    tables: true,
    noHeaderId: true,
};

var syntaxHighlight = function () {
    return [
        {
            type: 'lang',
            regex: /```(\w+)\n([^]+?)```/gi,
            replace: '<syntax-highlight class="language-$1"><pre><code class="language-$1">$2</code></pre></syntax-highlight>'
        },
        {
            type: 'lang',
            regex: /```([^]+?)```/gi,
            replace: '<syntax-highlight class="language-text"><pre><code class="language-text">$1</code></pre></syntax-highlight>'
        },
        {
            type: 'output',
            regex: /<p>(<syntax-highlight[^]+<\/syntax-highlight>)<\/p>/gi,
            replace: '$1'
        },
    ];
};

var tabPane = function () {
    return [
        {
            type: 'lang',
            regex: /\[([^\]]+)\]\s?->\s?\[([^\]]+)\]/gi,
            replace: '<div data-tab="$1">$2</div>'
        },
        {
            type: 'lang',
            regex: /@tab\s+position=(\w+)([^]+)@\/tab/,
            replace: '<tab-pane tab-position="$1">$2</tab-pane>',
        },
        {
            type: 'lang',
            regex: /@tab([^]+)@\/tab/,
            replace: '<tab-pane tab-position="top">$1</tab-pane>',
        },
        {
            type: "output",
            regex: /<p><tab-pane (tab-position="\w+")?>\s?<\/p>/gi,
            replace: '<tab-pane $1>',
        },
        {
            type: "output",
            regex: /<p><\/tab-pane><\/p>/gi,
            replace: '</tab-pane>',
        }
    ];
};

var extensions = [
    syntaxHighlight,
    tabPane,
];

var markdownParser = import('./showdown-c3fed699-e242bee8.js').then(function (showdown) {
    return new showdown.default.Converter(__assign({ extensions: __spreadArrays(extensions) }, options));
});

var css = ":host{display:block;height:100%}.v-split{display:flex;flex-direction:row}.v-split #output{padding:5px;border:1px solid #000;overflow-y:scroll}.v-split #output,.v-split code-edit{width:540px;height:540px}";

class MarkdownEditor extends HTMLElement {
    constructor() {
        super();
        this.handleConversion = () => {
            markdownParser.then((converter) => __awaiter(this, void 0, void 0, function* () {
                const input = yield this.codeEditRef.getValue();
                const html = converter.makeHtml(input);
                this.outputRef.innerHTML = html;
            }));
        };
        const template = document.createElement('template');
        template.innerHTML = `
            <style>${css}</style>
            <div class="v-split">
                <code-edit id="input" mode="markdown" storage-key="ce-1"></code-edit>
                <div id="output" class="article"></div>
            </div>
        `;
        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.appendChild(template.content.cloneNode(true));
        this.codeEditRef = this.shadowRoot.querySelector("#input");
        this.outputRef = this.shadowRoot.querySelector("#output");
        this.codeEditRef.addEventListener("keydown", this.handleConversion);
    }
    static get observedAttributes() {
        return [];
    }
    connectedCallback() {
        this.codeEditRef.addEventListener("keydown", this.handleConversion);
    }
    disconnecetdCallback() {
        this.codeEditRef.removeEventListener("keydown", this.handleConversion);
    }
}
window.customElements.define("markdown-editor", MarkdownEditor);

export default MarkdownEditor;
