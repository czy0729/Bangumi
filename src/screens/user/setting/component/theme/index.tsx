/*
 * @Author: czy0729
 * @Date: 2021-12-25 05:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 20:36:48
 */
import React from 'react'
import { ActionSheet } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { r } from '@utils/dev'
import { useBoolean, useObserver } from '@utils/hooks'
import { IOS, IS_BEFORE_ANDROID_10, STORYBOOK } from '@constants'
import { getShows } from '../../utils'
import AndroidBlur from './android-blur'
import AndroidBlurLayout from './android-blur-layout'
import AppTheme from './app-theme'
import AutoColorScheme from './auto-color-scheme'
import { COMPONENT, TEXTS } from './ds'

function Theme({ navigation, filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    return (
      <>
        <ItemSetting hd='主题' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet
          show={state}
          title='主题'
          height={STORYBOOK || filter || IOS ? 440 : 760}
          onClose={setFalse}
        >
          {shows.theme && <AppTheme navigation={navigation} filter={filter} />}
          {!STORYBOOK && !IS_BEFORE_ANDROID_10 && shows.autoColorScheme && (
            <AutoColorScheme filter={filter} />
          )}
          {!IOS && !IS_BEFORE_ANDROID_10 && (
            <>
              {shows.androidBlur && <AndroidBlur filter={filter} />}
              {systemStore.setting.androidBlur && (
                <AndroidBlurLayout shows={shows} filter={filter} />
              )}
            </>
          )}
        </ActionSheet>
      </>
    )
  })
}

export default Theme
