/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 01:32:54
 */
import { calendarStore, systemStore, userStore } from '@stores'
import { cnjp, feedback, info, open } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { MODEL_RATING_STATUS, SITE_MANHUADB, SITE_WK8 } from '@constants'
import i18n from '@constants/i18n'
import { COMPONENT } from '../../ds'
import { replaceOriginUrl } from '../../../../user/origin-setting/utils'
import Ui from './ui'

import type { Navigation, RatingStatus } from '@types'

/** 源头选择与筛选回调 */
export default class Menus extends Ui {
  /** 通用源头选择: 匹配用户自定义源头, 替换占位参数后打开 */
  selectOnlineOrigin = (
    origins: readonly {
      readonly name: string
      readonly url: string
    }[],
    key: string
  ) => {
    try {
      let url: string

      // 匹配用户自定义源头
      const find = origins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, this.originReplaceParams)
      }
      this.open(url)

      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })
    } catch (error) {
      logger.error(COMPONENT, 'selectOnlineOrigin', error)
    }
  }

  onlineComicSelected = (key: string) => this.selectOnlineOrigin(this.onlineComicOrigins, key)

  /** 音乐源头选择 */
  onlineDiscSelected = (key: string) => this.selectOnlineOrigin(this.onlineDiscOrigins, key)

  /** 游戏源头选择 */
  onlineGameSelected = (key: string) => this.selectOnlineOrigin(this.onlineGameOrigins, key)

  /** 去漫画DB */
  toManhuadb = () => {
    const { mangaId } = this.source || {}
    const url = `${SITE_MANHUADB()}/manhua/${mangaId}`
    this.open(url)

    t('条目.阅读漫画', {
      subjectId: this.subjectId,
      mid: mangaId
    })
  }

  /** 去文库8 */
  toWenku8 = () => {
    const { wenkuId } = this.source || {}
    const url = `${SITE_WK8()}/novel/${Math.floor(wenkuId / 1000)}/${wenkuId}/index.htm`
    this.open(url)

    t('条目.阅读轻小说', {
      subjectId: this.subjectId,
      wid: wenkuId
    })
  }

  /** 前往 PSNINE 查看游戏奖杯 */
  toPSNINE = () => {
    open(`https://psnine.com/psngame?title=${encodeURIComponent(this.cn || this.jp)}`)

    t('条目.查看奖杯', {
      subjectId: this.subjectId
    })
  }

  /** 设置章节筛选 */
  updateFilterEps = (key: string) => {
    let filterEps = parseInt(key.match(/\d+/g)[0])
    if (filterEps === 1) filterEps = 0
    this.setState({
      filterEps
    })
    this.save()

    t('条目.设置章节筛选', {
      subjectId: this.subjectId,
      filterEps
    })
  }

  /** 筛选分数 */
  filterScores = (label: string) => {
    this.setState({
      filterScores: label === '全部' ? [] : label.split('-')
    })

    t('条目.筛选分数', {
      subjectId: this.subjectId,
      label
    })
  }

  /** 筛选吐槽状态 */
  filterStatus = async (label: string) => {
    const filterStatus = label === '全部' ? '' : MODEL_RATING_STATUS.getValue(label) || ''
    if (filterStatus === this.state.filterStatus) return

    this.setState({
      filterStatus,
      filterScores: []
    })
    this.save()

    await this.fetchSubjectComments(true, false)
    feedback()

    t('条目.筛选吐槽状态', {
      subjectId: this.subjectId,
      label
    })
  }

  /** 去用户评分页面 */
  toRating = (navigation: Navigation, from?: string, status?: '' | RatingStatus) => {
    const { wish, collect, doing, on_hold: onHold, dropped } = this.subjectCollection
    navigation.push('Rating', {
      subjectId: this.subjectId,
      status,
      name: cnjp(this.cn, this.jp),
      wish,
      collect,
      doing,
      onHold,
      dropped,
      type: this.type
    })

    t('条目.跳转', {
      to: 'Rating',
      from,
      subjectId: this.subjectId,
      status
    })
  }

  /** 展开收起功能块 */
  onSwitchBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    systemStore.switchSetting(key)

    t('条目.展开收起功能块', {
      key
    })
  }

  /** 展开收起功能块 */
  hiddenBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    systemStore.setSetting(key, -1)

    t('条目.展开收起功能块', {
      key: `${key} | -1`
    })
  }

  /** 显示 / 关闭管理目录模态框 */
  toggleFolder = () => {
    if (!userStore.isLogin) {
      info(`请先${i18n.login()}`)
      return
    }

    const value = !this.state.folder
    this.setState({
      folder: value
    })

    if (value) {
      t('条目.管理目录', {
        subjectId: this.subjectId
      })
    }
  }

  /** 自定义放送时间 */
  onSelectOnAir = (weekDayCN: string | number, timeCN: string) => {
    calendarStore.updateOnAirUser(this.subjectId, weekDayCN, timeCN)

    t('条目.自定义放送', {
      subjectId: this.subjectId
    })
  }

  /** 重置条目的自定义放送时间 */
  resetOnAirUser = () => {
    calendarStore.resetOnAirUser(this.subjectId)

    t('条目.重置放送', {
      subjectId: this.subjectId
    })
  }

  /** 自定义跳转菜单回调 */
}
