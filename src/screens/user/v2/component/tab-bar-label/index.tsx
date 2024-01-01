/*
 * @Author: czy0729
 * @Date: 2021-11-27 17:23:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-01 20:39:56
 */
import React from 'react'
import { obc } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { Ctx } from '../../types'
import TabBarLeft from './tab-bar-label'
import { COMPONENT } from './ds'
import { Props } from './types'

function TabBarLeftWrap({ style, title, focused }: Props, { $ }: Ctx) {
  const { subjectType } = $.state
  return (
    <TabBarLeft
      style={style}
      title={title}
      count={$.count(MODEL_SUBJECT_TYPE.getTitle(subjectType), title)}
      focused={focused}
    />
  )
}

export default obc(TabBarLeftWrap, COMPONENT)
