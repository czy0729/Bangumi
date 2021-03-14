/*
 * @Author: czy0729
 * @Date: 2021-03-14 18:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-14 18:01:24
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils/app'
import { obc } from '@utils/decorators'
import ItemAdvance from '@tinygrail/_/item-advance'

function List(props, { $ }) {
  const { _loaded } = $.computedList
  if (!_loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const event = {
    id: '低价股.跳转',
    data: {
      userId: $.myUserId
    }
  }
  const renderItem = ({ item, index }) => (
    <ItemAdvance index={index} event={event} {...item} />
  )

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
      renderItem={renderItem}
      onHeaderRefresh={$.fetchAdvanceList}
    />
  )
}

export default obc(List, {
  title: '全部'
})
