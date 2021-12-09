/*
 * @Author: czy0729
 * @Date: 2020-06-10 11:07:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-09 20:07:33
 */
import React from 'react'
import { Flex } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'
import { Logo } from './logo'

export const Header = ob(({ renderLeft, renderRight }) => (
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
))

const styles = _.create({
  header: {
    position: 'absolute',
    zIndex: 3,
    top: _.statusBarHeight - (IOS ? 6 : -2),
    right: 0,
    left: 0,
    height: _.ios('auto', 38),
    paddingHorizontal: _.sm
  },
  logo: {
    width: '100%'
  },
  side: {
    width: 80
  }
})
