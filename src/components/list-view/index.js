/*
 * 整合了FlatList和SectionList的长列表
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-30 05:00:11
 */
import React from 'react'
import { RefreshControl } from 'react-native'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import { runAfter, pick, omit, sleep, simpleTime, date } from '@utils'
import { LIST_EMPTY } from '@constants'
import { TEXT_REFRESHING, TEXT_FAIL, TEXT_NO_MORE, TEXT_EMPTY } from '@constants/text'
import { ScrollToTop } from '../scroll-to-top'
import List from './list'
import Footer from './footer'
import { RefreshState } from './ds'

export const ListView = observer(
  class extends React.Component {
    static defaultProps = {
      style: undefined,
      keyExtractor: undefined,
      data: LIST_EMPTY,
      sectionKey: '', // 当有此值, 根据item[section]构造<SectionList>的sections
      sections: undefined,
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
      optimize: true, // 是否开启长列表优化
      showFooter: true,
      showMesume: true,
      scrollToTop: false, // 自动在顶部补充一区域, 点击列表返回到顶, 安卓用
      lazy: 0, // 当有值, 初始化时当数组长度超过此长度, 会先渲染这个条数的数据, 再正常渲染

      // 此属性对于 iOS 需要有默认值, 否则会出现首次渲染滚动条位置不正确的问题
      scrollIndicatorInsets: {
        right: 1
      },
      onHeaderRefresh: undefined,
      onFooterRefresh: undefined
    }

    state = {
      refreshState: RefreshState.Idle,
      rendered: false
    }

    componentDidMount() {
      const { data, lazy } = this.props
      this.updateRefreshState(data)

      if (lazy) {
        runAfter(async () => {
          requestAnimationFrame(() => {
            setTimeout(() => {
              const { rendered } = this.state
              if (!rendered) {
                this.setState({
                  rendered: true
                })
              }
            }, 160)
          })
        })
      }
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
      const { data } = nextProps
      this.updateRefreshState(data)
    }

    scrollToIndex = Function.prototype
    scrollToOffset = Function.prototype
    scrollToItem = Function.prototype
    scrollToLocation = Function.prototype
    connectRef = ref => {
      if (ref?.scrollToIndex) this.scrollToIndex = params => ref.scrollToIndex(params)

      if (ref?.scrollToOffset) {
        this.scrollToOffset = params => ref.scrollToOffset(params)
      } else if (ref?._wrapperListRef?._listRef?.scrollToOffset) {
        this.scrollToOffset = params =>
          ref._wrapperListRef._listRef.scrollToOffset(params)
      }

      if (ref?.scrollToItem) this.scrollToItem = params => ref.scrollToItem(params)

      if (ref?.scrollToLocation)
        this.scrollToLocation = params => ref.scrollToLocation(params)
    }

    updateRefreshState = data => {
      const { list = [], pagination = {}, _loaded } = data
      let refreshState

      if (!_loaded) {
        refreshState = RefreshState.Idle
      } else if (list.length === 0) {
        refreshState = RefreshState.EmptyData
      } else if (pagination.page < pagination.pageTotal) {
        refreshState = RefreshState.Idle
      } else {
        refreshState = RefreshState.NoMoreData
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
          refreshState: RefreshState.HeaderRefreshing
        })

        await sleep(400)
        onHeaderRefresh()
      }
    }

    onFooterRefresh = async () => {
      const { lazy, onFooterRefresh } = this.props
      const { rendered } = this.state
      if (lazy && !rendered) return undefined

      if (onFooterRefresh) {
        this.setState({
          refreshState: RefreshState.FooterRefreshing
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
        refreshState === RefreshState.HeaderRefreshing ||
        refreshState === RefreshState.FooterRefreshing
      )
    }

    shouldStartFooterRefreshing = () => {
      const { refreshState } = this.state
      return refreshState === RefreshState.Idle
    }

    get style() {
      const { style } = this.props
      return style ? [this.styles.container, style] : this.styles.container
    }

    get commonProps() {
      const { optimize, showFooter, ListFooterComponent = null } = this.props
      const { refreshState } = this.state
      return {
        style: this.style,
        connectRef: this.connectRef,
        refreshing: refreshState === RefreshState.HeaderRefreshing,
        refreshControl: this.renderRefreshControl(),
        ListFooterComponent: showFooter ? this.renderFooter() : ListFooterComponent,
        onRefresh: this.onHeaderRefresh,
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
      return Array.isArray(data.list) ? data.list : data.list.slice()
    }

    renderRefreshControl() {
      const { data, progressViewOffset, refreshControlProps } = this.props
      const { refreshState } = this.state
      const title = data._loaded
        ? `上次刷新时间: ${simpleTime(date(data._loaded))}`
        : undefined
      return (
        <RefreshControl
          title={title}
          colors={[_.colorMain]}
          titleColor={_.colorSub}
          tintColor={_.colorSub}
          progressViewOffset={progressViewOffset}
          refreshing={refreshState === RefreshState.HeaderRefreshing}
          onRefresh={this.onHeaderRefresh}
          {...refreshControlProps}
        />
      )
    }

    renderList() {
      const { sectionKey, sections, ...passProps } = omit(this.props, [
        'style',
        'data',
        'lazy',
        'optimize',
        'progressViewOffset',
        'refreshControlProps',
        'scrollToTop',
        'showFooter',
        'showsHorizontalScrollIndicator',
        'showsVerticalScrollIndicator'
      ])
      if (sectionKey || sections) {
        passProps.sections = this.sections
      } else {
        passProps.data = this.data
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
        'footerFailureComponent',
        'footerFailureText',
        'footerNoMoreDataComponent',
        'footerRefreshingComponent',
        'footerRefreshingText',
        'footerTextType',
        'showMesume',
        'onHeaderRefresh',
        'onFooterRefresh'
      ])
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
      if (!scrollToTop) return null

      return (
        <ScrollToTop
          scrollToIndex={this.scrollToIndex}
          scrollToLocation={this.scrollToLocation}
        />
      )
    }

    render() {
      return (
        <>
          {this.renderList()}
          {this.renderScrollToTop()}
        </>
      )
    }

    get styles() {
      return memoStyles()
    }
  }
)

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: parseInt(_.window.height * 0.24)
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    paddingVertical: 8,
    paddingHorizontal: _.lg
  },
  footerText: {
    maxWidth: _.window.contentWidth - 2 * _.md,
    ..._.fontSize(14)
  },
  footerEmpty: {
    minHeight: 240
  },
  footerNoMore: {
    padding: 8
  }
}))
