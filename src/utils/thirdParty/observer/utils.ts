/*
 * @Author: czy0729
 * @Date: 2026-11-17 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-19 15:20:00
 *
 * 组件形态判定, 只在 observer() 调用时执行一次, 不在渲染热路径上
 */
const FORWARD_REF_TYPE = Symbol.for('react.forward_ref')

/** forwardRef 组件判定 (React 18 / 19 的 $$typeof 取值相同) */
export function isForwardRefComponent(component: any) {
  return !!component && component.$$typeof === FORWARD_REF_TYPE
}

/** class 组件判定 (注意 extends React.Component 写法, 不能用简单的 extends Component 字符串匹配) */
export function isClassComponent(component: any) {
  return typeof component === 'function' && !!component.prototype?.isReactComponent
}

/** memo / lazy 等 $$typeof 非 forwardRef 的不可调用对象 */
export function isExoticComponent(component: any) {
  const type = component.$$typeof
  return !!type && type !== FORWARD_REF_TYPE
}
