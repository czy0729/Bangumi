/*
 * @Author: czy0729
 * @Date: 2020-01-08 11:55:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-16 21:37:48
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils/app'
import { ob } from '@utils/decorators'
import ItemAdvance from '@tinygrail/_/item-advance'
import { Ctx } from '../types'

function List() {
  const { $ } = useStore<Ctx>()
  const { _loaded } = $.computedList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const EVENT = {
    id: '卖一推荐.跳转',
    data: {
      userId: $.myUserId
    }
  } as const
  const renderItem = ({ item, index }) => <ItemAdvance index={index} event={EVENT} {...item} />

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
      renderItem={renderItem}
      onHeaderRefresh={$.fetchAdvanceList}
    />
  )
}

export default ob(List)
