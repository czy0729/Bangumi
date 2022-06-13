/*
 * 带 Logo 的头部
 *
 * @Author: czy0729
 * @Date: 2022-03-15 19:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 18:03:35
 */
import React from 'react'
import { HeaderPlaceholder, Flex } from '@components'
import { ob } from '@utils/decorators'
import { Logo } from '../logo'
import { styles } from './styles'
import { Props as LogoHeaderProps } from './types'

export { LogoHeaderProps }

export const LogoHeader = ob(({ left, right }: LogoHeaderProps) => {
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
