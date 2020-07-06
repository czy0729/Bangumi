/*
 * 整合了FlatList和SectionList的长列表
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-07-03 10:20:20
 */
import React from 'react'
import {
  FlatList,
  RefreshControl,
  SectionList,
  TouchableOpacity,
  View,
  Animated
} from 'react-native'
import { observer } from 'mobx-react'
import { ActivityIndicator } from '@ant-design/react-native'
import { _, systemStore } from '@stores'
import { sleep, date, simpleTime } from '@utils'
import { randomSpeech } from '@constants/speech'
import { LIST_EMPTY } from '@constants'
import Flex from './flex'
import Mesume from './mesume'
import Text from './text'

const AnimatedSectionList = Animated.createAnimatedComponent(SectionList)
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList)
const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
}

export default
@observer
class ListView extends React.Component {
  static defaultProps = {
    style: undefined,
    keyExtractor: undefined,
    data: LIST_EMPTY,
    sectionKey: '', // 当有此值, 根据item[section]构造<SectionList>的sections
    sections: undefined,
    progressViewOffset: undefined,
    refreshControlProps: {},
    renderItem: undefined,
    footerRefreshingText: '加载中...',
    footerFailureText: '居然失败了 =.=!',
    footerNoMoreDataText: '到底啦',
    footerEmptyDataText: '好像什么都没有',
    footerTextType: 'sub',
    optimize: true, // 是否开启长列表优化
    showFooter: true,
    showMesume: true,
    onHeaderRefresh: undefined,
    onFooterRefresh: undefined
  }

  state = {
    refreshState: RefreshState.Idle
  }

  componentDidMount() {
    const { data } = this.props
    this.updateRefreshState(data)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { data } = nextProps
    this.updateRefreshState(data)
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

  scrollToIndex = Function.prototype
  scrollToItem = Function.prototype
  scrollToOffset = Function.prototype

  onHeaderRefresh = async () => {
    const { onHeaderRefresh } = this.props
    if (onHeaderRefresh) {
      this.setState({
        refreshState: RefreshState.HeaderRefreshing
      })
      await sleep(640)
      onHeaderRefresh()
    }
  }

  onFooterRefresh = async () => {
    const { onFooterRefresh } = this.props
    if (onFooterRefresh) {
      this.setState({
        refreshState: RefreshState.FooterRefreshing
      })
      await sleep(640)
      onFooterRefresh()
    }
  }

  onEndReached = () => {
    if (this.shouldStartFooterRefreshing()) {
      this.onFooterRefresh()
    }
  }

  shouldStartHeaderRefreshing = () => {
    const { refreshState } = this.state
    if (
      refreshState == RefreshState.HeaderRefreshing ||
      refreshState == RefreshState.FooterRefreshing
    ) {
      return false
    }
    return true
  }

  shouldStartFooterRefreshing = () => {
    const { refreshState } = this.state
    return refreshState === RefreshState.Idle
  }

  connectRef = ref => {
    if (ref) {
      this.scrollToIndex = params => ref.scrollToIndex(params)
      this.scrollToItem = params => ref.scrollToItem(params)
      this.scrollToOffset = params => ref.scrollToOffset(params)
    }
  }

  get style() {
    const { style } = this.props
    return style ? [this.styles.container, style] : this.styles.container
  }

  get commonProps() {
    const { optimize, showFooter } = this.props
    const { refreshState } = this.state
    return {
      ref: this.connectRef,
      style: this.style,

      // 安卓默认为true, iOS为false, false时列表的Text才能自由选择复制
      // removeClippedSubviews: false,

      refreshing: refreshState === RefreshState.HeaderRefreshing,
      refreshControl: this.renderRefreshControl(),
      ListFooterComponent: showFooter ? this.renderFooter(refreshState) : null,
      onRefresh: this.onHeaderRefresh,
      onEndReached: this.onEndReached,
      onEndReachedThreshold: 0.64,

      // optimize
      initialNumToRender: 48,
      windowSize: optimize ? 12 : undefined,
      maxToRenderPerBatch: optimize ? 48 : undefined,
      updateCellsBatchingPeriod: optimize ? 48 : undefined
    }
  }

  get section() {
    const { data, sectionKey, sections } = this.props
    let _sections = []
    if (sections) {
      _sections = sections.slice()
    } else {
      const sectionsMap = {}
      data.list.slice().forEach(item => {
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
    const { data } = this.props
    return Array.isArray(data.list) ? data.list : data.list.slice()
  }

  renderFooter(refreshState) {
    let footer = null
    const {
      data,
      footerRefreshingText,
      footerFailureText,
      // footerNoMoreDataText,
      footerEmptyDataText,
      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent,
      footerTextType,
      showMesume,
      onHeaderRefresh,
      onFooterRefresh
    } = this.props
    switch (refreshState) {
      case RefreshState.Idle:
        footer = <View style={this.styles.footerContainer} />
        break
      case RefreshState.Failure:
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (data.list.length === 0) {
                if (onHeaderRefresh) {
                  onHeaderRefresh(RefreshState.HeaderRefreshing)
                }
              } else if (onFooterRefresh) {
                onFooterRefresh(RefreshState.FooterRefreshing)
              }
            }}
          >
            {footerFailureComponent || (
              <View style={this.styles.footerContainer}>
                <Text
                  style={this.styles.footerText}
                  type={footerTextType}
                  size={13}
                >
                  {footerFailureText}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      case RefreshState.EmptyData:
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (onHeaderRefresh) {
                onHeaderRefresh(RefreshState.HeaderRefreshing)
              }
            }}
          >
            {footerEmptyDataComponent || (
              <Flex
                style={this.styles.footerEmpty}
                direction='column'
                justify='center'
              >
                {showMesume && <Mesume size={80} />}
                <Text
                  style={[this.styles.footerText, _.mt.sm]}
                  type={footerTextType}
                  size={13}
                >
                  {footerEmptyDataText}
                </Text>
              </Flex>
            )}
          </TouchableOpacity>
        )
        break
      case RefreshState.FooterRefreshing:
        footer = footerRefreshingComponent || (
          <Flex
            style={this.styles.footerNoMore}
            justify='center'
            direction='column'
          >
            <ActivityIndicator size='small' />
            <Text
              style={_.mt.sm}
              type={footerTextType}
              align='center'
              size={13}
            >
              {footerRefreshingText}
            </Text>
          </Flex>
        )
        break
      case RefreshState.NoMoreData:
        footer =
          footerNoMoreDataComponent ||
          (showMesume ? (
            <Flex
              style={this.styles.footerNoMore}
              justify='center'
              direction='column'
            >
              <Mesume size={80} />
              {systemStore.setting.speech && (
                <Text
                  style={_.mt.sm}
                  type={footerTextType}
                  align='center'
                  size={13}
                >
                  {data._filter
                    ? `已过滤${data._filter}个敏感条目`
                    : randomSpeech()}
                </Text>
              )}
            </Flex>
          ) : null)
        break
      default:
        break
    }
    return footer
  }

  renderRefreshControl() {
    const { data, progressViewOffset, refreshControlProps } = this.props
    const { refreshState } = this.state
    return (
      <RefreshControl
        title={
          data._loaded
            ? `上次刷新时间: ${simpleTime(date(data._loaded))}`
            : undefined
        }
        titleColor={_.colorSub}
        tintColor={_.colorSub}
        progressViewOffset={progressViewOffset}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        onRefresh={this.onHeaderRefresh}
        {...refreshControlProps}
      />
    )
  }

  render() {
    const {
      style,
      data,
      sectionKey,
      sections,
      progressViewOffset,
      refreshControlProps,
      optimize,
      showFooter,
      animated,
      ...other
    } = this.props
    if (sectionKey || sections) {
      if (animated) {
        return (
          <AnimatedSectionList
            sections={this.section}
            {...this.commonProps}
            {...other}
          />
        )
      }
      return (
        <SectionList sections={this.section} {...this.commonProps} {...other} />
      )
    }

    if (animated) {
      return (
        <AnimatedFlatList data={this.data} {...this.commonProps} {...other} />
      )
    }
    return <FlatList data={this.data} {...this.commonProps} {...other} />
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    minHeight: parseInt(_.window.height * 0.24)
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: _.lg,
    height: 40
  },
  footerText: {
    fontSize: 14 + _.fontSizeAdjust
  },
  footerEmpty: {
    minHeight: 240
  },
  footerNoMore: {
    padding: 8
  }
}))
