/*
 * @Author: czy0729
 * @Date: 2022-03-01 11:35:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-09 19:10:40
 */
import React from 'react'
import * as orientation from 'expo-screen-orientation'
import { Text, Touchable } from '@components'
import { ItemSetting } from '@_'
import { useObserver } from '@utils/hooks'

function ScreenOrientation() {
  return useObserver(() => {
    return (
      <ItemSetting
        hd='Screen Orientation Lock'
        ft={
          <Touchable
            onPress={() => {
              orientation.unlockAsync()
            }}
          >
            <Text>解锁旋转</Text>
          </Touchable>
        }
        withoutFeedback
      />
    )
  })
}

export default ScreenOrientation
