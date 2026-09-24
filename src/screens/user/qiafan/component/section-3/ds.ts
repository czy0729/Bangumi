/*
 * @Author: czy0729
 * @Date: 2026-09-24 11:27:31
 * @Last Modified by:   czy0729
 * @Last Modified time: 2026-09-24 11:27:31
 */
import type { Item } from './types'

export const ITEMS: Item[] = [
  { label: '客户端', desc: '完整使用多达百个功能 / 页面' },
  { label: '条目封面', desc: '备用图片源（需支持过项目发展）' },
  { label: '需求反馈', desc: '优先跟进' },
  { label: '进度', desc: '支持最大显示 300 个在看条目' },
  { label: '条目', desc: '支持追踪多个用户吐槽点评、收看进度' },
  { label: '时光机', desc: '条目吐槽能索引到更早的贴贴内容' },
  { label: '用户空间', desc: '支持浏览用户历史帖子' },
  { label: '关联系列', desc: '支持更多相关搜索' },
  { label: '找条目', desc: '支持更多数据' },
  { label: '哔哩同步', desc: '完整同步功能' },
  { label: '豆瓣同步', desc: '完整同步功能' },
  { label: '翻译功能', desc: '支持多个翻译源' },
  { label: '小圣杯', desc: '通用玩法功能' }
] as const
