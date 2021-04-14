/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:44:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 20:30:37
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/wenku'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const namespace = 'ScreenWenku'

export default class ScreenWenku extends store {
  state = observable({
    query: {
      first: '',
      year: 2020,
      status: '',
      anime: '',
      cate: '',
      author: '',
      sort: ''
    },
    data: LIST_EMPTY,
    layout: 'list', // list | grid
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded: false
    })

    if (!_loaded) {
      await init()
    }
    this.setState({
      _loaded: true
    })
    this.search()
    return res
  }

  search = () => {
    const { query } = this.state
    const data = search(query)
    this.setState({
      data
    })
  }

  // -------------------- get --------------------
  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  // -------------------- page --------------------
  onSelect = (type, value) => {
    const { query } = this.state
    this.setState({
      query: {
        ...query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.setStorage(undefined, undefined, namespace)
      t('文库.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset = null
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })

      t('文库.到顶')
    }
  }

  /**
   * 切换布局
   */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('文库.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
