/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-10 03:42:27
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { withTabsHeader, observer } from '@utils/decorators'
import { IOS } from '@constants'
import Item from './item'

function List({ index }, { $ }) {
  const type = $.type(index)
  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) {
    return <Loading />
  }

  return (
    <ListView
      style={!IOS && styles.androidWrap}
      contentContainerStyle={styles.contentContainerStyle}
      keyExtractor={keyExtractor}
      data={rakuen}
      renderItem={renderItem}
      onHeaderRefresh={$.onHeaderRefresh}
      onFooterRefresh={$.fetchRakuen}
      {...withTabsHeader.listViewProps}
    />
  )
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
  return item.href
}

function renderItem({ item, index }) {
  return <Item index={index} {...item} />
}
