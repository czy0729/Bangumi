/*
 * @Author: czy0729
 * @Date: 2022-11-13 05:13:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-09 08:37:49
 */
import React from 'react'
import { Text } from 'react-native'
import { useObserver } from 'mobx-react'
import { syncThemeStore } from '@utils/async'

import type { Props } from './types'

function Desc({ style, showClose, children }: Props) {
  return useObserver(() => {
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
}

export default Desc
