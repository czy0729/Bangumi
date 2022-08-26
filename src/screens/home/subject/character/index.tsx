/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-25 23:37:11
 */
import React from 'react'
import { systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../types'
import Character from './character'

export default obc((props, { $, navigation }: Ctx) => {
  global.rerender('Subject.Character')

  const { showCharacter } = systemStore.setting
  if (showCharacter === -1 || !$.crt.length) return null

  return (
    <Character
      navigation={navigation}
      showCharacter={showCharacter}
      subjectId={$.subjectId}
      crt={$.crt}
      onSwitchBlock={$.onSwitchBlock}
    />
  )
})
