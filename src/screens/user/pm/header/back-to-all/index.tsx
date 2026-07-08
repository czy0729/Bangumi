/*
 * @Author: czy0729
 * @Date: 2026-07-08 04:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-08 04:00:00
 */
import React from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'

function BackToAll({ $ }: Ctx) {
  r(COMPONENT)

  if (!$.state.thread) return null

  return (
    <IconTouchable
      style={_.mr._xs}
      name='md-subdirectory-arrow-right'
      color={_.colorTitle}
      size={18}
      onPress={() => $.onThreadChange('')}
    />
  )
}

export default observer(BackToAll)
