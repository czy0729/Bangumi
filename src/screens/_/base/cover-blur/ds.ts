/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 20:54:33
 */
import { getCoverSrc } from '@components/cover/utils'
import { rc } from '@utils/dev'
import { IOS, WEB } from '@constants'
import { COMPONENT as PARENT } from '../ds'

import type { CoverProps } from '@components'

export const COMPONENT = rc(PARENT, 'CoverBlur')

/**
 * 取封面缩略图的宽度档位
 *  - bgm 的缩略图只有 100 / 200 / 400 / 600 四档, 任一小于等于 67 的值都会命中最小的 100px 档,
 *    因此这里传 20 与传 40 实际请求的是同一张图; 保留小数值是为了表达"只取色块, 不要构图"的意图
 *  - 让底部真正变成"颜色场"的是下面的 BLUR_SCALE 与 BLUR_RADIUS
 * */
export const BLUR_WIDTH = 20

/**
 * 色场模糊半径 (需要微调时只改这里)
 *  - 各平台表现差异很大: 同样数值在两端糊的程度可以差几倍, 因此这里给得比较激进,
 *    目标是"看不出封面构图, 只看到颜色"
 *  - 两端源图都是 100px 缩略图, 半径是"源图像素级"的高斯半径, 所以取值不宜过大:
 *    半径越大单张图的计算量越大, 会直接影响色场出现速度
 *  - iOS 走 expo-image, 其内部会把半径再除以 2
 * */
export const BLUR_RADIUS = IOS ? 64 : WEB ? 48 : 24

/**
 * 色场放大比例
 *  - 作用有两个: 1) 让模糊后的边缘透明区落到可见区域之外; 2) 放大后更像"一团颜色", 不容易看出构图
 *  - 放大以图片中心为原点 (RN 0.72 没有 transformOrigin), 因此色场采样的是封面偏中段放大后的颜色,
 *    而不是与上层清晰封面逐点对齐的同一区域; 不要再叠加 translateY 去做对齐,
 *    RN 的 transform 数组里位移是按缩放后的坐标系计算的, 会整体位移过头导致底部露出清晰封面
 * */
export const BLUR_SCALE = 1.5

/**
 * 色场高度占卡片高度的比例
 *  - 这是"颜色往上扩散多远"的旋钮, 想盖得更多就加大, 想少吃原画就减小
 *  - 区域内顶部会非线性羽化消失, 不是整块区域都强模糊
 * */
export const BLUR_HEIGHT_RATIO = 0.56

/** 氛围层向上溢出的高度占卡片高度的比例 (盖到清晰封面区域内, 抹掉色场的起止线) */
export const AMBIENT_SPREAD_RATIO = 0.12

/**
 * 说明: 色值 / 位置数组统一写成"显式可变元组"而不是 as const
 *  - iOS 环境 expo-linear-gradient(57) 的 colors 要求 readonly 元组, 安卓环境(12.3) 要求可变 string[]
 *  - 可变元组两边都能满足; 用 as const 会在安卓环境报 "readonly ... cannot be assigned to string[]"
 * */
/**
 * 氛围层渐变
 *  - 项目无法从图片取色, 这里只能用主题中性色: 顶部透明, 约 55% 处到达峰值后维持,
 *    把色场顶部的明度台阶压平, 让颜色看起来是"扩散"出来的
 *  - 白天模式几乎只做衔接, 尽量不压暗; 夜间模式保留一点氛围
 * */
export const ambientColorLight: [string, string, string] = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.04)',
  'rgba(0, 0, 0, 0.04)'
]
export const ambientColorDark: [string, string, string] = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.12)',
  'rgba(0, 0, 0, 0.12)'
]
export const ambientLocations: [number, number, number] = [0, 0.55, 1]

/**
 * 文字黑罩: 颜色保留, 只在文字处压一层黑
 *  - 白天模式要轻很多 (用户明确反馈白天不要再那么黑), 夜间保持足够的文字对比
 * */
export const scrimColorLight: [string, string, string] = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.08)',
  'rgba(0, 0, 0, 0.36)'
]
export const scrimColorDark: [string, string, string] = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.16)',
  'rgba(0, 0, 0, 0.52)'
]

/**
 * 色场顶部羽化遮罩: 非线性, 顶部几乎不可见, 到底部完全不透明
 *  - 这是"过渡多长"的旋钮: locations 越往前/中段 alpha 越低, 清晰 → 模糊的过渡越长越柔
 *  - locations 必须与 colors 等长且严格升序, 末段必须保持完全不透明 (black), 否则底部色场被削薄
 * */
export const maskColor: [string, string, string, string] = [
  'transparent',
  'rgba(0, 0, 0, 0.06)',
  'rgba(0, 0, 0, 0.6)',
  'black'
]
export const maskLocations: [number, number, number, number] = [0, 0.3, 0.7, 1]

/**
 * 是否用 MaskedView 做顶部羽化
 *  - iOS / 安卓都可以用: 卡片外层的 Squircle 在 iOS 走图层级遮罩 (可安全嵌套),
 *    在安卓走原生 outline 裁剪 (见 @components/squircle/native), 两者都不占用 MaskedView
 *  - WEB 没有 MaskedView 实现, 不做羽化, 顶部交给氛围层衔接
 * */
export const USE_MASK = !WEB

/** 历史使用的纯黑渐变, 无封面 / 缩略图加载失败时兜底 */
export const linearColor: [string, string, string] = [
  'rgba(0, 0, 0, 0)',
  'rgba(0, 0, 0, 0.64)',
  'rgba(0, 0, 0, 0.84)'
]

/**
 * 由封面地址取底部色场用的极小缩略图地址
 *  - 安卓/Web 的色场图走这里 (iOS 优先复用封面原图, 见 blur-image.ios.tsx)
 *  - getCoverSrc 对非远端地址会回落到 IMG_DEFAULT, 实际总是返回字符串
 * */
export function getBlurSrc(src: CoverProps['src'], cdn?: boolean): string {
  return getCoverSrc(src, BLUR_WIDTH, cdn) as string
}
