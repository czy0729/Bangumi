/*
 * @Author: czy0729
 * @Date: 2019-05-08 17:13:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-21 17:59:28
 */
import React from 'react'
import { ScrollView, View, Alert } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Image, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { appNavigate, findBangumiCn, getCoverMedium } from '@utils/app'
import { matchUserId } from '@utils/match'
import { t } from '@utils/fetch'
import { HOST, HOST_NAME } from '@constants'
import Avatar from '../base/avatar'
import Stars from '../base/stars'

const avatarWidth = 28

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
    event: {},
    onDelete: Function.prototype
  }

  appNavigate = (url, passParams) => {
    const { navigation, event } = this.props
    appNavigate(url, navigation, passParams, event)
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
        $p3.push(
          <Text
            key={item}
            type={isSubject ? undefined : 'main'}
            underline={isSubject}
            size={12}
            onPress={() =>
              this.appNavigate(
                url,
                isSubject && {
                  _jp: item,
                  _cn: findBangumiCn(item),
                  _name: item,
                  _image: getCoverMedium(image[index] || '')
                }
              )
            }
          >
            {isSubject ? findBangumiCn(item) : item}
          </Text>,
          <Text key={`${item}.`} size={12}>
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
      $p3 = (
        <Text
          type={isSubject ? undefined : 'main'}
          underline={isSubject}
          size={12}
          onPress={() =>
            this.appNavigate(
              !!p3.url.length && p3.url[0],
              isSubject && {
                _jp: !!p3.text.length && p3.text[0],
                _cn: findBangumiCn(!!p3.text.length && p3.text[0]),
                _name: !!p3.text.length && p3.text[0],
                _image: getCoverMedium((!!image.length && image[0]) || '')
              }
            )
          }
        >
          {isSubject
            ? findBangumiCn(!!p3.text.length && p3.text[0])
            : !!p3.text.length && p3.text[0]}
        </Text>
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
      <Text size={12}>
        {!!p1.text && (
          <Text
            type='main'
            size={12}
            onPress={() =>
              this.appNavigate(p1.url, {
                _name: p1.text,
                _image: avatar.src
              })
            }
          >
            {p1.text}{' '}
          </Text>
        )}
        <Text size={12}>{p2.text} </Text>
        {this.renderP3()}
        {!!p4.text && <Text size={12}> {p4.text}</Text>}
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
          <Text
            style={_.mt.sm}
            underline
            onPress={() => {
              t(id, {
                to: 'Subject',
                subjectId,
                ...data
              })
              navigation.push('Subject', {
                subjectId,
                _cn: findBangumiCn(subject),
                _jp: subject,
                _image: getCoverMedium(!!image.length && image[0])
              })
            }}
          >
            {findBangumiCn(subject)}
          </Text>
        )}
        {!!(comment || reply.content) && (
          <Text style={_.mt.sm} lineHeight={20}>
            {comment || reply.content}
          </Text>
        )}
      </>
    )
  }

  renderImages() {
    const { p3, image } = this.props
    if (image.length <= 1) {
      return null
    }

    const images = image.map((item, index) => {
      const image = getCoverMedium(item)
      return (
        <Image
          key={item}
          style={_.mr.sm}
          src={image}
          size={48}
          radius
          border={_.colorBorder}
          onPress={() =>
            this.appNavigate(!!p3.url.length && p3.url[index], {
              _cn: findBangumiCn(!!p3.text.length && p3.text[index]),
              _jp: !!p3.text.length && p3.text[index],
              _name: !!p3.text.length && p3.text[index],
              _image: image
            })
          }
        />
      )
    })
    if (image.length <= 5) {
      return (
        <Flex style={_.mt.sm} wrap='wrap'>
          {images}
        </Flex>
      )
    }

    // 有一次性操作很多条目很多图片的情况, 水平滚动比较合适
    return (
      <ScrollView style={_.mt.sm} horizontal>
        {images}
      </ScrollView>
    )
  }

  render() {
    const {
      navigation,
      style,
      index,
      avatar,
      p1,
      p3,
      star,
      reply,
      time,
      image,
      clearHref,
      event,
      onDelete
    } = this.props
    const _image = getCoverMedium(!!image.length && image[0])
    return (
      <Flex style={[this.styles.item, style]} align='start'>
        <View style={this.styles.image}>
          {!!avatar.src && (
            <Avatar
              navigation={navigation}
              size={avatarWidth}
              userId={matchUserId(String(avatar.url).replace(HOST, ''))}
              name={p1.text}
              src={avatar.src}
              event={event}
            />
          )}
        </View>
        <Flex.Item
          style={[
            this.styles.content,
            index !== 0 && this.styles.border,
            _.ml.sm
          ]}
        >
          <Flex align='start'>
            <Flex.Item>
              {this.renderP()}
              {this.renderDesc()}
              {this.renderImages()}
              <Flex style={_.mt.md}>
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
                <Image
                  style={_.ml.sm}
                  src={_image}
                  size={48}
                  radius
                  border={_.colorBorder}
                  onPress={() =>
                    this.appNavigate(!!p3.url.length && p3.url[0], {
                      _jp: !!p3.text.length && p3.text[0],
                      _name: !!p3.text.length && p3.text[0],
                      _image
                    })
                  }
                />
              )}
              {!!clearHref && (
                <Touchable
                  style={_.ml.sm}
                  onPress={() => {
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
                  }}
                >
                  <Iconfont style={this.styles.del} name='close' size={12} />
                </Touchable>
              )}
            </Flex>
          </Flex>
        </Flex.Item>
      </Flex>
    )
  }

  get styles() {
    return memoStyles()
  }
}

ItemTimeline.defaultProps = {
  onDelete: Function.prototype
}

const memoStyles = _.memoStyles(_ => ({
  item: {
    backgroundColor: _.colorPlain
  },
  image: {
    width: avatarWidth,
    marginTop: _.md,
    marginLeft: _.wind
  },
  content: {
    paddingVertical: _.md,
    paddingRight: _.wind
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
