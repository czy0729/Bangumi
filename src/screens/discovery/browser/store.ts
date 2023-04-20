/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-20 15:46:25
 */
import { observable, computed } from 'mobx'
import { tagStore, userStore, collectionStore, subjectStore } from '@stores'
import { x18, info, getTimestamp } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import {
  MODEL_SUBJECT_TYPE,
  HTML_BROSWER,
  MODEL_BROWSER_SORT,
  LIST_EMPTY
} from '@constants'
import { SubjectId, SubjectType } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE, DATE } from './ds'

/** 若更新过则不会再主动更新 */
const THIRD_PARTY_UPDATED = []

export default class ScreenBrowser extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      airtime: state.airtime || DATE.getFullYear(),
      month: state.month || DATE.getMonth() + 1,
      ...EXCLUDE_STATE,
      _loaded: true
    })

    return this.fetchBrowser(true)
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchBrowser(true)
  }

  // -------------------- fetch --------------------
  /** 获取索引 */
  fetchBrowser = async (refresh: boolean) => {
    if (refresh) this.fetchThirdParty()

    const { type, sort } = this.state
    const data = await tagStore.fetchBrowser(
      {
        type,
        airtime: this.airtime,
        sort
      },
      refresh
    )

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

  /** 获取云快照 */
  fetchThirdParty = async () => {
    if (!this.ota && !this.browser._loaded) {
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
        list: this.browser.list.map(({ collected, ...other }) => other)
      })
      THIRD_PARTY_UPDATED.push(this.thirdPartyKey)
    }, 0)
  }

  // -------------------- get --------------------
  /** 日期 */
  @computed get airtime() {
    const { airtime, month } = this.state
    return month && month !== '不选择' ? `${airtime}-${month}` : String(airtime)
  }

  /** 云快照 */
  @computed get ota() {
    const { ota } = this.state
    return ota[this.thirdPartyKey]
  }

  /** 索引 */
  @computed get browser() {
    const { type, sort } = this.state
    const browser = tagStore.browser(type, this.airtime, sort)
    if (userStore.isLimit) {
      let _filter = 0
      const list = browser.list.filter(item => {
        const filter = x18(item.id)
        if (filter) _filter += 1
        return !filter
      })

      return {
        ...browser,
        list,
        _filter
      }
    }

    return browser
  }

  /** 条件索引 */
  @computed get list() {
    if (!this.browser._loaded) {
      return this.ota
        ? {
            ...this.ota,
            pagination: {
              page: 1,
              pageTotal: 10
            }
          }
        : LIST_EMPTY
    }

    const { collected } = this.state
    if (collected) return this.browser

    return {
      ...this.browser,
      list: this.browser.list.filter(item => !item.collected)
    }
  }

  /** 索引网址 */
  @computed get url() {
    const { type, sort } = this.state
    return HTML_BROSWER(type as SubjectType, this.airtime, 1, sort)
  }

  /** 是否列表布局 */
  @computed get isList() {
    const { layout } = this.state
    return layout === 'list'
  }

  /** 条目信息 */
  subject(subjectId: SubjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  @computed get thirdPartyKey() {
    const { type, sort } = this.state
    const query = [type, this.airtime, sort].join('_')
    return `browser_${query}`
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
  onTypeSelect = type => {
    t('索引.类型选择', {
      type
    })

    this.setState({
      type: MODEL_SUBJECT_TYPE.getLabel(type)
    })
    this.resetScrollView()
    this.fetchBrowser(true)
  }

  /** 年选择 */
  onAirdateSelect = airtime => {
    t('索引.年选择', {
      airtime
    })

    this.setState({
      airtime: airtime === '全部' ? '' : airtime
    })
    this.resetScrollView()
    this.fetchBrowser(true)
  }

  /** 月选择 */
  onMonthSelect = month => {
    const { airtime } = this.state
    if (!airtime) {
      info('请先选择年')
      return
    }

    t('索引.月选择', {
      month
    })

    this.setState({
      month: month === '全部' ? '' : month
    })
    this.resetScrollView()
    this.fetchBrowser(true)
  }

  /** 前一年 */
  onAirdatePrev = () => {
    const { airtime, month } = this.state
    if (!airtime) {
      info('请先选择年')
      return
    }

    if (!month) {
      this.setState({
        airtime: Number(airtime) - 1
      })
    } else {
      let _airtime = Number(airtime)
      let _month = Number(month)
      if (month == 1) {
        _airtime -= 1
        _month = 12
      } else {
        _month -= 1
      }
      this.setState({
        airtime: _airtime,
        month: _month
      })
    }

    this.resetScrollView()
    this.fetchBrowser(true)
  }

  /** 后一年 */
  onAirdateNext = () => {
    const { airtime, month } = this.state
    if (!airtime) {
      info('请先选择年')
      return
    }

    if (!month) {
      this.setState({
        airtime: Number(airtime) + 1
      })
    } else {
      let _airtime = Number(airtime)
      let _month = Number(month)
      if (month == 12) {
        _airtime += 1
        _month = 1
      } else {
        _month += 1
      }
      this.setState({
        airtime: _airtime,
        month: _month
      })
    }

    this.resetScrollView()
    this.fetchBrowser(true)
  }

  /** 排序选择 */
  onOrderSelect = label => {
    // t('索引.排序选择', {
    //   sort
    // })

    this.setState({
      sort: MODEL_BROWSER_SORT.getValue(label)
    })
    this.resetScrollView()
    this.fetchBrowser(true)
  }

  /** 切换布局 */
  switchLayout = () => {
    const _layout = this.isList ? 'grid' : 'list'
    t('索引.切换布局', {
      layout: _layout
    })

    this.setState({
      layout: _layout
    })
    this.setStorage(NAMESPACE)
  }

  /** 切换固定 (工具条) */
  onToggleFixed = () => {
    const { fixed } = this.state

    this.setState({
      fixed: !fixed
    })
    this.setStorage(NAMESPACE)
  }

  /** 切换显示收藏 (工具条) */
  onToggleCollected = () => {
    const { collected } = this.state

    this.setState({
      collected: !collected
    })
    this.setStorage(NAMESPACE)
  }

  /** 更新可视范围底部 y */
  onScroll = ({ nativeEvent }) => {
    const { contentOffset, layoutMeasurement } = nativeEvent
    const screenHeight = layoutMeasurement.height
    this.setState({
      visibleBottom: contentOffset.y + screenHeight
    })
  }
}
