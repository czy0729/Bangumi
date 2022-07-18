/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:07:00
 */
import React from 'react'
import { View } from 'react-native'
import {
  ActionSheet,
  Flex,
  Text,
  SwitchPro,
  SegmentedControl,
  Mesume,
  Heatmap,
  ScrollView
} from '@components'
import { randomSpeech } from '@components/mesume/utils'
import { ItemSetting, ItemSettingBlock, Cover, Avatar } from '@_'
import { _, systemStore, userStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import {
  IMG_DEFAULT_AVATAR,
  IOS,
  SETTING_FONTSIZEADJUST,
  SETTING_TRANSITION
} from '@constants'
import { getShows } from '../utils'
import commonStyles from '../styles'
import { TEXTS, URL_BOOK, URL_MUSIC, URL_GAME, width, height } from './ds'
import { memoStyles } from './styles'

function UI({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const styles = memoStyles()
    const {
      vibration,
      coverThings,
      coverRadius,
      ripple,
      speech,
      avatarRound,
      transition
      // imageTransition,
      // quality
    } = systemStore.setting
    const avatar = userStore.usersInfo()?.avatar?.large || IMG_DEFAULT_AVATAR
    return (
      <>
        {/* 画面 */}
        <ItemSetting hd='画面' arrow highlight onPress={setTrue} />

        <ActionSheet show={state} height={filter ? 400 : 680} onClose={setFalse}>
          {/* 封面拟物 */}
          <ItemSettingBlock
            show={shows.coverThings}
            style={_.mt.sm}
            {...TEXTS.coverThings}
          >
            <ItemSettingBlock.Item
              itemStyle={styles.item}
              title='开启'
              active={coverThings}
              onPress={() => {
                if (coverThings) return

                t('设置.切换', {
                  title: '封面拟物',
                  checked: !coverThings
                })

                systemStore.switchSetting('coverThings')
              }}
            >
              <Flex style={_.mt.sm}>
                <View>
                  <Cover
                    type='书籍'
                    useType
                    size={width}
                    height={height}
                    src={URL_BOOK}
                    radius
                  />
                </View>
                <View style={_.ml.sm}>
                  <Cover
                    containerStyle={styles.gameContainer}
                    bodyStyle={styles.gameBody}
                    angleStyle={styles.gameAngle}
                    type='游戏'
                    useType
                    size={width}
                    height={height}
                    src={URL_GAME}
                    radius
                  />
                </View>
                <View style={_.ml.sm}>
                  <Cover
                    angleStyle={styles.musicAngle}
                    type='音乐'
                    useType
                    size={width * 1.1}
                    height={height * 1.1}
                    src={URL_MUSIC}
                    radius
                  />
                </View>
              </Flex>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              itemStyle={styles.item}
              title='关闭'
              active={!coverThings}
              onPress={() => {
                if (!coverThings) return

                t('设置.切换', {
                  title: '封面拟物',
                  checked: !coverThings
                })

                systemStore.switchSetting('coverThings')
              }}
            >
              <Flex style={_.mt.sm}>
                <View>
                  <Cover size={width} height={height} src={URL_BOOK} radius />
                </View>
                <View style={_.ml.sm}>
                  <Cover size={width} height={height} src={URL_GAME} radius />
                </View>
                <View style={_.ml.sm}>
                  <Cover size={width} height={height} src={URL_MUSIC} radius />
                </View>
              </Flex>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='封面拟物' />
          </ItemSettingBlock>

          {/* 图片圆角 */}
          <ItemSettingBlock
            show={shows.coverRadius}
            style={_.mt.sm}
            {...TEXTS.coverRadius.setting}
          >
            <ItemSettingBlock.Item
              active={coverRadius === _.radiusXs}
              onPress={() => {
                if (coverRadius === _.radiusXs) return

                t('设置.切换', {
                  title: '图片圆角',
                  label: '小'
                })
                systemStore.setSetting('coverRadius', _.radiusXs)
              }}
              {...TEXTS.coverRadius.sm}
            >
              <View style={_.mt.xs}>
                <Cover
                  angleStyle={styles.musicAngle}
                  type='音乐'
                  size={width * 1.1}
                  height={height * 1.1}
                  src={URL_MUSIC}
                  radius={_.radiusXs}
                />
              </View>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={coverRadius === _.radiusSm}
              onPress={() => {
                if (coverRadius === _.radiusSm) return

                t('设置.切换', {
                  title: '图片圆角',
                  label: '中'
                })
                systemStore.setSetting('coverRadius', _.radiusSm)
              }}
              {...TEXTS.coverRadius.md}
            >
              <View style={_.mt.xs}>
                <Cover
                  angleStyle={styles.musicAngle}
                  type='音乐'
                  size={width * 1.1}
                  height={height * 1.1}
                  src={URL_MUSIC}
                  radius={_.radiusSm}
                />
              </View>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={coverRadius === _.radiusMd}
              onPress={() => {
                if (coverRadius === _.radiusMd) return

                t('设置.切换', {
                  title: '图片圆角',
                  label: '大'
                })
                systemStore.setSetting('coverRadius', _.radiusMd)
              }}
              {...TEXTS.coverRadius.lg}
            >
              <View style={_.mt.xs}>
                <Cover
                  angleStyle={styles.musicAngle}
                  type='音乐'
                  size={width * 1.1}
                  height={height * 1.1}
                  src={URL_MUSIC}
                  radius={_.radiusMd}
                />
              </View>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='图片圆角' />
          </ItemSettingBlock>

          {/* 看板娘吐槽 */}
          <ItemSettingBlock show={shows.speech} style={_.mt.sm} {...TEXTS.speech}>
            <ItemSettingBlock.Item
              title='开启'
              active={speech}
              onPress={() => {
                if (speech) return

                t('设置.切换', {
                  title: '看板娘吐槽',
                  checked: !speech
                })

                systemStore.switchSetting('speech')
              }}
            >
              <Text
                style={[styles.speech, _.mt.sm]}
                type='sub'
                size={11}
                align='center'
                numberOfLines={2}
              >
                {randomSpeech()}
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='关闭'
              active={!speech}
              onPress={() => {
                if (!speech) return

                t('设置.切换', {
                  title: '看板娘吐槽',
                  checked: !speech
                })

                systemStore.switchSetting('speech')
              }}
            >
              <Mesume style={_.mt.xxs} size={40} />
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='看板娘吐槽' />
          </ItemSettingBlock>

          {/* 头像 */}
          <ItemSettingBlock
            show={shows.avatarRound}
            style={_.mt.sm}
            {...TEXTS.avatarRound.setting}
          >
            <ItemSettingBlock.Item
              active={avatarRound}
              onPress={() => {
                if (avatarRound) return

                t('设置.切换', {
                  title: '圆形头像',
                  checked: !avatarRound
                })

                systemStore.switchSetting('avatarRound')
              }}
              {...TEXTS.avatarRound.round}
            >
              <Avatar style={_.mt.sm} size={28} src={avatar} round />
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={!avatarRound}
              onPress={() => {
                if (!avatarRound) return

                t('设置.切换', {
                  title: '圆形头像',
                  checked: !avatarRound
                })

                systemStore.switchSetting('avatarRound')
              }}
              {...TEXTS.avatarRound.square}
            >
              <Avatar style={_.mt.sm} size={28} src={avatar} radius={_.radiusSm} />
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='圆形头像' />
          </ItemSettingBlock>

          {/* 字号 */}
          <ItemSettingBlock
            show={shows.fontSize}
            style={styles.fontBlock}
            {...TEXTS.fontSize}
          >
            <ScrollView contentContainerStyle={styles.fontScroll} horizontal>
              {SETTING_FONTSIZEADJUST.map((item, index) => (
                <ItemSettingBlock.Item
                  key={item.label}
                  style={!!index && _.ml.sm}
                  title={item.label}
                  active={_.fontSizeAdjust == Number(item.value)}
                  onPress={() => {
                    if (_.fontSizeAdjust == Number(item.value)) return

                    t('设置.切换', {
                      title: '字号',
                      label: item.label
                    })
                    _.changeFontSizeAdjust(item.value)
                  }}
                >
                  <Text
                    style={_.mt.sm}
                    size={11 + Number(item.value) - _.fontSizeAdjust}
                  >
                    番组计划
                  </Text>
                </ItemSettingBlock.Item>
              ))}
            </ScrollView>
            <Heatmap id='设置.切换' title='字号' />
          </ItemSettingBlock>

          {/* 点击水纹效果 */}
          <ItemSetting
            show={shows.ripple && !IOS}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={ripple}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '点击水纹',
                    checked: !ripple
                  })

                  systemStore.switchSetting('ripple')
                }}
              />
            }
            {...TEXTS.ripple}
          >
            <Heatmap id='设置.切换' title='点击水纹' />
          </ItemSetting>

          {/* 切页动画 */}
          <ItemSetting
            show={shows.transition && !IOS}
            ft={
              <SegmentedControl
                style={commonStyles.segmentedControl}
                size={12}
                values={SETTING_TRANSITION.map(({ label }) => label)}
                selectedIndex={SETTING_TRANSITION.findIndex(
                  item => item.value === transition
                )}
                onValueChange={label => {
                  if (label) {
                    t('设置.切换', {
                      title: '切页动画',
                      label
                    })

                    systemStore.setTransition(label)
                  }
                }}
              />
            }
            {...TEXTS.transition}
          >
            <Heatmap id='设置.切换' title='切页动画' />
          </ItemSetting>

          {/* 震动 */}
          <ItemSetting
            show={shows.vibration}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={vibration}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '震动',
                    checked: !vibration
                  })

                  systemStore.switchSetting('vibration')
                }}
              />
            }
            {...TEXTS.vibration}
          >
            <Heatmap id='设置.切换' title='震动' />
          </ItemSetting>

          {/* 图片渐出动画 */}
          {/* <ItemSetting
            show={IOS}
            hd='图片渐出动画'
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={imageTransition}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '图片渐出动画',
                    checked: !imageTransition
                  })

                  systemStore.switchSetting('imageTransition')
                }}
              />
            }
          >
            <Heatmap id='设置.切换' title='图片渐出动画' />
          </ItemSetting> */}

          {/* 图片质量 */}
          {/* <ItemSetting
            hd='图片质量'
            information='不建议修改，修改后不能享受图片CDN加速'
            ft={
              <SegmentedControl
                style={commonStyles.segmentedControl}
                size={12}
                values={MODEL_SETTING_QUALITY.data.map(({ label }) => label)}
                selectedIndex={MODEL_SETTING_QUALITY.data.findIndex(
                  item => item.value === quality
                )}
                onValueChange={label => {
                  if (label) {
                    t('设置.切换', {
                      title: '质量',
                      label
                    })

                    systemStore.setQuality(label)
                  }
                }}
              />
            }
          >
            <Heatmap id='设置.切换' title='质量' />
          </ItemSetting> */}
        </ActionSheet>
      </>
    )
  })
}

export default UI
