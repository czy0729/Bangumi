/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:42:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-05 22:38:24
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import i18n from '@constants/i18n'
import { IconCloud } from '../icons'
import { getShows } from '../../utils'
import SyncSetting from './sync-setting'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 系统 */
function System({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconCloud />}
        hd={`同步${i18n.setting()}`}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
      />
      <ActionSheet show={state} title='同步' onClose={setFalse}>
        {shows.setting && <SyncSetting filter={filter} />}
        {/* {shows.settingTopic && <SyncTopic filter={filter} />} */}
      </ActionSheet>
    </>
  )
}

export default observer(System)
