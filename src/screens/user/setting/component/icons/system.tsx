/*
 * @Author: czy0729
 * @Date: 2026-09-13 22:20:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-13 22:20:00
 */
import React from 'react'
import { Circle, Ellipse, Line, Path, Polygon, Polyline, Rect } from 'react-native-svg'
import { IconBase } from './base'

import type { IconProps } from './base'

/** 齿轮 (路径较长, 分段拼接) */
const GEAR_PATH =
  'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 ' +
  '0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 ' +
  '1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 ' +
  '1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82' +
  'l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 ' +
  '2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 ' +
  '2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 ' +
  '0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z'

/** Github (路径较长, 分段拼接) */
const GITHUB_PATH =
  'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 ' +
  '0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 ' +
  '5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22'

/** 缓存 */
export function IconDatabase(props: IconProps) {
  return (
    <IconBase {...props}>
      <Ellipse cx='12' cy='5' rx='9' ry='3' />
      <Path d='M3 5v14a9 3 0 0 0 18 0V5' />
      <Path d='M3 12a9 3 0 0 0 18 0' />
    </IconBase>
  )
}

/** 链接 / 网络服务 */
export function IconLink(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71' />
      <Path d='M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71' />
    </IconBase>
  )
}

/** 云同步 */
export function IconCloud(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z' />
    </IconBase>
  )
}

/** 同步 / 刷新 */
export function IconRefresh(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='23 4 23 10 17 10' />
      <Polyline points='1 20 1 14 7 14' />
      <Path d='M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15' />
    </IconBase>
  )
}

/** 时区 */
export function IconGlobe(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Line x1='2' y1='12' x2='22' y2='12' />
      <Path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
    </IconBase>
  )
}

/** 代理 / 服务器 */
export function IconServer(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='2' y='2' width='20' height='8' rx='2' ry='2' />
      <Rect x='2' y='14' width='20' height='8' rx='2' ry='2' />
      <Line x1='6' y1='6' x2='6.01' y2='6' />
      <Line x1='6' y1='18' x2='6.01' y2='18' />
    </IconBase>
  )
}

/** 服务状态 (脉冲) */
export function IconActivity(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M2 12h3l3-7 4 14 4-7h6' />
    </IconBase>
  )
}

/** 网络探针 */
export function IconWifi(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M5 12.55a11 11 0 0 1 14.08 0' />
      <Path d='M1.42 9a16 16 0 0 1 21.16 0' />
      <Path d='M8.53 16.11a6 6 0 0 1 6.95 0' />
      <Line x1='12' y1='20' x2='12.01' y2='20' />
    </IconBase>
  )
}

/** 账户 / 安全 */
export function IconShield(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' />
    </IconBase>
  )
}

/** 危险操作 */
export function IconAlertTriangle(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z' />
      <Line x1='12' y1='9' x2='12' y2='13' />
      <Line x1='12' y1='17' x2='12.01' y2='17' />
    </IconBase>
  )
}

/** 版本 */
export function IconTag(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M12 2H4a2 2 0 0 0-2 2v8l9.29 9.29a1 1 0 0 0 1.42 0l8-8a1 1 0 0 0 0-1.42L12 2z' />
      <Circle cx='7.5' cy='7.5' r='1.5' />
    </IconBase>
  )
}

/** 说明 / 信息 */
export function IconInfo(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Line x1='12' y1='16' x2='12' y2='12' />
      <Line x1='12' y1='8' x2='12.01' y2='8' />
    </IconBase>
  )
}

/** 反馈 */
export function IconMessage(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z' />
    </IconBase>
  )
}

/** 投食 */
export function IconGift(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='20 12 20 22 4 22 4 12' />
      <Rect x='2' y='7' width='20' height='5' />
      <Line x1='12' y1='22' x2='12' y2='7' />
      <Path d='M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z' />
      <Path d='M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z' />
    </IconBase>
  )
}

/** 支持者 */
export function IconHeart(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7z' />
    </IconBase>
  )
}

/** 更新内容 */
export function IconFileText(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z' />
      <Polyline points='14 2 14 8 20 8' />
      <Line x1='16' y1='13' x2='8' y2='13' />
      <Line x1='16' y1='17' x2='8' y2='17' />
    </IconBase>
  )
}

/** 更多 */
export function IconMore(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='5' cy='12' r='1.6' />
      <Circle cx='12' cy='12' r='1.6' />
      <Circle cx='19' cy='12' r='1.6' />
    </IconBase>
  )
}

/** 指南 */
export function IconBook(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M4 19.5A2.5 2.5 0 0 1 6.5 17H20' />
      <Path d='M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' />
    </IconBase>
  )
}

/** 系统设置 */
export function IconSettings(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='3' />
      <Path d={GEAR_PATH} />
    </IconBase>
  )
}

/** 高级 */
export function IconWrench(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z' />
    </IconBase>
  )
}

/** 外部跳转 */
export function IconExternalLink(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6' />
      <Polyline points='15 3 21 3 21 9' />
      <Line x1='10' y1='14' x2='21' y2='3' />
    </IconBase>
  )
}

/** Webhook */
export function IconWebhook(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M18 16.98h-5.99c-1.1 0-1.95.94-2.48 1.9A4 4 0 0 1 2 17c.01-.7.2-1.4.57-2' />
      <Path d='m6 17 3.13-5.78c.53-.97.1-2.18-.5-3.1a4 4 0 1 1 6.89-4.06' />
      <Path d='m12 6 3.13 5.73C15.66 12.7 16.9 13 18 13a4 4 0 0 1 0 8' />
    </IconBase>
  )
}

/** 复制 */
export function IconCopy(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
      <Path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' />
    </IconBase>
  )
}

/** 密钥 */
export function IconKey(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='7.5' cy='15.5' r='4.5' />
      <Path d='m11 12 9-9' />
      <Path d='m17 6 3 3' />
      <Path d='m14 9 2 2' />
    </IconBase>
  )
}

/** 密码 / 锁定 */
export function IconLock(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
      <Path d='M7 11V7a5 5 0 0 1 10 0v4' />
    </IconBase>
  )
}

/** 邮箱 */
export function IconMail(props: IconProps) {
  return (
    <IconBase {...props}>
      <Rect x='2' y='4' width='20' height='16' rx='2' ry='2' />
      <Path d='m22 6-10 7L2 6' />
    </IconBase>
  )
}

/** 登出 */
export function IconLogOut(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4' />
      <Polyline points='16 17 21 12 16 7' />
      <Line x1='21' y1='12' x2='9' y2='12' />
    </IconBase>
  )
}

/** 个人设置 */
export function IconUserCog(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
      <Circle cx='12' cy='7' r='4' />
      <Circle cx='19' cy='17' r='2' />
      <Line x1='19' y1='13.5' x2='19' y2='14.5' />
      <Line x1='19' y1='19.5' x2='19' y2='20.5' />
    </IconBase>
  )
}

/** Github */
export function IconGithub(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d={GITHUB_PATH} />
    </IconBase>
  )
}

/** 上传 / 导出 */
export function IconUpload(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <Polyline points='17 8 12 3 7 8' />
      <Line x1='12' y1='3' x2='12' y2='15' />
    </IconBase>
  )
}

/** 下载 / 导入 */
export function IconDownload(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <Polyline points='7 10 12 15 17 10' />
      <Line x1='12' y1='15' x2='12' y2='3' />
    </IconBase>
  )
}

/** 清除 */
export function IconTrash(props: IconProps) {
  return (
    <IconBase {...props}>
      <Line x1='3' y1='6' x2='21' y2='6' />
      <Path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6' />
      <Path d='M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2' />
      <Line x1='10' y1='11' x2='10' y2='17' />
      <Line x1='14' y1='11' x2='14' y2='17' />
    </IconBase>
  )
}

/** 提醒 */
export function IconBellRing(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9' />
      <Path d='M13.73 21a2 2 0 0 1-3.46 0' />
      <Path d='M4 2C2.8 3.7 2 5.7 2 8' />
      <Path d='M22 8c0-2.3-.8-4.3-2-6' />
    </IconBase>
  )
}

/** 命令行 / 调试 */
export function IconTerminal(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='4 17 10 11 4 5' />
      <Line x1='12' y1='19' x2='20' y2='19' />
    </IconBase>
  )
}

/** 实验性 */
export function IconFlask(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M10 2v7.31' />
      <Path d='M14 9.3V2' />
      <Path d='M8.5 2h7' />
      <Path d='M14 9.3a6.5 6.5 0 1 1-4 0' />
    </IconBase>
  )
}

/** 帮助 */
export function IconQuestion(props: IconProps) {
  return (
    <IconBase {...props}>
      <Circle cx='12' cy='12' r='10' />
      <Path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
      <Line x1='12' y1='17' x2='12.01' y2='17' />
    </IconBase>
  )
}

/** 特色亮点 */
export function IconSparkles(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z' />
      <Path d='M18.5 14.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z' />
    </IconBase>
  )
}

/** 路线 / 路线图 */
export function IconMap(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polygon points='3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21 3 6' />
      <Line x1='9' y1='3' x2='9' y2='18' />
      <Line x1='15' y1='6' x2='15' y2='21' />
    </IconBase>
  )
}

/** 问卷 / 清单 */
export function IconListTodo(props: IconProps) {
  return (
    <IconBase {...props}>
      <Polyline points='3 17 5 19 9 15' />
      <Line x1='13' y1='6' x2='21' y2='6' />
      <Line x1='13' y1='12' x2='21' y2='12' />
      <Line x1='13' y1='18' x2='21' y2='18' />
      <Line x1='3' y1='6' x2='3.01' y2='6' />
    </IconBase>
  )
}

/** 隐私 */
export function IconEyeLock(props: IconProps) {
  return (
    <IconBase {...props}>
      <Path d='M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z' />
      <Circle cx='12' cy='12' r='3' />
      <Rect x='17' y='14' width='6' height='5' rx='1' />
    </IconBase>
  )
}
