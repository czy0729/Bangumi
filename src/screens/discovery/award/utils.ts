/*
 * @Author: czy0729
 * @Date: 2019-08-20 15:05:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-13 12:30:32
 */
import { HTMLTrim } from '@utils'
import { HOST } from '@constants'
import resetStyle from './reset-style'

/** 访问静态 html 年鉴注入代码 */
const injectedStaticJavaScript = HTMLTrim(`(function(){
  setTimeout(() => {
    /* webview 的 postMessage 不是马上生效的 */
    var __timeoutId = null;
    var __isBridgeOk = false;

    function waitForBridge() {
      if (!__isBridgeOk && !window.ReactNativeWebView.postMessage) {
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

                window.ReactNativeWebView.postMessage(JSON.stringify({
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

/** 从 uri 提取年份 */
export function getAwardYear(uri: string) {
  const uris = uri.replace('/winner', '').split('/')
  return uris[uris.length - 1]
}

/** 构建请求地址 */
export function getAwardUrl(uri: string, year: string) {
  let url = `${HOST}/award/${year}`
  if (uri.includes('/winner')) url += '/winner'
  return url
}

/** 处理原始 html */
export function transformAwardHTML(rawHtml: string, year: string) {
  let html = rawHtml

  html = html.replace(/>\s+</g, '><')

  if (year !== '2022' && year !== '2023' && year !== '2025') {
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
  }

  html = html
    .replace(/href="javascript:void\(0\)"/g, '')
    .replace(/<div id="headerNeue2">(.+?)<div id="awardWrapper"/g, '<div id="awardWrapper"')
    .replace(/<div class="shareBtn">(.+?)<\/div>/, '')
    .replace(/<div id="dock">(.+?)<div id="robot"/g, '<div id="robot"')
    .replace(
      /<div id="main" class="png_bg"><div id="footer">(.+?)<\/div><div class="homeBg">/g,
      '</div><div class="homeBg">'
    )
    .replace(/\/r\/400\/pic/g, '/r/200/pic')

  html = `${html}
    <style>${resetStyle[year]}</style>
    <script>${injectedStaticJavaScript}</script>`

  return html.replace(/\/r\/400\/pic/g, '/r/200/pic')
}
