/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-11-13 12:26:17
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

/** 全局 WEB 类型声明 (仅为防止 RN 编译报错) */
declare const document: {
  documentElement: {
    clientWidth: number
    clientHeight: number
  }
  querySelector: (selector: string) => {
    offsetTop?: number
  } | null
}

/** 全局 window 类型声明 (仅为防止 RN 编译报错) */
declare const window: {
  self: any
  top: any
}
