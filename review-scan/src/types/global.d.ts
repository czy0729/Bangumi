/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-05 23:52:20
 */
declare namespace global {
  /** 是否开发模式 */
  var __DEV__: boolean

  /** [DEV] 全局覆写 log, 能打印循环引用 */
  function log(value: any, space?: any): void

  /** [DEV] 全局覆写 warn */
  function warn(key: string, method?: string): void

  /** [DEV] 调试查看组件 re-render 次数 */
  function rerender(key: string, ...other: any[]): void

  /** 生产环境不需要, 强制设为空值 */
  namespace console {
    function warn()
    function error()
    function info()
    function log()
    function debug()
    function assert()
  }
}
