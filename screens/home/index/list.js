/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 01:01:14
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { withTabsHeader } from '@utils/decorators'
import { IOS } from '@constants'
import Item from './item'

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
      onHeaderRefresh={$.onHeaderRefresh}
      {...withTabsHeader.listViewProps}
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
    paddingHorizontal: _.wind,
    paddingTop: _.space,
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
