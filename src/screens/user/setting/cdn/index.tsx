/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-23 19:24:30
 */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActionSheet, Flex, Text, SwitchPro, Heatmap, Highlight } from '@components'
import { clearCache } from '@components/image/image'
import { IconTouchable } from '@_'
import { ItemSetting, ItemSettingBlock, Cover } from '@_'
import { _, systemStore, userStore } from '@stores'
import { info, alert, confirm } from '@utils'
import { useObserver, useBoolean } from '@utils/hooks'
import { t, ping } from '@utils/fetch'
import { MODEL_SETTING_CDN_ORIGIN, CDN_OSS_MAGMA_POSTER, ADVANCE_CDN } from '@constants'
import { getShows } from '../utils'
import styles from '../styles'
import {
  IMG_HEIGHT,
  IMG_WIDTH,
  TEXTS,
  URL_FASTLY,
  URL_JSDELIVR,
  URL_LAIN,
  URL_ONEDRIVE
} from './ds'
import { Pings } from './types'
import { SettingCDNOrigin, SettingCDNOriginCn } from '@types'

function waitToResetCDN() {
  setTimeout(() => {
    const result = systemStore.resetCDN()
    if (result) info('CDN 试用结束')
  }, 60 * 1000 * 10)
}

function CDN({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const [test, setTest] = useState(false)
  const [deprecated, setDeprecated] = useState(false)
  const [pings, setPings] = useState<Pings>({})

  useEffect(() => {
    if (test && !Object.keys(pings).length) {
      const data: Pings = {}
      async function cb() {
        data.lain = await ping(URL_LAIN)
        data.magma = await ping(CDN_OSS_MAGMA_POSTER(URL_LAIN))
        data.onedrive = await ping(URL_ONEDRIVE)
        data.jsdelivr = await ping(URL_JSDELIVR)
        data.fastly = await ping(URL_FASTLY)
        setPings(data)
      }
      cb()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test])

  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { cdn, cdnOrigin, cdnAvatar } = systemStore.setting
    const origin = MODEL_SETTING_CDN_ORIGIN.getLabel<SettingCDNOriginCn>(cdnOrigin)
    const label = []
    if (!cdn) label.push('关闭')
    return (
      <>
        {/* CDN */}
        <ItemSetting
          hd='CDN'
          ft={
            <Text type='sub' size={15}>
              {label.join('、')}
            </Text>
          }
          arrow
          filter={filter}
          onPress={setTrue}
        />

        <ActionSheet height={filter ? 400 : 680} show={state} onClose={setFalse}>
          {/* 封面加速 */}
          <ItemSettingBlock
            show={shows.cover}
            style={_.mt.sm}
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
                  alert(
                    `此域名为用户 @magma 提供，支持非 NSFW 封面图（NSFW 会回滚到 bgm），并自带缩放压缩、webp、稳定CDN加速
                      \n作者与其达成了约定，因流量是需要自费的，目前仅对历史打赏达到 [${ADVANCE_CDN}元] 的高级会员开放测试，恳请谅解
                      \n科普: 目前 OSS 1G 的费用因有各种回流等策略，资费不低于 0.2 元，1 个用户首次访问 10-20 个路径的页面，封面图可能会产生 50-100MB 的流量
                      \n为什么需要？因官方图片第二档质量不够清晰，而最高质量又过大，如果直接使用最大图片，一来会浪费大量流量，二来就算手机再强也会随着程序使用而崩溃
                      \nPS: 若漏算了历史打赏金额的，可私信作者修正`,
                    '关于Magma'
                  )
                }}
              />
            </View>

            <Heatmap id='设置.切换' title='CDN加速' />
          </ItemSettingBlock>

          {/* 测试 */}
          <ItemSettingBlock
            show={shows.test}
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
                      filter={filter}
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
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_ONEDRIVE}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      OneDrive: {pings.onedrive || 0}ms
                    </Text>
                  </Flex>
                </Flex.Item>
              </>
            ) : (
              <Text
                style={styles.test}
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
          {shows.test && test && (
            <ItemSettingBlock style={_.mt._md}>
              <Flex.Item>
                <Flex style={_.container.block} direction='column' justify='center'>
                  <Cover
                    size={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    src={URL_JSDELIVR}
                    radius
                  />
                  <Text style={_.mt.sm} type='sub' size={10} align='center'>
                    jsDelivr: {pings.jsdelivr || 0}ms
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <Flex style={_.container.block} direction='column' justify='center'>
                  <Cover size={IMG_WIDTH} height={IMG_HEIGHT} src={URL_FASTLY} radius />
                  <Text style={_.mt.sm} type='sub' size={10} align='center'>
                    fastly: {pings.fastly || 0}ms
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item style={_.ml.md} />
            </ItemSettingBlock>
          )}

          {/* 新番 */}
          {/* {shows.test && test && (
            <>
              <ItemSettingBlock>
                <Flex.Item>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_LAIN_NEW}
                      cdn={false}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      不使用: 新番图
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={CDN_OSS_MAGMA_POSTER(URL_LAIN_NEW)}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      Magma: 新番图
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_LAIN_NEW}
                      cdn={false}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      OneDrive: 新番图
                    </Text>
                  </Flex>
                </Flex.Item>
              </ItemSettingBlock>
              <ItemSettingBlock style={_.mt._md}>
                <Flex.Item>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_LAIN_NEW}
                      cdn={false}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      jsDelivr: 新番图
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md}>
                  <Flex style={_.container.block} direction='column' justify='center'>
                    <Cover
                      size={IMG_WIDTH}
                      height={IMG_HEIGHT}
                      src={URL_LAIN_NEW}
                      cdn={false}
                      radius
                    />
                    <Text style={_.mt.sm} type='sub' size={10} align='center'>
                      fastly: 新番图
                    </Text>
                  </Flex>
                </Flex.Item>
                <Flex.Item style={_.ml.md} />
              </ItemSettingBlock>
            </>
          )} */}

          {/* 旧版本域 */}
          <ItemSettingBlock
            show={shows.deprecated}
            style={_.mt.md}
            filter={filter}
            {...TEXTS.deprecated.setting}
          >
            <Text
              style={styles.test}
              size={12}
              type='sub'
              onPress={() => setDeprecated(!deprecated)}
            >
              [待废弃] 因国内访问困难无法恢复，v6.2.5
              以后不再维护，功能保留，若你的网络依然能访问可以考虑使用，
              <Text size={12} type='warning'>
                点击{deprecated ? '收起' : '展开'}
              </Text>
            </Text>
          </ItemSettingBlock>
          {shows.deprecated && deprecated && (
            <ItemSettingBlock style={_.mt._md}>
              {/* jsDelivr */}
              <ItemSettingBlock.Item
                active={cdn && origin === 'jsDelivr'}
                filter={filter}
                onPress={async () => {
                  if (cdn && origin === 'jsDelivr') return

                  t('设置.切换', {
                    title: 'CDN加速',
                    checked: !cdn,
                    origin: 'jsDelivr'
                  })

                  if (!cdn) systemStore.switchSetting('cdn')
                  systemStore.setSetting(
                    'cdnOrigin',
                    MODEL_SETTING_CDN_ORIGIN.getValue('jsDelivr')
                  )

                  setTimeout(() => {
                    clearCache()
                  }, 0)
                }}
                {...TEXTS.deprecated.jsDelivr}
              />

              {/* fastly */}
              <ItemSettingBlock.Item
                style={_.ml.sm}
                active={cdn && origin === 'fastly'}
                filter={filter}
                onPress={async () => {
                  if (cdn && origin === 'fastly') return

                  t('设置.切换', {
                    title: 'CDN加速',
                    checked: !cdn,
                    origin: 'fastly'
                  })

                  if (!cdn) systemStore.switchSetting('cdn')
                  systemStore.setSetting(
                    'cdnOrigin',
                    MODEL_SETTING_CDN_ORIGIN.getValue('fastly')
                  )

                  setTimeout(() => {
                    clearCache()
                  }, 0)
                }}
                {...TEXTS.deprecated.fastly}
              />

              {/* onedrive */}
              <ItemSettingBlock.Item
                style={_.ml.sm}
                active={cdn && origin === 'OneDrive'}
                filter={filter}
                onPress={async () => {
                  if (cdn && origin === 'OneDrive') return
                  if (!systemStore.advance) return info('此域名仅对高级会员开放')

                  t('设置.切换', {
                    title: 'CDN加速',
                    checked: !cdn,
                    origin: 'OneDrive'
                  })

                  if (!cdn) systemStore.switchSetting('cdn')
                  systemStore.setSetting(
                    'cdnOrigin',
                    MODEL_SETTING_CDN_ORIGIN.getValue('OneDrive')
                  )

                  setTimeout(() => {
                    clearCache()
                  }, 0)
                }}
                {...TEXTS.deprecated.oneDrive}
              />
            </ItemSettingBlock>
          )}

          {/* 头像加速 */}
          <ItemSetting
            show={shows.cdnAvatar}
            ft={
              <SwitchPro
                style={styles.switch}
                value={cdn && cdnAvatar}
                disabled={!cdn}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '头像加速',
                    checked: !cdnAvatar
                  })

                  systemStore.switchSetting('cdnAvatar')
                }}
              />
            }
            filter={filter}
            {...TEXTS.cdnAvatar}
          />
        </ActionSheet>
      </>
    )
  })
}

export default CDN
