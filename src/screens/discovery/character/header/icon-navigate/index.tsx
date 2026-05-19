/*
 * @Author: czy0729
 * @Date: 2026-05-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-18 21:20:06
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { feedback } from '@utils'
import { r } from '@utils/dev'
import { getDividerIndex } from '../../component/list/utils'
import { COMPONENT, ITEM_HEIGHT } from './ds'

import type { Recents } from '@stores/users/types'
import type { Ctx } from '../../types'

function IconNavigate({ $ }: Ctx) {
  r(COMPONENT)

  const handleNavigate = useCallback(() => {
    const list = $.list('recents') as Recents
    const dividerIndex = getDividerIndex(list)
    if (dividerIndex <= 0) return

    feedback(true)
    $.scrollToOffset({
      animated: true,
      offset: Math.max(0, (dividerIndex - 1) * ITEM_HEIGHT)
    })
  }, [$])

  if ($.title !== '人物近况') return null

  const list = $.list('recents') as Recents
  const dividerIndex = getDividerIndex(list)
  if (dividerIndex <= 0) return null

  return (
    <IconTouchable
      style={_.mr.xs}
      name='md-radio-button-on'
      size={16}
      color={_.colorTitle}
      onPress={handleNavigate}
    />
  )
}

export default observer(IconNavigate)
