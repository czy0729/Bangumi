/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-11-13 05:36:19
 */
import React from 'react'
import { Text } from 'react-native'
import { observer } from 'mobx-react-lite'
import { getThemeStoreAsync } from '@utils/async'
import { Props } from './types'

export const Desc = observer(({ style, children }: Props) => {
  const _ = getThemeStoreAsync()
  return (
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
  )
})
