/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-28 16:33:37
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/game'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const namespace = 'ScreenGame'
let _loaded = false

export default class ScreenGame extends store {
  state = observable({
    query: {
      first: '',
      year: 2022,
      platform: '',
      cate: '',
      dev: '',
      pub: '',
      sort: '发行时间'
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
    collectionStore.fetchUserCollectionsQueue(false, '游戏')
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

  @computed get isADV() {
    const { query } = this.state
    const { cate } = query
    return cate === 'ADV'
  }

  // -------------------- page --------------------
  /** 筛选选择 */
  onSelect = (type, value) => {
    const { query } = this.state

    if (type === 'cate' && value === 'ADV') {
      this.setState({
        query: {
          first: '',
          year: 2021,
          platform: '',
          cate: 'ADV',
          dev: '',
          pub: '',
          sort: ''
        }
      })
    } else {
      this.setState({
        query: {
          ...query,
          [type]: value
        }
      })
    }

    setTimeout(() => {
      this.search()
      this.setStorage(undefined, undefined, namespace)
      t('游戏.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset = null

  /** 到顶 */
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })

      t('游戏.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('游戏.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(undefined, undefined, namespace)
  }

  /** 展开 */
  onExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
