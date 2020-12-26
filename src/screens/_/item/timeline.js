/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-27 01:00:21
 */
import React from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Katakana, Text, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, findSubjectCn, getCoverMedium } from '@utils/app'
import { matchUserId } from '@utils/match'
import { t } from '@utils/fetch'
import { HOST, HOST_NAME, EVENT, IMG_WIDTH_SM, IMG_HEIGHT_SM } from '@constants'
import Avatar from '../base/avatar'
import Cover from '../base/cover'
import Stars from '../base/stars'
import Name from '../base/name'

const avatarWidth = 32
const avatarCoverWidth = 40

export default
@observer
class ItemTimeline extends React.Component {
  static defaultProps = {
    navigation: null,
    avatar: {},
    p1: {},
    p2: {},
    p3: {
      text: [],
      url: []
    },
    p4: {},
    reply: {},
    image: [],
    clearHref: '',
    event: EVENT,
    onDelete: Function.prototype
  }

  appNavigate = (url, passParams) => {
    const { navigation, event } = this.props
    appNavigate(url, navigation, passParams, event)
  }

  onClear = () => {
    const { clearHref, onDelete } = this.props
    Alert.alert('警告', '确定删除?', [
      {
        text: '取消',
        style: 'cancel'
      },
      {
        text: '确定',
        onPress: () => onDelete(clearHref)
      }
    ])
  }

  get userId() {
    const { avatar } = this.props
    return matchUserId(String(avatar?.url).replace(HOST, ''))
  }

  renderP3() {
    const { p3, image } = this.props

    // 位置3: 多个条目信息
    let $p3
    if (p3.text.length > 1) {
      $p3 = []
      p3.text.forEach((item, index) => {
        const url = String(p3.url[index])
        const isSubject =
          url.includes(`${HOST_NAME}/subject/`) && !url.includes('/ep/')
        const subjectId = isSubject ? matchSubjectId(url) : 0
        $p3.push(
          <Katakana
            key={item || index}
            type={isSubject ? 'main' : 'title'}
            lineHeight={14}
            bold={isSubject}
            onPress={() =>
              this.appNavigate(
                url,
                isSubject && {
                  _jp: item,
                  _cn: findSubjectCn(item, subjectId),
                  _name: item,
                  _image: getCoverMedium(image[index] || '')
                }
              )
            }
          >
            {isSubject ? findSubjectCn(item, subjectId) : item}
          </Katakana>,
          <Text key={`${item}.`} lineHeight={14} type='sub'>
            、
          </Text>
        )
      })
      $p3.pop()
    } else if (p3.text.length === 1) {
      const isSubject =
        !!String(!!p3.url.length && p3.url[0]).includes(
          `${HOST_NAME}/subject/`
        ) && !p3.url[0].includes('/ep/')
      const subjectId = isSubject
        ? matchSubjectId(!!p3.url.length && p3.url[0])
        : 0
      $p3 = (
        <Katakana
          type={isSubject ? 'main' : 'title'}
          lineHeight={14}
          bold={isSubject}
          onPress={() =>
            this.appNavigate(
              !!p3.url.length && p3.url[0],
              isSubject && {
                _jp: !!p3.text.length && p3.text[0],
                _cn: findSubjectCn(!!p3.text.length && p3.text[0], subjectId),
                _name: !!p3.text.length && p3.text[0],
                _image: getCoverMedium((!!image.length && image[0]) || '')
              }
            )
          }
        >
          {isSubject
            ? findSubjectCn(!!p3.text.length && p3.text[0], subjectId)
            : !!p3.text.length && p3.text[0]}
        </Katakana>
      )
    }

    return $p3
  }

  renderP() {
    const { p1, p2, p3, p4, avatar } = this.props

    // 是否渲染第一行
    const hasPosition = !!(p1.text || p2.text || p3.text.length || p4.text)
    if (!hasPosition) {
      return null
    }

    return (
      <Text lineHeight={14}>
        {!!p1.text && (
          <Name
            userId={this.userId}
            type='title'
            lineHeight={14}
            bold
            onPress={() =>
              this.appNavigate(p1.url, {
                _name: p1.text,
                _image: avatar.src
              })
            }
          >
            {p1.text}
          </Name>
        )}
        <Text type='sub' lineHeight={14}>
          {' '}
          {p2.text}{' '}
        </Text>
        {this.renderP3()}
        {!!p4.text && (
          <Text type='sub' lineHeight={14}>
            {' '}
            {p4.text}
          </Text>
        )}
      </Text>
    )
  }

  renderDesc() {
    const {
      navigation,
      subject,
      image,
      subjectId,
      comment,
      reply,
      event
    } = this.props
    const { id, data = {} } = event
    return (
      <>
        {!!subject && (
          <View style={_.mt.sm}>
            <Katakana.Provider>
              <Katakana
                type='main'
                bold
                onPress={() => {
                  t(id, {
                    to: 'Subject',
                    subjectId,
                    ...data
                  })
                  navigation.push('Subject', {
                    subjectId,
                    _cn: findSubjectCn(subject, subjectId),
                    _jp: subject,
                    _image: getCoverMedium(!!image.length && image[0])
                  })
                }}
              >
                {findSubjectCn(subject, subjectId)}
              </Katakana>
            </Katakana.Provider>
          </View>
        )}
        {!!(comment || reply.content) && (
          <Text style={_.mt.sm} lineHeight={20}>
            {comment || reply.content}
          </Text>
        )}
      </>
    )
  }

  renderImages(type) {
    const { p3, image } = this.props
    if (image.length <= 1) {
      return null
    }

    const images = image.map((item, index) => {
      const isAvatar = !String(!!p3.url.length && p3.url[0]).includes('subject')
      return (
        <View key={item || index} style={type ? _.mr.md : _.mr.sm}>
          <Cover
            src={item}
            size={isAvatar ? avatarCoverWidth : IMG_WIDTH_SM}
            height={isAvatar ? avatarCoverWidth : IMG_HEIGHT_SM}
            radius
            shadow
            type={type}
            onPress={() => {
              const url = (!!p3.url.length && p3.url[index]) || ''
              const subjectId = matchSubjectId(url)
              this.appNavigate(url, {
                _cn: findSubjectCn(
                  !!p3.text.length && p3.text[index],
                  subjectId
                ),
                _jp: !!p3.text.length && p3.text[index],
                _name: !!p3.text.length && p3.text[index],
                _image: image
              })
            }}
          />
        </View>
      )
    })

    if (image.length <= 3) {
      return (
        <Flex style={_.mt.sm} wrap='wrap'>
          {images}
        </Flex>
      )
    }

    // 有一次性操作很多条目很多图片的情况, 水平滚动比较合适
    return (
      <ScrollView
        style={_.mt.sm}
        contentContainerStyle={this.styles.images}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {images}
      </ScrollView>
    )
  }

  renderAvatar() {
    const { navigation, avatar, p1, event } = this.props
    return (
      <View style={this.styles.image}>
        {!!avatar.src && (
          <Avatar
            navigation={navigation}
            size={avatarWidth}
            userId={this.userId}
            name={p1.text}
            src={avatar.src}
            event={event}
          />
        )}
      </View>
    )
  }

  renderContent() {
    const {
      index,
      p2,
      p3,
      star,
      reply,
      comment,
      time,
      image,
      clearHref
    } = this.props
    const _image = !!image.length && image[0]
    const bodyStyle =
      image.length === 1 && !(comment || reply.content) ? _.mt.lg : _.mt.md
    const rightCoverIsAvatar = !String(!!p3.url.length && p3.url[0]).includes(
      'subject'
    )
    const showImages = image.length >= 3
    const type = p2?.text?.includes('读')
      ? '书籍'
      : p2?.text?.includes('听')
      ? '音乐'
      : p2?.text?.includes('玩')
      ? '游戏'
      : ''
    return (
      <Flex.Item
        style={[
          showImages ? this.styles.contentNoPaddingRight : this.styles.content,
          index !== 0 && !_.flat && this.styles.border,
          _.ml.sm
        ]}
      >
        <Flex align='start'>
          <Flex.Item>
            <View style={showImages && this.styles.contentHasPaddingRight}>
              {this.renderP()}
              {this.renderDesc()}
            </View>
            {this.renderImages(type)}
            <Flex style={bodyStyle}>
              {!!reply.count && (
                <Text
                  type='primary'
                  size={12}
                  onPress={() => this.appNavigate(reply.url)}
                >
                  {reply.count}
                </Text>
              )}
              <Text style={_.mr.sm} type='sub' size={12}>
                {time}
              </Text>
              <Stars value={star} />
            </Flex>
          </Flex.Item>
          <Flex align='start'>
            {image.length === 1 && (
              <View style={_.ml.md}>
                <Cover
                  src={_image}
                  size={rightCoverIsAvatar ? avatarCoverWidth : IMG_WIDTH_SM}
                  height={rightCoverIsAvatar ? avatarCoverWidth : IMG_HEIGHT_SM}
                  radius
                  shadow
                  type={type}
                  onPress={() =>
                    this.appNavigate(!!p3.url.length && p3.url[0], {
                      _jp: !!p3.text.length && p3.text[0],
                      _name: !!p3.text.length && p3.text[0],
                      _image
                    })
                  }
                />
              </View>
            )}
            {!!clearHref && (
              <Touchable style={_.ml.sm} onPress={this.onClear}>
                <Iconfont style={this.styles.del} name='close' size={13} />
              </Touchable>
            )}
          </Flex>
        </Flex>
      </Flex.Item>
    )
  }

  render() {
    const { style, avatar, children } = this.props
    return (
      <Flex
        style={[
          _.container.item,
          _.flat && this.styles.flat,
          _.flat && !avatar.src && this.styles.flatNoAvatar,
          style
        ]}
        align='start'
      >
        {this.renderAvatar()}
        {this.renderContent()}
        {children}
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  flat: {
    paddingVertical: _.xs
  },
  flatNoAvatar: {
    marginTop: -_.md
  },
  images: {
    paddingTop: _.sm,
    paddingRight: _.sm,
    paddingBottom: _.md
  },
  image: {
    width: avatarWidth,
    marginTop: _.md,
    marginLeft: _.wind
  },
  content: {
    paddingTop: _.md,
    paddingRight: _.wind,
    paddingBottom: _.md
  },
  contentNoPaddingRight: {
    paddingVertical: _.md,
    paddingRight: _.wind - _._wind
  },
  contentHasPaddingRight: {
    paddingRight: _._wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  },
  del: {
    padding: _.sm,
    marginTop: -_.sm,
    marginRight: -_.sm,
    width: 12 + _.sm * 2,
    height: 12 + _.sm * 2
  }
}))

function matchSubjectId(url = '') {
  if (typeof url !== 'string') {
    return 0
  }

  const match = url.match(/\d+/)
  if (match && match.length) {
    return match[0]
  }
  return 0
}
