/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-09 23:51:10
 */
import React, { useCallback, useMemo } from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { useObserver } from '@utils/hooks'
import IconFavor from '../component/favor'
import HeaderTitle from '../component/header-title'
import Menu from '../component/menu'
import MesumeChat from '../component/mesume-chat'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header({ fixed }) {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeaderTitle = useMemo(() => <HeaderTitle />, [])

  const handleHeaderRight = useCallback(
    () => (
      <Flex style={styles.headerRight}>
        <MesumeChat />
        <IconFavor />
        <Menu />
      </Flex>
    ),
    []
  )

  return useObserver(() => (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title={$.title}
      alias='日志'
      hm={$.hm}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  ))
}

export default Header
