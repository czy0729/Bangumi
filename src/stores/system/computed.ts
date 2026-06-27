/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:11:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-22 21:30:58
 */
import { computed } from 'mobx'
import { computedFn } from 'mobx-utils'
import { IOS, WEB } from '@constants'
import { radiusMd } from '@styles'
import State from './state'

import type { AnyObject, StoreConstructor, UserId } from '@types'
import type { STATE } from './init'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 是否开发环境 */
  @computed get dev() {
    return this.state.dev
  }

  /** 基本设置 */
  @computed get setting() {
    return this.state.setting
  }

  /** 图片圆角 */
  @computed get coverRadius() {
    return radiusMd
  }

  /** 发布版本 */
  @computed get release() {
    return this.state.release
  }

  /** @deprecated iOS首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  @computed get iosUGCAgree() {
    return this.state.iosUGCAgree
  }

  /** 是否显示埋点统计 */
  @computed get devEvent() {
    return this.state.devEvent
  }

  /** 高级会员 */
  @computed get advance() {
    return this.state.advance
  }

  /** 高级会员详情 */
  @computed get advanceDetail() {
    return this.state.advanceDetail
  }

  /** 服务可用性 */
  @computed get serverStatus() {
    const STATE_KEY = 'serverStatus'

    return this.state[STATE_KEY]
  }

  /** 是否显示图片预览 */
  @computed get imageViewer() {
    return this.state.imageViewer
  }

  /** 用于标记 APP 启动后是否进入静止期 */
  @computed get rendered() {
    return this.state.rendered
  }

  /** 云端配置数据 */
  @computed get ota(): AnyObject {
    return this.state.ota
  }

  /** 用于在 bangumi-oss ota hash 更新后, 强制刷新 APP 内所有封面 */
  @computed get hashSubjectOTALoaded() {
    return this.state.hashSubjectOTALoaded
  }

  /** 统计 */
  @computed get t() {
    return this.state.t
  }

  // -------------------- computed --------------------
  /** @deprecated iOS 首次进入, 观看用户产生内容需有同意规则选项, 否则不能过审 */
  @computed get isUGCAgree() {
    return true
  }

  /**
   * 翻译引擎
   *  - v8.25.1 后 DeepLX 因部署长期变动崩溃已废弃
   * */
  @computed get translateEngine() {
    const { translateEngine } = this.setting
    if (!translateEngine || translateEngine === 'deeplx') return 'baidu'

    return translateEngine
  }

  /** setting.cdnAvatarV2 */
  @computed get cdnAvatar() {
    return false
  }

  /** 是否需要提示服务可用性有状况 */
  @computed get notifyServerStatus() {
    const { serverStatus } = this.setting
    if (serverStatus === 'none') return false

    const { status } = this.serverStatus
    if (serverStatus === 'degraded') return status === 'degraded' || status === 'down'

    if (serverStatus === 'down') return status === 'down'

    return false
  }

  /** 某用户备注 */
  userRemark = computedFn((userId: UserId) => {
    return this.setting.userRemark[userId] || ''
  })

  /** 是否高级用户 */
  isAdvance = computedFn((userId: UserId, userName?: UserId) => {
    let flag = false
    if (userId) flag = userId in this.advanceDetail
    if (!flag && userName) flag = userName in this.advanceDetail
    return flag
  })

  /** 高级用户额度 */
  advanceAmount = computedFn((userId: number, userName: UserId) => {
    if (!userId || !userName) return 0

    let amount = 0

    try {
      let temp: string | number = this.advanceDetail[userId] || 0
      if (typeof temp === 'string') {
        const value = Number(temp.split('|')?.[1])
        if (value) amount += value
      }

      // 若改过 ID 才进行二次计算
      if (userId && userName && userId !== userName) {
        temp = this.advanceDetail[userName] || 0
        if (typeof temp === 'string') {
          const value = Number(temp.split('|')?.[1])
          if (value) amount += value
        }
      }
    } catch {}

    return amount
  })

  /** 主域名代理中 */
  @computed get isHostProxy() {
    return !this.setting.workerProxyDisabled && !!this.setting.workerProxy
  }

  /** 毛玻璃: 首屏页面顶部 */
  @computed get blurTopTabs() {
    if (IOS || WEB) return true

    return this.setting.androidBlur && this.setting.blurTopTabs
  }

  /** 毛玻璃: 首屏页面顶部 */
  @computed get blurBottomTabs() {
    if (IOS || WEB) return true

    return this.setting.androidBlur && this.setting.blurBottomTabs
  }

  /** 毛玻璃: 轻提示 */
  @computed get blurToast() {
    if (IOS || WEB) return true

    return this.setting.androidBlur && this.setting.blurToast
  }

  /** 毛玻璃: 模态框 */
  @computed get blurModal() {
    if (IOS || WEB) return true

    return this.setting.androidBlur && this.setting.blurModal
  }
}
