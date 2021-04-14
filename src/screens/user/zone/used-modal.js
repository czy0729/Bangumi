/*
 * @Author: czy0729
 * @Date: 2020-07-09 16:54:03
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-27 10:02:34
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Loading, Flex, Text, Image } from '@components'
import Modal from '@components/@/ant-design/modal'
import { _, timelineStore } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_TIMELINE_TYPE } from '@constants/model'
import { hash, HOST_CDN, VERSIONS_AVATAR } from '@constants/cdn'

export default
@obc
class UsedModal extends React.Component {
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
    const { $ } = this.context
    const { id, username } = $.usersInfo
    const userId = username || id
    const data = {
      userId,
      type: MODEL_TIMELINE_TYPE.getValue('吐槽')
    }
    await timelineStore.fetchUsersTimeline(data, true)
    await timelineStore.fetchUsersTimeline(data)
    await timelineStore.fetchUsersTimeline(data)

    this.setState({
      name: {
        list: timelineStore
          .usersTimeline(userId)
          .list.filter(
            item =>
              item.reply &&
              item.reply.content &&
              item.reply.content.includes('改名为')
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
    const { $ } = this.context
    const { avatar = {} } = $.usersInfo
    let _src = avatar.medium.split('?')[0]
    if (_src.indexOf('https:') === -1 && _src.indexOf('http:') === -1) {
      _src = `https:${_src}`
    }
    _src = _src.replace('http://', 'https://')
    const _hash = hash(_src)
    const path = _hash.slice(0, 1).toLocaleLowerCase()
    const sources = VERSIONS_AVATAR.map(
      item =>
        `${HOST_CDN}/gh/czy0729/Bangumi-OSS@${item}/data/avatar/m/${path}/${_hash}.jpg`
    )
    this.setState({
      avatar: [this.props.defaultAvatar, ...sources]
    })

    /**
     * @todo 比较图片相似度
     */
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
        showsHorizontalScrollIndicator={false}
      >
        {avatar.map(item => (
          <Image
            style={_.mr.sm}
            key={item}
            src={item}
            size={40}
            radius={20}
            placeholder={false}
          />
        ))}
      </ScrollView>
    )
  }

  renderNames() {
    const { name } = this.state
    return (
      <ScrollView contentContainerStyle={this.styles.names}>
        {name._loaded ? (
          name.list.length ? (
            name.list.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
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
    const { $ } = this.context
    const { visible } = this.props
    return (
      <Modal
        style={this.styles.modal}
        visible={visible}
        title={<Text type='title'>历史</Text>}
        transparent
        maskClosable
        closable
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

const memoStyles = _.memoStyles(_ => ({
  modal: {
    width: _.window.width - 2 * _.wind,
    maxWidth: 320,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1)
  },
  content: {
    paddingHorizontal: _.sm
  },
  avatars: {
    minHeight: 40,
    paddingVertical: _.sm,
    marginTop: _.sm
  },
  names: {
    height: 240,
    paddingVertical: _.sm
  },
  item: {
    paddingVertical: _.sm
  },
  date: {
    width: 80
  },
  empty: {
    height: '100%'
  }
}))
