/*
 * @Author: czy0729
 * @Date: 2022-08-19 02:49:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-01-11 10:04:14
 */
import cheerio from 'cheerio-without-node-native'
import { getTimestamp, urlStringify } from '@utils'
import axios from '@utils/thirdParty/axios'
import Base64 from '@utils/thirdParty/base64'
import { HOST, APP_ID, APP_SECRET, URL_OAUTH_REDIRECT } from '@constants'

function getCookie(setCookie: string = '') {
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

export async function getConfig() {
  const ua =
    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Mobile Safari/537.36'

  // @ts-expect-error
  axios.defaults.withCredentials = false

  // get formhash
  // @ts-expect-error
  const { data, headers } = await axios({
    method: 'get',
    url: `${HOST}/login`,
    headers: {
      'User-Agent': ua
    }
  })
  const cookie = getCookie(headers?.['set-cookie']?.[0])

  // get captcha
  // @ts-expect-error
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

export async function doLogin({ ua = '', cookie = '', formhash = '' }, captcha) {
  // @ts-expect-error
  axios.defaults.withCredentials = false

  // login web
  // @ts-expect-error
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
      email: Base64.atob('c2F5YWlmb3J1OThAMTYzLmNvbQ=='), // Base64.atob('Mjk2Mzc3NzEwQHFxLmNvbQ==')
      password: Base64.atob('MTIzcXdlYXNkenhj'), // Base64.atob('ODQ3ODMwMTk=')
      captcha_challenge_field: captcha,
      loginsubmit: '登录'
    })
  })

  // oauth
  // @ts-expect-error
  const { data } = await axios({
    method: 'get',
    url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
    headers: {
      'User-Agent': ua,
      Cookie: getCookie(headers?.['set-cookie']?.[0])
    }
  })

  // authorize
  // @ts-expect-error
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
    // @ts-expect-error
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
