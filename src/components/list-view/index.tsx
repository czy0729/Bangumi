/*
 * 通用长列表，整合了 FlatList 和 SectionList
 * @Doc: https://www.react-native.cn/docs/flatlist
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-17 07:31:03
 */
import React from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { pick, omit, sleep, simpleTime, date } from '@utils'
import { LIST_EMPTY, STORYBOOK } from '@constants'
import { AnyObject, ListEmpty } from '@types'
import { ErrorBoundary } from '../error-boundary'
import List from './list'
import Footer from './footer'
import { DEFAULT_PROPS, REFRESH_STATE, SCROLL_CALLBACK } from './ds'
import {
  Props as ListViewProps,
  RefreshState,
  RenderListProps,
  ScrollToFunction
} from './types'

export { ListViewProps }

export const ListView = observer(
  class ListViewComponent extends React.Component<ListViewProps> {
    static defaultProps = DEFAULT_PROPS

    state = {
      refreshState: REFRESH_STATE.Idle as RefreshState,

      /** @deprecated */
      rendered: true // STORYBOOK
    }

    componentDidMount() {
      const { data, lazy } = this.props
      this.updateRefreshState(data)

      if (lazy) {
        setTimeout(() => {
          const { rendered } = this.state
          if (!rendered) {
            this.setState({
              rendered: true
            })
          }
        }, 800)
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { data } = nextProps
      this.updateRefreshState(data)
    }

    scrollToIndex: ScrollToFunction = SCROLL_CALLBACK

    scrollToOffset: ScrollToFunction = SCROLL_CALLBACK

    scrollToItem: ScrollToFunction = SCROLL_CALLBACK

    scrollToLocation: ScrollToFunction = SCROLL_CALLBACK

    scrollToEnd: ScrollToFunction = SCROLL_CALLBACK

    connectRef = (ref: React.RefObject<FlatList>['current']) => {
      if (ref?.scrollToIndex) {
        this.scrollToIndex = (params: any) => ref.scrollToIndex(params)
      }

      if (ref?.scrollToOffset) {
        this.scrollToOffset = (params: any) => ref.scrollToOffset(params)
      } else if (
        // @ts-expect-error
        ref?._wrapperListRef?._listRef?.scrollToOffset
      ) {
        this.scrollToOffset = (params: any) =>
          // @ts-expect-error
          ref._wrapperListRef._listRef.scrollToOffset(params)
      }

      if (ref?.scrollToItem) {
        this.scrollToItem = (params: any) => ref.scrollToItem(params)
      }

      // @ts-expect-error
      if (ref?.scrollToLocation) {
        this.scrollToLocation = (params: any) =>
          // @ts-expect-error
          ref.scrollToLocation(params)
      }

      if (ref?.scrollToEnd) {
        this.scrollToEnd = (params: any) => ref.scrollToEnd(params)
      } else if (
        // @ts-expect-error
        ref?._wrapperListRef?._listRef?.scrollToEnd
      ) {
        this.scrollToEnd = (params: any) =>
          // @ts-expect-error
          ref._wrapperListRef._listRef.scrollToEnd(params)
      }
    }

    updateRefreshState = (data: ListEmpty) => {
      const {
        list = [],
        pagination = {
          page: 0,
          pageTotal: 0
        },
        _loaded
      } = data
      let refreshState: number

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
      const { rendered } = this.state
      if (lazy && !rendered) return undefined

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
      const { rendered } = this.state
      if (lazy && !rendered) return undefined

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
      const { refreshState } = this.state
      return refreshState === REFRESH_STATE.Idle
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
      const { refreshState } = this.state
      return {
        style,
        connectRef: this.connectRef,
        ListFooterComponent: showFooter ? this.renderFooter() : ListFooterComponent,
        refreshing: refreshState === REFRESH_STATE.HeaderRefreshing,
        refreshControl: this.renderRefreshControl(),
        onRefresh: onHeaderRefresh ? this.onHeaderRefresh : undefined,
        onEndReached: onFooterRefresh ? this.onEndReached : undefined,
        onEndReachedThreshold: 0.5,

        /** 常用优化参数 */
        initialNumToRender: 48,
        windowSize: optimize ? 12 : undefined,
        maxToRenderPerBatch: optimize ? 48 : undefined,
        updateCellsBatchingPeriod: optimize ? 48 : undefined,

        /** 强制不显示滚动条 */
        showsHorizontalScrollIndicator: false,
        showsVerticalScrollIndicator: false
      }
    }

    get sections() {
      const { data, sectionKey, sections, lazy } = this.props
      const { rendered } = this.state
      let _sections = []
      if (sections) {
        _sections = lazy && !rendered ? sections.slice(0, lazy) : sections.slice()
      } else {
        const sectionsMap = {}
        data.list.forEach(item => {
          const title = item[sectionKey]
          if (sectionsMap[title] === undefined) {
            sectionsMap[title] = _sections.length
            _sections.push({
              title,
              data: [item]
            })
          } else {
            _sections[sectionsMap[title]].data.push(item)
          }
        })
      }
      return _sections
    }

    get data() {
      const { data, lazy } = this.props
      const { rendered } = this.state
      if (lazy && !rendered) return data.list.slice(0, lazy)

      return data.list
    }

    /** 不要试图去单独封装这个组件, 不明原因会导致整个列表都不显示 */
    renderRefreshControl() {
      const { data, progressViewOffset, refreshControlProps, onHeaderRefresh } =
        this.props
      if (!onHeaderRefresh) return null

      const { refreshState } = this.state
      return (
        <RefreshControl
          enabled={!!onHeaderRefresh}
          refreshing={refreshState === REFRESH_STATE.HeaderRefreshing}
          title={
            data._loaded
              ? `上次刷新时间: ${simpleTime(date(String(data._loaded)))}`
              : undefined
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
      const props: RenderListProps = omit(this.props, [
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
      const passProps: AnyObject = {
        ...rest
      }
      if (sectionKey || sections) {
        passProps.sections = this.sections
      } else {
        passProps.data = this.data
      }

      if (STORYBOOK) {
        passProps.pagination = this.props.data.pagination
        passProps.renderFooter = this.renderFooter()
        passProps.onFooterRefresh = this.onFooterRefresh
      }

      return <List {...this.commonProps} {...passProps} />
    }

    renderFooter() {
      const { lazy } = this.props
      const { rendered, refreshState } = this.state
      if (lazy && !rendered) return null

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
      const { _filter } = data

      return <Footer refreshState={refreshState} filterText={_filter} {...other} />
    }

    /** @deprecated */
    renderScrollToTop() {
      return null

      // const { scrollToTop } = this.props
      // if (IOS || !scrollToTop) return null

      // return (
      //   <ScrollToTop
      //     scrollToIndex={this.scrollToIndex}
      //     scrollToLocation={this.scrollToLocation}
      //   />
      // )
    }

    render() {
      return <ErrorBoundary>{this.renderList()}</ErrorBoundary>
    }
  }
)
