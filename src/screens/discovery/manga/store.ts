/*
 * @Author: czy0729
 * @Date: 2021-01-09 01:08:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-22 23:21:39
 */
import { observable, computed } from 'mobx'
import { systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, pick, search } from '@utils/subject/manga'
import { t } from '@utils/fetch'
import { gets } from '@utils/kv'
import { LIST_EMPTY } from '@constants'
import { SubjectId } from '@types'
import { OTAItemType } from './types'

const NAMESPACE = 'ScreenManga'

let _loaded = false

export default class ScreenManga extends store {
  state = observable({
    query: {
      first: '',
      year: 2022,
      begin: '',
      status: '',
      tags: [],
      hd: '',
      sort: '评分人数'
    },
    data: LIST_EMPTY,
    subjects: {},
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

  subjectId(pickIndex: number): SubjectId {
    return computed(() => {
      const item = pick(pickIndex)
      return item?.i || 0
    }).get()
  }

  pick(pickIndex: number): OTAItemType {
    return computed(() => {
      const { subjects } = this.state
      return subjects[`mox_${this.subjectId(pickIndex)}`] || {}
    }).get()
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

  /** 加载下一页 */
  onPage = async (list: number[]) => {
    if (!list.length) return

    const keys = []
    list.forEach(index => {
      const subjectId = this.subjectId(index)
      if (!subjectId || subjectId in this.state.subjects) return
      keys.push(`mox_${subjectId}`)
    })
    if (!keys.length) return

    const datas = await gets(keys)
    if (datas) {
      this.setState({
        subjects: datas
      })
    }
  }
}
