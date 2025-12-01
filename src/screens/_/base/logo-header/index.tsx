/*
 *
 * @Author: czy0729
 * @Date: 2022-03-15 19:46:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-01 18:51:31
 */
import React from 'react'
import { Component, Flex } from '@components'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useInsets, useObserver } from '@utils/hooks'
import { Logo } from '../logo'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as LogoHeaderProps } from './types'

export { LogoHeaderProps }

/** 带 Logo 的头部 */
export const LogoHeader = ({ navigation, left, right, path }: LogoHeaderProps) => {
  r(COMPONENT)

  const { headerHeight, statusBarHeight } = useInsets()

  return useObserver(() => (
    <Component id='base-logo-header'>
      <Flex
        style={stl(styles.header, {
          height: headerHeight,
          paddingTop: statusBarHeight
        })}
        justify='center'
      >
        <Flex style={styles.side}>{left}</Flex>
        <Flex style={styles.logo} justify='center'>
          <Logo navigation={navigation} path={path} />
        </Flex>
        <Flex style={styles.side} justify='end'>
          {right}
        </Flex>
      </Flex>
    </Component>
  ))
}

export default LogoHeader
