/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-19 13:58:05
 */
import { observable, computed } from 'mobx'
import { tagStore, collectionStore } from '@stores'
import store from '@utils/store'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'
import { MODEL_TAG_ORDERBY } from '@constants/model'
import { HTML_TAG } from '@constants/html'

const namespace = 'ScreenTag'
const defaultOrder = MODEL_TAG_ORDERBY.getValue('名称')

export default class ScreenTag extends store {
  state = observable({
    order: defaultOrder,
    list: true, // list | grid
    airtime: '',
    month: '',
    hide: false, // 用于列表置顶
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    const _state = {
      ...state,

      // order慎用排名排序, 不然列表数据几乎没区别
      order:
        state.order === MODEL_TAG_ORDERBY.getValue('排名')
          ? defaultOrder
          : state.order,
      airtime: '',
      month: '',
      hide: false,
      _loaded: true
    }
    const { airtime } = this.params
    if (airtime) {
      _state.airtime = airtime
    }
    this.setState(_state)

    return this.fetchTag(true)
  }

  // -------------------- fetch --------------------
  fetchTag = refresh => {
    const { type, tag } = this.params
    const { order, airtime, month } = this.state
    return tagStore.fetchTag(
      {
        text: tag,
        type,
        order,
        airtime: month ? `${airtime}-${month}` : airtime
      },
      refresh
    )
  }

  // -------------------- get --------------------
  @computed get tag() {
    const { type, tag } = this.params
    const { airtime, month } = this.state
    return tagStore.tag(tag, type, month ? `${airtime}-${month}` : airtime)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get url() {
    const { type, tag } = this.params
    const { order = '', airtime, month } = this.state
    return HTML_TAG(
      encodeURIComponent(tag),
      type,
      order,
      1,
      month ? `${airtime}-${month}` : airtime
    )
  }

  // -------------------- page --------------------
  onOrderSelect = async label => {
    t('用户标签.排序选择', {
      label
    })

    this.setState({
      order: MODEL_TAG_ORDERBY.getValue(label)
    })
    await this.fetchTag(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }

  onAirdateSelect = async airtime => {
    t('用户标签.年选择', {
      airtime
    })

    this.setState({
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
    })
    await this.fetchTag(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }

  onMonthSelect = async month => {
    const { airtime } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    t('用户标签.月选择', {
      month
    })

    this.setState({
      month: month === '全部' ? '' : month
    })
    await this.fetchTag(true)
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }

  toggleList = () => {
    const { list } = this.state
    t('用户标签.切换布局', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.setStorage(undefined, undefined, namespace)

    this.setState({
      hide: true
    })
    setTimeout(() => {
      this.setState({
        hide: false
      })
    }, 0)
  }
}
