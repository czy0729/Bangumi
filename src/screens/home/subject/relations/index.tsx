/*
 * @Author: czy0729
 * @Date: 2019-04-08 10:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-26 01:25:13
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Relations from './relations'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Relations')

  const { showRelations } = systemStore.setting
  if (showRelations === -1 || !$.relations.length) return null

  return (
    <Relations
      navigation={navigation}
      showRelations={showRelations}
      subjectId={$.subjectId}
      relations={$.relations}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
