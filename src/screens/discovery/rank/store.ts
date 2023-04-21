/*
 * @Author: czy0729
 * @Date: 2019-06-08 03:11:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-19 21:00:49
 */
import { observable, computed } from 'mobx'
import { tagStore, collectionStore, subjectStore, userStore } from '@stores'
import { info, getTimestamp, x18, updateVisibleBottom } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { MODEL_SUBJECT_TYPE, HTML_RANK, LIST_EMPTY } from '@constants'
import { SubjectId, SubjectType, SubjectTypeCn } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE } from './ds'
import { StoreRank, ToolBarKeys } from './types'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenRank extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchRank()
  }

  // -------------------- get --------------------
  /** 排行榜云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  /** 排行榜 */
  @computed get rank(): StoreRank {
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
  @computed get list(): StoreRank {
    if (!this.rank._loaded) return this.ota || LIST_EMPTY

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

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  @computed get thirdPartyKey() {
    const { currentPage, type, filter, airtime, month } = this.state
    const query = [
      type,
      filter,
      month ? `${airtime}-${month}` : airtime,
      currentPage[type]
    ].join('_')
    return `rank_${query}`
  }

  // -------------------- fetch --------------------
  /** 获取排行榜 */
  fetchRank = async () => {
    this.fetchThirdParty()

    const { currentPage, type, filter, airtime, month } = this.state
    const data = await tagStore.fetchRank({
      type,
      filter,
      airtime: month ? `${airtime}-${month}` : airtime,
      page: currentPage[type]
    })

    if (
      data.list.length &&
      // 只有明确知道云快照没有这个 key 的数据, 才主动更新云快照数据
      this.thirdPartyKey in this.state.ota
    ) {
      const ts = this.ota?.ts || 0
      const _loaded = getTimestamp()
      if (_loaded - ts >= 60 * 60 * 24 * 7) this.updateThirdParty()
    }

    // 延迟获取收藏中的条目的具体收藏状态
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue(
        data.list
          .filter(item => item.collected)
          .map(item => String(item.id).replace('/subject/', ''))
      )
    }, 160)
    return data
  }

  /** 获取排行榜云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.rank._loaded) {
      const data = await get(this.thirdPartyKey)
      if (!data) {
        // 就算没有数据也插入 key, 用于判断是否需要更新云数据
        this.setState({
          ota: {
            [this.thirdPartyKey]: {
              list: [],
              _loaded: 0
            }
          }
        })
        return
      }

      this.setState({
        ota: {
          [this.thirdPartyKey]: {
            ...data,
            _loaded: getTimestamp()
          }
        }
      })
    }
  }

  /** 上传预数据 */
  updateThirdParty = async () => {
    if (THIRD_PARTY_UPDATED.includes(this.thirdPartyKey)) return

    setTimeout(() => {
      update(this.thirdPartyKey, {
        list: this.rank.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- page --------------------
  /** 隐藏后延迟显示列表 (用于重置滚动位置) */
  resetScrollView = () => {
    this.setState({
      show: false
    })

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(NAMESPACE)
    }, 40)
  }

  /** 类型选择 */
  onTypeSelect = (type: SubjectTypeCn) => {
    t('排行榜.类型选择', {
      type
    })

    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel<SubjectType>(type),
      filter: ''
    })
    this.resetScrollView()
    this.fetchRank()
  }

  /** 筛选选择 */
  onFilterSelect = (filter: string, filterData: { getValue: (arg0: any) => any }) => {
    t('排行榜.筛选选择', {
      filter
    })

    this.setState({
      filter: filter === '全部' ? '' : filterData.getValue(filter)
    })
    this.resetScrollView()
    this.fetchRank()
  }

  /** 年选择 */
  onAirdateSelect = (airtime: string) => {
    t('排行榜.年选择', {
      airtime
    })

    const { type, currentPage, ipt } = this.state
    this.setState({
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
    this.resetScrollView()
    this.fetchRank()
  }

  /** 月选择 */
  onMonthSelect = (month: string) => {
    const { airtime, type, currentPage, ipt } = this.state
    if (airtime === '') {
      info('请先选择年')
      return
    }

    t('排行榜.月选择', {
      month
    })

    this.setState({
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
    this.resetScrollView()
    this.fetchRank()
  }

  /** 切换布局 */
  onToggleList = () => {
    const { list } = this.state
    t('排行榜.切换布局', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.resetScrollView()
  }

  /** 工具栏 */
  onToggleToolbar = (key: ToolBarKeys) => {
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
      currentPage: {
        ...currentPage,
        [type]: page - 1
      },
      ipt: {
        ...ipt,
        [type]: String(page - 1)
      }
    })
    this.resetScrollView()
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
      currentPage: {
        ...currentPage,
        [type]: page + 1
      },
      ipt: {
        ...ipt,
        [type]: String(page + 1)
      }
    })
    this.resetScrollView()
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
      ipt: {
        ...ipt,
        [type]: String(_ipt)
      }
    })
    this.resetScrollView()
    this.fetchRank()
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
