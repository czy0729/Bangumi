/*
 * @Author: czy0729
 * @Date: 2022-06-25 17:18:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-02-10 07:10:16
 */
import RNCollapsible from './collapsible'
import { CollapsibleBase } from './collapsible-base'

import type { Props as CollapsibleProps } from './types'

export type { CollapsibleProps }

/**
 * 自动判断高度的折叠组件，可替代手风琴
 * @doc https://github.com/oblador/react-native-collapsible
 */
export function Collapsible(props: CollapsibleProps) {
  return <CollapsibleBase {...props} CollapsibleImpl={RNCollapsible} />
}

export default Collapsible
