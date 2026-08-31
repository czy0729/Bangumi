/*
 * @Author: czy0729
 * @Date: 2023-04-22 16:38:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 05:34:42
 */
import { toJS } from 'mobx'
import cheerio from 'cheerio-without-node-native'
import { getTimestamp, info, loading, urlStringify } from '@utils'
import fetch, { xhr } from '@utils/fetch'
import { fetchCollectionSingleV0 } from '@utils/fetch.v0'
import { axiosWithProxy, axiosWithProxyRedirect } from '@utils/proxy'
import { axios } from '@utils/thirdParty'
import {
  API_EP_STATUS,
  API_SUBJECT_UPDATE_WATCHED,
  APP_ID,
  APP_SECRET,
  DEV,
  FROZEN_FN,
  H6,
  HOST,
  HTML_ACTION_ERASE_COLLECTION,
  HTML_PM_CREATE,
  HTML_USER_SETTING,
  M1,
  URL_OAUTH_REDIRECT
} from '@constants'
import { APP_PARAMS } from '../ds'
import RakuenStore from '../rakuen'
import Fetch from './fetch'
import { INIT_ACCESS_TOKEN, INIT_USER_COOKIE, INIT_USER_INFO } from './init'

import type { ProxyAxiosResponse } from '@utils/proxy/types'
import type { EpId, EpStatus, SubjectId } from '@types'
import type { STATE } from './init'
import type { AccessToken } from './types'

export default class Action extends Fetch {
  /** 登出 */
  logout = () => {
    setTimeout(() => {
      this.setState({
        accessToken: INIT_ACCESS_TOKEN,
        userCookie: INIT_USER_COOKIE,
        setCookie: '',
        userInfo: INIT_USER_INFO,
        outdate: false
      })
      this.save('accessToken')
      this.save('userCookie')
      this.save('setCookie')
      this.save('userInfo')
    }, 0)
  }

  /** 更新 accessToken */
  updateAccessToken = (accessToken: AccessToken = INIT_ACCESS_TOKEN) => {
    this.clearState('accessToken', {})
    this.setState({
      accessToken: {
        access_token: accessToken.access_token,
        expires_in: accessToken.expires_in,
        token_type: accessToken.token_type,
        scope: accessToken.scope,
        user_id: accessToken.user_id,
        refresh_token: accessToken.refresh_token
      },
      outdate: false
    })
    this.save('accessToken')
  }

  /** 更新用户 cookie */
  updateUserCookie = (userCookie = INIT_USER_COOKIE) => {
    this.setState({
      userCookie,
      outdate: false
    })
    this.save('userCookie')
  }

  /** @deprecated */
  updateHmCookie = (hmCookie: string) => {
    this.setState({
      hmCookie
    })
    this.save('hmCookie')
  }

  /** 手动更新登录用户信息 */
  updateUserInfo = (userInfo: (typeof STATE)['userInfo']) => {
    this.setState({
      userInfo
    })
    this.save('userInfo')
  }

  /** 打印游客登录 sercet */
  logTourist = FROZEN_FN

  /** 设置授权信息过期提示 */
  setOutdate = (outdate: boolean = true) => {
    this.setState({
      outdate
    })
  }

  /** 设置主站 502 提示 */
  setWebsiteError = () => {
    this.setState({
      websiteError: true
    })
  }

  /** 删掉在看收藏的条目信息 */
  removeCollection = (subjectId: SubjectId) => {
    const index = this.collection.list.findIndex(
      item => Number(item.subject_id) === Number(subjectId)
    )
    if (index === -1) return false

    const collection = toJS(this.collection)
    collection.list.splice(index, 1)
    this.setState({
      collection
    })
    this.save('collection')

    return true
  }

  /** 添加在看收藏的条目信息 */
  addCollection = async (subjectId: SubjectId) => {
    const index = this.collection.list.findIndex(
      item => Number(item.subject_id) === Number(subjectId)
    )
    if (index !== -1) return false

    const data = await fetchCollectionSingleV0(this.myId, subjectId)
    if (!data) return false

    const collection = toJS(this.collection)
    collection.list.unshift(data)
    this.setState({
      collection
    })
    this.save('collection')

    return true
  }

  // -------------------- action --------------------
  /** 更新收视进度 */
  doUpdateEpStatus = async (config: { id: EpId; status: EpStatus }) => {
    const { id, status } = config || {}
    return fetch({
      url: API_EP_STATUS(id, status),
      method: 'POST'
    })
  }

  /** 批量更新收视进度 */
  doUpdateSubjectWatched = async (config: { subjectId: SubjectId; sort: number }) => {
    const { subjectId, sort } = config || {}
    return fetch({
      url: API_SUBJECT_UPDATE_WATCHED(subjectId),
      method: 'POST',
      data: {
        watched_eps: sort
      }
    })
  }

  /**
   * 检测 cookie 有没有过期
   *  - 访问任意个人中心的页面就可以判断, 顺便记录 formhash 用于登出
   *  - setCookie 是 html 中后续在请求头中获取的更新 cookie 的标志
   */
  doCheckCookie = async () => {
    const data = await RakuenStore.fetchNotify()
    const { setCookie = '', html } = data
    if (html.includes('抱歉，当前操作需要您') && !DEV) this.setOutdate()

    const matchLogout = html.match(/logout\/([A-Za-z0-9]+)/)
    if (matchLogout) {
      const formhash = matchLogout[1]
      if (DEV) this.log('doCheckCookie', { formhash })

      this.setState({
        formhash
      })
      this.save('formhash')
    }

    if (setCookie) {
      this.setState({
        setCookie
      })
      this.save('setCookie')
    }

    const responseHtml = String(data?.html || '')
    if (
      responseHtml.includes('Can not connect to MySQL server') ||
      /<title>bgm\.tv \| 5\d{2}:.*<\/title>/.test(responseHtml)
    ) {
      this.setWebsiteError()
    }

    return data
  }

  /** 删除收藏 */
  doEraseCollection = async (
    config: {
      subjectId: SubjectId
      formhash: string
    },
    success?: (responseText?: string, request?: XMLHttpRequest) => unknown,
    fail?: () => void
  ) => {
    const { subjectId, formhash } = config || {}

    return xhr(
      {
        url: HTML_ACTION_ERASE_COLLECTION(subjectId, formhash)
      },
      success,
      fail
    )
  }

  /** 发短信 */
  doPM = async (
    data: {
      msg_title?: string
      msg_body?: string
      formhash?: string
      msg_receivers?: string
      chat?: 'on'
      submit?: '发送' | '回复'
    },
    success?: (responseText?: string, request?: XMLHttpRequest) => unknown,
    fail?: () => void
  ) => {
    return xhr(
      {
        url: HTML_PM_CREATE(),
        data
      },
      success,
      fail
    )
  }

  /** 更新个人设置 */
  doUpdateUserSetting = async (
    data: {
      formhash: string
      nickname: string
      sign_input: string
      newbio: string
      timeoffsetnew: string
      show_nsfw_subject: boolean | number
    },
    success?: (responseText?: string, request?: XMLHttpRequest) => unknown,
    fail?: () => void
  ) => {
    return xhr(
      {
        url: HTML_USER_SETTING(),
        data: {
          ...data,
          submit: '保存修改'
        }
      },
      success,
      fail
    )
  }

  /** 存放 loading.hide */
  private _hide: (() => void) | null = null

  /** 重新授权次数 */
  private _reOauthCount: number = 0

  /** 获取授权表单码 */
  reOauth = async () => {
    try {
      if (this._reOauthCount < 2) {
        this._hide = loading('正在重新授权...')
        this._reOauthCount += 1
      }

      const { data } = await axiosWithProxy<ProxyAxiosResponse<string>>(
        axios,
        {
          method: 'get',
          url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
          headers: {
            'User-Agent': this.userCookie.userAgent,
            Cookie: this.userCookie.cookie
          }
        },
        true
      )
      const formhash = cheerio
        .load(data || '')('input[name=formhash]')
        .attr('value')
      return await this.authorize(formhash)
    } catch (error) {
      // 失败必须隐藏授权 loading, 否则它会永远挂在界面上 (原本只在成功路径隐藏)
      if (typeof this._hide === 'function') {
        this._hide()
        this._hide = null
      }

      // 响应状态码失败 (如 cookie 失效后 bgm 返回 4xx), 提示重新登录, 保留现有登录信息不清除
      const status = Number((error as TypeError)?.message)
      if (Number.isFinite(status) && status >= 400) {
        info('重新授权失败，请重新登录')
        return false
      }

      info('重新授权失败，请检查网络后重试')
      return false
    }
  }

  /** 授权获取 code */
  authorize = async (formhash: string) => {
    const { redirectUrl } = await axiosWithProxyRedirect(
      axios,
      {
        method: 'post',
        maxRedirects: 0,
        validateStatus: null,
        url: `${HOST}/oauth/authorize?client_id=${APP_ID}&response_type=code&redirect_uri=${URL_OAUTH_REDIRECT}`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': this.userCookie.userAgent,
          Cookie: this.userCookie.cookie
        },
        data: urlStringify({
          formhash,
          redirect_uri: '',
          client_id: APP_ID,
          submit: '授权'
        })
      },
      true
    )

    const code = redirectUrl?.split('=').slice(1).join('=')
    return this.getAccessToken(code)
  }

  /** code 获取 access_token */
  getAccessToken = async (code: string) => {
    const { status, data } = await axiosWithProxy<ProxyAxiosResponse<AccessToken>>(
      axios,
      {
        method: 'post',
        maxRedirects: 0,
        validateStatus: null,
        url: `${HOST}/oauth/access_token`,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': this.userCookie.userAgent
        },
        data: urlStringify({
          grant_type: 'authorization_code',
          client_id: APP_ID,
          client_secret: APP_SECRET,
          code,
          redirect_uri: URL_OAUTH_REDIRECT,
          state: getTimestamp()
        })
      },
      true
    )

    if (status !== 200 || !data) {
      throw new TypeError(String(status))
    }

    if (typeof this._hide === 'function') {
      this._hide()
      this._hide = null
    }
    this.updateAccessToken(data)
    return true
  }

  /** 检查登录状态 */
  checkLogin = () => {
    if (this.isWebLogin) {
      // 检查登录状态是否过期
      if (!APP_PARAMS.lastBoot || getTimestamp() - APP_PARAMS.lastBoot > M1) {
        setTimeout(() => {
          try {
            this.doCheckCookie()
          } catch {}
        }, 8000)
      }

      // 刷新用户信息
      const { _loaded } = this.userInfo
      if (!_loaded || getTimestamp() - _loaded > H6) {
        this.fetchUserInfo()
        this.fetchUsersInfo()
      }

      // 刷新至少一次用户设置
      if (this.userSetting._v !== 2) {
        this.fetchUserSetting()
      }
    }
  }
}
