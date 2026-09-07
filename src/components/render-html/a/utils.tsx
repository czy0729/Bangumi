/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-07 03:00:00
 *
 * a 标签解析: 文字提取 (纯函数) + 条目 / 帖子 / 人物媒体块元素构造
 */
import React from 'react'
import { rakuenStore, subjectStore } from '@stores'
import { navigationReference, postTask } from '@utils'
import { getBucketId } from '@utils/bucket'
import { logger } from '@utils/dev'
import { IOS, WEB } from '@constants'
import { fetchMediaQueue } from '../utils/media-queue'
import ACText from './ac-text'
import Mono from './mono'
import Subject from './subject'
import Topic from './topic'
import {
  COMPONENT,
  IGNORE_TOPIC_ID,
  MAX_MEDIA_RETRY,
  MEDIA_QUEUE_DELAY,
  TOGGLE_IMAGE_NAME
} from './ds'

import type { ReactElement } from 'react'
import type { MonoId, ReactNode, SubjectId, TopicId } from '@types'
import type { ACSearchArgs, GetMediaTypeOptions, MediaArgs, MediaType, PassProps } from './types'

const TAG = `${COMPONENT}/utils` as const

/**
 * 获取节点类型名
 * @param type 节点的 type
 *
 * 可能是字符串 (host 组件), 函数组件,
 * 或 forwardRef / memo / observer 包装后的对象 (RN 的 Text, observer(ToggleImage) 等)
 */
function getTypeName(type: unknown): string {
  if (typeof type === 'string') return type

  if (typeof type === 'function' || (type && typeof type === 'object')) {
    const { displayName, name } = type as { displayName?: string; name?: string }
    return displayName || name || ''
  }

  return ''
}

/**
 * @todo 待优化, 安卓 Text 中一定要过滤非文字节点
 *
 * 过滤 a 标签的子节点
 * @param childrens a 标签的子节点数组
 */
export function filterChildren(childrens: ReactNode[]): ReactNode[] {
  if (IOS || WEB) return childrens
  if (!Array.isArray(childrens)) return []

  const data = childrens.filter(
    item => React.isValidElement(item) && getTypeName(item.type) === 'Text'
  )
  if (data.length) return data

  return childrens
    .map(item => {
      const props = (item as React.ReactElement)?.props as { src?: string } | undefined
      return props?.src
    })
    .filter((item): item is string => typeof item === 'string' && !!item)
}

/**
 * 是否只有一个折叠图片子节点 (直接透传, 不套 Text)
 * @param childrens a 标签的子节点数组
 */
export function isToggleImage(childrens: ReactNode[]): boolean {
  if (!Array.isArray(childrens) || childrens.length !== 1) return false

  const child = childrens[0]
  if (!React.isValidElement(child)) return false

  return getTypeName(child.type) === TOGGLE_IMAGE_NAME
}

/**
 * 获取 html 根节点文字
 * @param passProps render-html 传递的参数
 */
export function getRawChildrenText(passProps: PassProps): string {
  try {
    const text = passProps?.rawChildren?.[0]?.data
    if (typeof text === 'string' && text) return text

    const children = passProps?.rawChildren?.[0]?.children
    if (Array.isArray(children)) {
      return children.reduce((acc: string, item: { data?: string }) => {
        if (typeof item?.data === 'string') return acc + item.data
        return acc
      }, '')
    }

    return ''
  } catch (error) {
    logger.error(TAG, 'getRawChildrenText', error)
    return ''
  }
}

/**
 * 依据链接解析结果与设置, 判断该链接要渲染成哪种媒体块
 * @param options 解析结果与相关设置
 */
export function getMediaType({
  route,
  app,
  topicId,
  matchLink,
  acSearchV2
}: GetMediaTypeOptions): MediaType {
  if (!route) return ''

  // 客户端内部链接只走 AC 搜索
  if (app && route === 'Subject') return acSearchV2 ? 'ac' : ''

  if (!matchLink) return ''

  if (route === 'Subject') return 'subject'

  // 客户端推广语不做媒体块处理
  if (route === 'Topic') return topicId && topicId !== IGNORE_TOPIC_ID ? 'topic' : ''

  if (route === 'Mono') return 'mono'

  return ''
}

/**
 * AC 自动机猜测条目文字
 * @param args 解析参数
 */
export function getACSearch({ style, passProps, params, onPress }: ACSearchArgs) {
  try {
    const text = getRawChildrenText(passProps)
    const subjectId = params.subjectId as SubjectId
    if (!text || !subjectId) return null

    return (
      <ACText
        navigation={navigationReference()}
        style={style}
        subjectId={subjectId}
        text={text}
        onPress={onPress}
      />
    )
  } catch (error) {
    logger.error(TAG, 'getACSearch', error)
    return null
  }
}

/**
 * 条目媒体块
 * @param args 解析参数
 * @param retry 排队重试次数
 */
export async function getSubject(args: MediaArgs, retry: number = 0): Promise<ReactElement | null> {
  const { passProps, params, href, onLinkPress, onRender } = args

  try {
    const text = getRawChildrenText(passProps)
    const subjectId = params.subjectId as SubjectId
    if (!text || !subjectId) return null

    const subject = await subjectStore.getSubjectSnapshot(subjectId)

    // 等待列队请求媒体信息, 超过重试上限后放弃
    if (!subject?._loaded) {
      if (retry < MAX_MEDIA_RETRY) {
        setTimeout(() => {
          fetchMediaQueue('subject', subjectId, async (result?: boolean) => {
            // 主动渲染组件
            const el = await getSubject(args, retry + 1)
            if (result && el && onRender) onRender(el)
          })
        }, MEDIA_QUEUE_DELAY)
      }
      return null
    }

    const { images, name, name_cn, rating, rank, air_date } = subject
    const image = images?.common
    if (!image) return null

    return (
      <Subject
        text={text}
        href={href}
        image={image}
        name={name}
        name_cn={name_cn}
        rating={rating}
        rank={rank}
        air_date={air_date}
        onLinkPress={onLinkPress}
      />
    )
  } catch (error) {
    logger.error(TAG, 'getSubject', error)
    return null
  }
}

/**
 * 帖子媒体块
 * @param args 解析参数
 * @param retry 排队重试次数
 */
export async function getTopic(args: MediaArgs, retry: number = 0): Promise<ReactElement | null> {
  const { passProps, params, onLinkPress, onRender } = args

  try {
    const text = getRawChildrenText(passProps)
    const topicId = params.topicId as TopicId
    if (!text || !topicId) return null

    const last = getBucketId(topicId)

    // 同步读取前先确保两个桶已读回 (访问器内的 init 是异步懒读, 等不到)
    await rakuenStore.init(`comments${last}`)
    await rakuenStore.init(`topic${last}`)

    const topic = rakuenStore.topic(topicId)
    if (!topic?._loaded) {
      if (retry < MAX_MEDIA_RETRY) {
        setTimeout(() => {
          fetchMediaQueue('topic', topicId, async (result?: boolean) => {
            // 主动渲染组件
            const el = await getTopic(args, retry + 1)
            if (result && el && onRender) onRender(el)
          })
        }, MEDIA_QUEUE_DELAY)
      }
      return null
    }

    const { userId, group, userName } = topic
    if (!(userId && group && userName)) return null

    return <Topic topicId={topicId} text={text} onLinkPress={onLinkPress} />
  } catch (error) {
    logger.error(TAG, 'getTopic', error)
    return null
  }
}

/**
 * 人物媒体块
 * @param args 解析参数
 * @param retry 排队重试次数
 */
export function getMono(args: MediaArgs, retry: number = 0) {
  const { passProps, params, onLinkPress, onRender } = args

  try {
    const text = getRawChildrenText(passProps)
    const monoId = params.monoId as MonoId
    if (!text || !monoId) return null

    const { cover, name, nameCn, _loaded } = subjectStore.mono(monoId) || {}
    if (!_loaded) {
      // 超过重试上限后放弃
      if (retry < MAX_MEDIA_RETRY) {
        postTask(() => {
          fetchMediaQueue('mono', monoId, (result?: boolean) => {
            // 主动渲染组件
            const el = getMono(args, retry + 1)
            if (result && el && onRender) onRender(el)
          })
        }, MEDIA_QUEUE_DELAY)
      }
      return null
    }

    if (!cover) return null

    return <Mono text={text} cover={cover} name={name} nameCn={nameCn} onLinkPress={onLinkPress} />
  } catch (error) {
    logger.error(TAG, 'getMono', error)
    return null
  }
}
