/*
 * @Author: czy0729
 * @Date: 2019-12-30 18:05:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-01 13:59:09
 */
import { observable, computed } from 'mobx'
import { tagStore, userStore, collectionStore, subjectStore } from '@stores'
import { x18, feedback, info } from '@utils'
import store from '@utils/store'
import { t } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE, HTML_BROSWER, MODEL_BROWSER_SORT } from '@constants'
import { SubjectId, SubjectType } from '@types'
import { NAMESPACE, STATE, EXCLUDE_STATE, DATE } from './ds'

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

    const { _loaded } = this.browser
    if (!_loaded) return this.fetchBrowser(true)

    return true
  }

  /** 下拉刷新 */
  onHeaderRefresh = () => {
    return this.fetchBrowser(true)
  }

  // -------------------- fetch --------------------
  /** 获取索引 */
  fetchBrowser = async (refresh: boolean) => {
    const { type, sort } = this.state
    const data = await tagStore.fetchBrowser(
      {
        type,
        airtime: this.airtime,
        sort
      },
      refresh
    )

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

  // -------------------- get --------------------
  /** 日期 */
  @computed get airtime() {
    const { airtime, month } = this.state
    return month ? `${airtime}-${month}` : String(airtime)
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
      airtime: airtime === '全部' ? '' : airtime,
      month: ''
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
        airtime: airtime - 1
      })
    } else {
      let _airtime = airtime
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
        airtime: airtime + 1
      })
    } else {
      let _airtime = airtime
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

  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    await collectionStore.doUpdateCollection(values)
    feedback()

    const { subjectId } = this.state.modal
    setTimeout(() => {
      collectionStore.fetchCollectionStatusQueue([subjectId])
    }, 400)

    this.onCloseManageModal()
  }

  /** 显示收藏管理框 */
  onShowManageModal = args => {
    const { subjectId, title, desc, status, typeCn } = args || {}

    let action = '看'
    if (typeCn === '书籍') action = '读'
    if (typeCn === '音乐') action = '听'
    if (typeCn === '游戏') action = '玩'

    this.setState({
      modal: {
        visible: true,
        subjectId,
        title,
        desc,
        status: status || '',
        action
      }
    })
  }

  /** 隐藏收藏管理框 */
  onCloseManageModal = () => {
    this.setState({
      modal: {
        visible: false
      }
    })

    // 等到关闭动画完成后再重置
    setTimeout(() => {
      this.setState({
        modal: EXCLUDE_STATE.modal
      })
    }, 400)
  }
}
