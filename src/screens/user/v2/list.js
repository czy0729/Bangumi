/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 20:34:38
 */
import React from 'react'
import { Loading, ListView, Heatmap } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@screens/_'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants/model'
import { tabs, H_BG } from './store'

const gridNum = 4

export default
@obc
class List extends React.Component {
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
    const { list, subjectType } = $.state
    const isDo = $.type === 'do'
    const isOnHold = $.type === 'on_hold'
    const isDropped = $.type === 'dropped'
    const event = {
      id: '我的.跳转'
    }

    const typeCn = MODEL_SUBJECT_TYPE.getTitle(subjectType)
    if (list) {
      return (
        <ItemCollections
          navigation={navigation}
          index={index}
          isDo={isDo}
          isOnHold={isOnHold}
          isDropped={isDropped}
          type={typeCn}
          event={event}
          {...item}
        >
          {index === 0 && (
            <Heatmap
              id='我的.跳转'
              data={{
                to: 'Subject',
                alias: '条目'
              }}
            />
          )}
        </ItemCollections>
      )
    }

    const needResetMarginLeft = _.isPad && index % gridNum === 0
    return (
      <ItemCollectionsGrid
        style={
          needResetMarginLeft && {
            marginLeft: _.wind + _._wind
          }
        }
        navigation={navigation}
        index={index}
        num={4}
        type={typeCn}
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
      return <Loading style={IOS ? _.container.plain : _.container._plain} />
    }

    const { list, page, isFocused } = $.state
    const numColumns = list ? undefined : gridNum
    const index = tabs.findIndex(item => item.title === title)
    return (
      <ListView
        ref={ref => $.connectRef(ref, index)}
        key={`${$.subjectType}${String(numColumns)}`}
        keyExtractor={keyExtractor}
        style={!IOS && styles.androidWrap}
        contentContainerStyle={styles.contentContainerStyle}
        data={userCollections}
        numColumns={numColumns}
        renderItem={this.renderItem}
        animated
        scrollToTop={isFocused && tabs[page].title === title}
        onHeaderRefresh={$.onHeaderRefresh}
        onFooterRefresh={$.fetchUserCollections}
        {...other}
      />
    )
  }
}

const H_TOOLBAR = 42
const styles = _.create({
  androidWrap: {
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight,
    minHeight: _.window.height + H_BG - _.tabBarHeight - H_TOOLBAR
  }
})
