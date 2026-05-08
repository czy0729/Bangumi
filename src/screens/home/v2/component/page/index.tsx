/*
 * @Author: czy0729
 * @Date: 2025-04-18 13:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-08 23:30:49
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Page as PageComp } from '@components'
import { _, systemStore, useStore } from '@stores'
import { IOS, MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { COMPONENT } from './ds'

import type { PropsWithChildren } from 'react'
import type { ViewStyle } from '@types'
import type { Ctx } from '../../types'

function Page({ children }: PropsWithChildren) {
  const { $ } = useStore<Ctx>(COMPONENT)

  let style: ViewStyle
  if (IOS && systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')) {
    style = _.container.bg
  }

  return (
    <PageComp style={style} loaded={$.state._loaded}>
      {children}
    </PageComp>
  )
}

export default observer(Page)
