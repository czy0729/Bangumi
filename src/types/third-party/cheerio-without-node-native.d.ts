/*
 * @Author: czy0729
 * @Date: 2026-07-26 16:51:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-26 17:03:27
 */
declare module 'cheerio-without-node-native' {
  interface Cheerio {
    /** 选择子元素 */
    (selector: string): Cheerio

    /** 获取 HTML 内容 */
    html(): string

    /** 获取文本内容 */
    text(): string

    /** 替换匹配元素 */
    replaceWith(fn: (this: unknown, index: number, element: unknown) => string): Cheerio

    /** 获取属性值 */
    attr(name: string): string | undefined

    /** 转换为字符串 */
    toString(): string

    /** 查找子元素 */
    find(selector: string): Cheerio

    /** 遍历元素 */
    each(fn: (this: unknown, index: number, element: unknown) => void): Cheerio

    /** 过滤元素 */
    filter(fn: (this: unknown, index: number, element: unknown) => boolean): Cheerio

    /** 获取指定索引的元素 */
    eq(index: number): Cheerio

    /** 匹配元素个数 */
    length: number

    /** 是否包含指定类名 */
    hasClass(className: string): boolean
  }

  interface CheerioStatic {
    /** 加载 HTML */
    load(html: string, options?: Record<string, unknown>): Cheerio

    /** 解析 HTML 或包装 DOM 元素 */
    (input: unknown): Cheerio
  }

  const cheerio: CheerioStatic
  export default cheerio
}
