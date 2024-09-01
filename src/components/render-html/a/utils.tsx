/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-01 10:55:20
 */
import React from 'react'
import { View } from 'react-native'
import { _, rakuenStore, subjectStore } from '@stores'
import { getInt } from '@stores/rakuen/utils'
import { navigationReference, runAfter } from '@utils'
import { IOS, WEB } from '@constants'
import { Fn, ReactNode } from '@types'
import { Cover } from '../../cover'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { Touchable } from '../../touchable'
import { fetchMediaQueue } from '../utils'
import ACText from './ac-text'
import Subject from './subject'
import Topic from './topic'
import { memoStyles } from './styles'

/** @todo 待优化, 安卓 Text 中一定要过滤非文字节点 */
export function filterChildren(childrens: ReactNode[]): ReactNode[] {
  if (IOS || WEB) return childrens

  const data = childrens.filter(
    item =>
      // @ts-expect-error
      item?.type?.displayName === 'Text'
  )
  if (data.length) return data

  return childrens
    .map(
      item =>
        // @ts-expect-error
        item?.props?.src
    )
    .filter(item => !!item)
}

/** 获取 html 根节点文字 */
export function getRawChildrenText(passProps: any) {
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
    console.error('getRawChildrenText error', error)
    return ''
  }
}

/** AC 自动机猜测条目文字 */
export function getACSearch({ style, passProps, params, onPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const navigation = navigationReference()
    const { subjectId } = params
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
export async function getSubject({ passProps, params, href, onLinkPress }, render?: Fn) {
  try {
    const text = getRawChildrenText(passProps)
    if (!text) return

    const { subjectId } = params
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
    console.error('render-html', 'a', 'utils', 'getSubject', error)
  }
}

/** 帖子媒体块 */
export async function getTopic({ passProps, params, onLinkPress }, render?: Fn) {
  try {
    const text = getRawChildrenText(passProps)
    if (!text) return

    const { topicId } = params
    await rakuenStore.init('topic')

    const last = getInt(topicId)
    const key = `comments${last}` as const
    await rakuenStore.init(key)

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
    console.error('render-html', 'a', 'utils', 'getTopic', error)
  }
}

/** 人物媒体块 */
export async function getMono({ passProps, params, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { monoId } = params
    const { cover, name, nameCn, _loaded } = subjectStore.mono(monoId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('mono', monoId))
      }, 2000)
    } else {
      const styles = memoStyles()
      if (cover) {
        /**
         * https://lain.bgm.tv/r/400/pic/crt/l/fc/77/114888_crt_hd3gG.jpg ->
         * https://lain.bgm.tv/pic/crt/g/fc/77/114888_crt_hd3gG.jpg
         */
        const gCover = cover.replace(/\/r\/\d+/g, '').replace(/\/(l|m)\//g, '/g/')
        const bottom = nameCn === text ? name : nameCn
        return (
          <View style={styles.wrap}>
            <Touchable animate onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover src={gCover} size={48} radius />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={11} bold numberOfLines={2} selectable>
                    {text}
                  </Text>
                  {bottom !== text && (
                    <Flex style={_.mt.xs}>
                      <Text
                        style={styles.bottom}
                        type='sub'
                        size={10}
                        bold
                        numberOfLines={1}
                        selectable
                      >
                        {bottom}
                      </Text>
                    </Flex>
                  )}
                </View>
              </Flex>
            </Touchable>
          </View>
        )
      }
    }
  }
}
