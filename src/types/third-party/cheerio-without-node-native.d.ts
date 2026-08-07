/*
 * @Author: czy0729
 * @Date: 2026-07-26 16:51:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 17:03:27
 */
declare module 'cheerio-without-node-native' {
  export interface CheerioElement {
    /** 节点类型（3 为文本节点） */
    nodeType: number

    /** 节点名称 */
    nodeName: string
  }

  export interface Cheerio {
    /** 选择子元素 */
    (selector: string): Cheerio

    /** 获取 HTML 内容 */
    html(): string

    /** 获取文本内容 */
    text(): string

    /** 替换匹配元素 */
    replaceWith(fn: (this: CheerioElement, index: number, element: CheerioElement) => string): Cheerio

    /** 获取属性值 */
    attr(name: string): string | undefined

    /** 转换为字符串 */
    toString(): string

    /** 查找子元素 */
    find(selector: string): Cheerio

    /** 遍历元素 */
    each(fn: (this: CheerioElement, index: number, element: CheerioElement) => void): Cheerio

    /** 过滤元素 */
    filter(fn: (this: CheerioElement, index: number, element: CheerioElement) => boolean): Cheerio

    /** 获取指定索引的元素 */
    eq(index: number): Cheerio

    /** 获取最后一个元素 */
    last(): Cheerio

    /** 遍历映射元素，.get() 返回映射后的数组 */
    map<T>(fn: (this: CheerioElement, index: number, element: CheerioElement) => T): CheerioMap<T>

    /** 截取元素子集 */
    slice(start: number, end?: number): Cheerio

    /** 获取子元素 */
    children(): Cheerio

    /** 获取子元素（含文本节点） */
    contents(): Cheerio

    /** 获取父元素 */
    parent(): Cheerio

    /** 获取下一个兄弟元素 */
    next(selector?: string): Cheerio

    /** 获取上一个兄弟元素 */
    prev(selector?: string): Cheerio

    /** 获取表单元素的值 */
    val(): string

    /** 获取自定义 data 属性值 */
    data(name: string): string | undefined

    /** 匹配元素个数 */
    length: number

    /** 是否包含指定类名 */
    hasClass(className: string): boolean
  }

  /** cheerio.map 的结果，.get() 返回映射后的数组 */
  export interface CheerioMap<T> {
    /** 转换为映射后的数组 */
    get(): T[]
  }

  export interface CheerioStatic {
    /** 加载 HTML */
    load(html: string, options?: Record<string, unknown>): Cheerio

    /** 解析 HTML 或包装 DOM 元素 */
    (input: unknown): Cheerio
  }

  const cheerio: CheerioStatic
  export default cheerio
}
