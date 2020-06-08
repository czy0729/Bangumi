/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-01 22:34:10
 */
import React from 'react'
import PropTypes from 'prop-types'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { observer } from '@utils/decorators'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.advanceAuctionList
  if (!_loaded) {
    return <Loading style={_.container.flex} />
  }

  const event = {
    id: '竞拍推荐.跳转',
    data: {
      userId: $.myUserId,
      type: 1
    }
  }

  return (
    <ListView
      style={_.container.flex}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={$.advanceAuctionList}
      renderItem={({ item, index }) => (
        <ItemAdvance
          index={index}
          event={event}
          isAuctioning={$.auctioningMap[item.id]}
          assets={$.myCharaAssetsMap[item.id]}
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
