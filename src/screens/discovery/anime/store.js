/*
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-03 05:31:52
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/anime'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const namespace = 'ScreenAnime'

export default class ScreenAnime extends store {
  state = observable({
    query: {
      area: '日本',
      type: '',
      first: '',
      year: 2020,
      begin: '',
      status: '',
      tags: [], // 已支持多选, 不过暂时不开放
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
      ...state
    })

    // @bug
    if (!_loaded) {
      await init()
      this.search({
        area: '日本',
        type: '',
        first: '',
        year: 2021,
        begin: '',
        status: '',
        tags: [],
        sort: ''
      })
      this.setState({
        _loaded: true
      })
    }

    setTimeout(() => {
      this.search()
      this.setState({
        _loaded: true
      })
    }, 0)
    return res
  }

  search = passQuery => {
    const { query } = this.state
    const data = search(passQuery || query)
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
    if (type === 'tags') {
      this.setState({
        query: {
          ...query,
          tags: value === '' ? [] : [value]
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
      t('Anime.选择', {
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

      t('Anime.到顶')
    }
  }

  /**
   * 切换布局
   */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('Anime.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(undefined, undefined, namespace)
  }
}
