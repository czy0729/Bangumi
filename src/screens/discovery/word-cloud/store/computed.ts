/*
 * @Author: czy0729
 * @Date: 2024-08-07 22:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:34:34
 */
import Collection from './computed/collection'

/**
 * 派生数据聚合入口
 *
 * - base.ts       页面参数 / ID / 命名空间 (extends State)
 * - meta.ts       domain store 代理与文本预处理 (extends base)
 * - comment.ts    选中吐槽与分词数据 (extends meta)
 * - collection.ts 用户收藏与条目快照 (extends meta)
 */
export default class Computed extends Collection {}
