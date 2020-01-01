/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-01 21:30:38
 */
import { observable, computed } from 'mobx'
import { tagStore } from '@stores'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'

const namespace = 'ScreenBrowser'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')

export default class ScreenBrowser extends store {
  state = observable({
    tabs: [],
    page: 24,
    type: defaultType,
    hide: false, // 用于列表置顶
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state,
      tabs: this.caculateTabs(),
      hide: false,
      _loaded: true
    })

    const { tabs, page } = this.state
    const { _loaded } = this.browser(tabs[page])
    if (!_loaded) {
      return this.fetchBrowser(true)
    }
    return true
  }

  // -------------------- get --------------------
  browser(airtime) {
    const { type } = this.state
    return computed(() => tagStore.browser(type, airtime)).get()
  }

  // -------------------- fetch --------------------
  fetchBrowser = refresh => {
    const { type, tabs, page } = this.state
    return tagStore.fetchBrowser(
      {
        type,
        airtime: tabs[page]
      },
      refresh
    )
  }

  // -------------------- page --------------------
  /**
   * 计算前2年和后1年的tabs
   */
  caculateTabs = () => {
    const date = new Date()
    let y = date.getFullYear()
    let m = date.getMonth()
    let yy = y
    let mm = m

    const now = `${y}-${m + 1}`
    const tabs = [now]
    for (let next = 12; next > 0; next -= 1) {
      if (m === 11) {
        y += 1
        m = 0
      } else {
        m += 1
      }
      tabs.push(`${y}-${m + 1}`)
    }
    for (let prev = 24; prev > 0; prev -= 1) {
      if (mm === 0) {
        yy -= 1
        mm = 11
      } else {
        mm -= 1
      }
      tabs.unshift(`${yy}-${mm + 1}`)
    }

    return tabs
  }

  /**
   * 标签页切换
   */
  onChange = (item, page) => {
    if (page === this.state.page) {
      return
    }

    t('索引.标签页切换', {
      key: item.key
    })

    this.setState({
      page
    })

    const { tabs } = this.state
    const { _loaded } = this.browser(tabs[page])
    if (!_loaded) {
      this.fetchBrowser(true)
    }
  }

  /**
   * 类型选择
   */
  onSelect = title => {
    t('索引.类型选择', {
      title
    })

    const { type } = this.state
    const nextType = MODEL_SUBJECT_TYPE.getLabel(title)
    if (nextType !== type) {
      this.setState({
        type: nextType
      })
      this.fetchBrowser(true)
      this.setStorage(undefined, undefined, namespace)
    }
  }
}
