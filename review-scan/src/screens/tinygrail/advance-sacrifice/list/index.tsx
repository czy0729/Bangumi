/*
 * @Author: czy0729
 * @Date: 2020-01-25 20:20:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-08 06:16:56
 */
import React from 'react'
import { ListView, Loading } from '@components'
import { _, useStore } from '@stores'
import { keyExtractor } from '@utils'
import { ob } from '@utils/decorators'
import { Ctx } from '../types'
import ItemAdvance from '../../_/item-advance'

function List() {
  const { $ } = useStore<Ctx>()
  if (!$.advanceSacrificeList._loaded) {
    return <Loading style={_.container.flex} color={_.colorTinygrailText} />
  }

  const EVENT = {
    id: '献祭推荐.跳转',
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
      data={$.advanceSacrificeList}
      windowSize={6}
      initialNumToRender={24}
      maxToRenderPerBatch={24}
      updateCellsBatchingPeriod={24}
      lazy={24}
      scrollToTop
      renderItem={({ item, index }) => <ItemAdvance index={index} event={EVENT} {...item} />}
      onHeaderRefresh={$.fetchAdvanceSacrificeList}
    />
  )
}

export default ob(List)
