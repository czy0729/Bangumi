/*
 * @Author: czy0729
 * @Date: 2025-09-12 18:48:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-09 07:28:57
 */
import React from 'react'
import { observer } from 'mobx-react'
import { _ } from '@stores'
import HoldItem from './hold-item'
import Provider from './provider'

export { HoldItem }

export type { HoldItemProps, MenuItemProps } from './types'

function HoldMenuProviderComponent({ children }: React.PropsWithChildren<{}>) {
  return <Provider theme={_.select('light', 'dark')}>{children}</Provider>
}

export const HoldMenuProvider = observer(HoldMenuProviderComponent)

export default HoldMenuProvider
