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

/** 置顶 / 书签 (路径较长, 分段拼接) */
const PIN_PATH =
  'M12 17v5M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 ' +
  '1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 ' +
  '0 0 0 0 4 1 1 0 0 1 1 1z'

/** 首页 */
export function IconHome(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' />
      <Polyline points='9 22 9 13 15 13 15 22' />
    </IconBase>
  )
}

/** 发现 / 菜单 */
export function IconCompass(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Polygon points='16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76' />
    </IconBase>
  )
}

/** 超展开 */
export function IconRocket(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z' />
      <Path d='m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z' />
      <Path d='M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0' />
      <Path d='M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5' />
    </IconBase>
  )
}

/** 帖子 / 话题 (气泡) */
export function IconChat(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z' />
      <Line x1='8' y1='9' x2='16' y2='9' />
      <Line x1='8' y1='13' x2='13' y2='13' />
    </IconBase>
  )
}

/** 时光机 / 用户 */
export function IconUser(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
      <Circle cx='12' cy='7' r='4' />
    </IconBase>
  )
}

/** 小圣杯 */
export function IconCoins(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='8' cy='8' r='6' />
      <Path d='M18.09 10.37A6 6 0 1 1 10.34 18' />
      <Path d='M7 6h1v4' />
      <Path d='m16.71 13.88.7.71-2.82 2.82' />
    </IconBase>
  )
}

/** 条目 */
export function IconBookOpen(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
      <Path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
    </IconBase>
  )
}

/** 追踪 */
export function IconTarget(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Circle cx='12' cy='12' r='6' />
      <Circle cx='12' cy='12' r='2' />
    </IconBase>
  )
}

/** 文本匹配 / 猜测 */
export function IconTextSearch(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M21 6H3' />
      <Path d='M10 12H3' />
      <Path d='M10 18H3' />
      <Circle cx='17' cy='15' r='3' />
      <Path d='m21 19-1.9-1.9' />
    </IconBase>
  )
}

/** 屏蔽 */
export function IconBan(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Line x1='4.93' y1='4.93' x2='19.07' y2='19.07' />
    </IconBase>
  )
}

/** 过滤 */
export function IconFilter(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
    </IconBase>
  )
}

/** 列表 */
export function IconList(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='8' y1='6' x2='21' y2='6' />
      <Line x1='8' y1='12' x2='21' y2='12' />
      <Line x1='8' y1='18' x2='21' y2='18' />
      <Line x1='3' y1='6' x2='3.01' y2='6' />
      <Line x1='3' y1='12' x2='3.01' y2='12' />
      <Line x1='3' y1='18' x2='3.01' y2='18' />
    </IconBase>
  )
}

/** 网格 */
export function IconGrid(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='7' height='7' rx='1' />
      <Rect x='14' y='3' width='7' height='7' rx='1' />
      <Rect x='3' y='14' width='7' height='7' rx='1' />
      <Rect x='14' y='14' width='7' height='7' rx='1' />
    </IconBase>
  )
}

/** 布局 */
export function IconLayout(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='18' height='18' rx='2' ry='2' />
      <Line x1='3' y1='9' x2='21' y2='9' />
      <Line x1='9' y1='21' x2='9' y2='9' />
    </IconBase>
  )
}

/** 显示 */
export function IconEye(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z' />
      <Circle cx='12' cy='12' r='3' />
    </IconBase>
  )
}

/** 隐藏 */
export function IconEyeOff(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M9.88 9.88a3 3 0 1 0 4.24 4.24' />
      <Path d='M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68' />
      <Path d='M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61' />
      <Line x1='2' y1='2' x2='22' y2='22' />
    </IconBase>
  )
}

/** 排序 */
export function IconSortAsc(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m7 20V4' />
      <Path d='m3 8 4-4 4 4' />
      <Line x1='13' y1='6' x2='21' y2='6' />
      <Line x1='13' y1='12' x2='18' y2='12' />
      <Line x1='13' y1='18' x2='21' y2='18' />
    </IconBase>
  )
}

/** 放送 / 日程 */
export function IconCalendar(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
      <Line x1='16' y1='2' x2='16' y2='6' />
      <Line x1='8' y1='2' x2='8' y2='6' />
      <Line x1='3' y1='10' x2='21' y2='10' />
    </IconBase>
  )
}

/** 收藏 / 置顶 */
export function IconPin(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d={PIN_PATH} />
    </IconBase>
  )
}

/** 游戏 */
export function IconGamepad(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='6' y1='12' x2='10' y2='12' />
      <Line x1='8' y1='10' x2='8' y2='14' />
      <Line x1='15' y1='13' x2='15.01' y2='13' />
      <Line x1='18' y1='11' x2='18.01' y2='11' />
      <Rect x='2' y='6' width='20' height='12' rx='6' ry='6' />
    </IconBase>
  )
}

/** 章节 / 进度 */
export function IconSignal(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='5' y1='20' x2='5' y2='16' />
      <Line x1='10' y1='20' x2='10' y2='12' />
      <Line x1='15' y1='20' x2='15' y2='8' />
      <Line x1='20' y1='20' x2='20' y2='4' />
    </IconBase>
  )
}

/** 讨论热度 */
export function IconFlame(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z' />
    </IconBase>
  )
}

/** 小圣杯 (奖杯) */
export function IconTrophy(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M6 9H4.5a2.5 2.5 0 0 1 0-5H6' />
      <Path d='M18 9h1.5a2.5 2.5 0 0 0 0-5H18' />
      <Path d='M4 22h16' />
      <Path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
      <Path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
      <Path d='M18 2H6v7a6 6 0 0 0 12 0V2z' />
    </IconBase>
  )
}

/** 星级 / 评分 */
export function IconStar(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </IconBase>
  )
}

/** 从最后看过开始 (回退) */
export function IconRewind(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m11 19-9-7 9-7z' />
      <Path d='m22 19-9-7 9-7z' />
    </IconBase>
  )
}

/** 进度 / 仪表 */
export function IconGauge(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m12 14 4-4' />
      <Path d='M3.34 19a10 10 0 1 1 17.32 0' />
    </IconBase>
  )
}

/** 涨跌 */
export function IconTrendUp(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='22 7 13.5 15.5 8.5 10.5 2 17' />
      <Polyline points='16 7 22 7 22 13' />
    </IconBase>
  )
}

/** 数字组合 */
export function IconHash(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='4' y1='9' x2='20' y2='9' />
      <Line x1='4' y1='15' x2='20' y2='15' />
      <Line x1='10' y1='3' x2='8' y2='21' />
      <Line x1='16' y1='3' x2='14' y2='21' />
    </IconBase>
  )
}

/** 缩略信息 (悬浮卡) */
export function IconPopover(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='18' height='13' rx='2' ry='2' />
      <Path d='M8 16v4l4-4z' />
    </IconBase>
  )
}

/** 展示行数 */
export function IconRows(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='6' x2='21' y2='6' />
      <Line x1='3' y1='12' x2='21' y2='12' />
      <Line x1='3' y1='18' x2='15' y2='18' />
    </IconBase>
  )
}

/** 折叠 / 展开 */
export function IconFold(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m7 15 5 5 5-5' />
      <Path d='m7 9 5-5 5 5' />
    </IconBase>
  )
}

/** 列表上限 */
export function IconListCount(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='6' x2='21' y2='6' />
      <Line x1='3' y1='12' x2='21' y2='12' />
      <Line x1='3' y1='18' x2='10' y2='18' />
      <Circle cx='17' cy='18' r='3' />
    </IconBase>
  )
}

/** 自动换行 */
export function IconWrapText(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='6' x2='21' y2='6' />
      <Path d='M3 12h13a3 3 0 0 1 0 6h-3' />
      <Path d='m15 15-3 3 3 3' />
      <Line x1='3' y1='18' x2='8' y2='18' />
    </IconBase>
  )
}

/** 引用 */
export function IconQuote(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='5' y1='4' x2='5' y2='20' />
      <Line x1='10' y1='7' x2='20' y2='7' />
      <Line x1='10' y1='12' x2='20' y2='12' />
      <Line x1='10' y1='17' x2='15' y2='17' />
    </IconBase>
  )
}

/** 回复 */
export function IconReply(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='9 17 4 12 9 7' />
      <Path d='M20 18v-2a4 4 0 0 0-4-4H4' />
    </IconBase>
  )
}

/** 分页 */
export function IconPagination(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='m6 8-4 4 4 4' />
      <Path d='m18 8 4 4-4 4' />
      <Line x1='8' y1='12' x2='8.01' y2='12' />
      <Line x1='12' y1='12' x2='12.01' y2='12' />
      <Line x1='16' y1='12' x2='16.01' y2='12' />
    </IconBase>
  )
}

/** 收起 */
export function IconCollapse(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='17 11 12 6 7 11' />
      <Polyline points='17 18 12 13 7 18' />
    </IconBase>
  )
}

/** 拖动条 / 直达滑块 */
export function IconSlider(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='12' x2='21' y2='12' />
      <Circle cx='14' cy='12' r='3' />
    </IconBase>
  )
}

/** 尺寸 */
export function IconResize(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M15 3h6v6M21 3l-7 7' />
      <Path d='M9 21H3v-6M3 21l7-7' />
    </IconBase>
  )
}

/** 加宽 */
export function IconExpandWidth(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='18 8 22 12 18 16' />
      <Polyline points='6 8 2 12 6 16' />
      <Line x1='2' y1='12' x2='22' y2='12' />
    </IconBase>
  )
}

/** 两侧入口 */
export function IconSidebar(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='4' width='18' height='16' rx='2' ry='2' />
      <Line x1='9' y1='4' x2='9' y2='20' />
      <Line x1='15' y1='4' x2='15' y2='20' />
    </IconBase>
  )
}

/** 分割线样式 */
export function IconDivider(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='7' width='18' height='3' rx='1' ry='1' />
      <Line x1='3' y1='15' x2='21' y2='15' />
    </IconBase>
  )
}

/** 封面形状 */
export function IconShape(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='3' width='9' height='18' rx='1' ry='1' />
      <Circle cx='17.5' cy='12' r='3.5' />
    </IconBase>
  )
}

/** 封面下方标题 */
export function IconCaption(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='4' y='3' width='16' height='12' rx='2' ry='2' />
      <Line x1='7' y1='19' x2='17' y2='19' />
    </IconBase>
  )
}

/** 语言转换 / 繁简 */
export function IconSwapText(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='6' x2='15' y2='6' />
      <Path d='m12 3 3 3-3 3' />
      <Line x1='21' y1='18' x2='9' y2='18' />
      <Path d='m12 15-3 3 3 3' />
    </IconBase>
  )
}

/** 交换 */
export function IconSwapHorizontal(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M8 3 4 7l4 4' />
      <Path d='M4 7h16' />
      <Path d='m16 21 4-4-4-4' />
      <Path d='M20 17H4' />
    </IconBase>
  )
}

/** 中文优先 */
export function IconChinese(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='4' y='4' width='16' height='16' rx='3' ry='3' />
      <Line x1='12' y1='5' x2='12' y2='19' />
      <Line x1='4' y1='12' x2='20' y2='12' />
    </IconBase>
  )
}

/** 片假名标注 */
export function IconAnnotate(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='8' x2='21' y2='8' />
      <Path d='M6 5v3M12 5v3M18 5v3' />
      <Line x1='3' y1='15' x2='14' y2='15' />
      <Line x1='3' y1='20' x2='8' y2='20' />
    </IconBase>
  )
}

/** 多用户 / 收藏数量 */
export function IconUsers(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2' />
      <Circle cx='9.5' cy='7' r='4' />
      <Path d='M22 21v-2a4 4 0 0 0-3-3.87' />
      <Path d='M16 3.13a4 4 0 0 1 0 7.75' />
    </IconBase>
  )
}

/** 域名 */
export function IconDomain(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='11' r='7' />
      <Line x1='3' y1='21' x2='21' y2='21' />
    </IconBase>
  )
}

/** 时间块 */
export function IconTimer(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='10' y1='2' x2='14' y2='2' />
      <Line x1='12' y1='14' x2='15' y2='11' />
      <Circle cx='12' cy='14' r='8' />
    </IconBase>
  )
}

/** 导出日程 */
export function IconCalendarPlus(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
      <Line x1='16' y1='2' x2='16' y2='6' />
      <Line x1='8' y1='2' x2='8' y2='6' />
      <Line x1='3' y1='10' x2='21' y2='10' />
      <Line x1='12' y1='14' x2='12' y2='18' />
      <Line x1='10' y1='16' x2='14' y2='16' />
    </IconBase>
  )
}

/** 排序 (下沉) */
export function IconSortDown(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M7 4v16' />
      <Path d='m3 16 4 4 4-4' />
      <Line x1='13' y1='6' x2='21' y2='6' />
      <Line x1='13' y1='12' x2='18' y2='12' />
      <Line x1='13' y1='18' x2='21' y2='18' />
    </IconBase>
  )
}

/** 自动适应尺寸 */
export function IconAutoSize(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='6' width='18' height='12' rx='2' ry='2' />
      <Line x1='9' y1='12' x2='15' y2='12' />
      <Path d='m7 10-2 2 2 2M17 10l2 2-2 2' />
    </IconBase>
  )
}

/** 底栏页面懒加载 */
export function IconTabLazy(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='4' width='18' height='16' rx='2' ry='2' />
      <Line x1='3' y1='15' x2='21' y2='15' />
      <Circle cx='12' cy='9.5' r='3' />
      <Polyline points='12 8 12 9.5 13.2 10.4' />
    </IconBase>
  )
}

/** 标签页分页保活 */
export function IconTabKeep(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='8' width='18' height='12' rx='2' ry='2' />
      <Path d='M6 8V6a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v2' />
      <Path d='M13 8V5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v3' />
      <Line x1='7' y1='13' x2='17' y2='13' />
      <Line x1='7' y1='16' x2='13' y2='16' />
    </IconBase>
  )
}
