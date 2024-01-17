/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 11:14:51
 */
import { computed, observable } from 'mobx'
import { _, systemStore, timelineStore, userStore } from '@stores'
import { feedback, updateVisibleBottom, x18 } from '@utils'
import { fetchHTML, t } from '@utils/fetch'
import store from '@utils/store'
import {
  IOS,
  MODEL_TIMELINE_SCOPE,
  MODEL_TIMELINE_TYPE,
  TIMELINE_TYPE,
  URL_DEFAULT_AVATAR
} from '@constants'
import { TimeLineScope, TimeLineType, UserId } from '@types'
import { EXCLUDE_STATE, NAMESPACE, STATE, TABS } from './ds'
import { TabLabel } from './types'

export default class ScreenTimeline extends store<typeof STATE> {
  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    let page = state?.page || 0
    if (page >= 4) page = 0

    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      page,
      renderedTabsIndex: [page],
      _loaded: true
    })

    setTimeout(() => {
      this.fetchTimeline(true)
    }, 0)
    return true
  }

  onHeaderRefresh = () => {
    return this.fetchTimeline(true)
  }

  save = () => {
    return this.saveStorage(NAMESPACE, EXCLUDE_STATE)
  }

  // -------------------- fetch --------------------
  fetchTimeline = (refresh: boolean = false) => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue<TimeLineType>(TABS[page].title)
    return timelineStore.fetchTimeline(
      {
        scope,
        type
      },
      refresh
    )
  }

  // -------------------- get --------------------
  /** Tab navigationState */
  @computed get navigationState() {
    const { page } = this.state
    return {
      index: page,
      routes: TABS
    }
  }

  @computed get backgroundColor() {
    return _.select(_.colorPlain, _._colorDarkModeLevel1)
  }

  @computed get isWebLogin() {
    return userStore.isWebLogin
  }

  @computed get myUserId() {
    return userStore.myUserId
  }

  /**
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 主动设置屏蔽 18x
   *  - 限制用户群体 (iOS 的游客和审核员) 强制屏蔽默认头像用户和 18x
   */
  timeline(scope: TimeLineScope, type: TimeLineType) {
    return computed(() => {
      const timeline = timelineStore.timeline(scope, type)
      const { filterDefault, filter18x } = systemStore.setting
      if (filterDefault || filter18x || userStore.isLimit) {
        const list = timeline.list.filter(item => {
          if (
            (filterDefault || userStore.isLimit) &&
            item.avatar?.src?.includes(URL_DEFAULT_AVATAR)
          ) {
            return false
          }

          if ((filter18x || userStore.isLimit) && item?.p3?.url?.[0]) {
            const url = String(item.p3.url[0])
            if (url.match(/\/subject\/\d+/)) {
              return !x18(url.replace('https://bgm.tv/subject/', ''))
            }
          }

          return true
        })

        return {
          ...timeline,
          list
        }
      }
      return timeline
    }).get()
  }

  /** 是否渲染 Item */
  showItem(title: TabLabel) {
    return computed(() => {
      if (!IOS) return true
      const index = TABS.findIndex(item => item.title === title)
      return this.state.renderedTabsIndex.includes(index)
    }).get()
  }

  // -------------------- page --------------------
  /** 标签页切换 */
  onChange = (page: number) => {
    const { scope } = this.state
    t('时间胶囊.标签页切换', {
      page,
      scope
    })

    const renderedTabsIndex = [...this.state.renderedTabsIndex]
    if (!renderedTabsIndex.includes(page)) renderedTabsIndex.push(page)

    this.setState({
      page,
      renderedTabsIndex
    })

    if (!this.timeline(scope, TIMELINE_TYPE[page].value)._loaded) {
      this.fetchTimeline(true)
    }
    this.save()
  }

  /** 切换类型 */
  onSelectScope = (label: string) => {
    t('时间胶囊.切换类型', {
      label
    })

    const { scope } = this.state
    const nextScope = MODEL_TIMELINE_SCOPE.getValue<TimeLineScope>(label)
    if (nextScope !== scope) {
      this.setState({
        scope: nextScope
      })
      this.fetchTimeline(true)
      this.save()
    }
  }

  /** 保存滚动到顶方法的引用 */
  scrollToLocation = {}

  /** 底部 TabBar 再次点击滚动到顶并刷新数据 */
  forwardRef = (ref: any, index: number) => {
    this.scrollToLocation[index] = ref?.scrollToLocation
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToLocation[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Timeline'
        })

        this.scrollToLocation[page]({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
          viewOffset: 800,
          viewPosition: 0
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.onHeaderRefresh()
      }
    } catch (error) {
      console.error('Timeline', 'onRefreshThenScrollTop', error)
    }
  }

  /** 隐藏 */
  onHidden = (title: string, userId: UserId) => {
    let day: number
    if (title === '1天不看TA') {
      day = 1
    } else if (title === '3天不看TA') {
      day = 3
    } else if (title === '7天不看TA') {
      day = 7
    } else {
      day = 0
    }

    timelineStore.updateHidden(userId, day)
    t('时间胶囊.隐藏', {
      userId,
      day
    })
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)

  // -------------------- action --------------------
  /** 删除时间线 */
  doDelete = async (href: string) => {
    if (!href) return false

    const { scope } = this.state
    t('时间胶囊.删除时间线', {
      scope
    })

    await fetchHTML({
      method: 'POST',
      url: href
    })
    feedback()

    this.fetchTimeline(true)
    return true
  }
}
