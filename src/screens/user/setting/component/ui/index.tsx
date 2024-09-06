/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 17:44:10
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import AvatarRound from './avatar-round'
import CoverThings from './cover-things'
import CustomFontFamily from './custom-font-family'
import FontSize from './font-size'
import Speech from './speech'
import Squircle from './squircle'
import Transition from './transition'
import Vibration from './vibration'
import { COMPONENT, TEXTS } from './ds'

/** 画面 */
function UI({ filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='画面' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='画面' height={filter ? 440 : 760} onClose={setFalse}>
          {shows.font && <CustomFontFamily filter={filter} />}
          {shows.coverThings && <CoverThings filter={filter} />}
          {shows.avatarRound && <AvatarRound filter={filter} />}
          {shows.squircle && <Squircle filter={filter} />}
          {shows.speech && <Speech filter={filter} />}
          {shows.fontSize && <FontSize filter={filter} />}
          {!WEB && shows.transition && <Transition filter={filter} />}
          {!WEB && shows.vibration && <Vibration filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default UI
