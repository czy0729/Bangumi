/*
 * @Author: czy0729
 * @Date: 2022-01-19 15:14:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:12:53
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet, Text } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { WEB } from '@constants'
import { getShows } from '../../utils'
import HomeCustom from '../home/home-custom'
import AppTinygrail from './app-tinygrail'
import AvatarAlertTinygrailAssets from './avatar-alert-tinygrail-assets'
import TinygrailMode from './tinygrail-mode'
import { COMPONENT, TEXTS } from './ds'

import type { Props } from './types'

/** 小圣杯 */
function Tinygrail({ filter, open = false }: Props) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)

  if (WEB || !shows) return null

  return (
    <>
      <ItemSetting
        hd='小圣杯'
        ft={
          systemStore.setting.tinygrail && (
            <Text type='sub' bold>
              已开启
            </Text>
          )
        }
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
      />
      <ActionSheet show={state} title='小圣杯' height={520} onClose={setFalse}>
        {shows.tinygrail && <AppTinygrail filter={filter} />}
        {shows.tinygrailMode && <TinygrailMode filter={filter} />}
        {shows.homeCustom && <HomeCustom filter={filter} />}
        {shows.avatarAlertTinygrailAssets && <AvatarAlertTinygrailAssets filter={filter} />}
      </ActionSheet>
    </>
  )
}

export default observer(Tinygrail)
