/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:44:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-11 17:59:19
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/wenku'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const namespace = 'ScreenWenku'
let _loaded = false

export default class ScreenWenku extends store {
  state = observable({
    query: {
      first: '',
      year: 2021,
      status: '',
      anime: '',
      cate: '',
      author: '',
      sort: '发行'
    },
    data: LIST_EMPTY,
    layout: 'list', // list | grid
    expand: false,
    _loaded: false
  })

  init = async () => {
    const res = this.getStorage(undefined, namespace)
    const state = await res
    this.setState({
      ...state,
      _loaded
    })

    if (!_loaded) {
      await init()
    }

    _loaded = true
    this.setState({
      _loaded: true
    })

    this.search()
    collectionStore.fetchUserCollectionsQueue(false, '书籍')
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

  onExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
