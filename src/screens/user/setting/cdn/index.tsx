/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 19:00:14
 */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActionSheet, Flex, Text, SwitchPro, Heatmap, Highlight } from '@components'
import { clearCache } from '@components/image/image'
import { IconTouchable } from '@_'
import { ItemSetting, ItemSettingBlock, Cover } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t, ping } from '@utils/fetch'
import { info, alert } from '@utils/ui'
import { MODEL_SETTING_CDN_ORIGIN, CDN_OSS_MAGMA_POSTER } from '@constants'
import { getShows } from '../utils'
import styles from '../styles'
import {
  ADVANCE_CDN,
  IMG_HEIGHT,
  IMG_WIDTH,
  TEXTS,
  URL_FASTLY,
  URL_JSDELIVR,
  URL_LAIN,
  URL_LAIN_NEW,
  URL_ONEDRIVE
} from './ds'
import { Pings } from './types'

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
    const origin = MODEL_SETTING_CDN_ORIGIN.getLabel(cdnOrigin)
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

            {/* jsDelivr */}
            <ItemSettingBlock.Item
              style={_.ml.md}
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
              {...TEXTS.cover.jsDelivr}
            />
            <Heatmap id='设置.切换' title='CDN加速' />
          </ItemSettingBlock>

          {/* Magma */}
          <ItemSettingBlock show={shows.cover} style={_.mt._md}>
            <ItemSettingBlock.Item
              active={cdn && origin === 'magma'}
              filter={filter}
              onPress={async () => {
                if (cdn && origin === 'magma') return
                if (!systemStore.advance) return info('此域名仅对高级会员开放')

                // 获取历史打赏金额
                const value = await systemStore.fetchAdvanceDetail()
                if (value == 1) {
                  info('你是长期高级会员，暂时允许开启')
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
                  MODEL_SETTING_CDN_ORIGIN.getValue('magma')
                )

                setTimeout(() => {
                  clearCache()
                }, 0)
              }}
              {...TEXTS.cover.magma}
            />
            <Flex.Item style={_.ml.md}>
              <View style={styles.infor}>
                <IconTouchable
                  name='md-info-outline'
                  size={18}
                  onPress={() =>
                    alert(
                      `此域名为用户 @magma 提供，支持所有封面图，并自带缩放压缩、webp、稳定CDN加速
                      \n作者与其达成了约定，因流量是需要自费的，目前仅对历史打赏达到 [${ADVANCE_CDN}元] 的高级会员开放测试，恳请谅解
                      \n目前初上线需要监控流量数据，后续会根据观察到的使用量，可能会放宽限制
                      \n科普: 目前OSS 1G的费用不低于0.2元，1个用户首次访问10-20个路径的页面，封面图可能会产生50-100MB的流量
                      \nPS: 若漏算了历史打赏金额的，可以私信作者修正`,
                      '关于Magma'
                    )
                  }
                />
              </View>
            </Flex.Item>
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
          {shows.test && test && (
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
          )}

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
              [待废弃]
              因国内访问困难无法恢复，v6.2.5以后不再维护，功能保留，若你的网络依然能访问可以考虑使用，
              <Text size={12} type='warning'>
                点击{deprecated ? '收起' : '展开'}
              </Text>
            </Text>
          </ItemSettingBlock>
          {shows.deprecated && deprecated && (
            <ItemSettingBlock style={_.mt._md}>
              <ItemSettingBlock.Item
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
              <ItemSettingBlock.Item
                style={_.ml.md}
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
