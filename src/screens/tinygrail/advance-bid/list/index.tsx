/*
 * @Author: czy0729
 * @Date: 2020-01-09 15:17:29
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 06:09:51
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import ItemAdvance from '@tinygrail/_/item-advance'
import { Ctx } from '../types'

function List() {
  const { $ } = useStore<Ctx>()
  if (!$.computedList._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const EVENT = {
    id: '买一推荐.跳转',
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
      onHeaderRefresh={$.fetchAdvanceBidList}
    />
  )
}

export default ob(List)
