/*
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 19:27:15
 */
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { date, omit, pick, simpleTime, sleep } from '@utils'
import { r } from '@utils/dev'
import { LIST_EMPTY, TEXT_EMPTY, TEXT_FAIL, TEXT_NO_MORE, TEXT_REFRESHING, WEB } from '@constants'
import { AnyObject, ListEmpty } from '@types'
import { ErrorBoundary } from '../error-boundary'
import Footer from './footer'
import List from './list'
import { COMPONENT, REFRESH_STATE, SCROLL_CALLBACK } from './ds'
import {
  Props as ListViewProps,
  RefreshState,
  RenderListProps,
  ScrollToEnd,
  ScrollToIndex,
  ScrollToItem,
  ScrollToLocation,
  ScrollToOffset,
  State
} from './types'

export { ListViewProps, ScrollToEnd, ScrollToIndex, ScrollToItem, ScrollToLocation, ScrollToOffset }

/**
 * 客户端通用长列表
 *  - 整合了 FlatList 和 SectionList
 *  - FlatList 需要给 data 传递客户端统一列表结构 ListEmpty<ItemT>
 *  - SectionList 需要传递 sections, sectionKey
 *  - skipEnteringExitingAnimations 能制造进场效果
 * */
export const ListView = observer(
  class ListViewComponent<ItemT> extends React.Component<ListViewProps<ItemT>, State> {
    static defaultProps: Partial<ListViewProps<any>> = {
      data: LIST_EMPTY,
      sectionKey: '',
      refreshControlProps: {},
      footerRefreshingText: TEXT_REFRESHING,
      footerFailureText: TEXT_FAIL,
      footerNoMoreDataText: TEXT_NO_MORE,
      footerEmptyDataText: TEXT_EMPTY,
      footerTextType: 'sub',
      showFooter: true,
      showMesume: true,
      optimize: true,
      scrollToTop: false,
      lazy: 0,
      scrollIndicatorInsets: {
        right: 1
      }
    }

    state: State = {
      refreshState: REFRESH_STATE.Idle,
      rendered: true
    }

    componentDidMount() {
      this.updateRefreshState(this.props.data)
      if (this.props.lazy) {
        setTimeout(() => {
          if (!this.state.rendered) {
            this.setState({
              rendered: true
            })
          }
        }, 800)
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      this.updateRefreshState(nextProps.data)
    }

    scrollToIndex: ScrollToIndex = SCROLL_CALLBACK

    scrollToOffset: ScrollToOffset = SCROLL_CALLBACK

    scrollToItem: ScrollToItem = SCROLL_CALLBACK

    scrollToEnd: ScrollToEnd = SCROLL_CALLBACK

    scrollToLocation: ScrollToLocation = SCROLL_CALLBACK

    connectRef = (ref: React.RefObject<FlatList>['current']) => {
      if (ref?.scrollToIndex) {
        this.scrollToIndex = params => {
          ref.scrollToIndex(params)
        }
      }

      if (ref?.scrollToOffset) {
        this.scrollToOffset = params => {
          ref.scrollToOffset(params)
        }
      } else if (
        // @ts-expect-error
        ref?._wrapperListRef?._listRef?.scrollToOffset
      ) {
        this.scrollToOffset = params => {
          // @ts-expect-error
          ref._wrapperListRef._listRef.scrollToOffset(params)
        }
      }

      if (ref?.scrollToItem) {
        this.scrollToItem = params => {
          ref.scrollToItem(params)
        }
      }

      if (ref?.scrollToEnd) {
        this.scrollToEnd = params => {
          ref.scrollToEnd(params)
        }
      } else if (
        // @ts-expect-error
        ref?._wrapperListRef?._listRef?.scrollToEnd
      ) {
        this.scrollToEnd = params => {
          // @ts-expect-error
          ref._wrapperListRef._listRef.scrollToEnd(params)
        }
      }

      // @ts-expect-error
      if (ref?.scrollToLocation) {
        this.scrollToLocation = params => {
          // @ts-expect-error
          ref.scrollToLocation(params)
        }
      }
    }

    updateRefreshState = (data: ListEmpty<ItemT>) => {
      const {
        list = [],
        pagination = {
          page: 0,
          pageTotal: 0
        },
        _loaded
      } = data
      let refreshState: RefreshState

      if (!_loaded) {
        refreshState = REFRESH_STATE.Idle
      } else if (!list.length) {
        refreshState = REFRESH_STATE.EmptyData
      } else if (pagination.page < pagination.pageTotal) {
        refreshState = REFRESH_STATE.Idle
      } else {
        refreshState = REFRESH_STATE.NoMoreData
      }

      if (refreshState !== undefined) {
        this.setState({
          refreshState
        })
      }
    }

    onHeaderRefresh = async () => {
      const { lazy, onHeaderRefresh } = this.props
      if (lazy && !this.state.rendered) return undefined

      if (onHeaderRefresh) {
        this.setState({
          refreshState: REFRESH_STATE.HeaderRefreshing
        })

        // 4 秒没有返回也强制消除加载中的提示
        setTimeout(() => {
          if (this.state.refreshState !== REFRESH_STATE.Idle) {
            this.setState({
              refreshState: REFRESH_STATE.Idle
            })
          }
        }, 4000)

        await sleep(400)
        await onHeaderRefresh()
        this.updateRefreshState(this.props.data)
      }
    }

    onFooterRefresh = async () => {
      const { lazy, onFooterRefresh } = this.props
      if (lazy && !this.state.rendered) return undefined

      if (typeof onFooterRefresh === 'function') {
        this.setState({
          refreshState: REFRESH_STATE.FooterRefreshing
        })

        await sleep(640)
        onFooterRefresh()
      }
    }

    private _onEndReached = false

    onEndReached = () => {
      if (this._onEndReached) return

      if (this.shouldStartFooterRefreshing()) {
        this._onEndReached = true
        this.onFooterRefresh()
        setTimeout(() => {
          this._onEndReached = false
        }, 1000)
      }
    }

    shouldStartHeaderRefreshing = () => {
      const { refreshState } = this.state
      return !(
        refreshState === REFRESH_STATE.HeaderRefreshing ||
        refreshState === REFRESH_STATE.FooterRefreshing
      )
    }

    shouldStartFooterRefreshing = () => {
      return this.state.refreshState === REFRESH_STATE.Idle
    }

    get commonProps() {
      const {
        style,
        optimize,
        showFooter,
        ListFooterComponent = null,
        onHeaderRefresh,
        onFooterRefresh
      } = this.props
      return {
        style,
        connectRef: this.connectRef,
        ListHeaderComponentStyle: _.container.block,
        ListFooterComponentStyle: _.container.block,
        ListFooterComponent: showFooter ? this.renderFooter() : ListFooterComponent,
        refreshing: this.state.refreshState === REFRESH_STATE.HeaderRefreshing,
        refreshControl: this.renderRefreshControl(),
        onRefresh: onHeaderRefresh ? this.onHeaderRefresh : undefined,
        onEndReached: onFooterRefresh ? this.onEndReached : undefined,
        onEndReachedThreshold: 0.3,

        /** 常用优化参数 */
        maxToRenderPerBatch: optimize ? 40 : undefined,
        updateCellsBatchingPeriod: optimize ? 40 : undefined,
        initialNumToRender: this.props.initialNumToRender || 10,
        windowSize: optimize ? 21 : undefined,

        /** 强制不显示滚动条 */
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false
      }
    }

    get sections() {
      const { data, sectionKey, sections, lazy } = this.props
      let computedSections = []
      if (sections) {
        computedSections = lazy && !this.state.rendered ? sections.slice(0, lazy) : sections.slice()
      } else {
        const sectionsMap = {}
        data.list.forEach(item => {
          const title = item[sectionKey]
          if (sectionsMap[title] === undefined) {
            sectionsMap[title] = computedSections.length
            computedSections.push({
              title,
              data: [item]
            })
          } else {
            computedSections[sectionsMap[title]].data.push(item)
          }
        })
      }
      return computedSections
    }

    get data() {
      const { data, lazy } = this.props
      if (lazy && !this.state.rendered) return data.list.slice(0, lazy)

      return data.list
    }

    /** 不要试图去单独封装这个组件, 不明原因会导致整个列表都不显示 */
    renderRefreshControl() {
      const { data, progressViewOffset, refreshControlProps, onHeaderRefresh } = this.props
      if (!onHeaderRefresh) return null

      return (
        <RefreshControl
          enabled={!!onHeaderRefresh}
          refreshing={this.state.refreshState === REFRESH_STATE.HeaderRefreshing}
          title={
            data._loaded ? `上次刷新时间: ${simpleTime(date(String(data._loaded)))}` : undefined
          }
          colors={[_.colorMain]}
          titleColor={_.colorSub}
          tintColor={_.colorSub}
          progressViewOffset={progressViewOffset}
          progressBackgroundColor={_.select(_.colorPlain, _._colorDarkModeLevel2)}
          onRefresh={this.onHeaderRefresh}
          {...refreshControlProps}
        />
      )
    }

    renderList() {
      const props: RenderListProps<ItemT> = omit(this.props, [
        'style',
        'data',
        'lazy',
        'optimize',
        'progressViewOffset',
        'refreshControlProps',
        'scrollToTop',
        'showsHorizontalScrollIndicator',
        'showsVerticalScrollIndicator'
      ])
      const { sectionKey, sections, ...rest } = props
      const passProps: AnyObject<typeof rest> = {
        ...rest
      }
      if (sectionKey || sections) {
        passProps.sections = this.sections
      } else {
        passProps.data = this.data
      }

      if (WEB) {
        passProps.pagination = this.props.data.pagination
        passProps.renderFooter = this.renderFooter()
        passProps.onFooterRefresh = this.onFooterRefresh
      }

      return <List {...this.commonProps} {...passProps} />
    }

    renderFooter() {
      if (this.props.lazy && !this.state.rendered) return null

      const { data = LIST_EMPTY, ...other } = pick(this.props, [
        'data',
        'footerEmptyDataComponent',
        'footerEmptyDataText',
        'footerFailureText',
        'footerNoMoreDataComponent',
        'footerRefreshingText',
        'footerTextType',
        'showMesume'
      ]) as any
      const { pagination, _filter } = data

      return (
        <Footer
          refreshState={this.state.refreshState}
          filterText={_filter}
          page={pagination?.page}
          pageTotal={pagination?.pageTotal}
          {...other}
        />
      )
    }

    render() {
      r(COMPONENT)

      return <ErrorBoundary>{this.renderList()}</ErrorBoundary>
    }
  }
)

export default ListView
