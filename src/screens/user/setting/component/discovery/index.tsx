/*
 * @Author: czy0729
 * @Date: 2023-02-13 04:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-23 22:57:23
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import DiscoveryMenuNum from './discovery-menu-num'
import DiscoveryTodayOnair from './discovery-today-onair'
import Live2D from './live-2d'
import Live2DVoice from './live-2d-voice'
import { COMPONENT, TEXTS } from './ds'

/** 发现 */
function Discovery({ filter, open = false }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='发现' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='发现' onClose={setFalse}>
          {shows.discoveryMenuNum && <DiscoveryMenuNum filter={filter} />}
          {!WEB && shows.live2D && <Live2D filter={filter} />}
          {!WEB && shows.live2DVoice && systemStore.setting.live2D && (
            <Live2DVoice filter={filter} />
          )}
          {shows.discoveryTodayOnair && <DiscoveryTodayOnair filter={filter} />}
        </ActionSheet>
      </>
    )
  })
}

export default Discovery
