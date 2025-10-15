/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-10-15 21:31:54
 */
import React from 'react'
import { useObserver } from 'mobx-react'
import { Flex, Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import HeaderTitle from '../component/header-title'
import IconFavor from '../component/icon/favor'
import Menu from '../component/menu'
import MesumeChat from '../component/mesume-chat'
import { COMPONENT } from './ds'

import type { Props } from './types'
import type { Ctx } from '../types'

function Header({ onScrollToTop }: Props) {
  const { $ } = useStore<Ctx>(COMPONENT)

  return useObserver(() => (
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
  ))
}

export default Header
