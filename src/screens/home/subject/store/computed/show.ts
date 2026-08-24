/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:26:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-25 05:15:28
 */
import { computed } from 'mobx'
import { systemStore, userStore } from '@stores'
import { freeze, randomizeImgHost } from '@utils'
import { HOST_AC_REFERER, HOST_DB_REFERER } from '@constants'
import {
  TITLE_ANITABI,
  TITLE_BLOG,
  TITLE_CATALOG,
  TITLE_CHARACTER,
  TITLE_COMIC,
  TITLE_COMMENT,
  TITLE_DISC,
  TITLE_EP,
  TITLE_GAME,
  TITLE_INFO,
  TITLE_LIKE,
  TITLE_RATING,
  TITLE_RECENT,
  TITLE_RELATIONS,
  TITLE_STAFF,
  TITLE_SUMMARY,
  TITLE_TAGS,
  TITLE_THUMBS,
  TITLE_TOPIC
} from '../../ds'
import { NON_SHOW } from '../ds'
import { settingTuple } from '../utils'
import Relations from './relations'

/** 区块显示与预览派生 */
export default class Show extends Relations {
  /** 预览图片数据（随机化 host） */
  @computed get thumbsData() {
    return this.state.epsThumbs.map(item => randomizeImgHost(item))
  }

  /** 预览图片展示数据 */
  @computed get thumbsList() {
    return this.thumbsData.map(item => ({
      url: String(item.split('@')?.[0]),
      headers: this.state.epsThumbsHeader
    }))
  }

  /** 预览数据来源 */
  @computed get thumbsReference() {
    const referer = this.state.epsThumbsHeader?.Referer
    if (referer?.includes?.(HOST_DB_REFERER)) return HOST_DB_REFERER
    if (referer?.includes?.(HOST_AC_REFERER)) return HOST_AC_REFERER
    return ''
  }

  /** 预览标题 */
  @computed get thumbsTitle() {
    if (this.type === '音乐') return 'MV'
    if (this.type === '三次元') return '剧照'
    return '预览'
  }

  /**
   * 是否显示章节
   *  - 第一个结果为是否显示菜单
   *  - 第二个结果为是否渲染组件
   * */
  @computed get showEp() {
    // 游戏没有 ep
    const show = this.type !== '游戏'
    return [show, show] as const
  }

  /** 是否显示标签 */
  @computed get showTags() {
    return settingTuple(systemStore.setting.showTags)
  }

  /** 是否显示简介 */
  @computed get showSummary() {
    if (this.subject._loaded && !this.summary) return NON_SHOW
    return settingTuple(systemStore.setting.showSummary)
  }

  /** 是否显示预览 */
  @computed get showThumbs() {
    const { showThumbs } = systemStore.setting
    if (showThumbs === -1) return NON_SHOW

    const { epsThumbs, videos } = this.state
    if (!epsThumbs.length && !videos.length) return NON_SHOW

    return [showThumbs === true, true] as const
  }

  /** 是否显示详情 */
  @computed get showInfo() {
    return settingTuple(systemStore.setting.showInfo)
  }

  /** 是否显示游戏 */
  @computed get showGame() {
    if (this.nsfw && userStore.isExtremeLimit) return NON_SHOW

    const { showGameInfo } = systemStore.setting
    if (
      showGameInfo === -1 ||
      (!this.gameInfo?.i &&
        !this.hasExternalScreenshots &&
        !this.state.gameDuration.mainStory &&
        !this.state.gameDuration.vndb)
    ) {
      return NON_SHOW
    }

    return [showGameInfo === true, true] as const
  }

  /** 是否显示评分 */
  @computed get showRating() {
    return settingTuple(systemStore.setting.showRating)
  }

  /** 是否显示角色 */
  @computed get showCharacter() {
    if (!this.crt.length) return NON_SHOW
    return settingTuple(systemStore.setting.showCharacter)
  }

  /** 是否显示制作人员 */
  @computed get showStaff() {
    if (!this.staff.length) return NON_SHOW
    return settingTuple(systemStore.setting.showStaff)
  }

  /** 是否显示取景地标 */
  @computed get showAnitabi() {
    if (!this.state.anitabi.pointsLength) return NON_SHOW
    return settingTuple(systemStore.setting.showAnitabi)
  }

  /** 是否显示关联 */
  @computed get showRelations() {
    if (!this.relations.length) return NON_SHOW
    return settingTuple(systemStore.setting.showRelations)
  }

  /** 是否显示单行本 */
  @computed get showComic() {
    if (!this.comic.length) return NON_SHOW
    return settingTuple(true)
  }

  /** 是否显示目录 */
  @computed get showCalalog() {
    if (!this.filterCatalog.length) return NON_SHOW
    return settingTuple(systemStore.setting.showCatalog)
  }

  /** 是否显示猜你喜欢 */
  @computed get showLike() {
    if (!this.like.length) return NON_SHOW
    return settingTuple(systemStore.setting.showLike)
  }

  /** 是否显示日志 */
  @computed get showBlog() {
    if (!this.filterBlog.length) return NON_SHOW
    return settingTuple(systemStore.setting.showBlog)
  }

  /** 是否显示帖子 */
  @computed get showTopic() {
    if (!this.filterTopic.length) return NON_SHOW
    return settingTuple(systemStore.setting.showTopic)
  }

  /** 是否显示动态 */
  @computed get showRecent() {
    if (!this.filterRecent.length) return NON_SHOW
    return settingTuple(systemStore.setting.showRecent)
  }

  /** 右上角跳转到目标块菜单 */
  @computed get locationDS() {
    const data = [TITLE_COMMENT]
    if (this.showEp[0]) data.push(this.type === '音乐' ? TITLE_DISC : TITLE_EP)
    if (this.showTags[0]) data.push(TITLE_TAGS)
    if (this.showSummary[0]) data.push(TITLE_SUMMARY)
    if (this.showThumbs[0]) {
      const { epsThumbs, videos } = this.state
      data.push(`${TITLE_THUMBS} (${epsThumbs.length + videos.length})`)
    }
    if (this.showInfo[0]) data.push(TITLE_INFO)
    if (this.showGame[0]) data.push(TITLE_GAME)
    if (this.showRating[0]) data.push(TITLE_RATING)
    if (this.showCharacter[0]) data.push(TITLE_CHARACTER)
    if (this.showStaff[0]) data.push(TITLE_STAFF)
    if (this.showAnitabi[0]) data.push(`${TITLE_ANITABI} (${this.state.anitabi.pointsLength})`)
    if (this.showComic[0]) data.push(`${TITLE_COMIC} (${this.comic.length})`)
    if (this.showRelations[0]) data.push(`${TITLE_RELATIONS} (${this.relations.length})`)
    if (this.showCalalog[0]) data.push(`${TITLE_CATALOG} (${this.filterCatalog.length})`)
    if (this.showLike[0]) data.push(`${TITLE_LIKE} (${this.like.length})`)
    if (this.showBlog[0]) data.push(`${TITLE_BLOG} (${this.filterBlog.length})`)
    if (this.showTopic[0]) data.push(`${TITLE_TOPIC} (${this.filterTopic.length})`)
    if (this.showRecent[0]) data.push(`${TITLE_RECENT} (${this.filterRecent.length})`)
    data.push(`${TITLE_COMMENT} (${this.commentLength}+)`)
    return freeze(data)
  }
}
