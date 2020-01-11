/*
 * @Author: czy0729
 * @Date: 2019-03-14 15:13:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-11 17:08:08
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { withTabsHeader } from '@utils/decorators'
import Item from './item'

function List({ title }, { $ }) {
  if (!$.userCollection._loaded) {
    return <Loading />
  }

  return (
    <ListView
      contentContainerStyle={_.container.outer}
      keyExtractor={keyExtractor}
      data={$.currentUserCollection(title)}
      footerNoMoreDataText=''
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
