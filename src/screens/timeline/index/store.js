/*
 * @Author: czy0729
 * @Date: 2019-04-12 13:58:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-29 14:02:18
 */
import { observable, computed } from 'mobx'
import { _, userStore, timelineStore } from '@stores'
import { x18 } from '@utils/app'
import { fetchHTML, t } from '@utils/fetch'
import store from '@utils/store'
import { URL_DEFAULT_AVATAR } from '@constants'
import { MODEL_TIMELINE_SCOPE, MODEL_TIMELINE_TYPE } from '@constants/model'

export const tabs = MODEL_TIMELINE_TYPE.data.map(item => ({
  title: item.label
}))
const namespace = 'ScreenTimeline'

export default class ScreenTimeline extends store {
  state = observable({
    scope: MODEL_TIMELINE_SCOPE.getValue('全站'),
    page: 0, // <Tabs>当前页数
    _page: 0, // header上的假<Tabs>当前页数,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: true
    })
    this.fetchTimeline(true)
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

  timeline(scope, type) {
    return computed(() => {
      const timeline = timelineStore.timeline(scope, type)
      if (userStore.isLimit) {
        const list = timeline.list.filter(item => {
          if (item.avatar && item.avatar.src.includes(URL_DEFAULT_AVATAR)) {
            return false
          }

          if (item.p3 && item.p3.url && item.p3.url.length && item.p3.url[0]) {
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
  /**
   * @issue onTabClick与onChange在用受控模式的时候, 有冲突
   * 暂时这样解决
   */
  onTabClick = (item, page) => {
    if (page === this.state.page) {
      return
    }

    const { scope } = this.state
    t('时间胶囊.标签页点击', {
      page,
      scope
    })

    this.setState({
      page
    })

    // @issue onTabClick与onChange在用受控模式的时候有冲突, 暂时这样解决
    setTimeout(() => {
      this.setState({
        _page: page
      })
      this.setStorage(undefined, undefined, namespace)
    }, 400)
    this.fetchTimeline(true)
  }

  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    const { scope } = this.state
    t('时间胶囊.标签页切换', {
      page,
      scope
    })

    // 这里最后一个tab是假占位, 跳回到第一个tab
    if (page + 1 === tabs.length) {
      setTimeout(() => {
        this.setState({
          page: 0,
          _page: 0
        })
      }, 400)
    } else {
      this.setState({
        page,
        _page: page
      })
      this.fetchTimeline(true)
    }
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
    this.fetchTimeline(true)

    return res
  }
}
