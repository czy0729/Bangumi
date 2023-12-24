/*
 * @Author: czy0729
 * @Date: 2022-01-21 17:17:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 05:26:10
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
  ScrollView,
  setComponentsDefaultProps
} from '@components'
import { randomSpeech } from '@components/mesume/utils'
import { ItemSetting, ItemSettingBlock, Cover, Avatar } from '@_'
import { _, systemStore, userStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { loadAppFontsAsync } from '@utils/hooks/useCachedResources'
import {
  IMG_DEFAULT_AVATAR,
  SETTING_FONTSIZEADJUST,
  SETTING_TRANSITION,
  STORYBOOK
} from '@constants'
import { getShows, getYuqueThumbs } from '../utils'
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
      avatarRound,
      // coverRadius,
      coverThings,
      customFontFamily,
      speech,
      squircle,
      transition,
      vibration
    } = systemStore.setting
    const avatar = userStore.usersInfo()?.avatar?.large || IMG_DEFAULT_AVATAR
    return (
      <>
        {/* 画面 */}
        <ItemSetting hd='画面' arrow highlight filter={filter} onPress={setTrue} />

        <ActionSheet
          show={state}
          title='画面'
          height={filter ? 400 : 760}
          onClose={setFalse}
        >
          {/* 字体 */}
          <ItemSettingBlock
            show={shows.font}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661070600959-cfe3b7a7-696b-4325-a81e-fe3f58f99edf.png',
              '0/2022/png/386799/1661070607888-446ff81c-6acf-4416-8a73-e2aca67932db.png'
            ])}
            {...TEXTS.font}
          >
            <ItemSettingBlock.Item
              title='开启'
              active={!customFontFamily}
              filter={filter}
              onPress={async () => {
                if (!customFontFamily) return

                t('设置.切换', {
                  title: '字体',
                  checked: !customFontFamily
                })

                await loadAppFontsAsync()
                systemStore.switchSetting('customFontFamily')
                setComponentsDefaultProps()
              }}
            >
              <Text
                overrideStyle={styles.fontStyleBold}
                type='sub'
                size={12}
                align='center'
                bold
              >
                Bangumi 番组计划
              </Text>
              <Text
                overrideStyle={styles.fontStyle}
                type='sub'
                size={10}
                align='center'
              >
                Abc ばんぐみ 123
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='关闭'
              active={customFontFamily}
              filter={filter}
              onPress={() => {
                if (customFontFamily) return

                t('设置.切换', {
                  title: '字体',
                  checked: !customFontFamily
                })

                systemStore.switchSetting('customFontFamily')
                setComponentsDefaultProps()
              }}
            >
              <Text
                overrideStyle={styles.fontStyleBoldCustom}
                type='sub'
                size={12}
                align='center'
                bold
              >
                Bangumi 番组计划
              </Text>
              <Text
                overrideStyle={styles.fontStyleCustom}
                type='sub'
                size={10}
                align='center'
              >
                Abc ばんぐみ 123
              </Text>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='字体' />
          </ItemSettingBlock>

          {/* 封面拟物 */}
          <ItemSettingBlock
            show={shows.coverThings}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661071481482-cb9d38b1-1f09-4188-a13d-c10f5b6bbf75.png',
              '0/2022/png/386799/1661071487013-ae69bffd-7e68-40be-a3d7-2ded444e7d3c.png'
            ])}
            {...TEXTS.coverThings}
          >
            <ItemSettingBlock.Item
              itemStyle={styles.item}
              title='开启'
              active={coverThings}
              filter={filter}
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
              filter={filter}
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

          {/* @deprecated 图片圆角 */}
          {/* <ItemSettingBlock
            show={shows.coverRadius}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661071928529-37497a51-74f6-4024-adec-b7d3c7a06e8c.png',
              '0/2022/png/386799/1661071931109-1464ee05-7d82-43a8-9fe1-14f214de16a3.png',
              '0/2022/png/386799/1661071933774-201d5370-7fd0-4e97-91ac-cda5b4be45f7.png'
            ])}
            {...TEXTS.coverRadius.setting}
          >
            <ItemSettingBlock.Item
              active={coverRadius === _.radiusXs}
              filter={filter}
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
              filter={filter}
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
              filter={filter}
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
          </ItemSettingBlock> */}

          {/* 头像 */}
          <ItemSettingBlock
            show={shows.avatarRound}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661073314717-f67e17c1-0ae4-4e19-b61a-4fdaf2eb4bdd.png',
              '0/2022/png/386799/1661073326148-8687046a-026a-4217-a3b3-1209dc3470e2.png'
            ])}
            {...TEXTS.avatarRound.setting}
          >
            <ItemSettingBlock.Item
              active={avatarRound}
              filter={filter}
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
              <View style={_.mt.sm}>
                <Avatar size={28} src={avatar} round />
              </View>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={!avatarRound}
              filter={filter}
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
              <View style={_.mt.sm}>
                <Avatar size={28} src={avatar} radius={_.radiusSm} />
              </View>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='圆形头像' />
          </ItemSettingBlock>

          {/* 圆角过渡 */}
          <ItemSettingBlock
            show={shows.squircle}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2023/jpeg/386799/1703391888067-91ac3d7e-4352-41fb-8881-27057c60c425.jpeg',
              '0/2023/jpeg/386799/1703391904875-5fe44324-295b-450d-be98-8dfcb0e4bc94.jpeg',
              '0/2023/png/386799/1703384112637-21fbcad3-fd83-4b21-a851-57410a39ca56.png',
              '0/2023/png/386799/1703384087443-6629c121-8471-4633-aaf7-7bc442dbf681.png'
            ])}
            {...TEXTS.squircle}
          >
            <ItemSettingBlock.Item
              title='开启'
              active={squircle}
              filter={filter}
              onPress={async () => {
                if (squircle) return

                t('设置.切换', {
                  title: '圆角过渡',
                  checked: !squircle
                })

                systemStore.switchSetting('squircle')
              }}
            >
              {/*  */}
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='系统默认'
              active={!squircle}
              filter={filter}
              onPress={() => {
                if (!squircle) return

                t('设置.切换', {
                  title: '圆角过渡',
                  checked: !squircle
                })

                systemStore.switchSetting('squircle')
              }}
            >
              {/*  */}
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='圆角过渡' />
          </ItemSettingBlock>

          {/* 看板娘吐槽 */}
          <ItemSettingBlock
            show={shows.speech}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661072680253-59856506-ac70-44d7-bba3-fd34fb8ffef3.png'
            ])}
            {...TEXTS.speech}
          >
            <ItemSettingBlock.Item
              title='开启'
              active={speech}
              filter={filter}
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
              filter={filter}
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

          {/* 字号 */}
          <ItemSettingBlock
            show={shows.fontSize}
            style={styles.fontBlock}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661073553895-58817e4e-68c6-4236-9d4b-aef6a2d2eb6b.png',
              '0/2022/png/386799/1661073556659-29544f2b-ddef-443f-8d0f-b8f562536bc6.png',
              '0/2022/png/386799/1661073559152-353bcac8-6cd2-475b-8826-98288110e9cc.png',
              '0/2022/png/386799/1661073561929-ef4508fd-a12b-4c38-bb93-a7d9b0021965.png',
              '0/2022/png/386799/1661073564431-15d38cf2-04d1-4514-96cb-2f1c8ddea115.png'
            ])}
            {...TEXTS.fontSize}
          >
            <ScrollView contentContainerStyle={styles.fontScroll} horizontal>
              {SETTING_FONTSIZEADJUST.map((item, index) => (
                <ItemSettingBlock.Item
                  key={item.label}
                  style={!!index && _.ml.sm}
                  title={item.label}
                  active={_.fontSizeAdjust == Number(item.value)}
                  filter={filter}
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
          {/* <ItemSetting
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
            filter={filter}
            {...TEXTS.ripple}
          >
            <Heatmap id='设置.切换' title='点击水纹' />
          </ItemSetting> */}

          {/* 切页动画 */}
          <ItemSetting
            show={!STORYBOOK && shows.transition}
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
            filter={filter}
            {...TEXTS.transition}
          >
            <Heatmap id='设置.切换' title='切页动画' />
          </ItemSetting>

          {/* 震动 */}
          <ItemSetting
            show={!STORYBOOK && shows.vibration}
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
            filter={filter}
            {...TEXTS.vibration}
          >
            <Heatmap id='设置.切换' title='震动' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default UI
