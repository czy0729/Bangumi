/*
 * @Author: czy0729
 * @Date: 2022-03-15 21:20:52
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-06 21:35:33
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2 } from '@components'
import { useStore } from '@stores'
import IconFavor from '../component/favor'
import HeaderTitle from '../component/header-title'
import Menu from '../component/menu'
import MesumeChat from '../component/mesume-chat'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
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

  return (
    <HeaderV2
      mode='transition'
      statusBarEventsType='Topic'
      fixed={$.state.fixed}
      title={$.title}
      alias='日志'
      hm={$.hm}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
