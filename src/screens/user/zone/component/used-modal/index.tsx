/*
 * @Author: czy0729
 * @Date: 2020-07-09 16:54:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-08-21 04:57:05
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Image, Loading, Modal, Text } from '@components'
import { _, timelineStore } from '@stores'
import { getTimestamp, lastDate } from '@utils'
import { ob } from '@utils/decorators'
import { r } from '@utils/dev'
import { picList } from '@utils/kv'
import { HOST_CDN_AVATAR, MODEL_TIMELINE_TYPE, SCROLL_VIEW_RESET_PROPS } from '@constants'
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
        uri: this.props.defaultAvatar,
        time: '当前'
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
    const { id } = $.usersInfo
    if (id) {
      const list = await picList(`pic/user/${id}/`)

      const result = list
        // 排序
        .sort((a, b) => new Date(a.lastModified).getTime() - new Date(b.lastModified).getTime())
        // 去重（保留最新的）
        .filter(
          (() => {
            const seen = new Set<string>()
            return el => {
              if (seen.has(el.eTag)) return false
              seen.add(el.eTag)
              return true
            }
          })()
        )
        .reverse()

      // 没有足够的数据, 不显示快照的
      if (!result.length) return

      this.setState({
        avatar: [
          {
            uri: this.props.defaultAvatar,
            time: '当前'
          },
          ...result.map(item => ({
            uri: `${HOST_CDN_AVATAR}/${item.key}/bgm_poster_200`,
            time: lastDate(getTimestamp(item.lastModified))
          }))
        ]
      })
    }
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
          <Flex key={item.uri || index} style={_.mr.sm} direction='column'>
            <Image src={item.uri} size={40} radius={20} placeholder={false} errorToHide />
            <Text style={_.mt.xs} type='sub' size={10} lineHeight={12} bold>
              {index && index === avatar.length - 1 ? '更久之前' : item.time}
            </Text>
          </Flex>
        ))}
      </ScrollView>
    )
  }

  renderNames() {
    const { name } = this.state
    return (
      <ScrollView style={this.styles.names} {...SCROLL_VIEW_RESET_PROPS}>
        {name._loaded ? (
          name.list.length ? (
            name.list.map((item, index) => {
              const [prev = '', after = ''] = String(item.content)
                .replace(/^从/g, '')
                .split('改名为')
              return (
                <Flex key={index} style={this.styles.item} align='start'>
                  <Text style={this.styles.date} type='sub' size={12}>
                    {item.date}
                  </Text>
                  <Flex.Item style={_.ml.sm}>
                    <Text size={12}>
                      从{' '}
                      <Text type='sub' size={12} bold underline>
                        {prev.trim()}
                      </Text>{' '}
                      改名为{' '}
                      <Text type='sub' size={12} bold underline>
                        {after.trim()}
                      </Text>
                    </Text>
                  </Flex.Item>
                </Flex>
              )
            })
          ) : (
            <Flex style={this.styles.empty} direction='column' justify='center'>
              <Text size={12} align='center'>
                该用户没有修改过名字
              </Text>
            </Flex>
          )
        ) : (
          <Flex style={this.styles.loading}>
            <Loading />
          </Flex>
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
        title='修改历史'
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
