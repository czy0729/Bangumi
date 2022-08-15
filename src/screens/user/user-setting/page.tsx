/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-15 09:21:55
 */
import React from 'react'
import { View } from 'react-native'
import {
  Flex,
  Heatmap,
  Iconfont,
  Image,
  Input,
  ScrollView,
  SegmentedControl,
  Text,
  Touchable
} from '@components'
import { IconTouchable } from '@_'
import { _ } from '@stores'
import { open, confirm, arrGroup } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { IOS, HOST_IMAGE_UPLOAD } from '@constants'
import { memoStyles } from './styles'
import { Ctx } from './types'

const headers = {
  Referer: ''
}

class UserSetting extends React.Component {
  state = {
    expand: false
  }

  scrollTo: any = () => {}

  onViewOrigin = (item: string, index: number) => {
    t('个人设置.查看原图', {
      index
    })
    open(item.replace('small', 'origin'))
  }

  onExpand = () => {
    const { expand } = this.state
    this.setState({
      expand: !expand
    })
  }

  onRefresh = async () => {
    if (IOS) {
      this.scrollTo({
        x: 0,
        y: 0,
        animated: true
      })
    }

    const { $ }: Ctx = this.context
    $.onRefresh()
  }

  get avatar() {
    const { $ }: Ctx = this.context
    const { avatar } = $.usersInfo
    return avatar?.large
  }

  get previewAvatarSrc() {
    const { $ }: Ctx = this.context
    const { avatar } = $.usersInfo
    if (!$.state.avatar) {
      return avatar?.large
    }

    return $.state.avatar || avatar?.large
  }

  get previewBgSrc() {
    const { $ }: Ctx = this.context
    const { avatar } = $.usersInfo
    if (!$.state.bg) {
      return this.previewAvatarSrc
    }

    return $.state.bg || $.state.avatar || avatar?.large
  }

  get blurRadius() {
    const { $ }: Ctx = this.context
    if ($.state.bg) return 0

    return IOS ? 2 : 8
  }

  renderPreview() {
    const { $, navigation }: Ctx = this.context
    const { nickname, id, username } = $.usersInfo
    return (
      <View style={_.mb.md}>
        <View style={this.styles.container}>
          <Image
            key={this.previewBgSrc}
            style={this.styles.blurView}
            src={this.previewBgSrc}
            headers={headers}
            width={_.window.contentWidth}
            height={this.styles.preview.height}
            blurRadius={this.blurRadius}
            fallback={!!this.blurRadius}
          />
          <Flex style={this.styles.mask} direction='column' justify='center'>
            <Image
              key={this.previewAvatarSrc}
              style={this.styles.avatar}
              src={this.previewAvatarSrc}
              headers={headers}
              size={64}
              radius={32}
              border={_.__colorPlain__}
              borderWidth={1.5}
              placeholder={false}
              shadow
              fallback
            />
            <Text style={_.mt.md} type={_.select('plain', 'title')} size={12}>
              {nickname}
              <Text type={_.select('plain', 'title')} size={12}>
                {' '}
                {username || id ? `@${username || id} ` : ''}
              </Text>
            </Text>
          </Flex>
        </View>
        <View style={this.styles.example}>
          <Touchable
            onPress={() =>
              navigation.push('Zone', {
                userId: 'sukaretto'
              })
            }
          >
            <Text size={10} lineHeight={16} bold type='__plain__'>
              [示例]
            </Text>
          </Touchable>
        </View>
      </View>
    )
  }

  renderForm() {
    const { $ }: Ctx = this.context
    const { nickname, sign_input, bg, avatar } = $.state
    const { expand } = this.state
    return (
      <>
        {expand && (
          <>
            <Flex style={_.mt.md}>
              <Text>昵称</Text>
              <Flex.Item style={_.ml.md}>
                <Input
                  style={this.styles.input}
                  defaultValue={nickname}
                  placeholder='请填入昵称'
                  autoCapitalize='none'
                  showClear
                  onChangeText={text => $.onChangeText('nickname', text)}
                />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.md}>
              <Text>签名</Text>
              <Flex.Item style={_.ml.md}>
                <Input
                  style={this.styles.input}
                  defaultValue={sign_input}
                  placeholder='请填入昵称'
                  autoCapitalize='none'
                  showClear
                  onChangeText={text => $.onChangeText('sign_input', text)}
                />
              </Flex.Item>
            </Flex>
            <Flex style={_.mt.md}>
              <Text>头像</Text>
              <Flex.Item style={_.ml.md}>
                <Input
                  style={this.styles.input}
                  defaultValue={avatar}
                  placeholder='请填入网络地址'
                  autoCapitalize='none'
                  showClear
                  onChangeText={text => $.onChangeText('avatar', text)}
                />
              </Flex.Item>
              <IconTouchable
                style={_.ml.xs}
                name='md-info-outline'
                onPress={() =>
                  confirm(
                    '此头像非网页版头像，仅在APP内时光机和个人空间中显示。需要输入图片网络地址，是否前往免费图床？',
                    () => open(HOST_IMAGE_UPLOAD),
                    '提示'
                  )
                }
              />
            </Flex>
            <Flex style={[_.mt.md, _.mb.md]}>
              <Text>背景</Text>
              <Flex.Item style={_.ml.md}>
                <Input
                  style={this.styles.input}
                  defaultValue={bg}
                  placeholder='请填入网络地址'
                  autoCapitalize='none'
                  showClear
                  onChangeText={text => $.onChangeText('bg', text)}
                />
              </Flex.Item>
              <IconTouchable
                style={_.ml.xs}
                name='md-info-outline'
                onPress={() =>
                  confirm(
                    '网页版没有背景概念，仅在APP内时光机和个人空间中显示。需要输入图片网络地址，是否前往免费图床？',
                    () => open(HOST_IMAGE_UPLOAD),
                    '提示'
                  )
                }
              />
            </Flex>
          </>
        )}
        <Touchable style={this.styles.more} onPress={this.onExpand}>
          <Flex justify='center'>
            <Text style={[_.mt.sm, _.mb.sm]} size={13} type='sub' bold>
              {expand ? '收起资料' : '展开资料'}
            </Text>
          </Flex>
        </Touchable>
      </>
    )
  }

  renderTabs() {
    const { $ }: Ctx = this.context
    const { selectedIndex } = $.state
    const values = ['预设背景', '随机头像']
    return (
      <SegmentedControl
        key={String($.state._loaded)}
        style={this.styles.segment}
        values={values}
        selectedIndex={selectedIndex}
        onValueChange={title => $.onValueChange(values.indexOf(title))}
      />
    )
  }

  renderOnlineBgs() {
    const { $ }: Ctx = this.context
    const { bgs } = $.state
    return (
      <>
        <Flex wrap='wrap'>
          <Touchable style={this.styles.bg} onPress={() => $.onSelectBg('')}>
            <Image
              key={this.previewAvatarSrc}
              src={this.previewAvatarSrc}
              headers={headers}
              width={this.styles.image.width}
              height={this.styles.image.height}
              radius
              blurRadius={IOS ? 2 : 8}
              fallback
            />
            <Text style={this.styles.blurText} type='__plain__' bold align='center'>
              头像毛玻璃
            </Text>
          </Touchable>
          {bgs.map((item: string, index: number) => (
            <Touchable
              key={index}
              style={[this.styles.bg, index % 2 === 0 && _.ml.md]}
              onPress={() => $.onSelectBg(item)}
              onLongPress={() => this.onViewOrigin(item, index)}
            >
              <Image
                key={item}
                src={item}
                width={this.styles.image.width}
                height={this.styles.image.height}
                headers={headers}
                radius
              />
              {!index && <Heatmap id='个人设置.查看原图' />}
            </Touchable>
          ))}
        </Flex>
        <Text style={_.mt.md} align='center' size={12} bold type='sub'>
          长按可查看原图
        </Text>
      </>
    )
  }

  renderPixivs() {
    const { $ }: Ctx = this.context
    const { pixivs } = $.state
    return (
      <>
        <Flex wrap='wrap'>
          {pixivs.map((item: string, index: number) => (
            <Touchable
              key={`${index}|${item}`}
              style={[this.styles.bg, index % 2 === 1 && _.ml.md]}
              onPress={() => $.onSelectBg(item)}
              onLongPress={() =>
                this.onViewOrigin(item.replace('/c/540x540_70', ''), index)
              }
            >
              <Image
                src={item}
                width={this.styles.image.width}
                height={this.styles.image.height}
                headers={headers}
                radius
              />
            </Touchable>
          ))}
        </Flex>
        <Text style={_.mt.md} align='center' size={12} bold type='sub'>
          背景图保存后会替换成高清版本
        </Text>
      </>
    )
  }

  renderAvatars = () => {
    const { $ }: Ctx = this.context
    const { avatars } = $.state
    return arrGroup(avatars, 5).map((items, index) => (
      <Flex key={index} justify='between'>
        {items.map((item: string, idx: number) => {
          if (index === 2 && idx === 4) {
            return (
              <Image
                key={item}
                style={_.mb.md}
                src={this.avatar}
                headers={headers}
                size={60}
                radius={30}
                border={_.__colorPlain__}
                borderWidth={0}
                placeholder={false}
                shadow
                fallback
                onPress={() => $.onSelectAvatar('')}
              />
            )
          }

          return (
            <Image
              key={item}
              style={_.mb.md}
              src={item}
              headers={headers}
              size={60}
              radius={30}
              border={_.__colorPlain__}
              borderWidth={0}
              placeholder={false}
              shadow
              fallback
              onPress={() => $.onSelectAvatar(item)}
            />
          )
        })}
      </Flex>
    ))
  }

  renderRefresh() {
    return (
      <View style={this.styles.btn}>
        <Touchable style={this.styles.touch} onPress={this.onRefresh}>
          <Flex style={this.styles.icon} justify='center'>
            <Iconfont name='md-refresh' color={_.colorPlain} size={20} />
          </Flex>
        </Touchable>
      </View>
    )
  }

  render() {
    const { $ }: Ctx = this.context
    const { selectedIndex } = $.state
    return (
      <View style={_.container.plain}>
        {this.renderPreview()}
        <ScrollView
          connectRef={scrollTo => (this.scrollTo = scrollTo)}
          contentContainerStyle={this.styles.contentContainerStyle}
          keyboardDismissMode='on-drag'
        >
          {this.renderForm()}
          {this.renderTabs()}
          {selectedIndex === 0 && this.renderOnlineBgs()}
          {/* {selectedIndex === 1 && this.renderPixivs()} */}
          {selectedIndex === 1 && this.renderAvatars()}
        </ScrollView>
        {this.renderRefresh()}
      </View>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default obc(UserSetting)
