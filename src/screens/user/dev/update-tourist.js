/*
 * @Author: czy0729
 * @Date: 2022-02-27 12:19:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-02-27 15:51:10
 */
import React, { useState, useEffect, useCallback } from 'react'
import { Image as RNImage } from 'react-native'
import cheerio from 'cheerio-without-node-native'
import ActivityIndicator from '@ant-design/react-native/lib/activity-indicator'
import { Touchable, Flex, Text, Input, Iconfont } from '@components'
import { ItemSetting } from '@_'
import { _ } from '@stores'
import { getTimestamp, urlStringify, open } from '@utils'
import { useObserver } from '@utils/hooks'
import { info } from '@utils/ui'
import axios from '@utils/thirdParty/axios'
import Base64 from '@utils/thirdParty/base64'
import { HOST, APP_ID, APP_SECRET, URL_OAUTH_REDIRECT } from '@constants'
import { put } from './db'

function UpdateTourist() {
  const [show, setShow] = useState(false)
  const [config, setConfig] = useState({})
  const [captcha, setCaptcha] = useState('')

  const onChange = useCallback(
    evt => {
      const { nativeEvent } = evt
      const { text } = nativeEvent
      setCaptcha(text)
    },
    [setCaptcha]
  )
  const onGetCofig = useCallback(async () => {
    if (!show) return

    setConfig(await getConfig())
    setCaptcha('')
  }, [show])
  const onLogin = useCallback(async () => {
    try {
      info('do login')

      const data = await doLogin(config, captcha)
      if (!data) info('login fail')

      await put({
        path: 'tourist.json',
        content: JSON.stringify(data)
      })
      info('update db success')
    } catch (error) {
      info('catch error: login fail')
    }
  }, [config, captcha])

  useEffect(() => {
    onGetCofig()
  }, [onGetCofig])

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <>
        <ItemSetting
          hd='Update Tourist'
          ft={
            <Touchable onPress={() => setShow(!show)}>
              <Text>使用</Text>
            </Touchable>
          }
          withoutFeedback
        />
        {show && (
          <Flex style={styles.container}>
            <Flex.Item>
              <Input
                style={styles.input}
                value={captcha}
                placeholder='验证码'
                onChange={onChange}
              />
            </Flex.Item>
            <Touchable style={styles.captchaTouch} onPress={onGetCofig}>
              <Flex style={styles.captchaContainer} justify='center'>
                {config.base64 ? (
                  <RNImage
                    style={styles.captcha}
                    source={{
                      uri: config.base64
                    }}
                  />
                ) : (
                  <ActivityIndicator size='small' />
                )}
              </Flex>
            </Touchable>
            <Touchable style={_.ml.md} onPress={onLogin}>
              <Iconfont name='md-check' />
            </Touchable>
            <Touchable
              style={_.ml.md}
              onPress={() =>
                open('https://gitee.com/a296377710/bangumi/commits/master/tourist.json')
              }
            >
              <Iconfont name='md-arrow-forward' />
            </Touchable>
          </Flex>
        )}
      </>
    )
  })
}

export default UpdateTourist

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingTop: _.xs,
    paddingHorizontal: _.wind,
    paddingBottom: _.md
  },
  input: {
    height: 40,
    paddingHorizontal: _.device(_.sm, _.md),
    ..._.device(_.fontSize12, _.fontSize15),
    backgroundColor: _.colorBg
  },
  captchaTouch: {
    marginLeft: _.sm,
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  },
  captchaContainer: {
    width: 118,
    height: 38
  },
  captcha: {
    width: 118,
    height: 38
  }
}))

function getCookie(setCookie) {
  const cookie = {}
  const setCookieKeys = [
    '__cfduid',
    'chii_sid',
    'chii_sec_id',
    'chii_cookietime',
    'chii_auth'
  ]
  setCookieKeys.forEach(item => {
    const reg = new RegExp(`${item}=(.+?);`)
    const match = setCookie.match(reg)
    if (match) cookie[item] = match[1]
  })
  return Object.keys(cookie)
    .map(item => `${item}=${cookie[item]}`)
    .join('; ')
}

async function getConfig() {
  const ua =
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'

  // get formhash
  axios.defaults.withCredentials = false
  const { data, headers } = await axios({
    method: 'get',
    url: `${HOST}/login`,
    headers: {
      'User-Agent': ua
    }
  })
  const cookie = getCookie(headers?.['set-cookie']?.[0])

  // get captcha
  const { request } = await axios({
    method: 'get',
    url: `${HOST}/signup/captcha?${getTimestamp()}`,
    headers: {
      Cookie: cookie,
      'User-Agent': ua
    },
    responseType: 'arraybuffer'
  })

  return {
    ua,
    cookie,
    formhash: data.match(/<input type="hidden" name="formhash" value="(.+?)">/)?.[1],
    base64: `data:image/gif;base64,${request?._response}`
  }
}

async function doLogin({ ua, cookie, formhash }, captcha) {
  axios.defaults.withCredentials = false

  // login web
  const { headers } = await axios({
    method: 'post',
    url: `${HOST}/FollowTheRabbit`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': ua,
      Cookie: cookie
    },
    data: urlStringify({
      formhash,
      referer: '',
      dreferer: '',
      email: Base64.atob('Mjk2Mzc3NzEwQHFxLmNvbQ=='),
      password: Base64.atob('ODQ3ODMwMTk='),
      captcha_challenge_field: captcha,
      loginsubmit: '登录'
    })
  })

  // oauth
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
    headers: {
      'User-Agent': ua,
      Cookie: getCookie(headers?.['set-cookie']?.[0])
    }
  })

  // authorize
  const { request } = await axios({
    method: 'post',
    maxRedirects: 0,
    validateStatus: null,
    url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': ua,
      Cookie: getCookie(headers?.['set-cookie']?.[0])
    },
    data: urlStringify({
      formhash: cheerio.load(data)('input[name=formhash]').attr('value'),
      redirect_uri: '',
      client_id: APP_ID,
      submit: '授权'
    })
  })

  // get access token
  let retryCount = 0
  async function retryGetAccessToken() {
    const { status, data } = await axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${HOST}/oauth/access_token`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': ua
      },
      data: urlStringify({
        grant_type: 'authorization_code',
        client_id: APP_ID,
        client_secret: APP_SECRET,
        code: request?.responseURL?.split('=').slice(1).join('='),
        redirect_uri: URL_OAUTH_REDIRECT,
        state: getTimestamp()
      })
    })

    if (status !== 200) {
      retryCount += 1
      if (retryCount > 5) return false
      return retryGetAccessToken()
    } else {
      return {
        tourist: 1,
        accessToken: data,
        userCookie: {
          cookie,
          userAgent: ua,
          v: 0,
          tourist: 0
        }
      }
    }
  }
  return retryGetAccessToken()
}
