/*
 * @Author: czy0729
 * @Date: 2019-04-11 00:46:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-12 13:35:22
 */
import React from 'react'
import {
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  View
} from 'react-native'
import { LIST_EMPTY } from '@constants'
import { sleep } from '@utils'
import { window, colorSub } from '@styles'
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
    renderItem: undefined,
    footerRefreshingText: '玩命加载中 >.<',
    footerFailureText: '我擦嘞，居然失败了 =.=!',
    footerNoMoreDataText: '- 没有更多啦 -',
    footerEmptyDataText: '- 好像什么东西都没有 -',
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
      console.log('onFooterRefresh')
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
      footerNoMoreDataText,
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
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>{footerEmptyDataText}</Text>
              </View>
            )}
          </TouchableOpacity>
        )
        break
      case RefreshState.FooterRefreshing:
        footer = footerRefreshingComponent || (
          <View style={styles.footerContainer}>
            <ActivityIndicator size='small' />
            <Text style={[styles.footerText, { marginLeft: 8 }]}>
              {footerRefreshingText}
            </Text>
          </View>
        )
        break
      case RefreshState.NoMoreData:
        footer = footerNoMoreDataComponent || (
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>{footerNoMoreDataText}</Text>
          </View>
        )
        break
      default:
        break
    }
    return footer
  }

  render() {
    const { style, data, ...other } = this.props
    const { refreshState } = this.state
    return (
      <FlatList
        style={[styles.container, style]}
        data={data.list}
        refreshing={refreshState === RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter(refreshState)}
        onRefresh={this.onHeaderRefresh}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={0.16}
        {...other}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: window.height * 0.24
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
    color: colorSub
  }
})
