/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:19:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-13 12:00:00
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Component } from '@components'
import { r } from '@utils/dev'
import { EVENT } from '@constants'
import { IconTabsHeader } from '../tabs-header'
import { useIconNotify } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as IconNotifyProps } from './types'
export type { IconNotifyProps }

export const IconNotify = observer(
  ({ style, navigation, event = EVENT, children }: IconNotifyProps) => {
    r(COMPONENT)

    const { hasNewNotify, hasNewPM, handlePress } = useIconNotify({ navigation, event })

    const styles = memoStyles()

    return (
      <Component id='item-notify'>
        {(hasNewNotify || hasNewPM) && <View style={styles.dot} pointerEvents='none' />}
        <IconTabsHeader style={style} name='md-mail-outline' onPress={handlePress}>
          {children}
        </IconTabsHeader>
      </Component>
    )
  }
)

export default IconNotify
