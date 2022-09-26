/*
 * @Author: czy0729
 * @Date: 2020-04-28 00:24:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-26 11:41:02
 */
import React from 'react'
import { Loading, Heatmap } from '@components'
import { PaginationList2, ItemVoice } from '@_'
import { _ } from '@stores'
import { keyExtractor } from '@utils'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '角色.跳转'
} as const

function List(props, { $, navigation }: Ctx) {
  const { _loaded } = $.monoVoices
  if (!_loaded) return <Loading />

  return (
    <PaginationList2
      contentContainerStyle={_.container.bottom}
      keyExtractor={keyExtractor}
      data={$.monoVoices.list}
      limit={6}
      scrollToTop
      renderItem={({ item, index }) => (
        <>
          <ItemVoice
            style={_.container.item}
            navigation={navigation}
            event={EVENT}
            {...item}
          />
          {!index && <Heatmap id='角色.跳转' />}
        </>
      )}
      onHeaderRefresh={$.onHeaderRefresh}
    />
  )
}

export default obc(List)
