/*
 * @Author: czy0729
 * @Date: 2023-03-28 13:26:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-25 21:18:00
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import GridItem from './grid'
import ListItem from './list'
import { COMPONENT } from './ds'

import type { SubjectTypeCn } from '@types'
import type { Ctx } from '../../types'

function Item({ item, index }) {
  const { $ } = useStore<Ctx>()
  const Component = $.isList ? ListItem : GridItem

  return (
    <Component
      item={item}
      index={index}
      id={String(item.id).replace('/subject/', '')}
      typeCn={MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>($.state.type)}
    />
  )
}

export default ob(Item, COMPONENT)
