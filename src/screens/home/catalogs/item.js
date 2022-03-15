/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:51:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 00:56:11
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemCatalog } from '@_'
import { obc } from '@utils/decorators'

const event = {
  id: '条目目录.跳转'
}

function Item({ item, index }, { navigation }) {
  return (
    <ItemCatalog
      navigation={navigation}
      event={event}
      isUser
      id={item.id}
      name={item.userName}
      title={item.title}
      last={item.time}
    >
      {!index && <Heatmap id='条目目录.跳转' />}
    </ItemCatalog>
  )
}

export default obc(Item)
