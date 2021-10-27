/*
 * @Author: czy0729
 * @Date: 2021-10-21 08:36:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-10-27 14:40:12
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { _, systemStore, subjectStore, rakuenStore } from '@stores'
import { runAfter } from '@utils'
import { matchBgmLink, navigationReference } from '@utils/app'
import { HOST } from '@constants'
import { Touchable } from '../touchable'
import { Flex } from '../flex'
import { Text } from '../text'
import { Iconfont } from '../iconfont'
import { Cover } from './cover'
import { Avatar } from './avatar'
import { fetchMediaQueue } from './utils'

function A({ style, attrs = {}, children, passProps, onPress, ...other }) {
  const { matchLink, acSearch } = rakuenStore.setting
  const { href } = attrs
  const result = matchBgmLink(href)
  const route = result?.route
  const onLinkPress = () => onPress(null, href)

  let el
  const args = {
    style,
    passProps,
    params: result.params,
    href,
    onPress,
    onLinkPress
  }

  if (result?.app && route === 'Subject') {
    if (acSearch) el = getACSearch(args)
  } else if (matchLink) {
    if (route === 'Subject') {
      el = getSubject(args)
    } else if (route === 'Topic') {
      el = getTopic(args)
    } else if (route === 'Mono') {
      el = getMono(args)
    }
  }
  if (el) return el

  return (
    <Text style={style} selectable {...other} onPress={onLinkPress}>
      {children}
    </Text>
  )
}

/**
 * 获取html根节点文字
 */
function getRawChildrenText(passProps) {
  try {
    let text = passProps?.rawChildren?.[0]?.data
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
    console.info('getRawChildrenText error', error)
    return ''
  }
}

/**
 * AC自动机猜测条目文字
 */
function getACSearch({ style, passProps, params, onPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const navigation = navigationReference()
    const { subjectId } = params
    return (
      <Text
        style={style}
        selectable
        underline
        onPress={() =>
          navigation
            ? navigation.push('Subject', {
                subjectId,
                _cn: text
              })
            : onPress(null, `${HOST}/subject/${subjectId}`)
        }
      >
        {text}
      </Text>
    )
  }
}

/**
 * 条目媒体块
 */
function getSubject({ passProps, params, href, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { subjectId } = params
    const {
      images = {},
      name,
      name_cn,
      rating = {},
      _loaded
    } = subjectStore.subject(subjectId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('subject', subjectId))
      }, 2000)
    } else {
      const { score } = rating
      const image = images.common
      if (image) {
        const styles = memoStyles()
        const top = name_cn || name || text || ''
        const bottom = text !== top && text !== href ? text : name || name_cn || ''
        const showScore = !systemStore.setting.hideScore && score
        const showBottom = bottom && bottom !== top
        return (
          <Flex style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover src={image} size={48} radius textOnly={false} />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {top}
                  </Text>
                  {(showScore || showBottom) && (
                    <Flex style={_.mt.xs}>
                      {showScore && (
                        <Flex style={_.mr.xs}>
                          <Iconfont name='md-star' size={10} color={_.colorWarning} />
                          <Text style={_.ml.xxs} type='sub' size={10} bold>
                            {score}
                          </Text>
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
                          {bottom}
                        </Text>
                      )}
                    </Flex>
                  )}
                </View>
              </Flex>
            </Touchable>
          </Flex>
        )
      }
    }
  }
}

/**
 * 帖子媒体块
 */
function getTopic({ passProps, params, onLinkPress }) {
  const text = getRawChildrenText(passProps)
  if (text) {
    const { topicId } = params
    const { avatar, group, userName, _loaded } = rakuenStore.topic(topicId)
    if (!_loaded) {
      setTimeout(() => {
        runAfter(() => fetchMediaQueue('topic', topicId))
      }, 2000)
    } else {
      const styles = memoStyles()
      const { list } = rakuenStore.comments(topicId)
      if (avatar && group && userName) {
        return (
          <Flex style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Avatar src={avatar} size={48} radius textOnly={false} />
                <View style={_.ml.sm}>
                  <Text style={styles.top} size={12} bold numberOfLines={2} selectable>
                    {text}
                  </Text>
                  <Flex style={_.mt.xs}>
                    <Text
                      style={styles.bottom}
                      type='sub'
                      size={10}
                      bold
                      numberOfLines={1}
                      selectable
                    >
                      {list.length}回复 · {group} · {userName}
                    </Text>
                  </Flex>
                </View>
              </Flex>
            </Touchable>
          </Flex>
        )
      }
    }
  }
}

/**
 * 人物媒体块
 */
function getMono({ passProps, params, onLinkPress }) {
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
        const bottom = nameCn === text ? name : nameCn
        return (
          <Flex style={styles.wrap}>
            <Touchable onPress={onLinkPress}>
              <Flex style={styles.body}>
                <Cover
                  src={cover.replace('/m/', '/g/')}
                  size={48}
                  radius
                  textOnly={false}
                  quality={false}
                />
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
          </Flex>
        )
      }
    }
  }
}

export default observer(A)

const memoStyles = _.memoStyles(_ => ({
  wrap: {
    paddingTop: 10,
    paddingRight: 4,
    paddingBottom: 2
  },
  body: {
    overflow: 'hidden',
    padding: 6,
    paddingRight: 10,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: _.radiusSm
  },
  top: {
    maxWidth: _.window.contentWidth / 2
  },
  bottom: {
    maxWidth: _.window.contentWidth / 2
  }
}))
