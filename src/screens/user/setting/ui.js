/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 14:53:10
 */
import React, { useState, useCallback } from 'react'
import { View } from 'react-native'
import {
  ActionSheet,
  Flex,
  Text,
  SwitchPro,
  SegmentedControl,
  Mesume,
  Heatmap
} from '@components'
import { ItemSetting, ItemSettingBlock, Cover, Avatar } from '@_'
import { _, systemStore, userStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { IOS, IMG_WIDTH_SM, IMG_HEIGHT_SM, IMG_DEFAULT_AVATAR } from '@constants'
import { randomSpeech } from '@constants/speech'
import {
  MODEL_SETTING_FONTSIZEADJUST,
  MODEL_SETTING_TRANSITION,
  MODEL_SETTING_QUALITY
} from '@constants/model'
import commonStyles from './styles'

const URL_BOOK = 'https://lain.bgm.tv/pic/cover/c/1e/7b/37782_OkkQ7.jpg'
const URL_MUSIC = 'https://lain.bgm.tv/pic/cover/c/c5/0f/325453_162n4.jpg'
const URL_GAME = 'https://lain.bgm.tv/pic/cover/c/60/d8/62229_SrxX4.jpg'
const width = parseInt(IMG_WIDTH_SM / 1.8)
const height = parseInt(IMG_HEIGHT_SM / 1.8)

function UI() {
  const [show, setShow] = useState(false)
  const setTrue = useCallback(() => setShow(true), [])
  const setFalse = useCallback(() => setShow(false), [])

  return useObserver(() => {
    const styles = memoStyles()
    const {
      vibration,
      coverThings,
      imageTransition,
      ripple,
      speech,
      avatarRound,
      transition,
      quality
    } = systemStore.setting
    const avatar = userStore.usersInfo()?.avatar?.large || IMG_DEFAULT_AVATAR
    return (
      <>
        <ItemSetting hd='画面' arrow highlight onPress={setTrue} />
        <ActionSheet show={show} height={640} onClose={setFalse}>
          <ItemSettingBlock
            style={_.mt.sm}
            title='封面拟物'
            information='能确定类型的条目封面拟物化，增加区分度'
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
          <ItemSettingBlock style={_.mt.sm} title='看板娘吐槽'>
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
          <ItemSettingBlock style={_.mt.sm} title='头像'>
            <ItemSettingBlock.Item
              title='圆形'
              active={avatarRound}
              onPress={() => {
                if (avatarRound) return

                t('设置.切换', {
                  title: '圆形头像',
                  checked: !avatarRound
                })

                systemStore.switchSetting('avatarRound')
              }}
            >
              <Avatar style={_.mt.sm} size={28} src={avatar} round />
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='方形'
              active={!avatarRound}
              onPress={() => {
                if (!avatarRound) return

                t('设置.切换', {
                  title: '圆形头像',
                  checked: !avatarRound
                })

                systemStore.switchSetting('avatarRound')
              }}
            >
              <Avatar style={_.mt.sm} size={28} src={avatar} radius={_.radiusSm} />
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='圆形头像' />
          </ItemSettingBlock>
          <ItemSettingBlock style={_.mt.sm} title='字号'>
            {MODEL_SETTING_FONTSIZEADJUST.data.map((item, index) => (
              <ItemSettingBlock.Item
                key={item.label}
                style={!!index && _.ml.sm}
                title={item.label}
                active={_.fontSizeAdjust == item.value}
                onPress={() => {
                  if (_.fontSizeAdjust == item.value) return

                  t('设置.切换', {
                    title: '字号',
                    label: item.label
                  })
                  _.changeFontSizeAdjust(item.value)
                }}
              >
                <Text style={_.mt.sm} size={12 + Number(item.value) - _.fontSizeAdjust}>
                  番组计划
                </Text>
              </ItemSettingBlock.Item>
            ))}
            <Heatmap id='设置.切换' title='字号' />
          </ItemSettingBlock>
          <ItemSetting
            hd='震动'
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
            information='部分操作追加轻震动反馈'
          >
            <Heatmap id='设置.切换' title='震动' />
          </ItemSetting>
          <ItemSetting
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
          </ItemSetting>
          <ItemSetting
            show={!IOS}
            hd='点击水纹效果'
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
            information='按钮被按下时产生涟漪效果，关闭可提升性能'
          >
            <Heatmap id='设置.切换' title='点击水纹' />
          </ItemSetting>
          <ItemSetting
            show={!IOS}
            hd='切页动画'
            ft={
              <SegmentedControl
                style={commonStyles.segmentedControl}
                size={12}
                values={MODEL_SETTING_TRANSITION.data.map(({ label }) => label)}
                selectedIndex={MODEL_SETTING_TRANSITION.data.findIndex(
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
          >
            <Heatmap id='设置.切换' title='切页动画' />
          </ItemSetting>
          <ItemSetting
            hd='图片质量'
            information='建议默认，修改后不能享受图片CDN加速'
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
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default UI

const memoStyles = _.memoStyles(() => ({
  item: {
    height: 104
  },
  gameContainer: {
    backgroundColor: _.select(_.colorBorder, _._colorDarkModeLevel2),
    borderColor: _.select(_.colorBorder, _._colorDarkModeLevel2)
  },
  gameBody: {
    backgroundColor: _.select('rgba(0, 0, 0, 0.2)', _._colorBorder)
  },
  gameAngle: {
    borderTopColor: _.select('rgba(0, 0, 0, 0.2)', _._colorBorder)
  },
  musicAngle: {
    marginRight: -6
  },
  speech: {
    width: '92%',
    marginTop: _.sm
  }
}))
