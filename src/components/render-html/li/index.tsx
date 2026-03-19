/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 03:03:06
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Divider } from '../../divider'
import { memoStyles } from './styles'

import type { Props } from './types'

function Li({ style, className, children, ...other }: Props) {
  const styles = memoStyles()

  const el = (
    <View
      style={stl(style, styles.li, className?.includes('group_section') && styles.groupSection)}
      {...other}
    >
      {children}
    </View>
  )

  if (className?.includes('sub_group')) {
    return (
      <>
        <Divider />
        {el}
      </>
    )
  }

  return el
}

export default observer(Li)
