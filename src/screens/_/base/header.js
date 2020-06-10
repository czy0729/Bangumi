/*
 * @Author: czy0729
 * @Date: 2020-06-10 11:07:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-10 11:10:00
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Flex } from '@components'
import { _ } from '@stores'
import { IOS } from '@constants'
import Logo from './logo'

function Header({ renderLeft, renderRight }) {
  return (
    <Flex style={styles.header}>
      <Flex style={styles.side}>{renderLeft}</Flex>
      <Flex.Item>
        <Flex style={styles.logo} justify='center'>
          <Logo />
        </Flex>
      </Flex.Item>
      <Flex style={styles.side} justify='end'>
        {renderRight}
      </Flex>
    </Flex>
  )
}

export default Header

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    zIndex: 3,
    top: _.statusBarHeight - (IOS ? 6 : -2),
    right: 0,
    left: 0,
    paddingHorizontal: _.sm
  },
  logo: {
    width: '100%'
  },
  side: {
    width: 80
  }
})
