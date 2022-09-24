/*
 * @Params: { _tags: [] }
 * @Author: czy0729
 * @Date: 2019-06-22 15:38:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-14 17:43:53
 */
import { observable, computed } from 'mobx'
import { userStore, systemStore, collectionStore } from '@stores'
import store from '@utils/store'
import { init, search, getTagType, HENTAI_TAGS_MAP } from '@utils/subject/hentai'
import { t } from '@utils/fetch'
import { LIST_EMPTY } from '@constants'
import { Params } from './types'
import { ADVANCE_LIMIT } from './ds'

const NAMESPACE = 'ScreenHentai'

let _loaded = false

export default class ScreenHentai extends store {
  params: Params

  state = observable({
    query: {
      first: '',
      year: 2022,
      chara: '',
      job: '',
      body: '',
      content: '',
      sort: '评分人数'
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

    collectionStore.fetchUserCollectionsQueue(false)

    this.search()
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
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
    return !userStore.isLimit && systemStore?.ota?.HENTAI
  }

  /** 是否登录 (api) */
  @computed get isLogin() {
    return userStore.isLogin
  }

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

  /** 对应项搜索后总数 */
  @computed get total() {
    const { data } = this.state
    return data.list.length
  }

  /** 对应项实际显示列表 */
  @computed get list() {
    const { data } = this.state
    if (!systemStore.advance) {
      return data.list.filter((item, index) => index < ADVANCE_LIMIT)
    }

    return data.list
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
    const _layout = this.isList ? 'grid' : 'list'
    t('Hentai.切换布局', {
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
