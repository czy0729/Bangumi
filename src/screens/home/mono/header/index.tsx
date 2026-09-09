/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-09-16 16:37:44
 */
import { useCallback, useMemo } from 'react'
import { observer } from 'mobx-react'
import { Flex, HeaderV2 as HeaderComp } from '@components'
import { useStore } from '@stores'
import Extra from '../component/extra'
import HeaderTitle from '../component/header-title'
import Menu from './menu'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const elHeaderTitle = useMemo(() => <HeaderTitle />, [])

  const handleHeaderRight = useCallback(
    () => (
      <Flex style={styles.headerRight}>
        <Extra />
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
      title='人物'
      domTitle={$.jp || $.cn}
      hm={$.hm}
      headerTitle={elHeaderTitle}
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
