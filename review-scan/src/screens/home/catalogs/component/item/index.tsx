/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:51:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:16:16
 */
import React from 'react'
import { ItemCatalog } from '@_'
import { ob } from '@utils/decorators'
import { COMPONENT, EVENT } from './ds'

function Item({ item, index }) {
  return (
    <ItemCatalog
      event={EVENT}
      index={index}
      isUser
      id={item.id}
      name={item.userName}
      title={item.title}
    />
  )
}

export default ob(Item, COMPONENT)
