/*
 * @Author: czy0729
 * @Date: 2022-01-09 11:09:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-04 23:27:21
 */
import React from 'react'
import { ScrollView, Heatmap } from '@components'
import { ItemCatalog } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

const event = {
  id: '目录.跳转'
}

function List(props, { $ }) {
  const { show } = $.state
  return (
    <ScrollView contentContainerStyle={_.mb.md} scrollToTop>
      {show &&
        $.catalog.list.map((item, index) => (
          <ItemCatalog key={item.id} event={event} {...item}>
            {index === 1 && <Heatmap id='目录.跳转' />}
          </ItemCatalog>
        ))}
    </ScrollView>
  )
}

export default obc(List)
