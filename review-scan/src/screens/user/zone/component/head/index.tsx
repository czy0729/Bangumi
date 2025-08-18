/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-03-06 19:23:14
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { ViewStyle } from '@types'
import Avatar from './avatar'
import Blogs from './blogs'
import Catalogs from './catalogs'
import Join from './join'
import Name from './name'
import Recent from './recent'
import Remark from './remark'
import Sync from './sync'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Head({ style }: { style?: ViewStyle }) {
  const styles = memoStyles()
  return (
    <Flex style={stl(styles.head, style)} direction='column'>
      <View>
        <Avatar />
        <Join style={styles.l1} />
        <Sync style={styles.l2} />
        <Recent style={styles.l3} />
        <Blogs style={styles.r1} />
        <Catalogs style={styles.r2} />
        <Remark style={styles.r3} />
      </View>
      <Name />
    </Flex>
  )
}

export default ob(Head, COMPONENT)
