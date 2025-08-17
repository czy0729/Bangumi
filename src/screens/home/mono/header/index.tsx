/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:13:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-17 16:49:08
 */
import React from 'react'
import { Flex, Header as HeaderComp } from '@components'
import { useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import Extra from '../component/extra'
import HeaderTitle from '../component/header-title'
import { Ctx } from '../types'
import Menu from './menu'
import { COMPONENT } from './ds'
import { styles } from './styles'

function Header({ fixed }) {
  r(COMPONENT)

  const { $, navigation } = useStore<Ctx>()

  return useObserver(() => (
    <HeaderComp
      mode='transition'
      statusBarEventsType='Topic'
      fixed={fixed}
      title='人物'
      domTitle={$.jp || $.cn}
      hm={[$.url, 'Mono']}
      headerTitle={<HeaderTitle $={$} navigation={navigation} />}
      headerRight={() => (
        <Flex style={styles.headerRight}>
          <Extra />
          <Menu />
        </Flex>
      )}
    />
  ))
}

export default Header
