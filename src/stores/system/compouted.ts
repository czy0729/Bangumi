/*
 * @Author: czy0729
 * @Date: 2023-04-23 15:11:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-15 16:35:56
 */
import { computed } from 'mobx'
import { radiusMd } from '@styles'
import { AnyObject, StoreConstructor, UserId } from '@types'
import { STATE } from './init'
import State from './state'

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

  /** 某用户备注 */
  userRemark(userId: UserId) {
    return computed(() => {
      return this.setting.userRemark[userId] || ''
    }).get()
  }

  /** 是否高级用户 */
  isAdvance(userId: UserId, userName?: string) {
    return computed<boolean>(() => {
      let flag = false
      if (userId) flag = userId in this.advanceDetail
      if (!flag && userName) flag = userName in this.advanceDetail
      return flag
    }).get()
  }

  /** 高级用户额度 */
  advanceAmount(userId: number, userName: UserId) {
    if (!userId || !userName) return 0

    return computed<number>(() => {
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
      } catch (error) {}

      return amount
    }).get()
  }
}
