/*
 * @Author: czy0729
 * @Date: 2019-05-25 22:57:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-05 07:24:18
 */
import React from 'react'
import { Loading, ListView } from '@components'
import { ItemCollections, ItemCollectionsGrid } from '@_'
import { _, systemStore } from '@stores'
import { matchYear, keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { IOS, MODEL_COLLECTION_STATUS, MODEL_SUBJECT_TYPE } from '@constants'
import { CollectionStatus, SubjectTypeCn } from '@types'
import { TABS } from '../ds'
import { Ctx } from '../types'
import { memoStyles } from './styles'
import { Props } from './types'

class List extends React.Component<Props> {
  state = {
    // @issue 列表的滚回顶部scrollToLocation不知道如何正确使用
    // 暂时使用重新渲染的办法解决列表变换置顶问题
    hide: false
  }

  // @ts-ignore
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

  connectRef = (ref: { scrollToIndex: any; scrollToOffset: any }) => {
    const { $ }: Ctx = this.context
    const { title } = this.props
    const index = TABS.findIndex((item: { title: string }) => item.title === title)
    return $.connectRef(ref, index)
  }

  get userGridNum() {
    const { userGridNum } = systemStore.setting
    return Number(userGridNum) + (_.isLandscape ? 1 : 0)
  }

  renderItem = ({ item, index }) => {
    const { $, navigation }: Ctx = this.context
    const { page } = this.props
    const { list, subjectType, showYear } = $.state
    const event = {
      id: '我的.跳转'
    }
    const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(subjectType)

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

      const { key } = TABS[page]
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

    return (
      <ItemCollectionsGrid
        navigation={navigation}
        index={index}
        num={this.userGridNum}
        type={typeCn}
        userCollection={$.label}
        event={event}
        {...item}
        airtime={showYear ? matchYear(item.tip) : false}
      />
    )
  }

  render() {
    global.rerender('User.List')

    const { hide } = this.state
    if (hide) return null

    const { $ }: Ctx = this.context
    const { page, title, ...other } = this.props
    const { subjectType, list, isFocused } = $.state
    const userCollections = $.userCollections(
      subjectType,
      MODEL_COLLECTION_STATUS.getValue<CollectionStatus>(title)
    )

    const { _loaded } = userCollections
    if (!_loaded) {
      return <Loading style={IOS ? _.container.plain : _.container._plain} />
    }

    const numColumns = list ? undefined : this.userGridNum
    const tab = TABS[page]
    return (
      <ListView
        key={`${_.orientation}${numColumns}`}
        ref={this.connectRef}
        keyExtractor={keyExtractor}
        style={this.styles.listView}
        contentContainerStyle={list ? this.styles.list : this.styles.grid}
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

  get styles() {
    return memoStyles()
  }
}

export default obc(List)
