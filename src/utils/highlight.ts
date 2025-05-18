/* eslint-disable @typescript-eslint/no-explicit-any */
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import bash from "highlight.js/lib/languages/bash";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import css from "highlight.js/lib/languages/css";
import json from "highlight.js/lib/languages/json";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("sh", bash);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("html", xml);
hljs.registerLanguage("scss", scss);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);

// ----------------------------------------------------------------------

declare global {
  interface Window {
    hljs: any;
  }
}

if (typeof window !== "undefined") {
  window.hljs = hljs;
}
