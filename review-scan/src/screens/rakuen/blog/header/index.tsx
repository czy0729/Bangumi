/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-02-09 23:51:10
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import IconFavor from '../component/favor'
import HeaderTitle from '../component/header-title'
import Menu from '../component/menu'
import MesumeChat from '../component/mesume-chat'
import { Ctx } from '../types'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header({ fixed }) {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title={$.title}
      alias='日志'
      hm={$.hm}
      headerTitle={<HeaderTitle />}
      headerRight={() => (
        <Flex style={styles.headerRight}>
          <MesumeChat />
          <IconFavor />
          <Menu />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
