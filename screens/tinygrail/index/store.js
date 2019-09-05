/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-04 23:10:42
 */
import cheerio from 'cheerio-without-node-native'
import { observable, computed } from 'mobx'
import { userStore, tinygrailStore } from '@stores'
import store from '@utils/store'
import { xhrCustom } from '@utils/fetch'
import {
  HOST,
  TINYGRAIL_APP_ID,
  TINYGRAIL_OAUTH_REDIRECT_URL
} from '@constants'
import _ from '@styles'

export const sectionWidth = (_.window.width - _.wind * 3) / 2
export const sectionHeight = sectionWidth / 1.68
const HOST_BANGUMI = 'https://bangumi.tv'

export default class ScreenTinygrail extends store {
  state = observable({
    info: ''
  })

  formhash = ''

  init = async () => {}

  // -------------------- get --------------------
  @computed get userCookie() {
    return userStore.userCookie
  }

  // -------------------- action --------------------
  doAuth = async () => {
    await this.oauth()
    await this.authorize()
  }

  /**
   * 获取授权表单码
   */
  oauth = async () => {
    this.setState({
      info: `${this.retryText}获取授权表单码...(1/4)`
    })

    const { cookie, userAgent } = this.userCookie
    const res = xhrCustom({
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
      headers: {
        Cookie: `chii_cookietime=2592000; ${cookie}`,
        'User-Agent': userAgent
      }
    })

    const data = await res
    log(data)
    const { _response } = data

    this.formhash = cheerio
      .load(_response)('input[name=formhash]')
      .attr('value')

    return res
  }

  authorize = async () => {
    this.setState({
      info: `${this.retryText}授权中...(2/4)`
    })

    const { cookie, userAgent } = this.userCookie
    const res = xhrCustom({
      method: 'POST',
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: `chii_cookietime=2592000; ${cookie}`,
        'User-Agent': userAgent,
        'cache-control': 'no-cache',
        origin: 'https://bgm.tv',
        pragma: 'no-cache',
        referer: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_OAUTH_REDIRECT_URL}`,
        'sec-fetch-mode': 'navigate',
        'sec-fetch-site': 'same-origin',
        'sec-fetch-user': '?1',
        'upgrade-insecure-requests': '1'
      },
      data: {
        formhash: this.formhash,
        redirect_uri: '',
        client_id: TINYGRAIL_APP_ID,
        submit: '授权'
      }
    })

    const data = await res
    log(data)

    // const { responseURL } = await res
    // this.code = responseURL
    //   .split('=')
    //   .slice(1)
    //   .join('=')
    return res
  }
}
