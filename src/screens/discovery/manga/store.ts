/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:08:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-23 06:49:35
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore, otaStore } from '@stores'
import store from '@utils/store'
import { init, search } from '@utils/subject/manga'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { ADVANCE_LIMIT } from './ds'
import { Params } from './types'

const NAMESPACE = 'ScreenManga'

let _loaded = false

export default class ScreenManga extends store {
  params: Params

  state = observable({
    query: {
      first: '',
      year: 2022,
      begin: '',
      status: '',
      tags: [],
      hd: '',
      sort: '评分人数',
      collected: ''
    },
    data: LIST_EMPTY,
    layout: 'list',
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

    const { _tags = [] } = this.params
    if (_tags.length) this.initQuery(_tags)

    collectionStore.fetchUserCollectionsQueue(false, '书籍')

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }

  /** 漫画本地数据查询 */
  search = (passQuery?: any) => {
    setTimeout(() => {
      const { query } = this.state
      const data = search(passQuery || query)
      this.setState({
        data
      })
    }, 80)
  }

  // -------------------- get --------------------
  /** 是否允许访问 */
  @computed get cnFirst() {
    return systemStore.setting.cnFirst
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  /** 是否中文优先 */
  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  /** 对应项搜索后总数 */
  @computed get total() {
    const { data } = this.state
    return data.list.length
  }

  /** 对应项实际显示列表 */
  @computed get list() {
    const { data, query } = this.state
    let { list } = data

    if (query.collected === '隐藏') {
      list = list.filter(item => {
        const subjectId = otaStore.mangaSubjectId(item)
        return !(
          collectionStore.collectionStatus(subjectId) ||
          this.userCollectionsMap[subjectId]
        )
      })
    }

    if (!systemStore.advance) {
      list = list.filter((item, index) => index < ADVANCE_LIMIT)
    }

    return list
  }

  // -------------------- page --------------------
  /** 初始化查询配置 */
  initQuery = (tags = []) => {
    const { query } = this.state
    this.setState({
      expand: true,
      query: {
        ...query,
        tags
      }
    })
  }

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
      t('Manga.选择', {
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

      t('Manga.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('Manga.切换布局', {
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
