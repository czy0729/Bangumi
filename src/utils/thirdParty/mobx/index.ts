/*
 * @Author: czy0729
 * @Date: 2026-11-18 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * mobx facade, 由 metro.config.js / jest.config.js 把 'mobx' 映射到此处
 *  - 运行时符号全部为自研实现, 类型仍走官方 mobx.d.ts (tsconfig 未映射)
 *  - 官方 mobx 降级 devDependencies, 仅作对拍测试基准
 */
export {
  observable,
  extendObservable,
  isObservable,
  isObservableArray,
  isObservableObject,
  remove
} from './observable'
export { computed } from './computed'
export type { IComputed } from './computed'
export { action, runInAction } from './action'
export { autorun } from './reaction'
export { Reaction } from './engine'
export { toJS } from './to-js'
