/*
 * @Author: czy0729
 * @Date: 2022-05-25 17:33:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-30 06:47:48
 */

/** 以下类型仅按需补充以规避类型错误，非完整类型声明 (仅为防止 RN 编译报错) */
declare global {
  /** 最小 DOM 元素类型 (仅 web 平台) */
  interface DOMElement {
    src: string
    style: Record<string, string>
    onload: (() => void) | null
    onerror: (() => void) | null
  }

  interface Global {
    __DEV__: boolean
  }

  interface GlobalThis {
    __DEV__: boolean
  }

  /** 是否开发模式 */
  var __DEV__: boolean

  /** [DEV] 全局覆写 log, 能打印循环引用 */
  function log(value: unknown, space?: unknown): void

  /** [DEV] 全局覆写 warn */
  function warn(key: string, method?: string): void

  /** [DEV] 调试查看组件 re-render 次数 */
  function rerender(key: string, ...other: unknown[]): void

  /** 生产环境不需要, 强制设为空值 */
  namespace console {
    function warn(...args: unknown[]): void
    function error(...args: unknown[]): void
    function info(...args: unknown[]): void
    function log(...args: unknown[]): void
    function debug(...args: unknown[]): void
    function assert(...args: unknown[]): void
  }

  /** 全局 window 类型声明 */
  var window: {
    CONFIG_TYPE?: 'DEVELOPMENT'

    /** window 自身 */
    self: unknown

    /** 顶层 window */
    top: unknown

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
      querySelector: (selectors: string) => unknown

      /** 添加事件监听 */
      addEventListener: (
        type: string,
        listener: (event: unknown) => void,
        options?: unknown
      ) => void

      /** 移除事件监听 */
      removeEventListener: (
        type: string,
        listener: (event: unknown) => void,
        options?: unknown
      ) => void
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
      replaceState(data: unknown, title: string, url?: string | null): void

      /** 推送历史记录 */
      pushState(data: unknown, title: string, url?: string | null): void

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
    dispatchEvent: (event: unknown) => boolean

    /** 弹窗 */
    alert: (message?: unknown) => void

    /** 确认弹窗 */
    confirm: (message?: unknown) => boolean

    /** 调度器 */
    scheduler: {
      postTask: (
        callback: () => void,
        options?: {
          delay?: number
          priority?: 'user-blocking' | 'user-visible' | 'background'
          signal?: AbortSignal
        }
      ) => Promise<unknown>
    }

    /** 打开新页面 */
    open: (url: string) => void

    /** Base64 编码 */
    btoa: (data: string) => string

    /** 交叉观察器 */
    IntersectionObserver: new (
      callback: (entries: Array<{ isIntersecting: boolean; target: object }>) => void,
      options?: { threshold?: number | number[] }
    ) => {
      observe(target: object): void
      unobserve(target: object): void
      disconnect(): void
    }

    /** Umami 统计 */
    umami: {
      track: (callback: (props: Record<string, unknown>) => Record<string, unknown>) => void
    }

    /** 图片构造器 */
    Image: new (width?: number, height?: number) => DOMElement

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
        state?: unknown
        bubbles?: boolean
        cancelable?: boolean
        composed?: boolean
      }
    ) => {
      type: string
      state: unknown
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
  log(value: unknown, space?: unknown): void

  /** [DEV] 全局覆写 warn */
  warn(key: string, method?: string): void

  /** [DEV] 调试查看组件 re-render 次数 */
  rerender(key: string, ...other: unknown[]): void
}

export {}
