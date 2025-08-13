/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-13 17:56:02
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { Divider } from '../../divider'
import { memoStyles } from './styles'
import { Props } from './types'

function Li({ style, className, children, ...other }: Props) {
  return useObserver(() => {
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
  })
}

export default Li
