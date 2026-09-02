/*
 * @Author: czy0729
 * @Date: 2021-08-08 02:05:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 14:18:21
 */
import type { IReactComponent } from '@types'

/** @deprecated */
export default function context<T extends IReactComponent>(Component: T, defaultProps?: object): T {
  if (defaultProps) Component.defaultProps = defaultProps
  return Component
}
