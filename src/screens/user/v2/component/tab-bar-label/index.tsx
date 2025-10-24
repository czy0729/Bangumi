/*
 * @Author: czy0729
 * @Date: 2021-11-27 17:23:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-23 10:38:16
 */
import React from 'react'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { MODEL_SUBJECT_TYPE } from '@constants'
import TabBarLabel from './tab-bar-label'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function TabBarLabelWrap({ style, title, focused }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
    const { subjectType } = $.state

    return (
      <TabBarLabel
        style={style}
        title={title.replace('看', $.action)}
        count={$.count(MODEL_SUBJECT_TYPE.getTitle(subjectType), title)}
        focused={focused}
      />
    )
  })
}

export default TabBarLabelWrap
