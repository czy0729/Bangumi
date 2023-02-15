/*
 * @Author: czy0729
 * @Date: 2022-05-13 05:32:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-15 06:07:32
 */
import React from 'react'
import { View } from 'react-native'
import { _, systemStore, subjectStore, rakuenStore, userStore } from '@stores'
import { runAfter, HTMLDecode, navigationReference } from '@utils'
import { IOS, API_COVER, API_AVATAR } from '@constants'
import { ReactNode } from '@types'
import { Touchable } from '../../touchable'
import { Flex } from '../../flex'
import { Text } from '../../text'
import { Iconfont } from '../../iconfont'
import { Cover } from '../cover'
import { Avatar } from '../avatar'
import { fetchMediaQueue } from '../utils'
import ACText from './ac-text'
import Rank from './rank'
import { memoStyles } from './styles'

/** @todo 待优化, 安卓Text中一定要过滤非文字节点 */
export function filterChildren(
  children: ReactNode | ReactNode[]
): ReactNode | ReactNode[] {
  if (IOS) return children

  const childrens = React.Children.toArray(children)
  const data = React.Children.toArray(children).filter(
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
export function getRawChildrenText(passProps) {
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
export function getSubject({ passProps, params, href, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { subjectId } = params
    const subject = subjectStore.subject(subjectId)
    const {
      images = {
        common: undefined
      },
      name,
      name_cn,
      rating = {
        score: undefined,
        total: undefined
      },
      rank,
      _loaded
    } = subject
    let { air_date } = subject
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('subject', subjectId))
      }, 2000)
    } else {
      const { score } = rating
      const image = images.common
      if (image) {
        const styles = memoStyles()
        const top = HTMLDecode(name_cn || name || text || '')
        const bottom = HTMLDecode(
          text !== top && text !== href ? text : name || name_cn || ''
        )
        const showScore = !systemStore.setting.hideScore && !!score
        const showBottom = bottom && bottom !== top
        if (air_date === '0000-00-00') air_date = ''
        return (
          <View style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover
                  src={API_COVER(subjectId)}
                  size={48}
                  radius={_.radiusSm}
                  textOnly={false}
                  headers={userStore.requestHeaders}
                />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {top}{' '}
                    {!!air_date && (
                      <Text size={9} lineHeight={12} type='sub' bold>
                        {String(air_date).slice(0, 7)}
                      </Text>
                    )}
                  </Text>
                  {(showScore || showBottom) && (
                    <Flex style={_.mt.sm}>
                      {showScore && (
                        <Flex style={_.mr.xs}>
                          <Rank value={rank} />
                          <Iconfont name='md-star' size={10} color={_.colorWarning} />
                          <Text style={_.ml.xxs} type='sub' size={10} bold>
                            {score}
                          </Text>
                          {!!rating.total && (
                            <Text style={_.ml.xs} type='sub' size={10} bold>
                              ({rating.total})
                            </Text>
                          )}
                        </Flex>
                      )}
                      {showBottom && (
                        <Text
                          style={styles.bottom}
                          type='sub'
                          size={10}
                          bold
                          numberOfLines={1}
                          selectable
                        >
                          {showScore && '· '}
                          {bottom}
                        </Text>
                      )}
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

/** 帖子媒体块 */
export function getTopic({ passProps, params, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { topicId } = params
    const { userId, group, time, userName, _loaded } = rakuenStore.topic(topicId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('topic', topicId))
      }, 2000)
    } else {
      const styles = memoStyles()
      const { list } = rakuenStore.comments(topicId)
      if (userId && group && userName) {
        let reply = 0
        list.forEach(item => {
          reply += 1
          if (item?.sub?.length) reply += item.sub.length
        })

        return (
          <View style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Avatar
                  src={API_AVATAR(userId)}
                  size={48}
                  radius={_.radiusSm}
                  textOnly={false}
                />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {text}{' '}
                    {!!time && (
                      <Text size={9} lineHeight={12} type='sub' bold>
                        {String(time).split(' ')?.[0]}
                      </Text>
                    )}
                  </Text>
                  <Flex style={_.mt.xs}>
                    <Text
                      style={styles.bottom}
                      type='sub'
                      size={9}
                      lineHeight={10}
                      bold
                      numberOfLines={2}
                      selectable
                    >
                      {reply} 回复 · {group} · {userName}
                    </Text>
                  </Flex>
                </View>
              </Flex>
            </Touchable>
          </View>
        )
      }
    }
  }
}

/** 人物媒体块 */
export function getMono({ passProps, params, onLinkPress }) {
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
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover src={gCover} size={48} radius textOnly={false} quality={false} />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
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
