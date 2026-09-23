/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-23 12:00:00
 */
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import { IconSliders } from '../icons'
import CnFirst from './cn-first'
import HorizontalShowMask from './horizontal-show-mask'
import Speech from './speech'
import Transition from './transition'
import Vibration from './vibration'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'
/** 界面 */
function UI({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconSliders />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.ui}
      />
      <ActionSheet show={state} title={TEXTS.ui.hd} height={filter ? 440 : 760} onClose={setFalse}>
        {shows.cnFirst && <CnFirst filter={filter} />}
        {!WEB && shows.vibration && <Vibration filter={filter} />}
        {shows.horizontalShowMask && <HorizontalShowMask filter={filter} />}
        {shows.speech && <Speech filter={filter} />}
        {!WEB && shows.transition && <Transition filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(UI)
