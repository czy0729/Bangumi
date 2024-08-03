/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-03 13:40:47
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
import { TITLE_CHARACTER } from '../../ds'
import { Ctx } from '../../types'
import Character from './character.lazy'
import { COMPONENT } from './ds'

function CharacterWrap({ onBlockRef }, { $, navigation }: Ctx) {
  if (!$.showCharacter[1]) return null

  return (
    <>
      <View style={_.container.layout} ref={ref => onBlockRef(ref, TITLE_CHARACTER)} />
      <Character
        navigation={navigation}
        showCharacter={systemStore.setting.showCharacter}
        subjectId={$.subjectId}
        crt={$.crt}
        crtCounts={$.subjectFormHTML.crtCounts}
        onSwitchBlock={$.onSwitchBlock}
      />
    </>
  )
}

export default obc(CharacterWrap, COMPONENT)
