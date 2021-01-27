/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:06:04
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import ItemAdvance from '../_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.computedList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
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
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={{
        color: _.colorTinygrailText
      }}
      footerTextType='tinygrailText'
      data={$.computedList}
      scrollToTop
      renderItem={({ item, index }) => (
        <ItemAdvance
          index={item._index || index}
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

export default obc(List, {
  title: '全部'
})
