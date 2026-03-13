/*
 * @Author: czy0729
 * @Date: 2022-09-29 18:18:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-29 18:38:50
 */
import { HOST_AC_API } from '@constants'

export const TYPE_CHECK_LOGIN = 'CHECK_LOGIN'

export const TYPE_GET_LIST = 'GET_LIST'

export const TYPE_GET_REVIEW = 'GET_REVIEW'

export function injectedJavaScript() {
  return `(function() {
    setTimeout(() => {
      /* webview的postMessage不是马上生效的 */
      let __timeoutId = null;
      let __isBridgeOk = false;

      function waitForBridge() {
        if (!__isBridgeOk && !window.ReactNativeWebView.postMessage) {
          __timeoutId = setTimeout(waitForBridge, 400);
        } else {
          clearTimeout(__timeoutId);
          __timeoutId = null;
          __isBridgeOk = true;

          setTimeout(() => {
            ${injectedUtils()};
            ${injectedCheckLogin()};
            ${injectedGetList()};
            ${injectGetReview()};
            checkLogin();
          }, 4000);
        }
      }

      waitForBridge();
    }, 1000);
  }());`
}

function injectedUtils() {
  return `function xhr({ method = 'get', url } = {}) {
    return new Promise(resolve => {
      const request = new XMLHttpRequest()
      request.onreadystatechange = function () {
        if (this.readyState === 4) {
          if (this.status === 200 || this.status === 201) {
            resolve(JSON.parse(this.responseText))
          }

          if (this.status === 404 || this.status === 500) {
            resolve(null)
          }
        }
      }
      request.onerror = function () {
        resolve(null)
      }
      request.ontimeout = function () {
        resolve(null)
      }
      request.onabort = function () {
        resolve(null)
      }
      request.open(method, url, true)
      request.withCredentials = true
      request.send(null)
    })
  }

  function postMessage(type, data) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }))
  }

  function ts() {
    return String(new Date()/1);
  }

  function queue(fetchs) {
    return new Promise(resolve => {
      function cb() {
        if (!fetchs.length) {
          resolve(true);
          return;
        }

        const fetch = fetchs.shift();
        fetch().then(() => cb(fetchs));
      }
      cb();
    });
  }`
}

function injectedCheckLogin() {
  return `function checkLogin() {
    xhr({
      url: '${HOST_AC_API}/x/web-interface/nav'
    }).then(data => {
      if (data) postMessage('${TYPE_CHECK_LOGIN}', data);
      if (data && data.data && data.data.isLogin) {
        getList(data.data.wallet.mid);
      }
    });
  }`
}

function injectedGetList() {
  return `const list = [];
    const limit = 15;
    let page = 1;
    function getList(mid) {
      xhr({
        url: '${HOST_AC_API}/x/space/bangumi/follow/list?type=1&follow_status=0&pn='+page+'&ps='+limit+'&vmid='+String(mid)+'&ts='+ts()
      }).then(data => {
        if (data && data.data && data.data.list) {
          data.data.list.forEach(item => {
            list.push({
              id: item.media_id,
              title: item.title,
              cover: item.cover,
              status: item.follow_status,
              progress: item.progress,
              total: item.total_count
            });
          });

          if (data.data.list.length >= limit) {
            page += 1;
            getList(mid);
          } else {
            postMessage('${TYPE_GET_LIST}', list);

            const mediaIds = list.map(item => item.id);
            getReviews(mediaIds);
          }
        }
      });
    }`
}

function injectGetReview() {
  return `function getReviews(mediaIds) {
    const reviews = {};
    const fetchs = [];
    mediaIds.forEach(mediaId => {
      fetchs.push(() => {
        return new Promise(resolve => {
          xhr({
            url: '${HOST_AC_API}/pgc/review/user?media_id='+String(mediaId)+'&ts='+ts()
          }).then(data => {
            if (data && data.result && data.result.review && data.result.review.short_review) {
              const { short_review } = data.result.review;
              reviews[mediaId] = {
                score: short_review.score || 0,
                content: short_review.content || ''
              };
            }
            resolve(true);
          });
        });
      });
    });

    queue(fetchs).then(() => {
      postMessage('${TYPE_GET_REVIEW}', reviews);
    });
  }`
}
