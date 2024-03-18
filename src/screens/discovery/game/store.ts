/*
 * @Author: czy0729
 * @Date: 2021-05-09 13:11:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-18 21:33:03
 */
import { computed, observable } from 'mobx'
import { collectionStore, otaStore, systemStore } from '@stores'
import { t } from '@utils/fetch'
import store from '@utils/store'
import { init, search } from '@utils/subject/game'
import { ADVANCE_LIMIT, NAMESPACE, STATE } from './ds'
import { Params } from './types'

let _loaded = false

export default class ScreenGame extends store<typeof STATE> {
  params: Params

  state = observable(STATE)

  init = async () => {
    const state = await this.getStorage(NAMESPACE)
    this.setState({
      ...state,
      _loaded
    })

    if (!_loaded) await init()
    _loaded = true

    const { _tags = [] } = this.params
    if (_tags.length) this.initQuery(typeof _tags === 'string' ? [_tags] : _tags)

    await init()
    this.search()

    collectionStore.fetchUserCollectionsQueue(false, '游戏')
    setTimeout(() => {
      this.setState({
        _loaded: true
      })
    }, 120)
  }

  /** 游戏本地数据查询 */
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
    const { data, query } = this.state
    let { list } = data

    if (query.collected === '隐藏') {
      list = list.filter(item => {
        const subjectId = otaStore.gameSubjectId(item)
        return !collectionStore.collect(subjectId)
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
        cate: tags[0]
      }
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
      t('游戏.选择', {
        type,
        value
      })
    }, 0)
  }

  scrollToOffset = null

  forwardRef = (ref: { scrollToOffset: any }) => {
    if (ref?.scrollToOffset) this.scrollToOffset = ref.scrollToOffset
  }

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
