/*
 * 通用长列表，整合了 FlatList 和 SectionList
 * @Doc: https://www.react-native.cn/docs/flatlist
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 17:09:32
 */
import React from 'react'
import { RefreshControl, FlatList } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { pick, omit, sleep, simpleTime, date, stl } from '@utils'
import {
  IOS,
  LIST_EMPTY,
  STORYBOOK,
  TEXT_EMPTY,
  TEXT_FAIL,
  TEXT_NO_MORE,
  TEXT_REFRESHING
} from '@constants'
import { AnyObject, ListEmpty } from '@types'
import { ErrorBoundary } from '../error-boundary'
import { ScrollToTop } from '../scroll-to-top'
import List from './list'
import Footer from './footer'
import { REFRESH_STATE } from './ds'
import { memoStyles } from './styles'
import { Props as ListViewProps, RenderListProps, ScrollToFunction } from './types'

export { ListViewProps }

export const ListView = observer(
  class ListViewComponent extends React.Component<ListViewProps> {
    static defaultProps = {
      style: undefined,
      keyExtractor: undefined,
      data: LIST_EMPTY,
      sections: undefined,
      sectionKey: '',
      progressViewOffset: undefined,
      refreshControlProps: {},
      renderItem: undefined,
      footerRefreshingText: TEXT_REFRESHING,
      footerFailureText: TEXT_FAIL,
      footerNoMoreDataText: TEXT_NO_MORE,
      footerNoMoreDataComponent: undefined,
      footerEmptyDataText: TEXT_EMPTY,
      footerEmptyDataComponent: undefined,
      footerTextType: 'sub',
      showFooter: true,
      showMesume: true,
      optimize: true,
      scrollToTop: false,
      lazy: 0,
      scrollIndicatorInsets: {
        right: 1
      },
      onHeaderRefresh: undefined,
      onFooterRefresh: undefined
    }

    state = {
      refreshState: REFRESH_STATE.Idle,
      rendered: STORYBOOK
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

    scrollToIndex: ScrollToFunction = () => {}

    scrollToOffset: ScrollToFunction = () => {}

    scrollToItem: ScrollToFunction = () => {}

    scrollToLocation: ScrollToFunction = () => {}

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
      } else if (list.length === 0) {
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

    onEndReached = () => {
      if (this.shouldStartFooterRefreshing()) this.onFooterRefresh()
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
        onHeaderRefresh
      } = this.props
      const { refreshState } = this.state
      return {
        style: stl(this.styles.container, style),
        connectRef: this.connectRef,
        ListFooterComponent: showFooter ? this.renderFooter() : ListFooterComponent,
        refreshing: refreshState === REFRESH_STATE.HeaderRefreshing,
        refreshControl: this.renderRefreshControl(),
        onRefresh: onHeaderRefresh ? this.onHeaderRefresh : undefined,
        onEndReached: this.onEndReached,
        onEndReachedThreshold: 0.5,

        // 常用优化参数
        initialNumToRender: 48,
        windowSize: optimize ? 12 : undefined,
        maxToRenderPerBatch: optimize ? 48 : undefined,
        updateCellsBatchingPeriod: optimize ? 48 : undefined,

        // 强制不显示滚动条
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

      // return Array.isArray(data.list)
      // ? data.list
      // : // @ts-expect-error 这里是针对 mobx 的代理对象
      // data.list.slice()
      return data.list
    }

    renderRefreshControl() {
      const { data, progressViewOffset, refreshControlProps, onHeaderRefresh } =
        this.props
      const { refreshState } = this.state
      const title = data._loaded
        ? `上次刷新时间: ${simpleTime(date(String(data._loaded)))}`
        : undefined

      return (
        <RefreshControl
          enabled={!!onHeaderRefresh}
          title={title}
          colors={[_.colorMain]}
          titleColor={_.colorSub}
          tintColor={_.colorSub}
          progressViewOffset={progressViewOffset}
          refreshing={refreshState === REFRESH_STATE.HeaderRefreshing}
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
        'showMesume',
        'onHeaderRefresh',
        'onFooterRefresh'
      ]) as any
      const { list, _filter } = data

      return (
        <Footer
          refreshState={refreshState}
          length={list.length}
          filterText={_filter}
          {...other}
        />
      )
    }

    renderScrollToTop() {
      const { scrollToTop } = this.props
      if (IOS || !scrollToTop) return null

      return (
        <ScrollToTop
          scrollToIndex={this.scrollToIndex}
          scrollToLocation={this.scrollToLocation}
        />
      )
    }

    render() {
      return (
        <ErrorBoundary>
          {this.renderList()}
          {this.renderScrollToTop()}
        </ErrorBoundary>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)
