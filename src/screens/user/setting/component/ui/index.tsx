/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-07 19:57:48
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import AvatarRound from './avatar-round'
import CoverThings from './cover-things'
import CustomFontFamily from './custom-font-family'
import FontSize from './font-size'
import HorizontalShowMask from './horizontal-show-mask'
import LetterSpacing from './letter-spacing'
import Speech from './speech'
import Squircle from './squircle'
import Transition from './transition'
import Vibration from './vibration'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'
/** 画面 */
function UI({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting arrow highlight filter={filter} onPress={setTrue} {...TEXTS.ui} />
      <ActionSheet show={state} title={TEXTS.ui.hd} height={filter ? 440 : 760} onClose={setFalse}>
        {shows.font && <CustomFontFamily filter={filter} />}
        {shows.coverThings && <CoverThings filter={filter} />}
        {shows.avatarRound && <AvatarRound filter={filter} />}
        {shows.fontSize && <FontSize filter={filter} />}
        {shows.letterSpacing && <LetterSpacing filter={filter} />}
        {shows.horizontalShowMask && <HorizontalShowMask filter={filter} />}
        {!WEB && shows.vibration && <Vibration filter={filter} />}
        {shows.squircle && <Squircle filter={filter} />}
        {shows.speech && <Speech filter={filter} />}
        {!WEB && shows.transition && <Transition filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(UI)
