/*
 * @Author: czy0729
 * @Date: 2021-12-25 05:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-06 00:23:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean } from '@utils/hooks'
import { IOS, IS_BEFORE_ANDROID_10, WEB } from '@constants'
import { IconPalette } from '../icons'
import { getShows } from '../../utils'
import AndroidBlur from './android-blur'
import AndroidBlurLayout from './android-blur-layout'
import AppTheme from './app-theme'
import AutoColorScheme from './auto-color-scheme'
import LogoToggleTheme from './logo-toggle-theme'
import { COMPONENT, TEXTS } from './ds'

import type { WithFilterProps } from '../../types'

/** 主题 */
function Theme({ filter }: WithFilterProps) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  if (!shows) return null

  return (
    <>
      <ItemSetting
        icon={<IconPalette />}
        arrow
        highlight
        filter={filter}
        onPress={setTrue}
        {...TEXTS.theme}
      />
      <ActionSheet
        show={state}
        title={TEXTS.theme.hd}
        height={filter || IOS ? 560 : 760}
        onClose={setFalse}
      >
        {shows.theme && <AppTheme filter={filter} />}
        {!WEB && shows.logoToggleTheme && <LogoToggleTheme filter={filter} />}
        {!WEB && !IS_BEFORE_ANDROID_10 && shows.autoColorScheme && (
          <AutoColorScheme filter={filter} />
        )}
        {!IOS && !IS_BEFORE_ANDROID_10 && (
          <>
            {shows.androidBlur && <AndroidBlur filter={filter} />}
            {systemStore.setting.androidBlur && <AndroidBlurLayout shows={shows} filter={filter} />}
          </>
        )}
      </ActionSheet>
    </>
  )
}

export default observer(Theme)
