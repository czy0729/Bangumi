/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-03 10:15:42
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { _ } from '@stores'
import { withTabsHeader } from '@utils/decorators'
import Item from './item'

function List({ index }, { $ }) {
  const type = $.type(index)
  const rakuen = $.rakuen(type)
  if (!rakuen._loaded) {
    return <Loading />
  }

  return (
    <ListView
      contentContainerStyle={_.container.bottom}
      keyExtractor={item => item.href}
      data={rakuen}
      renderItem={({ item, index }) => <Item index={index} {...item} />}
      onHeaderRefresh={() => $.fetchRakuen(true)}
      onFooterRefresh={$.fetchRakuen}
      {...withTabsHeader.listViewProps}
    />
  )
}

List.contextTypes = {
  $: PropTypes.object
}

export default observer(List)
