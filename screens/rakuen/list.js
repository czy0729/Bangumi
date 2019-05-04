/*
 * @Author: czy0729
 * @Date: 2019-04-27 19:30:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-05 00:04:56
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading, ListView } from '@components'
import { withTabsHeader } from '@utils/decorators'
import { MODEL_RAKUEN_TYPE } from '@constants/model'
import _ from '@styles'
import Item from './item'

const List = ({ type }, { $ }) => {
  const rakuen = $.rakuen(MODEL_RAKUEN_TYPE.getValue(type))
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
