/*
 * @Author: czy0729
 * @Date: 2022-02-18 06:37:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-27 11:50:35
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import { WebView } from 'react-native-webview'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { useObserver } from '@utils/hooks'
import Btn from './btn'

const TYPE_CHECK_LOGIN = 'CHECK_LOGIN'
const TYPE_GET_LIST = 'GET_LIST'
const TYPE_GET_REVIEW = 'GET_REVIEW'
const URL_ZONE = 'https://m.bilibili.com/space?from=headline'

let length

function Login({ hide, onToggleHide, setData, setReviews }) {
  const [key, setKey] = useState(0)
  const [message, setMessage] = useState('检查状态中...')
  const onMessage = useCallback(
    event => {
      const { type, data } = JSON.parse(event.nativeEvent.data)
      switch (type) {
        case TYPE_CHECK_LOGIN:
          setMessage(data?.data?.isLogin ? '已登录' : '检查登录状态失败，请先登录')
          break

        case TYPE_GET_LIST:
          setMessage('已获取番剧列表')
          setData(data)
          length = data.length
          break

        case TYPE_GET_REVIEW:
          setMessage(`已获取${length}个番剧信息，请收起登录框进行操作`)
          setReviews(data)
          break

        default:
          break
      }
    },
    [setData, setReviews]
  )
  const onRefresh = useCallback(() => {
    setMessage('检查状态中...')
    setKey(key + 1)
  }, [key])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        {!hide && <View style={styles.mask} />}
        <View style={[styles.fixed, hide && styles.hide]}>
          <View style={styles.container}>
            <WebView
              key={key}
              source={{
                uri: URL_ZONE
              }}
              containerStyle={[styles.webview, hide && styles.webviewHide]}
              androidHardwareAccelerationDisabled
              androidLayerType='software'
              javaScriptEnabled
              injectedJavaScript={injectedJavaScript()}
              onMessage={onMessage}
            />
          </View>
          <View style={styles.body}>
            <Text bold size={15}>
              {message}
            </Text>
            <Text style={_.mt.md} size={11} type='sub'>
              因bilibili对鉴权信息做了保护加密，目前同步番剧需要通过在WebView内部发起带鉴权的请求，获得数据后通知APP。
            </Text>
            <Text style={_.mt.sm} size={11} type='sub'>
              完成同步前需要一直保持bilibil登录状态，完成后你可以手动登出账号。
            </Text>
            <Flex style={_.mt.md} justify='center'>
              <Btn
                style={styles.btn}
                btnStyle={styles.btnStyle}
                text='重新获取数据'
                size={13}
                onPress={onRefresh}
              />
              <Btn
                style={[styles.btn, _.ml.lg]}
                btnStyle={styles.btnStyle}
                text='收起登录框'
                size={13}
                onPress={onToggleHide}
              />
            </Flex>
          </View>
        </View>
      </>
    )
  })
}

export default Login

const memoStyles = _.memoStyles(() => {
  return {
    mask: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: 0,
      bottom: 0,
      left: 0
    },
    fixed: {
      position: 'absolute',
      zIndex: 2,
      top: 0,
      right: _.wind,
      width: _.window.contentWidth,
      backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel2),
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    hide: {
      top: _.sm,
      right: _.sm,
      width: 1,
      height: 1,
      backgroundColor: 'transparent',
      overflow: 'hidden'
    },
    container: {
      minHeight: 400,
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    webview: {
      borderRadius: _.radiusMd,
      overflow: 'hidden'
    },
    webviewHide: {
      opacity: 0.01
    },
    body: {
      paddingTop: 20,
      paddingHorizontal: _.md,
      paddingBottom: 28
    },
    iconToggle: {
      position: 'absolute',
      zIndex: 2,
      top: 1,
      right: 0
    },
    btn: {
      width: 128
    },
    btnStyle: {
      height: 40
    }
  }
})

function injectedJavaScript() {
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
      url: 'https://api.bilibili.com/x/web-interface/nav'
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
        url: 'https://api.bilibili.com/x/space/bangumi/follow/list?type=1&follow_status=0&pn='+page+'&ps='+limit+'&vmid='+String(mid)+'&ts='+ts()
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
            url: 'https://api.bilibili.com/pgc/review/user?media_id='+String(mediaId)+'&ts='+ts()
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
