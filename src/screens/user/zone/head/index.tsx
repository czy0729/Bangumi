/*
 * @Author: czy0729
 * @Date: 2019-05-06 01:35:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-08 12:12:51
 */
import React from 'react'
import { View } from 'react-native'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import Avatar from './avatar'
import Join from './join'
import Sync from './sync'
import Recent from './recent'
import Character from './character'
import Blogs from './blogs'
import Catalogs from './catalogs'
import Name from './name'
import { memoStyles } from './styles'

function Head({ style }) {
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

export default ob(Head)
