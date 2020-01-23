/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:55:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-23 19:50:09
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.advanceList
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const event = {
    id: '卖一推荐.跳转',
    data: {
      userId: $.myUserId
    }
  }
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={keyExtractor}
      data={$.advanceList}
      renderItem={({ item, index }) => (
        <ItemAdvance index={index} event={event} {...item} />
      )}
      onHeaderRefresh={$.fetchAdvanceList}
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
