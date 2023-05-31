/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-30 17:33:26
 */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActionSheet, Flex, Text, Heatmap, Highlight, SwitchPro } from '@components'
import { clearCache } from '@components/image/image'
import { IconTouchable } from '@_'
import { ItemSetting, ItemSettingBlock, Cover } from '@_'
import { _, systemStore, userStore } from '@stores'
import { info, confirm } from '@utils'
import { useObserver, useBoolean } from '@utils/hooks'
import { t, ping } from '@utils/fetch'
import {
  MODEL_SETTING_CDN_ORIGIN,
  CDN_OSS_MAGMA_POSTER,
  ADVANCE_CDN,
  IOS,
  STORYBOOK
} from '@constants'
import { SettingCDNOrigin, SettingCDNOriginCn } from '@types'
import { getShows } from '../utils'
import commonStyles from '../styles'
import { IMG_HEIGHT, IMG_WIDTH, TEXTS, URL_LAIN } from './ds'
import { Pings } from './types'

function waitToResetCDN() {
  setTimeout(() => {
    const result = systemStore.resetCDN()
    if (result) info('CDN 试用结束')
  }, 60 * 1000 * 10)
}

function CDN({ navigation, filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const [test, setTest] = useState(false)
  const [pings, setPings] = useState<Pings>({})

  useEffect(() => {
    if (test && !Object.keys(pings).length) {
      const data: Pings = {}
      async function cb() {
        data.lain = await ping(URL_LAIN)
        data.magma = await ping(CDN_OSS_MAGMA_POSTER(URL_LAIN))
        setPings(data)
      }
      cb()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test])

  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { cdn, cdnOrigin, cdnAvatarV2, imageSkeleton, iosImageCacheV2 } =
      systemStore.setting
    const origin = MODEL_SETTING_CDN_ORIGIN.getLabel<SettingCDNOriginCn>(cdnOrigin)
    const label = []
    if (!cdn) label.push('关闭')
    return (
      <>
        {/* CDN */}
        <ItemSetting
          hd='图片'
          ft={
            <Text type='sub' size={15}>
              {label.join('、')}
            </Text>
          }
          arrow
          highlight
          filter={filter}
          onPress={setTrue}
        />

        <ActionSheet
          show={state}
          title='图片'
          height={filter ? 400 : 640}
          onClose={setFalse}
        >
          {/* 封面加速 */}
          <ItemSettingBlock
            style={_.mt.sm}
            show={!STORYBOOK && shows.cover}
            filter={filter}
            align='start'
            {...TEXTS.cover.setting}
          >
            {/* lain */}
            <ItemSettingBlock.Item
              active={!cdn}
              filter={filter}
              onPress={async () => {
                if (!cdn) return

                t('设置.切换', {
                  title: 'CDN加速',
                  checked: !cdn,
                  origin: 'lain.bgm.tv'
                })

                systemStore.switchSetting('cdn')

                setTimeout(() => {
                  clearCache()
                }, 0)
              }}
              {...TEXTS.cover.lain}
            />

            {/* Magma */}
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={cdn && origin === 'magma'}
              filter={filter}
              onPress={async () => {
                if (cdn && origin === 'magma') return

                if (!systemStore.advance) {
                  confirm(
                    '此域名对达到条件的高级会员开放，当前开放试用，10 分钟后或下次启动后会还原，是否试用？',
                    () => {
                      if (!cdn) systemStore.switchSetting('cdn')
                      systemStore.setSetting(
                        'cdnOrigin',
                        MODEL_SETTING_CDN_ORIGIN.getValue<SettingCDNOrigin>('magma')
                      )
                      waitToResetCDN()

                      t('其他.试用CDN', {
                        id: userStore.myId
                      })
                    }
                  )
                  return
                }

                // 获取历史打赏金额
                const value = await systemStore.fetchAdvanceDetail()
                if (value == 1) {
                  info('你是老打赏用户或特殊关照会员，允许开启')
                } else {
                  const [, amount] = String(value).split('|')
                  if (Number(amount || 0) < ADVANCE_CDN) {
                    info(`历史打赏为 ${amount}，不足条件 ${ADVANCE_CDN}`)
                    return
                  }
                }

                t('设置.切换', {
                  title: 'CDN加速',
                  checked: !cdn,
                  origin: 'magma'
                })

                if (!cdn) systemStore.switchSetting('cdn')
                systemStore.setSetting(
                  'cdnOrigin',
                  MODEL_SETTING_CDN_ORIGIN.getValue<SettingCDNOrigin>('magma')
                )

                setTimeout(() => {
                  clearCache()
                }, 0)
              }}
              {...TEXTS.cover.magma}
            />

            <View style={_.ml.xs}>
              <IconTouchable
                name='md-info-outline'
                size={18}
                onPress={() => {
                  setFalse()
                  setTimeout(() => {
                    navigation.push('Information', {
                      title: '关于 Magma ',
                      message: [
                        '此域名为用户 @magma 提供，支持非 NSFW 封面图（NSFW 会回滚到 bgm），并自带缩放压缩、webp、稳定CDN加速。',
                        `作者与其达成了约定，因流量是需要自费的，目前仅对历史打赏达到 [${ADVANCE_CDN}元] 的高级会员开放测试，恳请谅解。`,
                        '科普: 目前 OSS 1G 的费用因有各种回流等策略，资费不低于 0.2 元，1 个用户首次访问 10-20 个路径的页面，封面图可能会产生 50-100MB 的流量。',
                        '为什么需要？因官方图片第二档质量不够清晰，而最高质量又过大，如果直接使用最大图片，一来会浪费大量流量，二来就算手机再强也会随着程序使用而崩溃。',
                        'PS: 若漏算了历史打赏金额的，可私信作者修正。'
                      ]
                    })
                  }, 240)
                }}
              />
            </View>
            <Heatmap id='设置.切换' title='CDN加速' />
          </ItemSettingBlock>

          {/* 测试 */}
          <ItemSettingBlock
            show={!STORYBOOK && shows.test}
            style={_.mt.md}
            filter={filter}
            {...TEXTS.test}
          >
            {test ? (
              <>
                <Flex.Item>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_LAIN}
                      cdn={false}
                      radius
                    />
                    <Highlight
                      style={_.mt.sm}
                      type='sub'
                      size={10}
                      align='center'
                      value={filter}
                    >
                      不使用: {pings.lain || 0}ms
                    </Highlight>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={CDN_OSS_MAGMA_POSTER(URL_LAIN)}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      Magma: {pings.magma || 0}ms
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md} />
              </>
            ) : (
              <Text
                style={commonStyles.test}
                size={12}
                type='sub'
                onPress={() => setTest(true)}
              >
                各资源域的图片质量和访问速度，
                <Text size={12} type='warning'>
                  点击测试
                </Text>
              </Text>
            )}
          </ItemSettingBlock>

          {/* 头像加速 */}
          <ItemSetting
            show={!STORYBOOK && shows.cdnAvatarV2}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={cdnAvatarV2}
                onAsyncPress={async () => {
                  if (!systemStore.advance) {
                    info('此为高级会员功能')
                    return
                  }

                  // 获取历史打赏金额
                  const value = await systemStore.fetchAdvanceDetail()
                  if (value == 1) {
                    info('你是老打赏用户或特殊关照会员，允许开启')
                  } else {
                    const [, amount] = String(value).split('|')
                    if (Number(amount || 0) < ADVANCE_CDN) {
                      info(`历史打赏为 ${amount}，不足条件 ${ADVANCE_CDN}`)
                      return
                    }
                  }

                  t('设置.切换', {
                    title: '头像加速',
                    checked: !cdnAvatarV2
                  })

                  systemStore.switchSetting('cdnAvatarV2')
                }}
              />
            }
            filter={filter}
            {...TEXTS.cdnAvatarV2}
          >
            <Heatmap id='设置.切换' title='头像加速' />
          </ItemSetting>

          {/* 图片加载动画 */}
          <ItemSetting
            show={shows.imageSkeleton}
            ft={
              <SwitchPro
                style={commonStyles.switch}
                value={imageSkeleton}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '图片加载动画',
                    checked: !imageSkeleton
                  })

                  systemStore.switchSetting('imageSkeleton')
                }}
              />
            }
            filter={filter}
            {...TEXTS.imageSkeleton}
          >
            <Heatmap id='设置.切换' title='图片加载动画' />
          </ItemSetting>

          {/* 默认图片缓存策略 */}
          {IOS && (
            <ItemSetting
              show={shows.iOSImageCache}
              ft={
                <SwitchPro
                  style={commonStyles.switch}
                  value={iosImageCacheV2}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '默认图片缓存策略',
                      checked: !iosImageCacheV2
                    })

                    systemStore.switchSetting('iosImageCacheV2')
                  }}
                />
              }
              filter={filter}
              {...TEXTS.iOSImageCache}
            >
              <Heatmap id='设置.切换' title='默认图片缓存策略' />
            </ItemSetting>
          )}
        </ActionSheet>
      </>
    )
  })
}

export default CDN
