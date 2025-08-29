/*
 * @Author: czy0729
 * @Date: 2019-08-20 15:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-02-12 04:18:29
 */
import { HTMLTrim } from '@utils'
import { SDK } from '@constants'

/** 访问静态 html 年鉴注入代码 */
export const injectedStaticJavaScript = HTMLTrim(`(function(){
  setTimeout(() => {
    /* webview 的 postMessage 不是马上生效的 */
    var __timeoutId = null;
    var __isBridgeOk = false;

    function waitForBridge() {
      if (!__isBridgeOk && !window${SDK >= 36 ? '.ReactNativeWebView' : ''}.postMessage) {
        __timeoutId = setTimeout(waitForBridge, 400);
      } else {
        clearTimeout(__timeoutId);
        __timeoutId = null;
        __isBridgeOk = true;

        setTimeout(() => {
          /* 由于现在安卓的 webview 没有能阻止跳转的办法, 把 href 抹掉后加 postMessage 解决 */
          var aNodes = document.getElementsByTagName("a");
          for (let i = 0; i < aNodes.length; i++) {
            let href = aNodes[i].href;
            if (href && !href.includes("#")) {
              aNodes[i].setAttribute("data-href", aNodes[i].href);
              aNodes[i].removeAttribute("href");
              aNodes[i].addEventListener("click", function () {
                var innerHTML = "";
                var nextInnerHTML = "";
                try {
                  innerHTML = aNodes[i].innerHTML;
                  nextInnerHTML = aNodes[i].nextElementSibling.innerHTML
                } catch (ex) {}

                window${SDK >= 36 ? '.ReactNativeWebView' : ''}.postMessage(JSON.stringify({
                  type: "onclick",
                  data: {
                    href: href,
                    innerHTML: innerHTML,
                    nextInnerHTML: nextInnerHTML
                  }
                }));
              })
            }
          }
        }, 0);
      }
    }

    waitForBridge();
  }, 1000)
}());`)
