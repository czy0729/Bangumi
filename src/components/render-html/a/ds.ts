/*
 * @Author: czy0729
 * @Date: 2026-09-07 03:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * a 标签渲染的模块级常量
 */
import { rc } from '@utils/dev'
import { COMPONENT as PARENT } from '../ds'

export const COMPONENT = rc(PARENT, 'A')

/** 不做媒体块处理的帖子 Id (客户端推广语) */
export const IGNORE_TOPIC_ID = 'group/350677'

/** 媒体信息列队取回后仍未加载的最大排队重试次数 */
export const MAX_MEDIA_RETRY = 2

/** 文字链接点击延迟 (ms), 规避与列表滚动手势冲突 */
export const LINK_PRESS_DELAY = 80

/** 媒体信息未加载时, 延迟进入请求列队的时间 (ms) */
export const MEDIA_QUEUE_DELAY = 2000

/** 图片折叠组件名 (子节点为它时直接透传, 不套 Text) */
export const TOGGLE_IMAGE_NAME = 'ToggleImage'
