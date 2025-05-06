/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-06 21:35:30
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { ob } from '@utils/decorators'
import HeaderTitle from '../component/header-title'
import IconFavor from '../component/icon/favor'
import Menu from '../component/menu'
import MesumeChat from '../component/mesume-chat'
import { Ctx } from '../types'
import { COMPONENT } from './ds'

function Header({ onScrollToTop }) {
  const { $ } = useStore<Ctx>()
  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={$.state.fixed}
      title={$.topic.title}
      alias='帖子'
      hm={$.hm}
      headerTitle={<HeaderTitle onScrollToTop={onScrollToTop} />}
      headerRight={() => (
        <Flex>
          <MesumeChat />
          <IconFavor />
          <Menu />
        </Flex>
      )}
    />
  )
}

export default ob(Header, COMPONENT)
