/*
 * 整合了FlatList和SectionList的长列表
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-10 22:14:04
 */
import React from 'react'
import {
  FlatList,
  RefreshControl,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native'
import { ActivityIndicator } from '@ant-design/react-native'
import { systemStore } from '@stores'
import { sleep, date, simpleTime } from '@utils'
import { randomSpeech } from '@constants/speech'
import { LIST_EMPTY } from '@constants'
import _ from '@styles'
import Flex from './flex'
import Mesume from './mesume'
import Text from './text'

const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
}

export default class ListView extends React.Component {
  static defaultProps = {
    style: undefined,
    keyExtractor: undefined,
    data: LIST_EMPTY,
    sectionKey: '', // 当有此值, 根据item[section]构造<SectionList>的sections
    sections: undefined,
    progressViewOffset: undefined,
    refreshControlProps: {},
    renderItem: undefined,
    footerRefreshingText: '玩命加载中 >.<',
    footerFailureText: '居然失败了 =.=!',
    footerNoMoreDataText: '到底啦',
    footerEmptyDataText: '好像什么都没有',
    onHeaderRefresh: undefined,
    onFooterRefresh: undefined
  }

  state = {
    refreshState: RefreshState.Idle
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps
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

  scrollTo = Function.prototype
  scrollToLocation = Function.prototype

  onHeaderRefresh = async () => {
    const { onHeaderRefresh } = this.props
    if (onHeaderRefresh) {
      this.setState({
        refreshState: RefreshState.HeaderRefreshing
      })
      await sleep(800)
      onHeaderRefresh()
    }
  }

  onFooterRefresh = async () => {
    const { onFooterRefresh } = this.props
    if (onFooterRefresh) {
      this.setState({
        refreshState: RefreshState.FooterRefreshing
      })
      await sleep(800)
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

  renderFooter = refreshState => {
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
      onHeaderRefresh,
      onFooterRefresh
    } = this.props
    switch (refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />
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
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerFailureText}</Text>
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
                style={styles.footerEmpty}
                direction='column'
                justify='center'
              >
                <Mesume />
                <Text style={[styles.footerText, _.mt.sm]}>
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
            style={[styles.footerNoMore, _.container.wind]}
            justify='center'
            direction='column'
          >
            <ActivityIndicator size='small' />
            <Text style={_.mt.sm} type='sub' size={14} align='center'>
              {footerRefreshingText}
            </Text>
          </Flex>
        )
        break
      case RefreshState.NoMoreData:
        footer = footerNoMoreDataComponent || (
          <Flex
            style={[styles.footerNoMore, _.container.wind]}
            justify='center'
            direction='column'
          >
            <Mesume size={80} />
            {systemStore.setting.speech && (
              <Text style={_.mt.sm} type='sub' size={14} align='center'>
                {randomSpeech()}
              </Text>
            )}
          </Flex>
        )
        break
      default:
        break
    }
    return footer
  }

  render() {
    const {
      style,
      data,
      sectionKey,
      sections,
      progressViewOffset,
      refreshControlProps,
      ...other
    } = this.props
    const { refreshState } = this.state
    const commonProps = {
      ref: ref => {
        if (ref) {
          this.scrollToLocation = params => ref.scrollToLocation(params)
        }
      },
      style: [styles.container, style],
      initialNumToRender: 10,
      refreshing: refreshState === RefreshState.HeaderRefreshing,
      refreshControl: (
        <RefreshControl
          title={
            data._loaded
              ? `上次刷新时间: ${simpleTime(date(data._loaded))}`
              : undefined
          }
          titleColor={_.colorSub}
          progressViewOffset={progressViewOffset}
          refreshing={refreshState === RefreshState.HeaderRefreshing}
          onRefresh={this.onHeaderRefresh}
          {...refreshControlProps}
        />
      ),
      ListFooterComponent: this.renderFooter(refreshState),
      onRefresh: this.onHeaderRefresh,
      onEndReached: this.onEndReached,
      onEndReachedThreshold: 0.25
    }

    if (sectionKey || sections) {
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
      return <SectionList sections={_sections} {...commonProps} {...other} />
    }

    return <FlatList data={data.list.slice()} {...commonProps} {...other} />
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: _.window.height * 0.24
  },
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    height: 40
  },
  footerText: {
    fontSize: 14,
    color: _.colorSub
  },
  footerEmpty: {
    minHeight: 240
  },
  footerNoMore: {
    padding: 8
  }
})
