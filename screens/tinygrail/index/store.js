/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-10 20:42:47
 */
import cheerio from 'cheerio-without-node-native'
import axios from 'axios'
import { observable, computed } from 'mobx'
import { userStore, tinygrailStore } from '@stores'
import { urlStringify } from '@utils'
import store from '@utils/store'
import {
  HOST,
  TINYGRAIL_APP_ID,
  TINYGRAIL_OAUTH_REDIRECT_URL
} from '@constants'
import { API_TINYGRAIL_LOGOUT } from '@constants/api'
import _ from '@styles'

export const sectionWidth = (_.window.width - _.wind * 3) / 2
export const sectionHeight = sectionWidth / 1.68

axios.defaults.withCredentials = true

export default class ScreenTinygrail extends store {
  state = observable({
    info: ''
  })

  formhash = ''

  init = async () => {
    let res = tinygrailStore.fetchAssets()
    const { _loaded } = await res
    if (!_loaded) {
      await this.doAuth()
      res = tinygrailStore.fetchAssets()
    }
    return res
  }

  // -------------------- get --------------------
  @computed get userCookie() {
    return userStore.userCookie
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  // -------------------- action --------------------
  /**
   * 小圣杯授权
   */
  doAuth = async () => {
    await this.logout()
    await this.oauth()
    await this.authorize()
    return this.getAccessCookie()
  }

  /**
   * 登出
   */
  logout = async () =>
    axios({
      method: 'post',
      url: API_TINYGRAIL_LOGOUT()
    })

  /**
   * 获取授权表单码
   */
  oauth = async () => {
    this.setState({
      info: `${this.retryText}获取授权表单码...(1/4)`
    })

    const { cookie, userAgent } = this.userCookie
    const res = axios({
      method: 'get',
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
      headers: {
        Cookie: cookie,
        'User-Agent': userAgent
      }
    })

    const data = await res
    const { request } = data
    const { responseHeaders, _response } = request
    if (responseHeaders['Set-Cookie']) {
      const match = responseHeaders['Set-Cookie'].match(/chii_sid=(.+?);/)
      if (match) {
        this.chiiSid = match[1]
      }
    }
    this.formhash = cheerio
      .load(_response)('input[name=formhash]')
      .attr('value')

    return res
  }

  /**
   * 授权
   */
  authorize = async () => {
    this.setState({
      info: `${this.retryText}授权中...(2/4)`
    })

    const { cookie, userAgent } = this.userCookie
    const res = axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `; chii_cookietime=2592000; ${cookie}`,
        'User-Agent': userAgent
      },
      data: urlStringify({
        formhash: this.formhash,
        redirect_uri: '',
        client_id: TINYGRAIL_APP_ID,
        submit: '授权'
      })
    })

    const data = await res
    const { request } = data
    const { responseURL } = request
    this.locationUrl = responseURL
    this.code = responseURL
      .split('=')
      .slice(1)
      .join('=')

    return res
  }

  /**
   * code获取cookie
   */
  getAccessCookie = async () => {
    this.setState({
      info: `${this.retryText}授权成功, 获取token中...(3/4)`
    })

    return axios({
      method: 'get',
      maxRedirects: 0,
      validateStatus: null,
      url: this.locationUrl
    })
  }
}
