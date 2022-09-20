/*
 * @Author: czy0729
 * @Date: 2020-09-03 10:44:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-20 16:29:24
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/wenku'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'

const NAMESPACE = 'ScreenWenku'

let _loaded = false

export default class ScreenWenku extends store {
  state = observable({
    query: {
      first: '',
      year: 2022,
      status: '',
      anime: '',
      cate: '',
      author: '',
      tags: [],
      sort: '发行'
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

    collectionStore.fetchUserCollectionsQueue(false, '书籍')
    setTimeout(() => {
      this.search()
    }, 80)
  }

  /** 文库本地数据查询 */
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
  onSelect = (type: string, value: string, multiple = false) => {
    const { query } = this.state
    if (type === 'tags') {
      const { tags = [] } = query

      if (multiple) {
        // 标签支持多选
        this.setState({
          query: {
            ...query,
            tags:
              value === ''
                ? []
                : tags.includes(value)
                ? tags.filter(item => value !== item)
                : [...tags, value]
          }
        })
      } else {
        this.setState({
          query: {
            ...query,
            tags: value === '' ? [] : [value]
          }
        })
      }
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
      t('文库.选择', {
        type,
        value,
        multiple
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

      t('文库.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('文库.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(NAMESPACE)
  }

  /** 展开收起筛选 */
  onExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
    this.setStorage(NAMESPACE)
  }
}
