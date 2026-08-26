/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 23:54:05
 */
import { StatusBar } from '@components'
import { getCoverSrc } from '@components/cover/utils'
import { HEADER_TRANSITION_HEIGHT } from '@components/header/utils'
import { _, otaStore, systemStore, uiStore } from '@stores'
import {
  appNavigate,
  copy,
  debounce,
  feedback,
  getBangumiUrl,
  open,
  postTask,
  showActionSheet,
  updateVisibleBottom
} from '@utils'
import { logger } from '@utils/dev'
import { t } from '@utils/fetch'
import { s2t } from '@utils/thirdParty/open-cc'
import { IMG_WIDTH, SITE_AGEFANS, SITES, TEXT_MENU_TOPIC, WEB } from '@constants'
import { COMPONENT } from '../../ds'
import { replaceOriginUrl } from '../../../../user/origin-setting/utils'
import Fetch from '../fetch'

import type { Id, Navigation, ScrollEvent, TimerRef } from '@types'
import type { OriginItem } from '../../../../user/origin-setting/utils'
import type { EpsItem } from '../../types'

/** 条目交互与导航 */
export default class Ui extends Fetch {
  private _updateStatusBarTimeoutId: TimerRef = null

  /** 更新状态栏主题色 */
  updateStatusBar = (fixed?: boolean) => {
    if (this._updateStatusBarTimeoutId) return

    this._updateStatusBarTimeoutId = setTimeout(() => {
      StatusBar.setBarStyle(_.isDark ? 'light-content' : fixed ? 'dark-content' : 'light-content')
      this._updateStatusBarTimeoutId = null
    }, 80)
  }

  /** 显示收藏管理 */
  showManageModel = () => {
    this.setState({
      visible: true
    })

    t('条目.显示收藏管理', {
      subjectId: this.subjectId
    })
  }

  /** 隐藏管理进度信息弹窗 */
  closeManageModal = () => {
    this.setState({
      visible: false
    })
  }

  /** 章节倒序 */
  toggleReverseEps = () => {
    this.setState({
      epsReverse: !this.state.epsReverse
    })
    this.save()

    t('条目.章节倒序', {
      subjectId: this.subjectId
    })
  }

  /** 吐槽倒序 */
  toggleReverseComments = () => {
    this.fetchSubjectComments(true, !this.subjectComments._reverse)

    t('条目.吐槽倒序', {
      subjectId: this.subjectId
    })
  }

  /** 书籍章节输入框改变 */
  changeText = (name: string, text: string) => {
    try {
      this.setState({
        [name]: String(text)
      })

      t('条目.书籍章节输入框改变', {
        subjectId: this.subjectId
      })
    } catch (error) {
      logger.error(COMPONENT, 'changeText', error)
    }
  }

  /** 源头跳转链接的占位参数 */
  get originReplaceParams() {
    return {
      CN: this.cn || this.jp,
      JP: this.jp || this.cn,
      ID: this.subjectId,
      ARTIST: this.originArtist || '',
      ALBUM: this.jp || '',
      RELATED_ANIME: this?.subjectAnime?.title || '',
      YEAR: this.year || ''
    }
  }

  /** 动漫源头选择 */
  onlinePlaySelected = async (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url: string

      // AGE 动漫，有自维护 ID 数据，优先匹配
      if (key === 'AGE动漫') {
        const aid = this.params._aid
        if (aid) {
          url = `${SITE_AGEFANS()}/detail/${aid}`
        } else {
          const item = otaStore.anime(this.subjectId)
          if (item?.ageId) url = `${SITE_AGEFANS()}/detail/${item.ageId}`
        }
      }

      // 匹配用户自定义源头
      if (!url) {
        const find = this.onlineOrigins
          .filter((item): item is OriginItem => typeof item === 'object')
          .find(item => item.name === key)
        if (find) {
          if (key === '萌番组' && find.id) {
            copy(this.cn || this.jp)
            postTask(() => {
              open(find.url)
            }, 1600)
            return
          }

          url = replaceOriginUrl(find.url, this.originReplaceParams)
        }
      }

      // 旧匹配逻辑
      if (!url) {
        const { bangumiInfo } = this.state
        const { sites = [] } = bangumiInfo
        let item: {
          site: string
          id: Id
          url?: string
        }
        switch (key) {
          case 'AGE动漫':
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(this.cn || this.jp)}&page=1`
            break

          case 'Anime1':
            url = `https://anime1.me/?s=${encodeURIComponent(s2t(this.cn || this.jp))}`
            break

          case 'Hanime1':
            url = `https://hanime1.me/search?query=${encodeURIComponent(this.jp || this.cn)}`
            break

          default:
            item = sites.find(item => item.site === key)
            if (item) url = getBangumiUrl(item)
            break
        }
      }

      this.open(url)
    } catch (error) {
      logger.error(COMPONENT, 'onlinePlaySelected', error)
    }
  }

  /** 判断是否需要复制地址后跳转 */
  open = (url: string) => {
    if (url) {
      const { openInfo } = systemStore.setting
      if (openInfo) copy(url, '已复制地址，即将跳转')
      postTask(
        () => {
          open(url)
        },
        openInfo ? (WEB ? 400 : 1600) : 0
      )
    }
  }

  /** 漫画源头选择 */

  /** 切换评论版本 */
  toggleVersion = async () => {
    this.setState({
      filterVersion: !this.state.filterVersion
    })
    this.save()

    await this.fetchSubjectComments(true, false)
    feedback()
  }

  /** Box 状态按钮做动画前, 需要先设置开启 */
  prepareFlip = () => {
    this.setState({
      flip: true
    })
  }

  /** Box 状态按钮完全动画后, 需要设置关闭才能做下一次动画 */
  afterFlip = () => {
    const { flipKey } = this.state
    this.setState({
      flip: false
    })
    postTask(() => {
      this.setState({
        flipKey: flipKey + 1
      })
    }, 400)
  }

  private _flipTimeoutId: TimerRef = null

  /** Eps 状态按钮做动画前, 需要先设置开启 */
  prepareEpsFlip = () => {
    if (this._flipTimeoutId) clearTimeout(this._flipTimeoutId)

    this.setState({
      flipEps: true
    })

    this._flipTimeoutId = setTimeout(() => {
      this.afterEpsFlip()
    }, 8000)
  }

  /** Eps 状态按钮完全动画后, 需要设置关闭才能做下一次动画 */
  afterEpsFlip = debounce(() => {
    this.setState({
      flipEps: false
    })
  })

  /** 更新可视范围底部 y */
  updateVisibleBottom = updateVisibleBottom.bind(this)

  onScrollY = 0

  private _closeLikesGridTimeoutId = null

  /** 滑动回调 */
  onScroll = (e: ScrollEvent) => {
    const { y } = e.nativeEvent.contentOffset
    this.onScrollY = y
    this.updateVisibleBottom(e)

    // 关闭吐槽区可能展开的回复表情选择弹出层
    if (!this._closeLikesGridTimeoutId && y >= _.window.height * 2) {
      this._closeLikesGridTimeoutId = setTimeout(() => {
        uiStore.closeLikesGrid()
        this._closeLikesGridTimeoutId = null
      }, 80)
    }

    // 计算头部是否需要固定
    if (
      (this.state.fixed && y > HEADER_TRANSITION_HEIGHT) ||
      (!this.state.fixed && y <= HEADER_TRANSITION_HEIGHT)
    ) {
      return
    }

    const fixed = y > HEADER_TRANSITION_HEIGHT
    this.setState({
      fixed
    })
    this.updateStatusBar(fixed)

    if (!this.state.scrolled) {
      setTimeout(() => {
        this.setState({
          scrolled: true
        })
      }, 0)
    }
  }

  /** 显示锐评框 */

  toEp = (item: EpsItem, navigation: Navigation) => {
    // 数据占位
    appNavigate(
      item.url || `/ep/${item.id}`,
      navigation,
      {
        _title: `ep${item.sort}.${item.name || item.name_cn}`,
        _group: this.subject.name || this.subject.name_cn,
        _groupThumb: getCoverSrc((this.subject.images || {})?.medium, IMG_WIDTH),
        _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(item.desc || '').replace(
          /\r\n/g,
          '<br />'
        )}`
      },
      {
        id: '条目.跳转',
        data: {
          from: '章节',
          subjectId: this.subjectId
        }
      }
    )

    t('条目.章节菜单操作', {
      title: TEXT_MENU_TOPIC,
      subjectId: this.subjectId
    })
  }

  /** 正版播放 */
  toPlay = (item: EpsItem) => {
    postTask(() => {
      showActionSheet(this.onlinePlayActionSheetData, index => {
        const isSp = item.type === 1
        let url: string

        // @todo 逻辑比较复杂, 暂时不处理 Ep 偏移
        const { epsData } = this.state
        const { eps = [] } = this.subject
        const siteName = this.onlinePlayActionSheetData[index] as (typeof SITES)[number]
        let epIndex: number
        if (SITES.includes(siteName)) {
          if (isSp) {
            url = getBangumiUrl({
              id: item.id,
              site: siteName
            })
          } else {
            epIndex = eps.filter(item => item.type === 0).findIndex(i => i.id === item.id)
            url =
              epsData[siteName][epIndex] ||
              getBangumiUrl({
                id: item.id,
                site: siteName
              })
          }
        }

        if (url) open(url)

        t('条目.章节菜单操作', {
          title: this.onlinePlayActionSheetData[index],
          subjectId: this.subjectId
        })
      })
    }, 320)
  }
}
