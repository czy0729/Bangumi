/*
 * @Author: czy0729
 * @Date: 2026-09-13 22:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 22:20:00
 */
import React from 'react'
import { Circle, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg'
import { IconBase } from './base'

import type { IconProps } from './base'

/** 主题 */
export function IconPalette(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M12 2a10 10 0 0 0 0 20c1.1 0 2-.9 2-2 0-.55-.22-1.05-.59-1.41A1.99 1.99 0 0 1 12.82 17H15a7 7 0 0 0 7-7c0-4.42-4.48-8-10-8z' />
      <Circle cx='6.5' cy='11.5' r='1' />
      <Circle cx='9.5' cy='6.5' r='1' />
      <Circle cx='15' cy='6.5' r='1' />
      <Circle cx='17.5' cy='11' r='1' />
    </IconBase>
  )
}

/** 界面 */
export function IconSliders(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='4' y1='21' x2='4' y2='14' />
      <Line x1='4' y1='10' x2='4' y2='3' />
      <Line x1='12' y1='21' x2='12' y2='12' />
      <Line x1='12' y1='8' x2='12' y2='3' />
      <Line x1='20' y1='21' x2='20' y2='16' />
      <Line x1='20' y1='12' x2='20' y2='3' />
      <Line x1='1' y1='14' x2='7' y2='14' />
      <Line x1='9' y1='8' x2='15' y2='8' />
      <Line x1='17' y1='16' x2='23' y2='16' />
    </IconBase>
  )
}

/** 图片 */
export function IconImage(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <Circle cx='8.5' cy='8.5' r='1.5' />
      <Path d='M21 15l-5-5L5 21' />
    </IconBase>
  )
}

/** 加速 */
export function IconBolt(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
    </IconBase>
  )
}

/** 图片加载失败 */
export function IconImageOff(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <Circle cx='8.5' cy='8.5' r='1.5' />
      <Line x1='3' y1='3' x2='21' y2='21' />
    </IconBase>
  )
}

/** 文本 */
export function IconType(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='4 7 4 4 20 4 20 7' />
      <Line x1='9' y1='20' x2='15' y2='20' />
      <Line x1='12' y1='4' x2='12' y2='20' />
    </IconBase>
  )
}

/** 字体 */
export function IconFont(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M3 19 8 5l5 14' />
      <Path d='M5 14.5h6' />
      <Circle cx='18.5' cy='15.5' r='3' />
    </IconBase>
  )
}

/** 字号 */
export function IconTextSize(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M3 20h18' />
      <Path d='M7 16 12 4l5 12' />
      <Path d='M9.2 11.5h5.6' />
    </IconBase>
  )
}

/** 字间距 */
export function IconSpacing(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='12' y1='4' x2='12' y2='20' />
      <Path d='m7 8-4 4 4 4' />
      <Path d='m17 8 4 4-4 4' />
    </IconBase>
  )
}

/** 语言 / 翻译 */
export function IconLanguages(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m5 8 6 6' />
      <Path d='m4 14 6-6 2-3' />
      <Path d='M2 5h12' />
      <Path d='M7 2h1' />
      <Path d='m22 22-5-10-5 10' />
      <Path d='M14 18h6' />
    </IconBase>
  )
}

/** 底栏 */
export function IconPanelBottom(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='4' width='18' height='16' rx='2' ry='2' />
      <Line x1='3' y1='15' x2='21' y2='15' />
    </IconBase>
  )
}

/** 顶栏 */
export function IconPanelTop(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='4' width='18' height='16' rx='2' ry='2' />
      <Line x1='3' y1='9' x2='21' y2='9' />
    </IconBase>
  )
}

/** 时间 */
export function IconClock(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Polyline points='12 6 12 12 16 14' />
    </IconBase>
  )
}

/** 播放 */
export function IconTvPlay(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='5' width='18' height='14' rx='2' ry='2' />
      <Polygon points='10 9 15 12 10 15' />
    </IconBase>
  )
}

/** 深色主题 */
export function IconMoon(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z' />
    </IconBase>
  )
}

/** 浅色主题 */
export function IconSun(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='5' />
      <Line x1='12' y1='1' x2='12' y2='3' />
      <Line x1='12' y1='21' x2='12' y2='23' />
      <Line x1='4.22' y1='4.22' x2='5.64' y2='5.64' />
      <Line x1='18.36' y1='18.36' x2='19.78' y2='19.78' />
      <Line x1='1' y1='12' x2='3' y2='12' />
      <Line x1='21' y1='12' x2='23' y2='12' />
      <Line x1='4.22' y1='19.78' x2='5.64' y2='18.36' />
      <Line x1='18.36' y1='5.64' x2='19.78' y2='4.22' />
    </IconBase>
  )
}

/** 跟随系统 */
export function IconSmartphone(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='5' y='2' width='14' height='20' rx='2' ry='2' />
      <Line x1='12' y1='18' x2='12.01' y2='18' />
    </IconBase>
  )
}

/** 毛玻璃 */
export function IconDroplet(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z' />
    </IconBase>
  )
}

/** 轻提示 */
export function IconBell(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
      <Path d='M13.73 21a2 2 0 0 1-3.46 0' />
    </IconBase>
  )
}

/** 模态框 */
export function IconSquare(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
    </IconBase>
  )
}

/** 圆角 */
export function IconRadius(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M4 20V11a7 7 0 0 1 7-7h9' />
      <Path d='M20 20h-4' />
    </IconBase>
  )
}

/** 图层 / 拟物 */
export function IconLayers(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polygon points='12 2 2 7 12 12 22 7 12 2' />
      <Polyline points='2 17 12 22 22 17' />
      <Polyline points='2 12 12 17 22 12' />
    </IconBase>
  )
}

/** 头像 */
export function IconCircle(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='9' />
    </IconBase>
  )
}

/** 看板娘吐槽 */
export function IconSmile(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Path d='M8 14s1.5 2 4 2 4-2 4-2' />
      <Line x1='9' y1='9' x2='9.01' y2='9' />
      <Line x1='15' y1='9' x2='15.01' y2='9' />
    </IconBase>
  )
}

/** 震动 */
export function IconVibrate(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='8' y='2' width='8' height='20' rx='2' ry='2' />
      <Line x1='3' y1='9' x2='3' y2='15' />
      <Line x1='21' y1='9' x2='21' y2='15' />
    </IconBase>
  )
}

/** 切页动画 / 动效 */
export function IconAnimation(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polygon points='6 3 20 12 6 21 6 3' />
    </IconBase>
  )
}

/** 溢出遮罩 */
export function IconMask(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='7' width='18' height='10' rx='2' ry='2' />
      <Line x1='7' y1='7' x2='7' y2='17' />
      <Line x1='11' y1='7' x2='11' y2='17' />
    </IconBase>
  )
}

/** 点击水纹 */
export function IconRipple(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='2' />
      <Path d='M12 6a6 6 0 0 1 0 12' />
      <Path d='M12 2a10 10 0 0 1 0 20' />
    </IconBase>
  )
}
