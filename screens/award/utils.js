/*
 * @Author: czy0729
 * @Date: 2019-08-20 15:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-20 15:54:21
 */
import { HTMLTrim } from '@utils/html'
import resetStyle from './reset-style'

export function injectedJavaScript({
  uri,
  cookie = '',
  redirectMaxCount,
  year
}) {
  return `(function(){
    // 注入cookie
    document.cookie = "${cookie}";

    // 注入优化样式
    var resetStyle = document.createElement("style");
    try {
      resetStyle.appendChild(document.createTextNode("${HTMLTrim(
        resetStyle[year]
      )}"));
    } catch(ex){
    }
    document.body.append(resetStyle);

    // webview的postMessage不是马上生效的
    var __isBridgeOk = false;
    var __timeoutId = null;
    function waitForBridge() {
      if (!__isBridgeOk && window.postMessage.length !== 1) {
        __timeoutId = setTimeout(waitForBridge, 400);
      } else {
        __isBridgeOk = true;

        clearTimeout(__timeoutId);
        __timeoutId = null;

        // onload
        window.postMessage(JSON.stringify({
          type: "onload",
          data: {
            href: document.location.href,
          }
        }));

        setTimeout(() => {
          // 插入cookie不会马上生效, 某些页面没有cookie不能访问, 会自动跳转
          // 一直循环跳转直到目标页面的url和预定的一致时, 再设置显示标志
          const loaded = ${this.loaded};
          if (!loaded && window.location.href !== "${uri}") {
            if (${this.redirectCount} < ${redirectMaxCount}) {
              window.location = "${uri}";
            }
          }

          // 由于现在安卓的webview没有能阻止跳转的办法, 把href抹掉后加postMessage解决
          var aNodes = document.getElementsByTagName("a");
          for (let i = 0; i < aNodes.length; i++) {
            let href = aNodes[i].href;
            if (href) {
              aNodes[i].setAttribute("data-href", aNodes[i].href);
              aNodes[i].removeAttribute("href");
              aNodes[i].addEventListener("click", function () {
                window.postMessage(JSON.stringify({
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

    setTimeout(() => {
      waitForBridge();
    }, 0);
  }());`
}
