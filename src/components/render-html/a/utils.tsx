/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-01 03:39:03
 */
import React from 'react'
import { rakuenStore, subjectStore } from '@stores'
import { navigationReference, postTask } from '@utils'
import { getBucketId } from '@utils/bucket'
import { logger } from '@utils/dev'
import { IOS, WEB } from '@constants'
import { fetchMediaQueue } from '../utils'
import ACText from './ac-text'
import Mono from './mono'
import Subject from './subject'
import Topic from './topic'

import type { MonoId, ReactNode, SubjectId, TopicId } from '@types'
import type { ACSearchArgs, MediaArgs, PassProps } from './types'

/** @todo 待优化, 安卓 Text 中一定要过滤非文字节点 */
export function filterChildren(childrens: ReactNode[]): ReactNode[] {
  if (IOS || WEB) return childrens

  const data = childrens.filter(
    item =>
      React.isValidElement(item) && (item.type as { displayName?: string }).displayName === 'Text'
  )
  if (data.length) return data

  return childrens
    .map(item => {
      const el = item as React.ReactElement
      return (el?.props as { src?: string })?.src
    })
    .filter((item): item is string => !!item)
}

/** 获取 html 根节点文字 */
export function getRawChildrenText(passProps: PassProps) {
  try {
    const text = passProps?.rawChildren?.[0]?.data
    if (text) return text

    const children = passProps?.rawChildren?.[0]?.children
    if (Array.isArray(children)) {
      let text = ''
      children.forEach(item => {
        if (typeof item.data === 'string') text += item.data
      })
      return text
    }

    return ''
  } catch (error) {
    logger.error('getRawChildrenText error', error)
    return ''
  }
}

/** AC 自动机猜测条目文字 */
export function getACSearch({ style, passProps, params, onPress }: ACSearchArgs) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const navigation = navigationReference()
    const subjectId = params.subjectId as SubjectId
    return (
      <ACText
        navigation={navigation}
        style={style}
        subjectId={subjectId}
        text={text}
        onPress={onPress}
      />
    )
  }
}

/** 条目媒体块 */
export async function getSubject(
  { passProps, params, href, onLinkPress }: MediaArgs,
  render?: (el: JSX.Element) => void
) {
  try {
    const text = getRawChildrenText(passProps)
    if (!text) return

    const subjectId = params.subjectId as SubjectId
    const subject = await subjectStore.getSubjectSnapshot(subjectId)

    // 等待列队请求媒体信息
    if (!subject?._loaded) {
      setTimeout(() => {
        fetchMediaQueue('subject', subjectId, async result => {
          // 主动渲染组件
          if (result && typeof render === 'function') {
            render(await getSubject({ passProps, params, href, onLinkPress }))
          }
        })
      }, 2000)
      return
    }

    const { images, name, name_cn, rating, rank, air_date } = subject
    const image = images?.common
    if (!image) return

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
    logger.error('render-html', 'a', 'utils', 'getSubject', error)
  }
}

/** 帖子媒体块 */
export async function getTopic(
  { passProps, params, onLinkPress }: MediaArgs,
  render?: (el: JSX.Element) => void
) {
  try {
    const text = getRawChildrenText(passProps)
    if (!text) return

    const topicId = params.topicId as TopicId
    const last = getBucketId(topicId)

    // 同步读取前先确保两个桶已读回 (访问器内的 init 是异步懒读, 等不到)
    await rakuenStore.init(`comments${last}`)
    await rakuenStore.init(`topic${last}`)

    const topic = rakuenStore.topic(topicId)
    if (!topic?._loaded) {
      setTimeout(() => {
        fetchMediaQueue('topic', topicId, async result => {
          // 主动渲染组件
          if (result && typeof render === 'function') {
            render(await getTopic({ passProps, params, onLinkPress }))
          }
        })
      }, 2000)
      return
    }

    const { userId, group, userName } = topic
    if (!(userId && group && userName)) return

    return <Topic topicId={topicId} text={text} onLinkPress={onLinkPress} />
  } catch (error) {
    logger.error('render-html', 'a', 'utils', 'getTopic', error)
  }
}

/** 人物媒体块 */
export async function getMono({ passProps, params, onLinkPress }: MediaArgs) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const monoId = params.monoId as MonoId
    const { cover, name, nameCn, _loaded } = subjectStore.mono(monoId)
    if (!_loaded) {
      postTask(() => {
        fetchMediaQueue('mono', monoId)
      }, 2000)
    } else {
      if (cover) {
        return (
          <Mono text={text} cover={cover} name={name} nameCn={nameCn} onLinkPress={onLinkPress} />
        )
      }
    }
  }
}
