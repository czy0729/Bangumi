/*
 * @Author: czy0729
 * @Date: 2019-08-14 10:15:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-21 05:30:26
 */
import React from 'react'
import { View, ViewProps } from 'react-native'
import { useObserver } from 'mobx-react'
import { stl } from '@utils'
import { ReactNode } from '@types'
import { Divider } from '../../divider'
import { memoStyles } from './styles'

type Props = ViewProps & {
  className?: string
  children?: ReactNode
}

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
