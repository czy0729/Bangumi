/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-25 21:17:46
 */
import cheerio from 'cheerio-without-node-native'
import { observable, computed } from 'mobx'
import { userStore, tinygrailStore } from '@stores'
import { urlStringify, getTimestamp } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import axios from '@utils/thirdParty/axios'
import {
  HOST,
  TINYGRAIL_APP_ID,
  TINYGRAIL_OAUTH_REDIRECT_URL
} from '@constants'
import { API_TINYGRAIL_LOGOUT } from '@constants/api'

const namespace = 'ScreenTinygrail'
const maxErrorCount = 8

export default class ScreenTinygrail extends store {
  state = observable({
    loading: false,
    currentBalance: 0,
    currentTotal: 0,
    lastBalance: 0,
    lastTotal: 0,
    _loaded: false
  })

  formhash = ''
  errorCount = 0

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
      await Promise.all([tinygrailStore.fetchAssets()])
    }

    await tinygrailStore.fetchHash()
    res = this.fetchCharaAssets()
    await res

    this.caculateChange()
    return res
  }

  // -------------------- fetch --------------------
  fetchCharaAssets = () => tinygrailStore.fetchCharaAssets(this.hash)

  refresh = async () => {
    const res = Promise.all([
      tinygrailStore.fetchAssets(),
      this.fetchCharaAssets()
    ])
    await res

    this.caculateChange()

    return res
  }

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

    axios.defaults.withCredentials = false
    const res = axios({
      method: 'get',
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
      headers: {
        Cookie: `chii_cookietime=2592000; ${cookie}`,
        'User-Agent': userAgent
      }
    })

    const data = await res
    const { request } = data
    const { _response } = request
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

    axios.defaults.withCredentials = false
    const res = axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `chii_cookietime=2592000; ${cookie}`,
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

    // tinygrail服务器那边获取access_token也会失败, 需要重试
    if (!responseURL.includes('code=')) {
      this.errorCount += 1

      if (this.errorCount < maxErrorCount) {
        return this.authorize()
      }
      return false
    }
    this.locationUrl = responseURL

    return res
  }

  /**
   * code获取cookie
   */
  getAccessCookie = async () => {
    axios.defaults.withCredentials = false
    const res = axios({
      method: 'get',
      maxRedirects: 0,
      validateStatus: null,
      url: `${this.locationUrl}&redirect=false`
    })

    const data = await res
    tinygrailStore.updateCookie(
      `${data.headers['set-cookie'][0].split(';')[0]};`
    )

    return res
  }

  /**
   * 计算资金变动
   */
  caculateChange = () => {
    const { currentBalance, currentTotal } = this.state
    const { balance } = this.assets

    this.setState({
      currentBalance: balance,
      currentTotal: this.total,
      lastBalance: currentBalance,
      lastTotal: currentTotal
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
