/*
 * Tinygrail用，给用户头像包裹，显示用户最近的在线状态
 * @Author: czy0729
 * @Date: 2020-10-29 15:04:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-07 09:14:27
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { getTimestamp } from '@utils'
import { Flex } from '../flex'
import { memoStyles } from './styles'

const d1ts = 24 * 60 * 60
const d3ts = 3 * d1ts

export const UserStatus = observer(({ style, last, children }) => {
  if (!last) return children

  const ts = getTimestamp()
  const distance = ts - last
  if (distance > d3ts) return children

  const styles = memoStyles()
  return (
    <View>
      {children}
      <Flex
        style={[styles.wrap, style]}
        justify='center'
        // @ts-ignore
        pointerEvents='none'
      >
        <View style={[styles.badge, distance >= d1ts && styles.badgeWarning]} />
      </Flex>
    </View>
  )
})
