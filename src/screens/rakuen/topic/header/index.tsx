/*
 * @Author: czy0729
 * @Date: 2022-03-13 06:25:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-22 05:53:49
 */
import React, { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
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

  const elHeaderTitle = useMemo(
    () => <HeaderTitle onScrollToTop={onScrollToTop} />,
    [onScrollToTop]
  )

  const handleHeaderRight = useCallback(
    () => (
      <Flex>
        <MesumeChat />
        <IconFavor />
        <Menu />
      </Flex>
    ),
    []
  )

  return (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={$.state.fixed}
      title={$.topic.title}
      alias='帖子'
      hm={$.hm}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
