/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:50:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-20 11:37:37
 */
import React from 'react'
import { Loading } from '@components'
import { PaginationList2 } from '@_'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import Item from '@tinygrail/_/item'
import { refreshControlProps } from '@tinygrail/styles'
import { Ctx } from '../types'

const EVENT = {
  id: '英灵殿.跳转'
} as const

function List() {
  const { $ } = useStore<Ctx>()
  if (!$.computedList._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  return (
    <PaginationList2
      style={_.container.flex}
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      refreshControlProps={refreshControlProps}
      footerTextType='tinygrailText'
      data={$.computedList.list}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.fetchValhallList}
    />
  )
}

export default ob(List)

function renderItem({ item, index }) {
  return <Item index={index} type='valhall' event={EVENT} {...item} />
}
