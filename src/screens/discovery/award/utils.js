/*
 * @Author: czy0729
 * @Date: 2019-08-20 15:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-09-27 17:42:49
 */
import { HTMLTrim } from '@utils/html'
import { SDK } from '@constants'

/**
 * 访问静态html年鉴注入代码
 */
export const injectedStaticJavaScript = HTMLTrim(`(function(){
  setTimeout(() => {
    /* webview的postMessage不是马上生效的 */
    var __timeoutId = null;
    var __isBridgeOk = false;

    function waitForBridge() {
      if (!__isBridgeOk && !window${
        SDK >= 36 ? '.ReactNativeWebView' : ''
      }.postMessage) {
        __timeoutId = setTimeout(waitForBridge, 400);
      } else {
        clearTimeout(__timeoutId);
        __timeoutId = null;
        __isBridgeOk = true;

        setTimeout(() => {
          /* 由于现在安卓的webview没有能阻止跳转的办法, 把href抹掉后加postMessage解决 */
          var aNodes = document.getElementsByTagName("a");
          for (let i = 0; i < aNodes.length; i++) {
            let href = aNodes[i].href;
            if (href) {
              aNodes[i].setAttribute("data-href", aNodes[i].href);
              aNodes[i].removeAttribute("href");
              aNodes[i].addEventListener("click", function () {
                window${
                  SDK >= 36 ? '.ReactNativeWebView' : ''
                }.postMessage(JSON.stringify({
                  type: "onclick",
                  data: {
                    href: href,
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
