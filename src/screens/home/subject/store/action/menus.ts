/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 08:56:01
 */
import { calendarStore, subjectStore, userStore } from '@stores'
import { cnjp, feedback, info, open } from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { MODEL_RATING_STATUS, SITE_MANHUADB, SITE_WK8 } from '@constants'
import i18n from '@constants/i18n'
import {
  COMPONENT,
  TITLE_ANITABI,
  TITLE_BLOG,
  TITLE_CATALOG,
  TITLE_CHARACTER,
  TITLE_COMMENT,
  TITLE_GAME,
  TITLE_INFO,
  TITLE_LIKE,
  TITLE_RATING,
  TITLE_RECENT,
  TITLE_RELATIONS,
  TITLE_SMB,
  TITLE_STAFF,
  TITLE_SUMMARY,
  TITLE_TAGS,
  TITLE_THUMBS,
  TITLE_TOPIC
} from '../../ds'
import { replaceOriginUrl } from '../../../../user/origin-setting/utils'
import Ui from './ui'

import type { Navigation, RatingStatus } from '@types'
import type { PopoverData, PopoverOnSelect } from '@components/popover/types'
import type { LayoutKey } from '@stores/subject/types'

/** 板块 key → 名称 (隐藏确认弹窗展示用) */
const BLOCK_TITLES: Record<LayoutKey, string> = {
  showAnitabi: TITLE_ANITABI,
  showBlog: TITLE_BLOG,
  showCatalog: TITLE_CATALOG,
  showCharacter: TITLE_CHARACTER,
  showComment: TITLE_COMMENT,
  showGameInfo: TITLE_GAME,
  showInfo: TITLE_INFO,
  showLike: TITLE_LIKE,
  showRating: TITLE_RATING,
  showRecent: TITLE_RECENT,
  showRelations: TITLE_RELATIONS,
  showSMB: TITLE_SMB,
  showStaff: TITLE_STAFF,
  showSummary: TITLE_SUMMARY,
  showTags: TITLE_TAGS,
  showThumbs: TITLE_THUMBS,
  showTopic: TITLE_TOPIC
}

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

  /** 板块标题布局菜单 (标题 Popover: 收起展开 / 重置布局 / 隐藏 / 管理, 前三项只作用于本条目) */
  blockMenu = (
    key: LayoutKey,
    navigation: Navigation
  ): { data: PopoverData; onSelect: PopoverOnSelect } => {
    const expand = this.layoutValue(key) === true

    const data: PopoverData = [
      `${expand ? '收起' : '展开'} (本条目)`,
      '重置布局 (本条目)',
      {
        text: '隐藏 (本条目)',
        type: 'danger'
      },
      '管理'
    ]

    return {
      data,
      onSelect: async (_title, index) => {
        const i = Number(index)
        if (Number.isNaN(i)) return

        // 收起 / 展开
        if (i === 0) {
          await subjectStore.setLayoutBlock(this.subjectId, key, !expand)

          t('条目.展开收起功能块', {
            key,
            subjectId: this.subjectId,
            action: 'subject'
          })

          // 收起切为展开时按写入后的值补拉: 全局默认收起时该数据从未请求过
          if (!expand) this.fetchGatedData(key)

          return
        }

        // 清除本条目全部板块覆盖, 回到跟随全局默认
        if (i === 1) {
          await subjectStore.resetLayoutItem(this.subjectId)
          info('已重置本条目布局')

          t('条目.展开收起功能块', {
            key,
            subjectId: this.subjectId,
            action: 'reset'
          })

          // 回到全局默认后若为展开, 补拉此前被覆盖成收起时没请求过的数据
          if (this.layoutValue(key) === true) this.fetchGatedData(key)
          return
        }

        // 隐藏, 隐藏后可在其它板块标题的「重置布局 (本条目)」里恢复
        if (i === 2) {
          await subjectStore.setLayoutBlock(this.subjectId, key, -1)
          info(`已隐藏「${BLOCK_TITLES[key]}」`)

          t('条目.展开收起功能块', {
            key,
            subjectId: this.subjectId,
            action: 'hide'
          })
          return
        }

        // 跳转设置页的页面布局分组
        if (i === 3) {
          navigation.push('Setting', {
            open: 'Subject'
          })
        }
      }
    }
  }

  /** 补拉按布局门控的扩展数据 (仅这两个板块的请求受 showXxx 门控, 其余数据常驻请求) */
  private fetchGatedData = (key: LayoutKey) => {
    if (key === 'showAnitabi') this.fetchAnitabi()
    if (key === 'showRating') this.fetchVIB()
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
}
