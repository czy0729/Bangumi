/*
 * @Author: czy0729
 * @Date: 2026-09-05 05:55:00
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-05 05:55:00
 */
import type { Cheerio, CheerioAPI } from 'cheerio'
import type { AnyNode } from 'domhandler'

/**
 * HTML 解析引擎的公共类型词汇表 (基于 cheerio 1.x 自带类型, 双引擎结构兼容)
 * - legacy (0.20) 与 slim (1.0) 的运行时对象在该边界内鸭子类型一致,
 *   各引擎在返回处显式收窄为以下类型
 * - 文档级与元素级严格区分: CheerioDoc 没有 .find 等实例方法
 *   (切勿 cFind($, ...), 只能 cFind($('ul'), ...))
 */

/** 文档级 $ (cheerio.load 的返回值: 可调用、有 .load, 无 .find/.text 等实例方法) */
export type CheerioDoc = CheerioAPI

/** 元素级集合 ($('sel') / .find() / .contents() 的返回值; 含文本节点故为 AnyNode) */
export type CheerioSelection = Cheerio<AnyNode>

/** DOM 节点 (domhandler AnyNode: Element / Document / 文本节点, 含 nodeType / nodeName) */
export type CheerioNode = AnyNode
