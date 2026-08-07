/*
 * @Author: czy0729
 * @Date: 2022-06-15 10:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-20 05:46:57
 */
import type { EventType, Id, SubjectTypeCn, WithNavigation, WithViewStyles } from '@types'

export type Props = WithNavigation<
  WithViewStyles<{
    /** 列表序号 */
    index?: number

    /** 条目 ID (含前缀, 如 '/subject/123') */
    id?: Id

    /** 日文名 */
    name?: string

    /** 中文名 */
    nameCn?: string

    /** 封面图地址 */
    cover?: string

    /** 条目类型中文名 */
    typeCn?: SubjectTypeCn | ''

    /** 简介 */
    tip?: string

    /** 排名 */
    rank?: number | string

    /** 评分 */
    score?: number | string

    /** 评分人数文案 */
    total?: number | string

    /** 吐槽数 */
    comments?: string

    /** 收藏状态 */
    collection?: string

    /** 是否展示收藏管理按钮 */
    showManage?: boolean

    /** 圈列标签 */
    position?: readonly string[]

    /** 来源页面标识 */
    screen?: string

    /** 高亮关键词 */
    highlight?: string

    /** 埋点事件 */
    event?: EventType
  }>
>
