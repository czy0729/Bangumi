/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-14 21:47:32
 */
import cheerio from 'cheerio-without-node-native'
import axios from 'axios'
import { observable, computed } from 'mobx'
import { userStore, tinygrailStore } from '@stores'
import { urlStringify, getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import {
  HOST,
  TINYGRAIL_APP_ID,
  TINYGRAIL_OAUTH_REDIRECT_URL
} from '@constants'
import { API_TINYGRAIL_LOGOUT } from '@constants/api'

const namespace = 'ScreenTinygrail'

axios.defaults.withCredentials = true

export default class ScreenTinygrail extends store {
  state = observable({
    loading: false,
    _loaded: false
  })

  formhash = ''

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      loading: false
    })

    let res = tinygrailStore.fetchAssets()
    const { _loaded } = await res
    if (!_loaded) {
      await this.doAuth()
      res = Promise.all([
        tinygrailStore.fetchHash(),
        tinygrailStore.fetchAssets()
      ])
    }

    if (!this.hash) {
      await tinygrailStore.fetchHash()
    }
    this.fetchCharaAssets()
    return res
  }

  // -------------------- fetch --------------------
  fetchCharaAssets = () => tinygrailStore.fetchCharaAssets(this.hash)

  // -------------------- get --------------------
  @computed get userCookie() {
    return userStore.userCookie
  }

  @computed get userInfo() {
    return userStore.userInfo
  }

  @computed get hash() {
    return tinygrailStore.hash
  }

  @computed get assets() {
    return tinygrailStore.assets
  }

  @computed get charaAssets() {
    return tinygrailStore.charaAssets(this.hash)
  }

  @computed get total() {
    const { balance } = this.assets
    const { characters, initials } = this.charaAssets
    return (
      characters.reduce((prev, cur) => prev + cur.state * cur.current, 0) +
      initials.reduce((prev, cur) => prev + cur.state, 0) +
      balance
    )
  }

  // -------------------- action --------------------
  /**
   * 小圣杯授权
   */
  doAuth = async () => {
    let res
    this.setState({
      loading: true
    })

    try {
      await this.logout()
      await this.oauth()
      await this.authorize()

      res = this.getAccessCookie()
      await res

      info('已更新授权')
      this.setState({
        loading: false,
        _loaded: getTimestamp()
      })
      this.setStorage(undefined, undefined, namespace)
    } catch (error) {
      info('授权失败, 请重试')
      this.setState({
        loading: false
      })
    }

    return res
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
  getAccessCookie = async () =>
    axios({
      method: 'get',
      maxRedirects: 0,
      validateStatus: null,
      url: this.locationUrl
    })
}
