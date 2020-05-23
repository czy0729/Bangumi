/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-24 01:52:33
 */
import { observable, computed } from 'mobx'
import { tagStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { HTML_BROSWER } from '@constants/html'

const namespace = 'ScreenBrowser'
const defaultType = MODEL_SUBJECT_TYPE.getLabel('动画')
const date = new Date()
const y = date.getFullYear()
const m = date.getMonth()
const excludeState = {
  show: true // 是否显示列表, 制造切页效果
}

export default class ScreenBrowser extends store {
  state = observable({
    type: defaultType,
    airtime: y,
    month: m,
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
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
  get airtime() {
    const { airtime, month } = this.state
    return month ? `${airtime}-${month}` : airtime
  }

  get browser() {
    const { type } = this.state
    return computed(() => tagStore.browser(type, this.airtime)).get()
  }

  get url() {
    const { type } = this.state
    return HTML_BROSWER(type, this.airtime)
  }

  // -------------------- page --------------------
  onTypeSelect = async type => {
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
    }, 0)

    await this.fetchBrowser(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onAirdateSelect = async airtime => {
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
    }, 0)

    await this.fetchBrowser(true)
    this.setStorage(undefined, undefined, namespace)
  }

  onMonthSelect = async month => {
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
    }, 0)

    await this.fetchBrowser(true)
    this.setStorage(undefined, undefined, namespace)
  }
}
