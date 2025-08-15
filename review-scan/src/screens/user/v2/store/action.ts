/*
 * @Author: czy0729
 * @Date: 2023-04-04 06:26:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-30 11:01:48
 */
import { _, collectionStore, uiStore } from '@stores'
import { debounce, feedback, updateVisibleBottom } from '@utils'
import { t } from '@utils/fetch'
import {
  CollectionsOrder,
  CollectionsOrderCn,
  SubjectType,
  SubjectTypeCn
} from '@types'
import { MODEL_COLLECTIONS_ORDERBY, MODEL_SUBJECT_TYPE } from '@constants'
import { TABS } from '../ds'
import Fetch from './fetch'
import { STATE } from './ds'

export default class Action extends Fetch {
  /** ScrollView.scrollToIndex */
  scrollToIndex = {}

  /** ScrollView.scrollToOffset */
  scrollToOffset = {}

  /**
   * 收集 ListView.scrollToIndex 引用
   * @param {*} ref
   * @param {*} index
   */
  forwardRef = (
    ref: {
      scrollToIndex: any
      scrollToOffset: any
    },
    index: string | number
  ) => {
    this.scrollToIndex[index] = ref?.scrollToIndex
    this.scrollToOffset[index] = ref?.scrollToOffset
  }

  /** 刷新到顶 */
  onRefreshThenScrollTop = () => {
    try {
      const { page } = this.state
      if (typeof this.scrollToIndex[page] === 'function') {
        t('其他.刷新到顶', {
          screen: 'User'
        })

        this.scrollToIndex[page]({
          animated: true,
          index: 0,
          viewOffset: 8000
        })
        setTimeout(() => {
          feedback()
        }, 400)

        this.fetchIsNeedToEnd(true)
      }
    } catch (error) {
      console.error('User', 'onRefreshThenScrollTop', error)
    }
  }

  /** 标签页切换 */
  onChange = (page: number) => {
    if (page === this.state.page) return

    t('我的.标签页切换', {
      page
    })

    const { loadedPage } = this.state
    const next: Partial<typeof STATE> = {
      page,
      tag: '',
      ipt: '1'
    }
    if (!loadedPage.includes(page)) next.loadedPage = [...loadedPage, page]
    this.setState(next)
    this.fetchIsNeedToEnd(true)
    this.save()
  }

  /** 条目类型选择 */
  onSelectSubjectType = (title: SubjectTypeCn) => {
    const subjectType = MODEL_SUBJECT_TYPE.getLabel<SubjectType>(title)
    if (subjectType === this.state.subjectType) return

    t('我的.类型选择', {
      title
    })

    const { page } = this.state
    this.setState({
      subjectType,
      tag: '',
      ipt: '1',
      loadedPage: [page]
    })
    this.fetchIsNeedRefreshToEnd()
    this.save()
  }

  /** 排序选择 */
  onOrderSelect = async (label: CollectionsOrderCn) => {
    t('我的.排序选择', {
      label
    })

    this.setState({
      order: MODEL_COLLECTIONS_ORDERBY.getValue<CollectionsOrder>(label)
    })
    this.fetchIsNeedRefreshToEnd()
    this.save()
  }

  /** 标签选择 */
  onTagSelect = (label: string) => {
    t('我的.筛选选择', {
      label
    })

    let tag: string
    if (label === '重置') {
      tag = ''
    } else {
      tag = label.replace(/ \(\d+\)/, '')
    }

    this.setState({
      tag
    })
    this.fetchIsNeedRefreshToEnd()
    this.save()
  }

  /** 布局选择 */
  onRefreshOffset = () => {
    const { list } = this.state
    t('我的.布局选择', {
      list: !list
    })

    this.setState({
      list: !list
    })
    this.save()
  }

  /** 固定切换 (工具条) */
  onToggleFixed = () => {
    const { fixed } = this.state

    this.setState({
      fixed: !fixed
    })
    this.save()
  }

  /** 是否显示条目年份 (工具条) */
  onToggleShowYear = () => {
    const { showYear } = this.state

    this.setState({
      showYear: !showYear
    })
    this.save()
  }

  /** 展开收起搜索栏 */
  onToggleFilter = () => {
    const { showFilter } = this.state
    if (!showFilter) {
      this.setState({
        showFilter: !showFilter,
        filter: ''
      })
      setTimeout(() => {
        const { page } = this.state
        this.scrollToOffset[page]?.({
          offset: this.fixedHeight,
          animated: true
        })
      }, 0)
    } else {
      this.setState({
        showFilter: !showFilter,
        fliterInputText: ''
      })

      // 因为会瞬间触发大量计算, 卡住UI, 需要把关键字延迟入库
      setTimeout(() => {
        this.setState({
          filter: ''
        })
      }, 160)
    }
  }

  private _onFilterChange = debounce((filter: string) => {
    try {
      this.setState({
        filter
      })

      const { subjectType, page } = this.state
      if (filter.length) this.fetchUntilTheEnd(subjectType, TABS[page].key)
    } catch (error) {}
  }, 1200)

  /** 同步更新 filterInputText, 异步更新 filter */
  onFilterChange = (filter: string) => {
    const _filter = String(filter).trim()
    this.setState({
      fliterInputText: _filter
    })
    this._onFilterChange(_filter)
  }

  onManagePress = args => {
    uiStore.showManageModal(args, '时光机', values => {
      // 状态不相同需要手动更新列表数据
      if (this.isMe && this.type && values?.status && this.type !== values?.status) {
        collectionStore.removeOneInUserCollections({
          userId: this.username,
          subjectType: this.state.subjectType,
          type: this.type,
          subjectId: values.subjectId
        })
      }
    })
  }

  /** 上一页 */
  onPrev = () => {
    const { ipt } = this.state
    if (Number(ipt) === 1) return

    const value = Number(ipt) - 1
    this.onPage(value)
  }

  /** 下一页 */
  onNext = () => {
    const { ipt } = this.state
    const value = Number(ipt) + 1
    this.onPage(value)
  }

  /** 输入框改变 */
  onPageChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      ipt: text
    })
    this.save()
  }

  /** 刷新页 */
  onPage = (value: any) => {
    const { page } = this.state
    this.setState({
      ipt: String(value)
    })
    this.save()

    try {
      this.scrollToOffset[page]({
        offset: _.parallaxImageHeight - 100,
        animated: true
      })
    } catch (error) {}
    this.fetchUserCollectionsNormal(value)
  }

  /** 更新可视范围底部 y */
  onScroll = updateVisibleBottom.bind(this)
}
