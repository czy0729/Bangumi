/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-26 00:19:23
 */
import { observable, computed } from 'mobx'
import { tagStore, userStore, collectionStore } from '@stores'
import store from '@utils/store'
import { x18 } from '@utils/app'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_BROSWER } from '@constants/html'

const namespace = 'ScreenBrowser'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')
const date = new Date()
const y = date.getFullYear()
const m = date.getMonth() + 1
const excludeState = {
  show: true // 是否显示列表, 制造切页效果
}

export default class ScreenBrowser extends store {
  state = observable({
    type: defaultType,
    airtime: y,
    month: m,
    layout: 'list', // list | grid
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      airtime: state.airtime || y,
      month: state.month || m,
      _loaded: true
    })

    const { _loaded } = this.browser
    if (!_loaded) {
      return this.fetchBrowser(true)
    }
    return true
  }

  onHeaderRefresh = () => this.fetchBrowser(true)

  // -------------------- fetch --------------------
  fetchBrowser = refresh => {
    const { type } = this.state
    return tagStore.fetchBrowser(
      {
        type,
        airtime: this.airtime
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get airtime() {
    const { airtime, month } = this.state
    return month ? `${airtime}-${month}` : airtime
  }

  @computed get browser() {
    const { type } = this.state
    const browser = tagStore.browser(type, this.airtime)
    if (userStore.isLimit) {
      let _filter = 0
      const list = browser.list.filter(item => {
        const filter = x18(item.id)
        if (filter) _filter += 1
        return !filter
      })
      return {
        ...browser,
        list,
        _filter
      }
    }
    return browser
  }

  @computed get url() {
    const { type } = this.state
    return HTML_BROSWER(type, this.airtime)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  // -------------------- page --------------------
  onTypeSelect = type => {
    t('索引.类型选择', {
      type
    })

    this.setState({
      show: false,
      type: MODEL_SUBJECT_TYPE.getLabel(type)
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 0)

    this.fetchBrowser(true)
  }

  onAirdateSelect = airtime => {
    t('索引.年选择', {
      airtime
    })

    this.setState({
      show: false,
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 0)

    this.fetchBrowser(true)
  }

  onMonthSelect = month => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    t('索引.月选择', {
      month
    })

    this.setState({
      show: false,
      month: month === '全部' ? '' : month
    })
    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 0)

    this.fetchBrowser(true)
  }

  onAirdatePrev = () => {
    const { airtime, month } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    if (!month) {
      this.setState({
        show: false,
        airtime: airtime - 1
      })
    } else {
      let _airtime = airtime
      let _month = month
      if (month == 1) {
        _airtime -= 1
        _month = 12
      } else {
        _month -= 1
      }
      this.setState({
        show: false,
        airtime: _airtime,
        month: _month
      })
    }

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 0)

    this.fetchBrowser(true)
  }

  onAirdateNext = () => {
    const { airtime, month } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    if (!month) {
      this.setState({
        show: false,
        airtime: airtime + 1
      })
    } else {
      let _airtime = airtime
      let _month = month
      if (month == 12) {
        _airtime += 1
        _month = 1
      } else {
        _month += 1
      }
      this.setState({
        show: false,
        airtime: _airtime,
        month: _month
      })
    }

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 0)

    this.fetchBrowser(true)
  }

  /**
   * 切换布局
   */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('索引.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
