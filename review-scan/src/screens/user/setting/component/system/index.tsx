/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:42:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-10 10:10:31
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import i18n from '@constants/i18n'
import { getShows } from '../../utils'
import SyncSetting from './sync-setting'
import SyncTopic from './sync-topic'
import { COMPONENT, TEXTS } from './ds'

/** 系统 */
function System({ filter }: { filter: string }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting
          hd={`同步${i18n.setting()}`}
          arrow
          highlight
          filter={filter}
          onPress={setTrue}
        />
        <ActionSheet show={state} title='同步' onClose={setFalse}>
          {shows.setting && <SyncSetting filter={filter} />}
          {shows.settingTopic && <SyncTopic filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default System
