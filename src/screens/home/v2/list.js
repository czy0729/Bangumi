/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-08 21:22:58
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'
import Item from './item'
import { H_TABBAR } from './store'

const contentInset = IOS
  ? {
      top: _.headerHeight + H_TABBAR
    }
  : undefined
const contentOffset = IOS
  ? {
      y: -(_.headerHeight + H_TABBAR)
    }
  : undefined

function List({ title }, { $ }) {
  if (!$.userCollection._loaded) {
    return <Loading />
  }

  return (
    <ListView
      style={!IOS && styles.androidWrap}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={$.currentUserCollection(title)}
      footerNoMoreDataText=''
      footerEmptyDataText='当前没有在看的条目哦'
      renderItem={renderItem}
      contentInset={contentInset}
      contentOffset={contentOffset}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

List.defaultProps = {
  title: '全部'
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)

const styles = StyleSheet.create({
  androidWrap: {
    marginBottom: _.tabBarHeight - 1
  },
  contentContainerStyle: {
    paddingBottom: IOS ? _.bottom : _.bottom - _.tabBarHeight
  }
})

function keyExtractor(item) {
  return String(item.subject_id)
}

function renderItem({ item }) {
  return (
    <Item
      subjectId={item.subject_id}
      subject={item.subject}
      epStatus={item.ep_status}
    />
  )
}
