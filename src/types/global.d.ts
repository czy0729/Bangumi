/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:32:20
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
    addEventListener?: Fn
  } | null
  addEventListener?: Fn
  removeEventListener?: Fn
}

/** 全局 window 类型声明 (仅为防止 RN 编译报错) */
declare const window: {
  /** window 自身 */
  self: typeof window

  /** 顶层 window */
  top: typeof window

  /** 文档当前位置 */
  location: {
    search: string
    href: string
    pathname: string
  }

  /** history 对象 */
  history: {
    replaceState(data: any, title: string, url?: string | null): void
  }

  /** 弹窗 */
  alert: (message?: any) => void

  /** 确认弹窗 */
  confirm: (message?: any) => boolean

  /** 调度器 */
  scheduler: {
    postTask: (
      callback: () => void,
      options?: {
        delay?: number
        priority?: 'user-blocking' | 'user-visible' | 'background'
        signal?: AbortSignal
      }
    ) => Promise<any>
  }

  /** 打开新页面 */
  open: (url: string) => void

  /** 交叉观察器 */
  IntersectionObserver: new (callback: (...args: any[]) => void, options?: any) => any

  /** 图片构造器 */
  Image: new (...args: any[]) => any

  /** URL 构造函数 */
  URL: new (url: string, base?: string) => {
    href: string
    search: string
    toString(): string
  }

  /** URLSearchParams 构造函数 */
  URLSearchParams: new (init?: string | string[][] | Record<string, string> | URLSearchParams) => {
    append(key: string, value: string): void
    get(key: string): string
    toString(): string
    [Symbol.iterator](): IterableIterator<[string, string]>
  }
}
