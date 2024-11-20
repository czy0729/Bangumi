/*
 * @Author: czy0729
 * @Date: 2021-03-14 18:00:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 06:31:09
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
  if (!$.computedList._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const EVENT = {
    id: '低价股.跳转',
    data: {
      userId: $.myUserId
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
      renderItem={({ item, index }) => <ItemAdvance index={index} event={EVENT} {...item} />}
      onHeaderRefresh={() => $.fetchAdvanceState(true)}
    />
  )
}

export default ob(List)
