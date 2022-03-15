/*
 * @Author: czy0729
 * @Date: 2022-03-15 19:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-03-15 20:39:51
 */
import React from 'react'
import { HeaderPlaceholder, Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { Logo } from './logo'

export const LogoHeader = ob(({ left, right }) => {
  return (
    <>
      <HeaderPlaceholder />
      <Flex style={styles.header} justify='center'>
        <Flex style={styles.side}>{left}</Flex>
        <Flex style={styles.logo} justify='center'>
          <Logo />
        </Flex>
        <Flex style={styles.side} justify='end'>
          {right}
        </Flex>
      </Flex>
    </>
  )
})

const styles = _.create({
  header: {
    position: 'absolute',
    zIndex: 3,
    top: 0,
    right: 0,
    left: 0,
    height: _.headerHeight,
    paddingTop: _.statusBarHeight
  },
  side: {
    width: 80
  },
  logo: {
    flex: 1
  }
})
