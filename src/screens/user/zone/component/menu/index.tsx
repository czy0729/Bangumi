/*
 * @Author: czy0729
 * @Date: 2024-01-07 20:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-04 18:44:02
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Back from './back'
import Friend from './friend'
// import Member from './member'
import MenuComp from './menu'
import Milestone from './milestone'
import WordCloud from './word-cloud'
import { styles } from './styles'

function Menu() {
  return (
    <>
      <Back />
      <Flex style={[_.header.right, styles.right]}>
        <WordCloud />
        <Milestone />
        <Friend />
        {/* <Member /> */}
        <MenuComp />
      </Flex>
    </>
  )
}

export default ob(Menu)
