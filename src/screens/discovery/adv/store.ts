/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 04:10:17
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/adv'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const NAMESPACE = 'ScreenADV'

let _loaded = false

export default class ScreenADV extends store {
  state = observable({
    query: {
      first: '',
      year: 2022,
      dev: '',
      sort: '评分人数'
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

    collectionStore.fetchUserCollectionsQueue(false, '游戏')

    setTimeout(() => {
      this.search()
      this.setState({
        _loaded: true
      })
    }, 80)
  }

  /** ADV 本地数据查询 */
  search = () => {
    setTimeout(() => {
      const { query } = this.state
      const data = search(query)
      this.setState({
        data
      })
    }, 80)
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

  // -------------------- page --------------------
  /** 筛选选择 */
  onSelect = (type: string, value: string) => {
    const { query } = this.state

    this.setState({
      query: {
        ...query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.setStorage(NAMESPACE)
      t('ADV.选择', {
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

      t('ADV.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('ADV.切换布局', {
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
