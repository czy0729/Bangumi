/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 08:55:04
 */
import { cnjp, open } from '@utils'
import { t } from '@utils/fetch'
import { HOST, HOST_NETABA } from '@constants'
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
import Share from './share'

import type { Navigation } from '@types'

/** 菜单入口分发 */
export default class Actions extends Share {
  /** 菜单公共守卫: 管理源头 / 跳转管理; 返回 true 表示已处理 */
  handleMenuCommon = (title: string, navigation: Navigation): boolean => {
    if (title === TEXT_ORIGINS_MANAGE) {
      navigation.push('OriginSetting')
      return true
    }

    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return true
    }

    return false
  }

  onActionsPress = (title: string, navigation: Navigation) => {
    if (title === TEXT_ACTIONS_MANAGE) {
      navigation.push('Actions', {
        subjectId: this.subjectId,
        name: this.cn || this.jp
      })
      return
    }

    const find = this.actions.find(item => item.name === title)
    if (find) {
      open(find.url, true)

      t('其他.自定义跳转', {
        from: 'Subject',
        key: `${this.subjectId}|${find.name}|${find.url}`
      })
      return
    }
  }

  /** 源头菜单回调 */
  onOnlinePress = (title: string, navigation: Navigation) => {
    if (this.handleMenuCommon(title, navigation)) return

    if (title === TEXT_ICS_MANAGE) {
      this.doExportCalenderEventICS()
      return
    }

    this.onlinePlaySelected(title)
  }

  /** 曲目菜单回调 */
  onDiscPress = (title: string, navigation: Navigation) => {
    if (this.handleMenuCommon(title, navigation)) return

    this.onlineDiscSelected(title)
  }

  /** 游戏菜单回调 */
  onGamePress = (title: string, navigation: Navigation) => {
    if (this.handleMenuCommon(title, navigation)) return

    if (title === TEXT_GAME_CALENDAR_SUBSCRIBE) {
      this.doSaveGameReleaseDate()
      return
    }

    this.onlineGameSelected(title)
  }

  /** 书籍菜单回调 */
  onComicPress = (title: string, navigation: Navigation) => {
    if (this.handleMenuCommon(title, navigation)) return

    this.onlineComicSelected(title)
  }

  /** VIB 评分透视菜单回调 */
  onVIBPress = (title: string, navigation: Navigation) => {
    if (title === TEXT_VIB) {
      t('条目.跳转', {
        to: 'Stats',
        from: '评分分布',
        subjectId: this.subjectId
      })

      navigation.push('WebBrowser', {
        title: `${cnjp(this.cn, this.jp)}的透视`,
        url: `${HOST}/subject/${this.subjectId}/stats`
      })
      return
    }

    if (title === TEXT_NETABA) {
      t('条目.跳转', {
        to: 'Netabare',
        from: '评分分布',
        subjectId: this.subjectId
      })

      open(`${HOST_NETABA}/subject/${this.subjectId}`)
      return
    }

    if (title === TEXT_ANI_DB) {
      open(
        `https://anidb.net/anime/?adb.search=${(this.jp || this.cn).replace(
          /～|、|・/g,
          ' '
        )}&do.search=1`
      )
      return
    }

    if (title === TEXT_MAL) {
      open(`https://myanimelist.net/anime.php?q=${this.jp || this.cn}`)
      return
    }
  }
}
