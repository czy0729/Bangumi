/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-02-29 12:25:00
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.advanceAuctionList
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const event = {
    id: '竞拍推荐.跳转',
    data: {
      userId: $.myUserId
    }
  }
  return (
    <ListView
      style={_.container.flex}
      keyExtractor={keyExtractor}
      data={$.advanceAuctionList}
      renderItem={({ item, index }) => (
        <ItemAdvance
          index={index}
          event={event}
          isAuctioning={$.auctioningMap[item.id]}
          {...item}
        />
      )}
      onHeaderRefresh={$.fetchAdvanceAuctionList}
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
