/*
 * @Author: czy0729
 * @Date: 2021-11-27 17:23:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-06 22:48:15
 */
import React from 'react'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import TabBarLabel from './tab-bar-label'
import { COMPONENT } from './ds'
import { Props } from './types'

function TabBarLabelWrap({ style, title, focused }: Props) {
  const { $ } = useStore<Ctx>()
  const { subjectType } = $.state
  return (
    <TabBarLabel
      style={style}
      title={title.replace('看', $.action)}
      count={$.count(MODEL_SUBJECT_TYPE.getTitle(subjectType), title)}
      focused={focused}
    />
  )
}

export default ob(TabBarLabelWrap, COMPONENT)
