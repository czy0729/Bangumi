/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-26 18:31:01
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { TITLE_CHARACTER } from '../../ds'
import { Ctx } from '../../types'
import Split from '../split'
import Character from './character.lazy'
import { COMPONENT } from './ds'

function CharacterWrap({ onBlockRef }) {
  const { $, navigation } = useStore<Ctx>()
  if (!$.showCharacter[1]) return null

  return (
    <Suspense fallback={null}>
      <Component id='screen-subject-character'>
        <View
          ref={ref => onBlockRef(ref, TITLE_CHARACTER)}
          style={_.container.layout}
          collapsable={false}
        />
        <Character
          navigation={navigation}
          showCharacter={systemStore.setting.showCharacter}
          subjectId={$.subjectId}
          crt={$.crt}
          crtCounts={$.subjectFormHTML.crtCounts}
          subjectName={$.cn}
          onSwitchBlock={$.onSwitchBlock}
        />
        <Split
          style={{
            marginTop: 28
          }}
        />
      </Component>
    </Suspense>
  )
}

export default ob(CharacterWrap, COMPONENT)
