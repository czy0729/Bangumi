/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-11 20:45:47
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/game'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const NAMESPACE = 'ScreenGame'

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
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded
    })
    if (!_loaded) await init()

    _loaded = true

    this.setState({
      _loaded: true
    })

    collectionStore.fetchUserCollectionsQueue(false, '游戏')

    setTimeout(() => {
      this.search()
    }, 80)
  }

  /** 游戏本地数据查询 */
  search = () => {
    const { query } = this.state
    const data = search(query)
    this.setState({
      data
    })
  }

  // -------------------- get --------------------
  /** 是否中文优先 */
  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  /** 是否列表布局 */
  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  /** 是否 Gal Game */
  @computed get isADV() {
    const { query } = this.state
    const { cate } = query
    return cate === 'ADV'
  }

  // -------------------- page --------------------
  /** 筛选选择 */
  onSelect = (type: string, value: string) => {
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
      this.setStorage(NAMESPACE)
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
    this.setStorage(NAMESPACE)
  }

  /** 展开 */
  onExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.setStorage(NAMESPACE)
  }
}
