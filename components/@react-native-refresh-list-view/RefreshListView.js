/*
 * Created by Liu Jinyong on 17/4/5.
 * Copyright © 2016年 Liu Jinyong. All rights reserved.
 * @Doc: https://github.com/huanxsd/react-native-refresh-list-view
 * @Author: czy0729
 * @Date: 2019-04-11 12:26:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-11 15:35:07
 */
import React, { PureComponent } from 'react'
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import { colorSub } from '@styles'

export const RefreshState = {
  Idle: 0,
  HeaderRefreshing: 1,
  FooterRefreshing: 2,
  NoMoreData: 3,
  Failure: 4,
  EmptyData: 5
}

class RefreshListView extends PureComponent {
  static defaultProps = {
    footerRefreshingText: '数据加载中…',
    footerFailureText: '点击重新加载',
    footerNoMoreDataText: '已加载全部数据',
    footerEmptyDataText: '暂时没有相关数据'
  }

  onHeaderRefresh = () => {
    if (this.shouldStartHeaderRefreshing()) {
      this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
    }
  }

  onEndReached = () => {
    console.log('onEndReached')
    if (this.shouldStartFooterRefreshing()) {
      if (this.props.onFooterRefresh) {
        this.props.onFooterRefresh(RefreshState.FooterRefreshing)
      }
    }
  }

  shouldStartHeaderRefreshing = () => {
    if (
      this.props.refreshState == RefreshState.HeaderRefreshing ||
      this.props.refreshState == RefreshState.FooterRefreshing
    ) {
      return false
    }
    return true
  }

  shouldStartFooterRefreshing = () => {
    const { refreshState, data } = this.props
    if (data.length == 0) {
      return false
    }
    return refreshState == RefreshState.Idle
  }

  renderFooter = () => {
    let footer = null
    const {
      footerRefreshingText,
      footerFailureText,
      footerNoMoreDataText,
      footerEmptyDataText,
      footerRefreshingComponent,
      footerFailureComponent,
      footerNoMoreDataComponent,
      footerEmptyDataComponent
    } = this.props
    switch (this.props.refreshState) {
      case RefreshState.Idle:
        footer = <View style={styles.footerContainer} />
        break
      case RefreshState.Failure:
        footer = (
          <TouchableOpacity
            onPress={() => {
              if (this.props.data.length == 0) {
                if (this.props.onHeaderRefresh) {
                  this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
                }
              } else if (this.props.onFooterRefresh) {
                this.props.onFooterRefresh(RefreshState.FooterRefreshing)
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
              if (this.props.onHeaderRefresh) {
                this.props.onHeaderRefresh(RefreshState.HeaderRefreshing)
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
            <ActivityIndicator size='small' color='#888888' />
            <Text style={[styles.footerText, { marginLeft: 7 }]}>
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
    const { renderItem, ...rest } = this.props
    return (
      <FlatList
        ref={this.props.listRef}
        onEndReached={this.onEndReached}
        onRefresh={this.onHeaderRefresh}
        refreshing={this.props.refreshState == RefreshState.HeaderRefreshing}
        ListFooterComponent={this.renderFooter}
        onEndReachedThreshold={0.1}
        renderItem={renderItem}
        {...rest}
      />
    )
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    height: 44
  },
  footerText: {
    fontSize: 14,
    color: colorSub
  }
})

export default RefreshListView
