/*
 * @Author: czy0729
 * @Date: 2023-04-24 14:02:38
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-20 00:51:50
 */
import { computed } from 'mobx'
import { deepClone, getTimestamp, toLocal } from '@utils'
import { StoreConstructor, SubjectId } from '@types'
import { INIT_CALENDAR, INIT_ONAIR_ITEM, INIT_USER_ONAIR_ITEM, STATE } from './init'
import { ON_AIR } from './onair'
import State from './state'
import { OnAirItem, OnAirUser } from './types'

export default class Computed extends State implements StoreConstructor<typeof STATE> {
  /** 发现页信息聚合 */
  @computed get home() {
    this.init('home', true)
    return this.state.home
  }

  /** @deprecated 发现页信息聚合 (CDN) */
  @computed get homeFromCDN() {
    return this.state.homeFromCDN
  }

  /** API 每日放送数据, 并整合云端 onAir 数据 */
  @computed get calendar() {
    this.init('calendar', true)

    const data = {
      ...deepClone(INIT_CALENDAR),
      _loaded: getTimestamp()
    }

    const { calendar } = this.state
    calendar.list.forEach(item => {
      item.items.forEach(item => {
        if (!item.id) return

        const onAirLocal = this.onAirLocal(item.id)

        // 如果没能计算到整合数据, 回退使用 api 的放送星期数据
        const { air, ...rest } = onAirLocal
        if (Object.values(rest).every(value => value === '')) {
          onAirLocal.weekDayCN = item.air_weekday || 0
        }

        let air_weekday = Number(
          (typeof onAirLocal.weekDayLocal === 'number'
            ? onAirLocal.weekDayLocal
            : onAirLocal.weekDayCN) || 0
        )
        if (air_weekday === 0) air_weekday = 7

        data.list[air_weekday - 1].items.push({
          ...item,
          air_weekday,
          ...onAirLocal
        })
      })
    })

    return data
  }

  /** 云端 onAir */
  @computed get onAir() {
    this.init('onAir', true)
    return this.state.onAir
  }

  /** 用户自定义放送时间 */
  onAirUser(subjectId: SubjectId) {
    this.init('onAirUser', true)
    return computed<OnAirUser>(() => {
      const { onAirUser } = this.state
      return onAirUser[subjectId] || INIT_USER_ONAIR_ITEM
    }).get()
  }

  // -------------------- computed --------------------
  /** 整合: 云端放送, 用户自定义放送时间, 本地时区 */
  onAirLocal(subjectId: SubjectId) {
    return computed<OnAirItem>(() => {
      // 云端放送数据
      const onAir = this.onAir[subjectId] || INIT_ONAIR_ITEM

      // 用户自定义放送时间数据
      const onAirUser = this.onAirUser(subjectId)

      // 用户自定义放送时间最优先
      if (onAirUser.weekDayCN !== '' || onAirUser.timeCN !== '') {
        return {
          ...onAir,
          ...onAirUser,
          custom: true
        }
      }

      // 若云端和代码本地数据全为空, 不处理
      if (
        !onAir.weekDayCN &&
        !onAir.timeCN &&
        !onAir.weekDayJP &&
        !onAir.timeJP &&
        !ON_AIR[subjectId]
      ) {
        return {
          ...onAir
        }
      }

      // 本地时区次优先
      const onAirLocal = toLocal(
        onAir.weekDayCN || onAir.weekDayJP || ON_AIR[subjectId]?.weekDayCN,
        onAir.timeCN || onAir.timeJP || ON_AIR[subjectId]?.timeCN
      )
      return {
        ...onAir,
        ...onAirLocal
      }
    }).get()
  }
}
