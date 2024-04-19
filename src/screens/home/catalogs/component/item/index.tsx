/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:51:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-17 19:50:07
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemCatalog } from '@_'
import { ob } from '@utils/decorators'
import { COMPONENT, EVENT } from './ds'

function Item({ item, index }) {
  return (
    <ItemCatalog event={EVENT} isUser id={item.id} name={item.userName} title={item.title}>
      {!index && <Heatmap id='条目目录.跳转' />}
    </ItemCatalog>
  )
}

export default ob(Item, COMPONENT)
