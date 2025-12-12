/*
 * @Author: czy0729
 * @Date: 2022-03-15 00:51:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-04 20:16:16
 */
import React from 'react'
import { ItemCatalog } from '@_'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COMPONENT, EVENT } from './ds'

import type { SubjectCatalogsItem } from '@stores/subject/types'
import type { RenderItem } from '@types'

function Item({ item, index }: RenderItem<SubjectCatalogsItem>) {
  r(COMPONENT)

  return useObserver(() => (
    <ItemCatalog
      index={index}
      isUser
      id={item.id}
      name={item.userName}
      title={item.title}
      time={item.time}
      last={item.last}
      event={EVENT}
    />
  ))
}

export default Item
