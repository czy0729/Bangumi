/*
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-27 14:53:10
 */
import { Alert } from 'react-native'
import cheerio from 'cheerio-without-node-native'
import { observable, computed } from 'mobx'
import { userStore, tinygrailStore } from '@stores'
import { urlStringify, getTimestamp, formatNumber, toFixed } from '@utils'
import store from '@utils/store'
import { info } from '@utils/ui'
import { queue, t } from '@utils/fetch'
import axios from '@utils/thirdParty/axios'
import {
  HOST,
  TINYGRAIL_APP_ID,
  TINYGRAIL_URL_OAUTH_REDIRECT,
  M
} from '@constants'
import { API_TINYGRAIL_TEST, API_TINYGRAIL_LOGOUT } from '@constants/api'

const namespace = 'ScreenTinygrail'
const errorStr = '/false'
const maxErrorCount = 3

export default class ScreenTinygrail extends store {
  state = observable({
    loading: false,
    loadingAssets: false,
    loadingBonus: false,
    currentBalance: 0,
    currentTotal: 0,
    lastBalance: 0,
    lastTotal: 0,
    short: false,
    _loaded: false
  })

  formhash = ''
  errorCount = 0

  init = async () => {
    // 初始化state
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      loading: false
    })

    // 没有资产就自动授权
    const { _loaded } = await tinygrailStore.fetchAssets()
    if (!_loaded) {
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

  /**
   * 获取买单卖单数量
   */
  fetchCount = refresh => {
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
    const res = Promise.all([
      tinygrailStore.fetchAssets(),
      this.fetchCharaAssets()
    ])
    await res
    this.caculateChange()

    setTimeout(() => {
      this.fetchCount(true)
    }, 400)

    return res
  }

  // -------------------- get --------------------
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

  list(key = 'bid') {
    return computed(() => tinygrailStore.list(key)).get()
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
      res = this.authorize()

      await res
      t('小圣杯.授权成功')

      info('已更新授权')
      this.setState({
        loading: false,
        _loaded: getTimestamp()
      })
      this.setStorage(undefined, undefined, namespace)
    } catch (error) {
      t('小圣杯.授权失败')

      info('授权失败请重试, 或检查登陆状态')
      this.setState({
        loading: false
      })
    }

    return res
  }

  /**
   * 预测股息
   */
  doTest = async () => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    t('小圣杯.预测股息')

    try {
      axios.defaults.withCredentials = false
      const res = axios({
        method: 'get',
        url: API_TINYGRAIL_TEST(),
        headers: {
          Cookie: tinygrailStore.cookie
        }
      })

      const data = await res
      const { Total, Temples, Share, Tax, Daily } = data.data.Value
      const { short } = this.state

      const AfterTax = Share - Tax
      let _Total
      let _Share
      let _Tax
      let _AfterTax
      if (short) {
        _Total =
          Total > M ? `${toFixed(Total / M, 1)}万` : formatNumber(Total, 2)
        _Share =
          Share > M ? `${toFixed(Share / M, 1)}万` : formatNumber(Share, 2)
        _Tax = Tax > M ? `${toFixed(Tax / M, 1)}万` : formatNumber(Tax, 2)
        _AfterTax =
          AfterTax > M
            ? `${toFixed(AfterTax / M, 1)}万`
            : formatNumber(AfterTax, 2)
      } else {
        _Total = formatNumber(Total, 0)
        _Share = formatNumber(Share, 2)
        _Tax = formatNumber(Tax, 2)
        _AfterTax = formatNumber(AfterTax, 2)
      }

      let message = `本期计息共${_Total}股, 圣殿${Temples}座, 预期股息₵${_Share}`
      if (Tax) message += `, 个人所得税₵${_Tax}, 税后₵${_AfterTax}`
      if (Daily) message += `, 签到奖励₵${Daily}`

      Alert.alert('股息预测', message, [
        {
          text: '知道了'
        }
      ])
    } catch (error) {
      info('获取股息预测失败')
    }
  }

  /**
   * 刮刮乐
   */
  doLottery = async (navigation, isBonus2) => {
    if (!tinygrailStore.cookie) {
      info('请先授权')
      return
    }

    t('小圣杯.刮刮乐')

    try {
      this.setState({
        loadingBonus: true
      })

      const { State, Value, Message } = await tinygrailStore.doLottery(isBonus2)
      this.setState({
        loadingBonus: false
      })

      if (State === 0) {
        if (isBonus2) {
          let text = '彩票刮刮乐共获得：'
          Value.forEach(item => {
            text += ` #${item.Id}「${item.Name}」${item.Amount}股`
          })

          Alert.alert('操作成功', `${text}，前往持仓查看吗`, [
            {
              text: '取消',
              style: 'cancel'
            },
            {
              text: '确定',
              onPress: () => {
                navigation.push('TinygrailCharaAssets', {
                  form: 'lottery',
                  message: text
                })
              }
            }
          ])
          return
        }

        Alert.alert('操作成功', `${Value}，前往持仓查看吗`, [
          {
            text: '取消',
            style: 'cancel'
          },
          {
            text: '确定',
            onPress: () => {
              navigation.push('TinygrailCharaAssets', {
                form: 'lottery',
                message: Value
              })
            }
          }
        ])
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

  /**
   * 每周分红
   */
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

  /**
   * 每日签到
   */
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

  /**
   * 节日福利
   */
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

  doSend = () =>
    Alert.alert('小圣杯助手', '是否给作者发送2000cc?', [
      {
        text: '取消',
        style: 'cancel'
      },
      {
        text: '确定',
        onPress: async () => {
          const { State, Value, Message } = await tinygrailStore.doSend()
          if (State === 0) {
            info(Value)
            await tinygrailStore.fetchAssets()
            this.caculateChange()
          } else {
            info(Message)
          }
        }
      }
    ])

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
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_URL_OAUTH_REDIRECT}`,
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
      url: `${HOST}/oauth/authorize?client_id=${TINYGRAIL_APP_ID}&response_type=code&redirect_uri=${TINYGRAIL_URL_OAUTH_REDIRECT}${errorStr}`,
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

    tinygrailStore.updateCookie(
      `${data.headers['set-cookie'][0].split(';')[0]};`
    )

    return res
  }

  /**
   * 资产金额UI变动
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

  /**
   * 开启/关闭缩略资金
   */
  toogleShort = () => {
    const { short } = this.state
    t('小圣杯.缩略资金', {
      short: !short
    })

    this.setState({
      short: !short
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
