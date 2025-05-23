/*
 * @Params: { _tags: [] }
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-17 16:36:51
 */
import { computed, observable } from 'mobx'
import { collectionStore, otaStore, systemStore, userStore } from '@stores'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { getTagType, HENTAI_TAGS_MAP, init, search } from '@utils/subject/hentai'
import { ADVANCE_LIMIT, NAMESPACE, STATE } from './ds'
import { Params } from './types'

let _loaded = false

export default class ScreenHentai extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const storageData = await this.getStorageOnce<typeof STATE>(NAMESPACE)
    this.setState({
      ...storageData,
      _loaded
    })
    if (!_loaded) await init()
    _loaded = true

    const { _tags = [] } = this.params
    if (_tags.length) this.initQuery(_tags)

    collectionStore.fetchUserCollectionsQueue(false)

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }

  save = () => {
    this.saveStorage(NAMESPACE)
  }

  /** hentai 本地数据查询 */
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
  @computed get access() {
    return !userStore.isLimit
  }

  /** 是否登录 (api) */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /** 是否列表布局 */
  @computed get isList() {
    return this.state.layout === 'list'
  }

  /** 对应项搜索后总数 */
  @computed get total() {
    return this.state.data.list.length
  }

  /** 对应项实际显示列表 */
  @computed get list() {
    const { data, query } = this.state
    let { list } = data
    if (query.collected === '隐藏') {
      list = list.filter(item => {
        const subjectId = otaStore.hentaiSubjectId(item)
        return !collectionStore.collect(subjectId)
      })
    }

    if (!systemStore.advance) {
      list = list.filter((_item, index) => index < ADVANCE_LIMIT)
    }

    return list
  }

  // -------------------- page --------------------
  /** 初始化查询配置 */
  initQuery = (tags = []) => {
    this.setState({
      expand: true
    })

    tags.forEach((item: string) => {
      const { query } = this.state
      this.setState({
        query: {
          ...query,
          [getTagType(HENTAI_TAGS_MAP[item])]: item
        }
      })
    })
  }

  /** 筛选选择 */
  onSelect = (type: string, value: string) => {
    this.setState({
      query: {
        ...this.state.query,
        [type]: value
      }
    })

    setTimeout(() => {
      this.search()
      this.save()

      t('Hentai.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset: any = null

  /** 到顶 */
  scrollToTop = () => {
    if (typeof this.scrollToOffset === 'function') {
      this.scrollToOffset({
        x: 0,
        y: 0,
        animated: true
      })

      t('Hentai.到顶')
    }
  }

  /** 切换布局 */
  switchLayout = () => {
    const value = this.isList ? 'grid' : 'list'
    this.setState({
      layout: value
    })
    this.save()

    t('Hentai.切换布局', {
      layout: value
    })
  }

  /** 展开收起筛选 */
  onExpand = () => {
    this.setState({
      expand: !this.state.expand
    })
    this.save()
  }

  /** 加载下一页 */
  onPage = (pageData: number[], page: number) => {
    if (page && page % 5 === 0) {
      t('Hentai.更多', {
        page
      })
    }

    return otaStore.onHentaiPage(pageData)
  }
}
