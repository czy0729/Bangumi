/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-30 22:43:01
 */
import React from 'react'
import { View } from 'react-native'
import {
  ScrollView,
  Flex,
  Image,
  Text,
  Input,
  Touchable,
  Heatmap
} from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { open } from '@utils'
import { inject, withHeader, obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { confirm } from '@utils/ui'
import { IOS } from '@constants'
import Check from './check'
import Store from './store'

const title = '个人设置'
const H_BG = Math.min(parseInt(_.window.width * 0.64), 288) + 8
const W_BGS = parseInt((_.window.contentWidth - _.md - _._wind * 2) / 2)
const H_BGS = W_BGS * 0.5625
const headers = {
  Referer: ''
}

export default
@inject(Store)
@withHeader({
  screen: title,
  hm: ['userSetting', 'UserSetting']
})
@obc
class UserSetting extends React.Component {
  static navigationOptions = {
    title
  }

  async componentDidMount() {
    const { $, navigation } = this.context
    $.init()

    navigation.setParams({
      extra: <Check $={$} />
    })
  }

  onViewOrigin = (item, index) => {
    t('个人设置.查看原图', {
      index
    })
    open(item.replace('small', 'origin'))
  }

  renderPreview() {
    const { $, navigation } = this.context
    const { avatar = {}, nickname, id, username } = $.usersInfo
    const bgSrc = $.bg || avatar.large
    const avatarSrc = $.avatar || avatar.large
    const blurRadius = bgSrc === avatar.large ? (IOS ? 2 : 1) : 0
    return (
      <View>
        <Image
          key={bgSrc}
          style={this.styles.avatar}
          headers={headers}
          src={bgSrc}
          width={_.window.width}
          height={H_BG}
          blurRadius={blurRadius}
        />
        <Flex style={this.styles.mask} direction='column' justify='center'>
          <Image
            key={avatarSrc}
            style={_.mt.md}
            headers={headers}
            src={avatarSrc}
            size={88}
            radius={44}
            border={_.__colorPlain__}
            borderWidth={2}
            shadow
          />
          <Text style={_.mt.md} type={_.select('plain', 'title')}>
            {nickname}
            <Text type={_.select('plain', 'title')}>
              {' '}
              {username || id ? `@${username || id} ` : ''}
            </Text>
          </Text>
        </Flex>
        <Touchable
          style={this.styles.example}
          onPress={() =>
            navigation.push('Zone', {
              userId: 'sukaretto'
            })
          }
        >
          <Text size={10} lineHeight={16} type='__plain__'>
            [示例]
          </Text>
        </Touchable>
      </View>
    )
  }

  renderForm() {
    const { $ } = this.context
    const { nickname, sign_input, bg, avatar } = $.state
    return (
      <>
        <Flex>
          <Text>昵称</Text>
          <Flex.Item style={_.ml.sm}>
            <Input
              style={this.styles.input}
              defaultValue={nickname}
              placeholder='请填入昵称'
              autoCapitalize='none'
              showClear
              onChangeText={text => $.changeText('nickname', text)}
            />
          </Flex.Item>
        </Flex>
        <Flex style={_.mt.md}>
          <Text>签名</Text>
          <Flex.Item style={_.ml.sm}>
            <Input
              style={this.styles.input}
              defaultValue={sign_input}
              placeholder='请填入昵称'
              autoCapitalize='none'
              showClear
              onChangeText={text => $.changeText('sign_input', text)}
            />
          </Flex.Item>
        </Flex>
        <Flex style={_.mt.md}>
          <Text>头像</Text>
          <Flex.Item style={_.ml.sm}>
            <Input
              style={this.styles.input}
              defaultValue={avatar}
              placeholder='请填入网络地址'
              autoCapitalize='none'
              showClear
              onChangeText={text => $.changeText('avatar', text)}
            />
          </Flex.Item>
          <IconTouchable
            style={_.ml.xs}
            name='information'
            size={20}
            onPress={() =>
              confirm(
                '此头像非网页版头像，仅在APP内时光机和个人空间中显示。需要输入图片网络地址，是否前往免费图床？',
                () => open('https://imgchr.com/'),
                '提示'
              )
            }
          />
        </Flex>
        <Flex style={_.mt.md}>
          <Text>背景</Text>
          <Flex.Item style={_.ml.sm}>
            <Input
              style={this.styles.input}
              defaultValue={bg}
              placeholder='请填入网络地址'
              autoCapitalize='none'
              showClear
              onChangeText={text => $.changeText('bg', text)}
            />
          </Flex.Item>
          <IconTouchable
            style={_.ml.xs}
            name='information'
            size={20}
            onPress={() =>
              confirm(
                '网页版没有背景概念，仅在APP内时光机和个人空间中显示。需要输入图片网络地址，是否前往免费图床？',
                () => open('https://imgchr.com/'),
                '提示'
              )
            }
          />
        </Flex>
      </>
    )
  }

  renderOnlineBgs() {
    const { $ } = this.context
    const { bgs } = $.state
    return (
      <>
        <Text style={_.mt.lg}>
          推荐背景{' '}
          <Text type='sub' size={12} lineHeight={14}>
            长按可查看原图
          </Text>
        </Text>
        <Flex style={_.mt.sm} wrap='wrap'>
          {bgs.map((item, index) => (
            <Touchable
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              style={[this.styles.bg, index % 2 === 1 && _.ml.md]}
              onPress={() => $.onSelectBg(item)}
              onLongPress={() => this.onViewOrigin(item, index)}
            >
              <Image
                src={item}
                width={W_BGS}
                height={H_BGS}
                headers={headers}
                radius
              />
              {!index && <Heatmap id='个人设置.查看原图' />}
            </Touchable>
          ))}
        </Flex>
      </>
    )
  }

  render() {
    return (
      <View style={_.container.plain}>
        {this.renderPreview()}
        <ScrollView
          contentContainerStyle={this.styles.contentContainerStyle}
          scrollToTop
        >
          {this.renderForm()}
          {this.renderOnlineBgs()}
        </ScrollView>
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

const memoStyles = _.memoStyles(_ => ({
  mask: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.48)'
  },
  avatar: {
    backgroundColor: _.__colorPlain__
  },
  contentContainerStyle: {
    paddingTop: _.md + 8,
    paddingHorizontal: _.wind,
    paddingBottom: _.bottom
  },
  bg: {
    width: W_BGS,
    height: H_BGS,
    marginBottom: _.md
  },
  input: {
    paddingRight: 8
  },
  example: {
    position: 'absolute',
    zIndex: 2,
    right: _.wind,
    bottom: _.sm,
    opacity: 0.64
  }
}))
