/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-02 14:01:49
 */
import React from 'react'
import { ScrollView, Heatmap } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'

const EVENT = {
  id: '目录.跳转'
} as const

function List(props, { $ }: Ctx) {
  const { show } = $.state
  return (
    <ScrollView contentContainerStyle={_.mb.md} scrollToTop>
      {show &&
        $.catalog.list.map((item, index) => (
          <>
            <ItemCatalog key={item.id} event={EVENT} {...item} />
            {index === 1 && <Heatmap id='目录.跳转' />}
          </>
        ))}
    </ScrollView>
  )
}

export default obc(List)
