/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-09 08:37:49
 */
import React from 'react'
import { Text } from 'react-native'
import { observer } from 'mobx-react'
import { syncThemeStore } from '@utils/async'
import { Props } from './types'

export default observer(({ style, showClose, children }: Props) => {
  const _ = syncThemeStore()
  return (
    <>
      <Text
        style={[
          _.fontStyle,
          style,
          {
            color: _.colorDesc
          }
        ]}
        textBreakStrategy='simple'
        numberOfLines={0}
      >
        {children}
      </Text>
      {showClose && (
        <Text
          style={[
            _.fontStyle,
            {
              fontSize: 18,
              color: _.colorIcon
            }
          ]}
          textBreakStrategy='simple'
          numberOfLines={0}
        >
          {'  '}×
        </Text>
      )}
    </>
  )
})
