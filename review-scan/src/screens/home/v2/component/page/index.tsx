/*
 * @Author: czy0729
 * @Date: 2025-04-18 13:03:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-18 13:08:32
 */
import React from 'react'
import { Page as PageComp } from '@components'
import { _, systemStore, useStore } from '@stores'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { IOS, MODEL_SETTING_HOME_LAYOUT } from '@constants'
import { ViewStyle } from '@types'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'

function Page({ children }) {
  r(COMPONENT)

  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    let style: ViewStyle
    if (IOS && systemStore.setting.homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')) {
      style = _.container.bg
    } else {
      style = _.container.plain
    }

    return (
      <PageComp style={style} loaded={$.state._loaded}>
        {children}
      </PageComp>
    )
  })
}

export default Page
