/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-07 20:20:46
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import { ViewStyle } from '@types'
import Avatar from './avatar'
import Blogs from './blogs'
import Catalogs from './catalogs'
import Character from './character'
import Join from './join'
import Name from './name'
import Recent from './recent'
import Sync from './sync'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Head({ style }: { style?: ViewStyle }) {
  const styles = memoStyles()
  return (
    <Flex style={style} direction='column'>
      <View>
        <Avatar />
        <Join style={styles.l1} />
        <Sync style={styles.l2} />
        <Recent style={styles.l3} />
        <Character style={styles.r1} />
        <Blogs style={styles.r2} />
        <Catalogs style={styles.r3} />
      </View>
      <Name />
    </Flex>
  )
}

export default ob(Head, COMPONENT)
