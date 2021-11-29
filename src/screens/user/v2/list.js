/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-11-29 10:37:21
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@screens/_'
import { _, systemStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import { IOS } from '@constants'
import { MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants/model'
import { tabs, H_BG } from './store'

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

  connectRef = ref => {
    const { $ } = this.context
    const { title } = this.props
    const index = tabs.findIndex(item => item.title === title)
    return $.connectRef(ref, index)
  }

  get userGridNum() {
    const { userGridNum } = systemStore.setting
    return Number(userGridNum)
  }

  renderItem = ({ item, index }) => {
    const { $, navigation } = this.context
    const { page } = this.props
    const { list, subjectType } = $.state
    const event = {
      id: '我的.跳转'
    }
    const typeCn = MODEL_SUBJECT_TYPE.getTitle(subjectType)

    if (list) {
      // {index === 0 && (
      //   <Heatmap
      //     id='我的.跳转'
      //     data={{
      //       to: 'Subject',
      //       alias: '条目'
      //     }}
      //   />
      // )}

      const { key } = tabs[page]
      return (
        <ItemCollections
          navigation={navigation}
          index={index}
          isDo={key === 'do'}
          isDropped={key === 'dropped'}
          isOnHold={key === 'on_hold'}
          showLabel={false}
          type={typeCn}
          userCollection={$.label}
          event={event}
          {...item}
        />
      )
    }

    const needResetMarginLeft = _.isPad && index % this.userGridNum === 0
    return (
      <ItemCollectionsGrid
        style={needResetMarginLeft && styles.resetML}
        navigation={navigation}
        index={index}
        num={this.userGridNum}
        type={typeCn}
        userCollection={$.label}
        event={event}
        {...item}
      />
    )
  }

  render() {
    rerender('User.List')

    const { hide } = this.state
    if (hide) return null

    const { $ } = this.context
    const { page, title, ...other } = this.props
    const { subjectType, list, isFocused } = $.state
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue(title)
    )

    const { _loaded } = userCollections
    if (!_loaded) {
      return <Loading style={IOS ? _.container.plain : _.container._plain} />
    }

    const numColumns = list ? undefined : this.userGridNum
    const tab = tabs[page]
    return (
      <ListView
        ref={this.connectRef}
        key={`${$.subjectType}${String(numColumns)}`}
        keyExtractor={keyExtractor}
        style={styles.list}
        contentContainerStyle={styles.contentContainerStyle}
        data={userCollections}
        lazy={12}
        numColumns={numColumns}
        renderItem={this.renderItem}
        animated
        scrollToTop={isFocused && tab.title === title}
        onFooterRefresh={$.fetchUserCollections}
        {...other}
      />
    )
  }
}

const H_TOOLBAR = 42 * _.ratio
const styles = _.create({
  list: {
    zIndex: 0,
    marginBottom: IOS ? 0 : _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight,
    minHeight: _.window.height + H_BG - _.tabBarHeight - H_TOOLBAR
  },
  resetML: {
    marginLeft: _.wind + _._wind
  }
})
