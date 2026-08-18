/*
 * @Author: czy0729
 * @Date: 2022-06-13 07:01:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-18 14:40:00
 */
import type { Override, SubjectTypeCn, ViewStyle } from '@types'
import type { ImageProps } from '../image'

/**
 * 封面组件属性
 *
 * 基于 ImageProps, 覆盖 style 为图片样式, 并扩展拟物封面与匹配 CDN 相关字段:
 */
export type Props = Override<
  ImageProps,
  {
    /** 图片样式 */
    style?: ImageProps['imageStyle']

    /** 容器样式, 仅拟物封面使用 */
    containerStyle?: ViewStyle

    /** 拟物容器头部样式 */
    bodyStyle?: ViewStyle

    /** 拟物容器箭头样式 */
    angleStyle?: ViewStyle

    /** 不需要错误占位图片 */
    noDefault?: boolean

    /** 条目类型, 决定使用哪种拟物封面 */
    type?: SubjectTypeCn | '目录' | '人物' | ''

    /** 强制使用拟物封面, 不随全局开关 */
    useType?: boolean

    /** 是否匹配 CDN 地址 */
    cdn?: boolean

    /** 是否 text-only 模式, 仅显示占位背景 */
    textOnly?: boolean

    /** 封面加载失败后是否回退到 bgm 原地址 */
    fallback?: boolean
  }
>

/** 封面缩略图尺寸 */
export type CoverSize = 100 | 200 | 400 | 600

/** 封面 CDN 匹配前缀 */
export type CoverPrefix = 'bgm_poster' | `bgm_poster_${100 | 200 | 400}`
