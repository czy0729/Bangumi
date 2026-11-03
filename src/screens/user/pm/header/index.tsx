/*
 * @Author: czy0729
 * @Date: 2022-08-19 11:16:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-03 06:39:21
 *
 * 顶栏: 标题与右侧操作
 */
import { useCallback } from 'react'
import { observer } from 'mobx-react'
import { HeaderV2 } from '@components'
import { useStore } from '@stores'
import { getVisualLength } from '@utils'
import BackToAll from './back-to-all'
import RelatedPM from './related-pm'
import ScrollNavButtons from './scroll-nav-buttons'
import { COMPONENT, HM } from './ds'
import { styles } from './styles'

import type { Ctx } from '../types'

function Header() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const handleHeaderRight = useCallback(
    () => (
      <>
        <BackToAll />
        <ScrollNavButtons />
        <RelatedPM />
      </>
    ),
    []
  )

  return (
    <HeaderV2
      title={$.headerTitle}
      headerTitleStyle={styles.headerTitle}
      headerTitleTextStyle={
        getVisualLength($.headerTitle) >= 10 ? styles.headerTitleText : undefined
      }
      hm={HM}
      headerTitleAlign='left'
      headerRight={handleHeaderRight}
    />
  )
}

export default observer(Header)
