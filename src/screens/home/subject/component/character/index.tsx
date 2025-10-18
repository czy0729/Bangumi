/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-21 00:28:00
 */
import React, { Suspense } from 'react'
import { View } from 'react-native'
import { Component } from '@components'
import { _, systemStore, useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { TITLE_CHARACTER } from '../../ds'
import Split from '../split'
import Character from './character'
import { COMPONENT } from './ds'

import type { Ctx } from '../../types'
import type { Props } from './types'

function CharacterWrap({ onBlockRef }: Props) {
  const { $, navigation } = useStore<Ctx>(COMPONENT)

  return useObserver(() => {
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
  })
}

export default CharacterWrap
