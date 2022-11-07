/*
 * @Author: czy0729
 * @Date: 2020-01-09 19:50:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 05:58:38
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import ItemAdvance from '@tinygrail/_/item-advance'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { _loaded } = $.computedList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const EVENT = {
    id: '竞拍推荐.跳转',
    data: {
      userId: $.myUserId,
      type: 1
    }
  } as const

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
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={({ item, index }) => (
        <ItemAdvance
          index={item._index || index}
          event={EVENT}
          isAuctioning={$.auctioningMap[item.id]}
          assets={$.myCharaAssetsMap[item.id]}
          {...item}
        />
      )}
      onHeaderRefresh={$.fetchAdvanceAuctionList}
    />
  )
}

export default obc(List)
