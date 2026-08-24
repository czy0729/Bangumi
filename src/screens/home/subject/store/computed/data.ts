/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:15:23
 */
import { computed } from 'mobx'
import { systemStore } from '@stores'
import { keepBasicChars } from '@utils'
import {
  TEXT_ACTIONS_MANAGE,
  TEXT_ANI_DB,
  TEXT_GAME_CALENDAR_SUBSCRIBE,
  TEXT_ICS_MANAGE,
  TEXT_MAL,
  TEXT_NETABA,
  TEXT_ORIGINS_MANAGE,
  TEXT_VIB
} from '../ds'
import {
  buildCrtKeywords,
  buildKeywords,
  findOriginArtist,
  getDuration,
  mapNames,
  parseAlias,
  parseGameReleaseDates,
  parseMusicDuration
} from '../utils'
import Show from './show'

/** 杂项派生数据 */
export default class Derived extends Show {
  /** 锐评 */
  @computed get currentChatValues() {
    return this.state.chat[systemStore.setting.musumePrompt] || []
  }

  /** 是否有自定义跳转 */
  @computed get hasActions() {
    return this.actions.length > 0
  }

  /** 自定义跳转菜单 */
  @computed get actionsData() {
    return [...this.actions.map(item => item.name), TEXT_ACTIONS_MANAGE] as const
  }

  /** 动画、三次元源头菜单 */
  @computed get onlineData() {
    const data = [...this.onlineOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    if (systemStore.setting.exportICS) data.push(TEXT_ICS_MANAGE)
    return mapNames(data)
  }

  /** 书籍源头菜单 */
  @computed get comicData() {
    const data = [...this.onlineComicOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    return mapNames(data)
  }

  /** 游戏发售日期 */
  @computed get gameReleaseDates() {
    return parseGameReleaseDates(this.type, this.rawInfo)
  }

  /** 游戏源头菜单 */
  @computed get gameData() {
    const data = [...this.onlineGameOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    if (systemStore.setting.exportICS && this.gameReleaseDates.length) {
      data.push(TEXT_GAME_CALENDAR_SUBSCRIBE)
    }
    return mapNames(data)
  }

  /** 曲目源头菜单 */
  @computed get discData() {
    const data = [...this.onlineDiscOrigins, TEXT_ORIGINS_MANAGE]
    if (!this.hasActions) data.push(TEXT_ACTIONS_MANAGE)
    return mapNames(data)
  }

  /** VIB 评分透视菜单 */
  @computed get vibData() {
    const data = [TEXT_VIB]
    if (this.vib.anidb) data.push(TEXT_ANI_DB)
    if (this.vib.mal) data.push(TEXT_MAL)
    if (this.type === '动画') data.push(TEXT_NETABA)
    return data
  }

  /** 别名 */
  @computed get alias() {
    return parseAlias(this.rawInfo)
  }

  /** 条目图集关键字 */
  @computed get subjectKeywords() {
    const clean = (s?: string) => (s ? s.replace(/(?:第.*?(?:季|期)|(前|后)篇)$/g, '').trim() : '')
    const base = [this.cn, this.jp, clean(this.cn), ...this.alias, keepBasicChars(this.cn)]
    return buildKeywords(base, 24, 8)
  }

  /** 角色图集关键字 */
  @computed get crtKeywords() {
    return buildCrtKeywords(this.crt, 12, 4)
  }

  /** 吐槽项事件 */
  @computed get itemEvent() {
    return {
      id: '条目.跳转',
      data: {
        from: '吐槽',
        subjectId: this.subjectId
      }
    } as const
  }

  /** 音乐碟播放时长 */
  @computed get musicDuration() {
    return this.rawInfo ? parseMusicDuration(this.rawInfo) : ''
  }

  /** 剧场版、电影时长 */
  @computed get duration() {
    return getDuration(this.titleLabel, this.subject.eps, this.rawInfo)
  }

  /** 原作（按优先级返回，用于源头的可选参数） */
  @computed get originArtist() {
    return this.staff.length ? findOriginArtist(this.staff) : ''
  }
}
