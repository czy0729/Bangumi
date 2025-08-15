/*
 * @Author: czy0729
 * @Date: 2020-07-09 16:54:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:28:07
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Image, Loading, Modal, Text } from '@components'
import { _, timelineStore } from '@stores'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import {
  hash,
  HOST_CDN,
  MODEL_TIMELINE_TYPE,
  SCROLL_VIEW_RESET_PROPS,
  VERSIONS_AVATAR
} from '@constants'
import { TimeLineType } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props } from './types'

class UsedModal extends React.Component<Props> {
  static defaultProps = {
    title: '',
    visible: false
  }

  state = {
    name: {
      list: [],
      _loaded: 0
    },
    avatar: [
      {
        uri: this.props.defaultAvatar
      }
    ]
  }

  UNSAFE_componentWillReceiveProps({ visible }) {
    if (visible && !this.state.name._loaded) {
      this.checkUsedName()
      this.checkUserAvatar()
    }
  }

  checkUsedName = async () => {
    const { $ } = this.props
    const { id, username } = $.usersInfo
    const userId = username || id
    const data = {
      userId,
      type: MODEL_TIMELINE_TYPE.getValue<TimeLineType>('吐槽')
    }
    await timelineStore.fetchUsersTimeline(data, true)
    await timelineStore.fetchUsersTimeline(data)
    await timelineStore.fetchUsersTimeline(data)

    this.setState({
      name: {
        list: timelineStore
          .usersTimeline(userId)
          .list.filter(
            item => item.reply && item.reply.content && item.reply.content.includes('改名为')
          )
          .map(item => ({
            date: item.date,
            content: item.reply.content
          })),
        _loaded: 1
      }
    })
  }

  checkUserAvatar = async () => {
    const { $ } = this.props
    const { avatar } = $.usersInfo
    const { medium } = avatar || {}
    let _src = String(medium || '').split('?')[0]
    if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
      _src = `https:${_src}`
    }
    _src = _src.replace('http://', 'https://')
    const _hash = hash(_src)
    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const sources = VERSIONS_AVATAR.map(
      item => `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${item}/data/avatar/m/${path}/${_hash}.jpg`
    )
    this.setState({
      avatar: [this.props.defaultAvatar, ...sources]
    })

    /** @todo 比较图片相似度 */
    // let loaded = 0
    // sources.forEach(async (item, index) => {
    //   const { _response } = await xhrCustom({
    //     url: item.uri,
    //     responseType: 'arraybuffer'
    //   })
    //   sources[index].size = _response.length
    //   sources[index].base64 = _response
    //   loaded += 1

    //   if (loaded >= sources.length) {
    //     log(sources)
    //     this.setState({
    //       avatar: sources
    //     })
    //   }
    // })
  }

  renderAvatars() {
    const { avatar } = this.state
    return (
      <ScrollView
        contentContainerStyle={this.styles.avatars}
        horizontal
        {...SCROLL_VIEW_RESET_PROPS}
      >
        {avatar.map((item, index) => (
          <Image
            key={index}
            style={_.mr.sm}
            src={item}
            size={40}
            radius={20}
            placeholder={false}
            errorToHide
          />
        ))}
      </ScrollView>
    )
  }

  renderNames() {
    const { name } = this.state
    return (
      <ScrollView contentContainerStyle={this.styles.names} {...SCROLL_VIEW_RESET_PROPS}>
        {name._loaded ? (
          name.list.length ? (
            name.list.map((item, index) => (
              <Flex key={index} style={this.styles.item} align='start'>
                <Text style={this.styles.date} type='sub' size={12}>
                  {item.date}
                </Text>
                <Flex.Item style={_.ml.sm}>
                  <Text size={12}>{item.content}</Text>
                </Flex.Item>
              </Flex>
            ))
          ) : (
            <Flex style={this.styles.empty} direction='column' justify='center'>
              <Text size={12} align='center'>
                该用户没有修改过名字
              </Text>
            </Flex>
          )
        ) : (
          <Loading />
        )}
      </ScrollView>
    )
  }

  render() {
    r(COMPONENT)

    const { $, visible } = this.props
    return (
      <Modal
        style={this.styles.modal}
        visible={visible}
        title='用户资料修改历史'
        onClose={$.closeUsedModal}
      >
        <View style={this.styles.content}>
          {this.renderAvatars()}
          {this.renderNames()}
        </View>
      </Modal>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(UsedModal)
