/*
 * @Author: czy0729
 * @Date: 2020-09-05 15:53:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 19:09:30
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
import { open, confirm, arrGroup, stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { fixedRemote } from '@utils/user-setting'
import { IOS, HOST_IMAGE_UPLOAD } from '@constants'
import { memoStyles } from './styles'
import { Ctx } from './types'

const headers = {
  Referer: ''
}

class UserSetting extends React.Component {
  state = {
    expand: false,
    more: false
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

    const { $ } = this.context as Ctx
    $.onRefresh()
  }

  get avatar() {
    const { $ } = this.context as Ctx
    const { avatar } = $.usersInfo
    return avatar?.large
  }

  get previewAvatarSrc() {
    const { $ } = this.context as Ctx
    const { avatar } = $.usersInfo
    if (!$.state.avatar) return avatar?.large

    return fixedRemote($.state.avatar, true) || avatar?.large
  }

  get previewBgSrc() {
    const { $ } = this.context as Ctx
    const { avatar } = $.usersInfo
    if (!$.state.bg) return this.previewAvatarSrc

    return fixedRemote($.state.bg) || fixedRemote($.state.avatar, true) || avatar?.large
  }

  get blurRadius() {
    const { $ } = this.context as Ctx
    if ($.state.bg) return 0

    return IOS ? ($.state.bg === '' && $.state.avatar ? 48 : 10) : 8
  }

  renderPreview() {
    const { $, navigation } = this.context as Ctx
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
            onPress={() => {
              navigation.push('Zone', {
                userId: 'sukaretto'
              })
            }}
          >
            <Text size={10} lineHeight={16} bold type='__plain__'>
              〔示例〕
            </Text>
          </Touchable>
        </View>
      </View>
    )
  }

  renderForm() {
    const { $ } = this.context as Ctx
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
                  placeholder='请填入签名'
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
    const { $ } = this.context as Ctx
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
    const { $ } = this.context as Ctx
    const { bgs } = $.state
    const { more } = this.state
    return (
      <>
        <Flex wrap='wrap'>
          <Touchable style={this.styles.bg} animate onPress={() => $.onSelectBg('')}>
            <Image
              key={this.previewAvatarSrc}
              src={fixedRemote(this.previewAvatarSrc)}
              headers={headers}
              width={this.styles.image.width}
              height={this.styles.image.height}
              radius
              blurRadius={IOS ? ($.state.avatar ? 64 : 16) : 8}
              fallback
            />
            <Text style={this.styles.blurText} type='__plain__' bold align='center'>
              头像毛玻璃
            </Text>
          </Touchable>
          {bgs
            .filter((item, index) => {
              if (more) return true
              return index <= bgs.length / 2
            })
            .map((item: string, index: number) => (
              <Touchable
                key={index}
                style={stl(this.styles.bg, index % 2 === 0 && _.ml.md)}
                animate
                onPress={() => $.onSelectBg(item)}
                onLongPress={() => this.onViewOrigin(item, index)}
              >
                <Image
                  key={item}
                  src={fixedRemote(item)}
                  width={this.styles.image.width}
                  height={this.styles.image.height}
                  headers={headers}
                  radius
                />
                {!index && <Heatmap id='个人设置.查看原图' />}
              </Touchable>
            ))}
        </Flex>
        <Touchable
          style={[_.mt.md, _.mb.md]}
          onPress={() => {
            this.setState({
              more: true
            })
          }}
        >
          <Text align='center' size={13} bold>
            {more ? '没有更多了' : '点击加载更多'}
          </Text>
        </Touchable>
        <Text style={_.mt.md} align='center' size={10} bold type='sub'>
          长按可查看原图 (以上图来源自 pixiv)
        </Text>
      </>
    )
  }

  renderPixivs() {
    const { $ } = this.context as Ctx
    const { pixivs } = $.state
    return (
      <>
        <Flex wrap='wrap'>
          {pixivs.map((item: string, index: number) => (
            <Touchable
              key={`${index}|${item}`}
              style={stl(this.styles.bg, index % 2 === 1 && _.ml.md)}
              animate
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
        <Text style={_.mt.md} align='center' size={10} bold type='sub'>
          背景图保存后会替换成高清版本
        </Text>
      </>
    )
  }

  renderAvatars = () => {
    const { $ } = this.context as Ctx
    const { avatars } = $.state
    return (
      <>
        {arrGroup(avatars, 5).map((items, index) => (
          <Flex key={index} justify='between'>
            {items.map((item: string, idx: number) => {
              if (index === 2 && idx === 4) {
                return (
                  <Touchable
                    key={item}
                    style={_.mb.md}
                    animate
                    scale={0.9}
                    onPress={() => $.onSelectAvatar('')}
                  >
                    <Image
                      src={this.avatar}
                      headers={headers}
                      size={60}
                      radius={30}
                      border={_.__colorPlain__}
                      borderWidth={0}
                      placeholder={false}
                      shadow
                      fallback
                    />
                  </Touchable>
                )
              }

              return (
                <Touchable
                  key={item}
                  style={_.mb.md}
                  animate
                  scale={0.9}
                  onPress={() => $.onSelectAvatar(item)}
                >
                  <Image
                    src={fixedRemote(item, true)}
                    headers={headers}
                    size={60}
                    radius={30}
                    border={_.__colorPlain__}
                    borderWidth={0}
                    placeholder={false}
                    shadow
                    fallback
                  />
                </Touchable>
              )
            })}
          </Flex>
        ))}
        <Text style={_.mt.md} align='center' size={10} bold type='sub'>
          (以上图来源自 pixiv)
        </Text>
      </>
    )
  }

  renderRefresh() {
    const { $ } = this.context as Ctx
    const { selectedIndex } = $.state
    if (selectedIndex !== 1) return null

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
    const { $ } = this.context as Ctx
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
