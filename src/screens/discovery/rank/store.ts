/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-22 15:45:38
 */
import { observable, computed } from 'mobx'
import { tagStore, userStore, collectionStore, subjectStore } from '@stores'
import { x18, info, feedback } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE, HTML_RANK } from '@constants'
import { Override, SubjectId, SubjectType, SubjectTypeCn } from '@types'
import { Rank } from '@stores/tag/types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'

export default class ScreenRank extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(undefined, NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchRank()
  }

  // -------------------- get --------------------
  /** 排行榜 */
  @computed get rank(): Override<
    Rank,
    {
      _filter?: number
    }
  > {
    const { type, filter, airtime, month, currentPage } = this.state
    const rank = tagStore.rank(
      type,
      currentPage[type],
      filter,
      month ? `${airtime}-${month}` : airtime
    )

    if (userStore.isLimit) {
      let _filter = 0
      return {
        ...rank,
        list: rank.list.filter(item => {
          const filter = x18(item.id)
          if (filter) _filter += 1
          return !filter
        }),
        _filter
      }
    }

    return rank
  }

  /** 过滤数据 */
  @computed get list() {
    const { collected } = this.state
    if (collected) return this.rank

    return {
      ...this.rank,
      list: this.rank.list.filter(item => !item.collected)
    }
  }

  /** 网页端地址 */
  @computed get url() {
    const { currentPage, type, filter, airtime } = this.state
    return HTML_RANK(type, 'rank', currentPage[type], filter, airtime)
  }

  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  // -------------------- fetch --------------------
  /** 获取排行榜 */
  fetchRank = () => {
    const { currentPage, type, filter, airtime, month } = this.state
    return tagStore.fetchRank({
      type,
      filter,
      airtime: month ? `${airtime}-${month}` : airtime,
      page: currentPage[type]
    })
  }

  // -------------------- page --------------------
  /** 类型选择 */
  onTypeSelect = (type: SubjectTypeCn) => {
    t('排行榜.类型选择', {
      type
    })

    this.setState({
      show: false,
      type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>(type),
      filter: ''
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 筛选选择 */
  onFilterSelect = (filter, filterData) => {
    t('排行榜.筛选选择', {
      filter
    })

    this.setState({
      show: false,
      filter: filter === '全部' ? '' : filterData.getValue(filter)
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 年选择 */
  onAirdateSelect = airtime => {
    t('排行榜.年选择', {
      airtime
    })

    const { type, currentPage, ipt } = this.state
    this.setState({
      show: false,
      airtime: airtime === '全部' ? '' : airtime,
      month: '',
      currentPage: {
        ...currentPage,
        [type]: 1
      },
      ipt: {
        ...ipt,
        [type]: '1'
      }
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 月选择 */
  onMonthSelect = month => {
    const { airtime, type, currentPage, ipt } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    t('排行榜.月选择', {
      month
    })

    this.setState({
      show: false,
      month: month === '全部' ? '' : month,
      currentPage: {
        ...currentPage,
        [type]: 1
      },
      ipt: {
        ...ipt,
        [type]: '1'
      }
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 切换布局 */
  onToggleList = () => {
    const { list } = this.state
    t('排行榜.切换布局', {
      list: !list
    })

    this.setState({
      show: false,
      list: !list
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)
  }

  /** 工具栏 */
  onToggleToolbar = (key: 'list' | 'fixed' | 'fixedPagination' | 'collected') => {
    this.setState({
      [key]: !this.state[key]
    })
    this.setStorage(NAMESPACE)
  }

  /** 上一页 */
  onPrev = () => {
    const { currentPage, type, ipt } = this.state
    const page = currentPage[type]
    if (currentPage[type] === 1) return

    t('排行榜.上一页', {
      type,
      page: page - 1
    })

    this.setState({
      show: false,
      currentPage: {
        ...currentPage,
        [type]: page - 1
      },
      ipt: {
        ...ipt,
        [type]: String(page - 1)
      }
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 下一页 */
  onNext = () => {
    const { currentPage, type, ipt } = this.state
    const page = currentPage[type]
    t('排行榜.下一页', {
      type,
      page: page + 1
    })

    this.setState({
      show: false,
      currentPage: {
        ...currentPage,
        [type]: page + 1
      },
      ipt: {
        ...ipt,
        [type]: String(page + 1)
      }
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 输入框改变 */
  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    const { type, ipt } = this.state
    this.setState({
      ipt: {
        ...ipt,
        [type]: text
      }
    })
  }

  /** 页码跳转 */
  doSearch = () => {
    const { type, currentPage, ipt } = this.state
    const _ipt = ipt[type] === '' ? 1 : parseInt(ipt[type])
    if (_ipt < 1) {
      info('请输入正确页码')
      return
    }

    t('排行榜.页码跳转', {
      type,
      page: _ipt
    })

    this.setState({
      currentPage: {
        ...currentPage,
        [type]: _ipt
      },
      show: false,
      ipt: {
        ...ipt,
        [type]: String(_ipt)
      }
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)

    this.fetchRank()
  }

  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    await collectionStore.doUpdateCollection(values)
    feedback()

    // // 不是在看的话要删掉对应条目信息
    // if (values.status !== MODEL_COLLECTION_STATUS.getValue<RatingStatus>('在看')) {
    //   userStore.removeCollection(values.subjectId)
    // }

    this.onCloseManageModal()
  }

  /** 隐藏收藏管理框 */
  onCloseManageModal = () => {
    this.setState({
      modal: EXCLUDE_STATE.modal
    })
  }
}
