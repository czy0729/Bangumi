/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-11 14:45:30
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import { H_BG } from './store'

export default
@observer
class List extends React.Component {
  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  state = {
    // @issue 列表的滚回顶部scrollToLocation不知道如何正确使用
    // 暂时使用重新渲染的办法解决列表变换置顶问题
    hide: false
  }

  UNSAFE_componentWillReceiveProps({ subjectType }) {
    if (subjectType !== this.props.subjectType) {
      this.setState({
        hide: true
      })

      setTimeout(() => {
        this.setState({
          hide: false
        })
      }, 0)
    }
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { list } = $.state
    const isDo = $.type === 'do'
    const isOnHold = $.type === 'on_hold'
    const isDropped = $.type === 'dropped'
    const event = {
      id: '我的.跳转'
    }

    if (list) {
      return (
        <ItemCollections
          navigation={navigation}
          index={index}
          isDo={isDo}
          isOnHold={isOnHold}
          isDropped={isDropped}
          event={event}
          {...item}
        />
      )
    }

    const needResetMarginLeft = _.isPad && index % 4 === 0
    return (
      <ItemCollectionsGrid
        style={
          needResetMarginLeft && {
            marginLeft: _.wind + _._wind
          }
        }
        navigation={navigation}
        index={index}
        isOnHold={isOnHold}
        event={event}
        {...item}
      />
    )
  }

  render() {
    const { hide } = this.state
    if (hide) {
      return null
    }

    const { $ } = this.context
    const { subjectType } = $.state
    const { title, forwardRef, ...other } = this.props
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(title)
    )
    if (!userCollections._loaded) {
      return <Loading style={IOS ? _.container.bg : _.container._plain} />
    }

    const { list } = $.state
    const numColumns = list ? undefined : 4
    return (
      <ListView
        key={`${$.subjectType}${String(numColumns)}`}
        keyExtractor={keyExtractor}
        style={!IOS && styles.androidWrap}
        contentContainerStyle={styles.contentContainerStyle}
        data={userCollections}
        numColumns={numColumns}
        renderItem={this.renderItem}
        animated
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchUserCollections}
        {...other}
      />
    )
  }
}

const H_TOOLBAR = 42
const styles = StyleSheet.create({
  androidWrap: {
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight,
    minHeight: _.window.height + H_BG - _.tabBarHeight - H_TOOLBAR
  }
})
