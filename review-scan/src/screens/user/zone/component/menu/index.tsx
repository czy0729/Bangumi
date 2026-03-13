/*
 * @Author: czy0729
 * @Date: 2024-01-07 20:40:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 03:20:49
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import Back from './back'
import MenuComp from './menu'
import MesumeChat from './mesume-chat'
import Milestone from './milestone'
import WordCloud from './word-cloud'
import { styles } from './styles'

function Menu() {
  return (
    <>
      <Back />
      <Flex style={[_.header.right, styles.right]}>
        <MesumeChat />
        <WordCloud />
        <Milestone />
        <MenuComp />
      </Flex>
    </>
  )
}

export default ob(Menu)
