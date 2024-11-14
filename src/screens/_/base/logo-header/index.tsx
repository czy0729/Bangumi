/*
 *
 * @Author: czy0729
 * @Date: 2022-03-15 19:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-14 06:24:28
 */
import React from 'react'
import { Component, Flex } from '@components'
import { ob } from '@utils/decorators'
import { Logo } from '../logo'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as LogoHeaderProps } from './types'

export { LogoHeaderProps }

/** 带 Logo 的头部 */
export const LogoHeader = ob(
  ({ navigation, left, right, path }: LogoHeaderProps) => (
    <Component id='base-logo-header'>
      <Flex style={styles.header} justify='center'>
        <Flex style={styles.side}>{left}</Flex>
        <Flex style={styles.logo} justify='center'>
          <Logo navigation={navigation} path={path} />
        </Flex>
        <Flex style={styles.side} justify='end'>
          {right}
        </Flex>
      </Flex>
    </Component>
  ),
  COMPONENT
)

export default LogoHeader
