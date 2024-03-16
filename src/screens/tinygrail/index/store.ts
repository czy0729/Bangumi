/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-16 17:55:41
 */
import { computed, observable } from 'mobx'
import cheerio from 'cheerio-without-node-native'
import { systemStore, tinygrailStore, userStore } from '@stores'
import { ListKey } from '@stores/tinygrail/types'
import {
  alert,
  confirm,
  feedback,
  formatNumber,
  getTimestamp,
  info,
  toFixed,
  urlStringify
} from '@utils'
import { queue, t } from '@utils/fetch'
import store from '@utils/store'
import axios from '@utils/thirdParty/axios'
import {
  API_TINYGRAIL_LOGOUT,
  DEV,
  HOST,
  M,
  TINYGRAIL_APP_ID,
  TINYGRAIL_URL_OAUTH_REDIRECT
} from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import { ERROR_STR, EXCLUDE_STATE, MAX_ERROR_COUNT, NAMESPACE, STATE } from './ds'
import { Params } from './types'

export default class ScreenTinygrail extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  formhash = ''

  errorCount = 0

  init = async () => {
    tinygrailStore.fetchAdvance()

    // 初始化state
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: tinygrailStore.cookie ? getTimestamp() : false
    })

    // 没有资产就自动授权
    const { _loaded } = await tinygrailStore.fetchAssets()
    if (!_loaded && !DEV) {
      await this.doAuth()
    }

    // 获取资产和用户唯一标识
    await queue([
      () => tinygrailStore.fetchAssets(),
      () => tinygrailStore.fetchHash(),
      () => this.fetchCharaAssets()
    ])

    tinygrailStore.fetchAdvance()
    this.caculateChange()
    this.fetchCount()
    this.checkCount()

    // runAfter(() => {
    //   initXsbRelationOTA()
    // })

    return true
  }

  // -------------------- fetch --------------------
  fetchCharaAssets = async () => {
    this.setState({
      loadingAssets: true
    })
    const res = tinygrailStore.fetchCharaAssets(this.hash)
    await res
    this.setState({
      loadingAssets: false
    })

    return res
  }

  /** 获取买单卖单数量 */
  fetchCount = (refresh: boolean = false) => {
    const fetchs = []
    if (refresh || !this.list('bid')._loaded) {
      fetchs.push(() => tinygrailStore.fetchBid())
    }
    if (refresh || !this.list('asks')._loaded) {
      fetchs.push(() => tinygrailStore.fetchAsks())
    }
    if (refresh || !this.list('auction')._loaded) {
      fetchs.push(() => tinygrailStore.fetchAuction())
    }
    if (fetchs.length) {
      queue(fetchs)
    }
  }

  refresh = async () => {
    const results = await Promise.all([tinygrailStore.fetchAssets(), this.fetchCharaAssets()])
    this.caculateChange()

    setTimeout(() => {
      this.fetchCount(true)
    }, 400)

    return results
  }

  // -------------------- get --------------------
  @computed get short() {
    return systemStore.setting.xsbShort
  }

  @computed get userCookie() {
    return userStore.userCookie
  }

  @computed get advance() {
    return tinygrailStore.advance
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
    const { assets } = this.assets
    return assets
  }

  /** 幻想乡刮刮乐下一次的价格 (每次翻倍) */
  @computed get nextPrice() {
    const { count = 0, isBonus2 } = this.state
    return isBonus2 ? 2000 * 2 ** count : 1000
  }

  list(key: ListKey = 'bid') {
    return computed(() => tinygrailStore.list(key)).get()
  }

  // -------------------- action --------------------
  _doAuthFailCount = 0

  /** 小圣杯授权 */
  doAuth = async () => {
    let res: any
    this.setState({
      loading: true
    })

    try {
      // await this.logout()
      await this.oauth()
      res = this.authorize()

      await res
      t('小圣杯.授权成功')

      this._doAuthFailCount = 0

      feedback()
      info('已更新授权')
      this.setState({
        loading: false,
        _loaded: getTimestamp()
      })
      this.setStorage(NAMESPACE)
    } catch (error) {
      t('小圣杯.授权失败')

      if (this._doAuthFailCount < 5) {
        this._doAuthFailCount += 1
        info(`重试授权 [${this._doAuthFailCount}]`)
        return this.doAuth()
      }

      this._doAuthFailCount = 0
      info(`授权失败请重试, 或检查${i18n.login()}状态`)
      this.setState({
        loading: false
      })
    }

    return res
  }

  /** 预测股息 */
  doTest = async () => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    t('小圣杯.预测股息')

    try {
      await tinygrailStore.fetchTest()

      const { Total, Temples, Share, Tax, Daily } = tinygrailStore.test
      const AfterTax = Share - Tax
      let _Total: string
      let _Share: string
      let _Tax: string
      let _AfterTax: string
      if (this.short) {
        _Total = Total > M ? `${toFixed(Total / M, 1)}万` : formatNumber(Total, 2)
        _Share = Share > M ? `${toFixed(Share / M, 1)}万` : formatNumber(Share, 2)
        _Tax = Tax > M ? `${toFixed(Tax / M, 1)}万` : formatNumber(Tax, 2)
        _AfterTax = AfterTax > M ? `${toFixed(AfterTax / M, 1)}万` : formatNumber(AfterTax, 2)
      } else {
        _Total = formatNumber(Total, 0)
        _Share = formatNumber(Share, 2)
        _Tax = formatNumber(Tax, 2)
        _AfterTax = formatNumber(AfterTax, 2)
      }

      let message = `本期计息共${_Total}股，圣殿${Temples}座，预期股息${_Share}`
      if (Tax)
        message += `，个人所得税${_Tax}，税后${_AfterTax}（${((AfterTax / Share) * 100).toFixed(
          1
        )}%）`
      if (Daily) message += `，签到奖励${Daily}`

      alert(message, '股息预测')
    } catch (error) {
      info('获取股息预测失败')
    }
  }

  /** 刮刮乐 */
  doLottery = async (
    navigation: Navigation,

    /** 是否幻想乡 */
    isBonus2: boolean = false
  ) => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    try {
      this.setState({
        loadingBonus: true
      })

      const { State, Value, Message } = await tinygrailStore.doLottery(isBonus2)
      this.setState({
        loadingBonus: false
      })
      feedback()

      if (State === 0) {
        if (isBonus2) {
          t('小圣杯.幻想乡刮刮乐', {
            nextPrice: this.nextPrice
          })
        } else {
          t('小圣杯.刮刮乐')
        }

        this.setState({
          bonus: Value,
          isBonus2
        })
        this.onShowModal()
        this.checkCount()
      } else {
        info(Message)
      }
    } catch (error) {
      this.setState({
        loadingBonus: false
      })
      info('操作失败，可能授权过期了')
    }
  }

  /** 每周分红 */
  doGetBonusWeek = async () => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    t('小圣杯.每周分红')

    try {
      this.setState({
        loadingBonus: true
      })
      const { State, Value, Message } = await tinygrailStore.doBonus()
      this.setState({
        loadingBonus: false
      })
      feedback()

      if (State === 0) {
        info(Value)
        await tinygrailStore.fetchAssets()
        this.caculateChange()
      } else {
        info(Message)
      }
    } catch (error) {
      this.setState({
        loadingBonus: false
      })
      info('操作失败，可能授权过期了')
    }
  }

  /** 每日签到 */
  doGetBonusDaily = async () => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    t('小圣杯.每日签到')

    try {
      this.setState({
        loadingBonus: true
      })
      const { State, Value, Message } = await tinygrailStore.doBonusDaily()
      this.setState({
        loadingBonus: false
      })
      feedback()

      if (State === 0) {
        info(Value)
        await tinygrailStore.fetchAssets()
        this.caculateChange()
      } else {
        info(Message)
      }
    } catch (error) {
      this.setState({
        loadingBonus: false
      })
      info('操作失败，可能授权过期了')
    }
  }

  /** 节日福利 */
  doGetBonusHoliday = async () => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    t('小圣杯.节日福利')

    try {
      this.setState({
        loadingBonus: true
      })
      const { State, Value, Message } = await tinygrailStore.doBonusHoliday()
      this.setState({
        loadingBonus: false
      })
      feedback()

      if (State === 0) {
        info(Value)
        await tinygrailStore.fetchAssets()
        this.caculateChange()
      } else {
        info(Message)
      }
    } catch (error) {
      this.setState({
        loadingBonus: false
      })
      info('操作失败，可能授权过期了')
    }
  }

  doSend = () => {
    confirm(
      '是否给作者发送10000cc?',
      async () => {
        const { State, Value, Message } = await tinygrailStore.doSend()
        feedback()

        if (State === 0) {
          info(Value)
          await tinygrailStore.fetchAssets()
          this.caculateChange()
        } else {
          info(Message)
        }
      },
      '小圣杯助手'
    )
  }

  /** 登出 */
  logout = async () => {
    // @ts-expect-error
    return axios({
      method: 'post',
      url: API_TINYGRAIL_LOGOUT()
    })
  }

  /** 获取授权表单码 */
  oauth = async () => {
    const { cookie, userAgent } = this.userCookie

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const res = axios({
      method: 'get',
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_URL_OAUTH_REDIRECT}`,
      headers: {
        Cookie: `chii_cookietime=2592000; ${cookie}`,
        'User-Agent': userAgent
      }
    })

    const data = await res
    const { request } = data
    const { _response } = request
    this.formhash = cheerio.load(_response)('input[name=formhash]').attr('value')

    return res
  }

  /** 授权 */
  authorize = async () => {
    const { cookie, userAgent } = this.userCookie

    // @ts-expect-error
    axios.defaults.withCredentials = false

    // @ts-expect-error
    const res = axios({
      method: 'post',
      maxRedirects: 0,
      validateStatus: null,
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_URL_OAUTH_REDIRECT}${ERROR_STR}`,
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

      if (this.errorCount < MAX_ERROR_COUNT) {
        return this.authorize()
      }
      return false
    }

    feedback()
    tinygrailStore.updateCookie(`${data.headers['set-cookie'][0].split(';')[0]};`)

    return res
  }

  /** 资产金额 UI 变动 */
  caculateChange = () => {
    const { currentBalance, currentTotal } = this.state
    const { balance } = this.assets

    this.setState({
      currentBalance: balance,
      currentTotal: this.total,
      lastBalance: currentBalance,
      lastTotal: currentTotal
    })
    this.setStorage(NAMESPACE)
  }

  /** 开启 / 关闭缩略资金 */
  toogleShort = () => {
    systemStore.switchSetting('xsbShort')
    t('小圣杯.缩略资金', {
      short: this.short
    })
  }

  onShowModal = () => {
    return this.setState({
      visible: true
    })
  }

  onCloseModal = () => {
    this.setState({
      visible: false
    })

    setTimeout(() => {
      this.setState({
        bonus: []
      })
    }, 400)
  }

  checkCount = async () => {
    if (!tinygrailStore.cookie) return

    const { State, Value } = await tinygrailStore.doCheckDaily()
    if (State === 0) {
      this.setState({
        count: Value
      })
    }
  }

  onToggleLogs = () => {
    const { show } = this.state
    this.setState({
      show: !show
    })
  }
}
