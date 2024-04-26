/*
 * @Author: czy0729
 * @Date: 2022-01-22 16:42:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-25 04:36:15
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { STORYBOOK } from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import { getShows } from '../../utils'
import ServerStatus from './server-status'
import SyncSetting from './sync-setting'
import SyncTopic from './sync-topic'
import { COMPONENT, TEXTS } from './ds'

/** 系统 */
function System({ navigation, filter }: { navigation: Navigation; filter: string }) {
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
        {!STORYBOOK && shows.serverStatus && (
          <ServerStatus navigation={navigation} filter={filter} />
        )}
      </>
    )
  })
}

export default System
