/*
 * @Author: czy0729
 * @Date: 2022-03-10 17:42:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 14:18:29
 */
import inject from './inject'

/** @deprecated inject with context types */
export default function ic(Store, Component, config?) {
  return inject(Store, config)(Component)
}
