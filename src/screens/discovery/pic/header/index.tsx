/*
 * @Author: czy0729
 * @Date: 2023-05-24 11:13:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-04-05 23:37:57
 */
import React, { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2, Loading } from '@components'
import { useStore } from '@stores'
import Menu from '../component/menu'
import { COMPONENT, HM } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        {/* <IconTouchable
          style={_.mr.xs}
          name='md-star-outline'
          color={_.colorDesc}
          onPress={$.onToggleFavor}
        /> */}
        <Menu />
      </>
    ),
    []
  )

  const styles = memoStyles()

  return (
    <HeaderV2
      backgroundStyle={styles.background}
      title={$.keyword || '图集'}
      headerTitleAppend={
        !!$.list.length && $.state.fetching && <Loading.Medium style={styles.loading} />
      }
      headerRight={handleHeaderRight}
      hm={HM}
    />
  )
}

export default observer(Header)
