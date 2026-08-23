/*
 * lodash.isequal 类型声明
 * @Author: czy0729
 * @Date: 2026-08-23 15:30:00
 */
declare module 'lodash.isequal' {
  /**
   * 深比较两个值是否相等
   * @param a 比较值
   * @param b 比较值
   */
  function isEqual(a: unknown, b: unknown): boolean

  export default isEqual
}
