/*
 * @Author: czy0729
 * @Date: 2023-04-26 14:40:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-18 22:17:11
 */
import { toJS } from 'mobx'
import {
  alert,
  arrayBufferToBase64,
  decimal,
  feedback,
  getTimestamp,
  info,
  lastDate,
  loading
} from '@utils'
import { xhrCustom } from '@utils/fetch'
import md5 from '@utils/thirdParty/md5'
import {
  API_CHARA_TEMPLE_COVER,
  API_TINYGRAIL_ASK,
  API_TINYGRAIL_AUCTION,
  API_TINYGRAIL_AUCTION_CANCEL,
  API_TINYGRAIL_BID,
  API_TINYGRAIL_BONUS,
  API_TINYGRAIL_BONUS_DAILY,
  API_TINYGRAIL_BONUS_HOLIDAY,
  API_TINYGRAIL_CANCEL_ASK,
  API_TINYGRAIL_CANCEL_BID,
  API_TINYGRAIL_CHARA_STAR,
  API_TINYGRAIL_DAILY_COUNT,
  API_TINYGRAIL_INIT,
  API_TINYGRAIL_JOIN,
  API_TINYGRAIL_LINK,
  API_TINYGRAIL_MAGIC,
  API_TINYGRAIL_OSS_SIGNATURE,
  API_TINYGRAIL_SACRIFICE,
  API_TINYGRAIL_SCRATCH,
  API_TINYGRAIL_SCRATCH2,
  API_TINYGRAIL_SEARCH,
  SDK
} from '@constants'
import { TinygrailMagic } from '@constants/api/types'
import { Id, MonoId, UserId } from '@types'
import Fetch from './fetch'

export default class Action extends Fetch {
  updateCookie = (cookie: string) => {
    this.setState({
      cookie
    })
    this.save('cookie')
  }

  /** @deprecated */
  updateWebViewShow = (show: boolean) => {
    if (SDK >= 36) {
      this.setState({
        _webview: true
      })
      return
    }

    this.setState({
      _webview: show
    })
  }

  /** 更新献祭少于 500 未成塔的数据 */
  updateMyTemples = (id: Id, sacrifices = 0) => {
    if (!this.hash || sacrifices > 500) {
      return
    }

    const key = 'temple'
    const temple = toJS(this[key]())
    const index = temple.list.findIndex(item => item.id == id)
    if (index === -1) {
      return
    }

    // 少于 0 删除项
    if (sacrifices === 0) {
      const { name } = temple.list[index]
      info(`${name} 已耗尽`)

      // @ts-expect-error
      temple.list.splice(index, 1)
    } else {
      temple.list[index].sacrifices = sacrifices
    }

    temple._loaded = getTimestamp()
    this.setState({
      [key]: {
        [this.hash]: temple
      }
    })
    this.save(key)
  }

  /** 更新我的持仓角色 */
  updateMyCharaAssets = (id: Id, state: number, sacrifices: number) => {
    // 只有这里能检测到未献祭满 500 角色的圣殿资产变化, 需要联动圣殿资产里面的对应项
    this.updateMyTemples(id, sacrifices)

    const key = 'myCharaAssets'
    const { chara = {} } = this[key] as any
    const { list = [] } = chara
    const index = list.findIndex((item: { monoId: number }) => item.monoId === Number(id))
    if (index !== -1) {
      const newList = toJS(list)

      // 没有活股需要删除项
      if (state <= 0) {
        newList.splice(index, 1)
      } else {
        newList[index].state = state
        newList[index].sacrifices = sacrifices
      }

      this.setState({
        [key]: {
          ...this[key],
          chara: {
            ...this[key].chara,
            list: newList
          }
        }
      })
      this.save(key)
      return true
    }

    return false
  }

  /** 批量根据角色 ID 更新我的持仓角色 */
  batchUpdateMyCharaAssetsByIds = async (ids: Id[]) => {
    for (const id of ids) {
      const { amount, sacrifices } = (await this.fetchUserLogs(id)) as any
      this.updateMyCharaAssets(id, amount, sacrifices)
    }
  }

  /** 批量根据角色 ID 更新我的圣殿资产 */
  batchUpdateTemplesByIds = async (ids: Id[]) => {
    if (!this.hash) return

    const key = 'temple'
    const temple = toJS(this[key]())
    let flag: boolean

    for (const id of ids) {
      const { list } = await this.fetchCharaTemple(id)
      const find = list.find(item => item.name == this.hash)
      if (find?.id) {
        const index = temple.list.findIndex(item => item.id == find.id)
        if (index !== -1) {
          flag = true

          // 若 sacrifices 为 0 需要删除项
          // @notice 其实这里不可能找到 sacrifices 为 0 的圣殿, 只能通过 updateMyCharaAssets 信息找到
          if (find.sacrifices === 0) {
            const { name } = temple.list[index]
            info(`${name} 已耗尽`)

            // @ts-expect-error
            temple.list.splice(index, 1)
          } else {
            temple.list[index].cover = find.cover
            temple.list[index].assets = find.assets
            temple.list[index].sacrifices = find.sacrifices
          }
        }
      }
    }

    if (flag) {
      this.setState({
        [key]: {
          [this.hash]: temple
        }
      })
      this.save(key)
    }
  }

  /** 切换是否显示角色股价预览 */
  toggleStockPreview = () => {
    return

    const { _stockPreview } = this.state
    this.setState({
      _stockPreview: !_stockPreview
    })
  }

  /** 切换收藏 */
  toggleCollect = (monoId: MonoId) => {
    const { collected } = this.state

    const _collected = {
      ...collected
    }

    if (_collected[monoId]) {
      _collected[monoId] = 0
    } else {
      _collected[monoId] = getTimestamp()
    }
    this.setState({
      collected: _collected
    })

    this.save('collected')
  }

  /** 获取并提示用户简略资产信息 */
  alertUserAssets = async (userId: UserId, name?: string, last?: string) => {
    if (!userId) return false

    try {
      const data = await this.fetchUserAssets(userId)
      if (!data?.balance) {
        feedback(true)
        info('没有游玩')
        return false
      }

      feedback()
      alert(
        [
          `${name ? `${name}：` : ''}@${userId}`,
          data.lastIndex ? `排名：#${data.lastIndex}` : '',
          `现金：${decimal(data.balance)}`,
          `固定资产：${decimal(data.assets)}`,
          last ? `最后操作：${lastDate(getTimestamp(last.replace('T', ' ')))}` : ''
        ]
          .filter(Boolean)
          .join('\n'),
        '资产信息'
      )
    } catch (error) {}
  }

  // -------------------- action --------------------
  /** 买入 */
  doBid = async ({ monoId, price, amount, isIce }) => {
    const result = await this.fetch(API_TINYGRAIL_BID(monoId, price, amount, isIce), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 卖出 */
  doAsk = async ({ monoId, price, amount, isIce }): Promise<any> => {
    const result = await this.fetch(API_TINYGRAIL_ASK(monoId, price, amount, isIce), true)
    if (result.data.State === 0) return true
    return false
  }

  /** 取消买入 */
  doCancelBid = async ({ id }) => {
    const result = await this.fetch(API_TINYGRAIL_CANCEL_BID(id), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 取消卖出 */
  doCancelAsk = async ({ id }) => {
    const result = await this.fetch(API_TINYGRAIL_CANCEL_ASK(id), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 参与 ICO */
  doJoin = async ({ id, amount }) => {
    const result = await this.fetch(API_TINYGRAIL_JOIN(id, amount), true)
    if (result.data.State === 0) {
      return true
    }
    return false
  }

  /** 资产重组 */
  doSacrifice = async ({ monoId, amount, isSale }) => {
    const { data } = await this.fetch(API_TINYGRAIL_SACRIFICE(monoId, amount, isSale), true)
    return data
  }

  /** 拍卖 */
  doAuction = async ({ monoId, price, amount }) => {
    const { data } = await this.fetch(API_TINYGRAIL_AUCTION(monoId, price, amount), true)
    return data
  }

  /** 取消拍卖 */
  doAuctionCancel = async ({ id }) => {
    const { data } = await this.fetch(API_TINYGRAIL_AUCTION_CANCEL(id), true)
    return data
  }

  /** 刮刮乐 */
  doLottery = async (isBonus2 = false) => {
    const { data } = await this.fetch(
      isBonus2 ? API_TINYGRAIL_SCRATCH2() : API_TINYGRAIL_SCRATCH(),
      true
    )
    return data
  }

  /** 检测今天刮刮乐刮了多少次 */
  doCheckDaily = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_DAILY_COUNT())
    return data
  }

  /** 每周分红 */
  doBonus = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS(), true)
    return data
  }

  /** 每日签到 */
  doBonusDaily = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS_DAILY(), true)
    return data
  }

  /** 节日福利 */
  doBonusHoliday = async () => {
    const { data } = await this.fetch(API_TINYGRAIL_BONUS_HOLIDAY(), true)
    return data
  }

  /** 新年快乐 */
  doSend = async (count: number = 10000, userId: UserId = 'sukaretto') => {
    const { data } = await this.fetch(
      `https://tinygrail.com/api/event/send/${userId}/${count}`,
      true
    )
    return data
  }

  /** 使用道具 */
  doMagic = async ({
    monoId,
    type,
    toMonoId,
    amount,
    isTemple
  }: {
    monoId?: Id
    type?: TinygrailMagic
    toMonoId?: Id
    amount?: number
    isTemple?: boolean
  }) => {
    const { data } = await this.fetch(
      API_TINYGRAIL_MAGIC(monoId, type, toMonoId, amount, isTemple),
      true
    )
    return data
  }

  /** 查询 */
  doSearch = ({ keyword }) => this.fetch(API_TINYGRAIL_SEARCH(keyword), true)

  /** Link */
  doLink = async ({ monoId, toMonoId }) => {
    const { data } = await this.fetch(API_TINYGRAIL_LINK(monoId, toMonoId), true)
    return data
  }

  /** 启动 ICO */
  doICO = async ({ monoId }) => {
    const { data } = await this.fetch(API_TINYGRAIL_INIT(monoId), true)
    return data
  }

  /** 灌注星之力 */
  doStarForces = async ({ monoId, amount }) => {
    const { data } = await this.fetch(API_TINYGRAIL_CHARA_STAR(monoId, amount), true)
    return data
  }

  /** 改变圣殿塔图 */
  doChangeCover = async (imageUrl: string, monoId: Id) => {
    let hide: () => void
    try {
      hide = loading()

      const imageResponse = await fetch(imageUrl)
      const blob = await imageResponse.blob()
      const arrayBuffer = await new Response(blob).arrayBuffer()
      const imageBase64 = `data:image/jpg;base64,${arrayBufferToBase64(arrayBuffer)}`
      const hash = md5(imageBase64)

      const signatureResponse = await this.fetch(API_TINYGRAIL_OSS_SIGNATURE(hash), true)
      const { State, Value } = signatureResponse.data
      if (State !== 0) {
        if (hide) hide()
        info('获取 OSS 签名失败')
        return false
      }

      const ossUrl = `https://tinygrail.oss-cn-hangzhou.aliyuncs.com/cover/${hash}.jpg`
      const uploadResponse = await fetch(ossUrl, {
        method: 'PUT',
        headers: {
          Authorization: `OSS ${Value.Key}:${Value.Sign}`,
          'Content-Type': 'image/jpeg',
          'x-oss-date': Value.Date
        },
        body: blob
      })

      if (!uploadResponse.ok) {
        if (hide) hide()
        info('上传到 OSS 失败')
        return false
      }

      const { _response } = await xhrCustom({
        method: 'POST',
        url: API_CHARA_TEMPLE_COVER(monoId),
        headers: {
          'Content-Type': 'application/json',
          Cookie: this.cookie
        },
        data: ossUrl
      })
      const result = JSON.parse(_response)
      if (result.State !== 0) {
        if (hide) hide()
        info(result.Message || '')
        return false
      }

      if (hide) hide()
      info('更换封面成功')
      feedback()
      return this.batchUpdateTemplesByIds([monoId])
    } catch (error) {
      if (hide) hide()
      info('更换封面失败')
      return false
    }
  }
}
