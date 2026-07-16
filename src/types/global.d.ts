/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 06:43:47
 */

/** 以下类型仅按需补充以规避类型错误，非完整类型声明 (仅为防止 RN 编译报错) */
declare global {
  interface Global {
    __DEV__: boolean
  }

  interface GlobalThis {
    __DEV__: boolean
  }

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
    function warn(...args: any[]): void
    function error(...args: any[]): void
    function info(...args: any[]): void
    function log(...args: any[]): void
    function debug(...args: any[]): void
    function assert(...args: any[]): void
  }

  /** 全局 window 类型声明 */
  var window: {
    CONFIG_TYPE?: 'DEVELOPMENT'

    /** window 自身 */
    self: any

    /** 顶层 window */
    top: any

    /** 文档 */
    document: {
      /** 页面标题 */
      title: string

      /** 根元素 */
      documentElement: {
        /** 视口宽度 */
        clientWidth: number

        /** 视口高度 */
        clientHeight: number
      }

      /** 选择元素 */
      querySelector: (selectors: string) => any

      /** 添加事件监听 */
      addEventListener: (type: string, listener: (event: any) => void, options?: any) => void

      /** 移除事件监听 */
      removeEventListener: (type: string, listener: (event: any) => void, options?: any) => void
    }

    /** 文档当前位置 */
    location: {
      /** 查询字符串 */
      search: string

      /** 完整 URL */
      href: string

      /** 路径部分 */
      pathname: string
    }

    /** history 对象 */
    history: {
      /** 替换历史记录 */
      replaceState(data: any, title: string, url?: string | null): void

      /** 返回上一页 */
      back(): void
    }

    /** 浏览器/WebView 信息 */
    navigator: {
      /** 用户代理字符串 */
      userAgent: string

      /** 平台标识 */
      platform: string
    }

    /** 派发事件 */
    dispatchEvent: (event: any) => boolean

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

    /** Base64 编码 */
    btoa: (data: string) => string

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
    URLSearchParams: new (
      init?: string | string[][] | Record<string, string> | URLSearchParams
    ) => {
      append(key: string, value: string): void
      get(key: string): string
      toString(): string
      [Symbol.iterator](): IterableIterator<[string, string]>
    }

    /** PopStateEvent 构造函数 */
    PopStateEvent: new (
      type: string,
      eventInitDict?: {
        state?: any
        bubbles?: boolean
        cancelable?: boolean
        composed?: boolean
      }
    ) => {
      type: string
      state: any
      bubbles: boolean
      cancelable: boolean
      composed: boolean
    }
  }
}

/** global */
declare var global: typeof globalThis & {
  /** 是否开发模式 */
  __DEV__: boolean

  /** [DEV] 全局覆写 log, 能打印循环引用 */
  log(value: any, space?: any): void

  /** [DEV] 全局覆写 warn */
  warn(key: string, method?: string): void

  /** [DEV] 调试查看组件 re-render 次数 */
  rerender(key: string, ...other: any[]): void
}

export {}
