/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:20:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 06:16:56
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import ItemAdvance from '../../_/item-advance'
import { Ctx } from '../types'

function List(props, { $ }: Ctx) {
  const { _loaded } = $.advanceSacrificeList
  if (!_loaded) return <Loading style={_.container.flex} color={_.colorTinygrailText} />

  const EVENT = {
    id: '献祭推荐.跳转',
    data: {
      userId: $.myUserId
    }
  } as const
  const renderItem = ({ item, index }) => (
    <ItemAdvance index={index} event={EVENT} {...item} />
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
      data={$.advanceSacrificeList}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={renderItem}
      onHeaderRefresh={$.fetchAdvanceSacrificeList}
    />
  )
}

export default obc(List)
