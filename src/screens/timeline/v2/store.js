/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 21:03:27
 */
import { observable, computed } from 'mobx'
import { _, systemStore, userStore, timelineStore } from '@stores'
import { x18 } from '@utils/app'
import { fetchHTML, t } from '@utils/fetch'
import store from '@utils/store'
import { feedback } from '@utils/ui'
import { URL_DEFAULT_AVATAR } from '@constants'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'

export const tabs = MODEL_TIMELINE_TYPE.data.map(item => ({
  title: item.label
}))
export const H_TABBAR = 48

const namespace = 'ScreenTimeline'
const excludeState = {
  isFocused: true
}

export default class ScreenTimeline extends store {
  state = observable({
    scope: MODEL_TIMELINE_SCOPE.getValue('全站'),
    page: 0, // <Tabs>当前页数
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })

    setTimeout(() => {
      this.fetchTimeline(true)
    }, 0)
    return res
  }

  onHeaderRefresh = () => this.fetchTimeline(true)

  // -------------------- fetch --------------------
  fetchTimeline = refresh => {
    const { scope, page } = this.state
    const type = MODEL_TIMELINE_TYPE.getValue(tabs[page].title)
    return timelineStore.fetchTimeline({ scope, type }, refresh)
  }

  // -------------------- get --------------------
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
   *  - 主动设置屏蔽18x
   *  - 限制用户群体 (iOS的游客和审核员) 强制屏蔽默认头像用户和18x
   */
  timeline(scope, type) {
    return computed(() => {
      const timeline = timelineStore.timeline(scope, type)
      const { filterDefault, filter18x } = systemStore.setting
      if (filterDefault || filter18x || userStore.isLimit) {
        const list = timeline.list.filter(item => {
          if (
            (filterDefault || userStore.isLimit) &&
            item.avatar &&
            item.avatar.src.includes(URL_DEFAULT_AVATAR)
          ) {
            return false
          }

          if (
            (filter18x || userStore.isLimit) &&
            item.p3 &&
            item.p3.url &&
            item.p3.url.length &&
            item.p3.url[0]
          ) {
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

  // -------------------- page --------------------
  onChange = page => {
    const { scope } = this.state
    t('时间胶囊.标签页切换', {
      page,
      scope
    })

    this.setState({
      page
    })
    this.fetchTimeline(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onSelectScope = label => {
    t('时间胶囊.切换类型', {
      label
    })

    const { scope } = this.state
    const nextScope = MODEL_TIMELINE_SCOPE.getValue(label)
    if (nextScope !== scope) {
      this.setState({
        scope: nextScope
      })
      this.fetchTimeline(true)
      this.setStorage(undefined, undefined, namespace)
    }
  }

  /**
   * 底部TabBar再次点击滚动到顶并刷新数据
   */
  scrollToLocation = {}
  connectRef = (ref, index) => {
    this.scrollToLocation[index] = ref?.scrollToLocation
  }

  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToLocation[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'Timeline'
        })

        this.onHeaderRefresh()
        this.scrollToLocation[page]({
          animated: true,
          itemIndex: 0,
          sectionIndex: 0,
          viewOffset: 800,
          viewPosition: 0
        })
      }
    } catch (error) {
      warn('Timeline', 'onRefreshThenScrollTop', error)
    }
  }

  // -------------------- action --------------------
  /**
   * 删除时间线
   */
  doDelete = async href => {
    if (!href) {
      return false
    }

    const { scope } = this.state
    t('时间胶囊.删除时间线', {
      scope
    })

    const res = fetchHTML({
      method: 'POST',
      url: href
    })
    await res
    feedback()

    this.fetchTimeline(true)

    return res
  }
}
