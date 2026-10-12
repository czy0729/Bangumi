/*
 * @Author: czy0729
 * @Date: 2025-01-08 05:57:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-11 12:00:00
 *
 * 日志项组件标识
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'Blog')

/** 单行条目估算高度 (封面 40 + 上下 padding) */
export const CATALOG_BLOG_HEIGHT = 56
