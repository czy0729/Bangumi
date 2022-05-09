/*
 * @Author: czy0729
 * @Date: 2022-01-19 10:32:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-10 07:24:24
 */
import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { ActionSheet, Flex, Text, SwitchPro, Heatmap } from '@components'
import { clearCache } from '@components/image/image'
import { IconTouchable } from '@_'
import { ItemSetting, ItemSettingBlock, Cover } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t, ping } from '@utils/fetch'
import { info, alert } from '@utils/ui'
import { MODEL_SETTING_CDN_ORIGIN } from '@constants/model'
import { CDN_OSS_MAGMA_POSTER } from '@constants/cdn'
import styles from './styles'

const URL_LAIN = 'https://lain.bgm.tv/pic/cover/c/fa/1d/25833_kZIjD.jpg'
const URL_JSDELIVR =
  'https://cdn.jsdelivr.net/gh/czy0729/Bangumi-OSS@master/data/subject/c/t/TfOdAB.jpg'
const URL_FASTLY = URL_JSDELIVR.replace('cdn', 'fastly')
const URL_ONEDRIVE = 'https://bangumi.stdcdn.com/subject/c/t/TfOdAB.jpg'
const IMG_WIDTH = parseInt((_.window.contentWidth - 2 * _.md) / 3)
const IMG_HEIGHT = parseInt(IMG_WIDTH * 1.44)

function CDN() {
  const { state, setTrue, setFalse } = useBoolean(false)
  const [test, setTest] = useState(false)
  const [deprecated, setDeprecated] = useState(false)
  const [pings, setPings] = useState({})

  useEffect(() => {
    if (test && !pings.length) {
      const data = {}
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

  return useObserver(() => {
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
          highlight
          onPress={setTrue}
        />

        <ActionSheet height={680} show={state} onClose={setFalse}>
          {/* 封面加速 */}
          <ItemSettingBlock
            style={_.mt.sm}
            title='封面加速'
            information='使用特定CDN域名加速访问，切换后可能需要重新启动才能生效'
          >
            <ItemSettingBlock.Item
              title='lain.bgm.tv'
              information={'不使用加速\n稳定但没清晰加成'}
              active={!cdn}
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
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='OneDrive'
              information={'高级会员开放\n作者私有付费'}
              active={cdn && origin === 'OneDrive'}
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
            />
            <Heatmap id='设置.切换' title='CDN加速' />
          </ItemSettingBlock>

          {/* Magma */}
          <ItemSettingBlock style={_.mt._md}>
            <ItemSettingBlock.Item
              title='Magma'
              information={'条件开放\n@magma 提供的高速付费域'}
              active={cdn && origin === 'magma'}
              onPress={async () => {
                if (cdn && origin === 'magma') return
                if (!systemStore.advance) return info('此域名仅对高级会员开放')

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
            />
            <Flex.Item style={_.ml.md}>
              <View style={styles.infor}>
                <IconTouchable
                  name='md-info-outline'
                  size={18}
                  onPress={() =>
                    alert(
                      `此域名为用户 @magma 提供，支持所有封面图，并自带缩放压缩、webp、稳定CDN加速
                      \n作者与其达成了某种约定，因流量是需要自费的，目前仅对历史打赏达到10元的高级会员开放，恳请谅解
                      \n后续会观察使用的流量数据，可能会放宽限制
                      \n更多使用详情说明，目前OSS 1G的费用大概是0.2元，1个用户首次访问10-20个路径的页面，封面图可能会产生50-100MB的流量
                      \n若漏算了历史打赏金额的，可以私信作者`,
                      '关于Magma'
                    )
                  }
                />
              </View>
            </Flex.Item>
          </ItemSettingBlock>

          {/* 测试 */}
          <ItemSettingBlock
            style={_.mt.md}
            title='测试'
            information='有ms不代表能加载图片，只是ping后有结果的时间'
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
                    <Text style={_.mt.xs} type='sub' size={10} align='center'>
                      lain.bgm.tv: {pings.lain || 0}ms
                    </Text>
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
                    <Text style={_.mt.xs} type='sub' size={10} align='center'>
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
                    <Text style={_.mt.xs} type='sub' size={10} align='center'>
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
          {test && (
            <ItemSettingBlock style={_.mt._md}>
              <Flex.Item>
                <Flex style={_.container.block} direction='column' justify='center'>
                  <Cover
                    size={IMG_WIDTH}
                    height={IMG_HEIGHT}
                    src={URL_JSDELIVR}
                    radius
                  />
                  <Text style={_.mt.xs} type='sub' size={10} align='center'>
                    jsDelivr: {pings.jsdelivr || 0}ms
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item style={_.ml.md}>
                <Flex style={_.container.block} direction='column' justify='center'>
                  <Cover size={IMG_WIDTH} height={IMG_HEIGHT} src={URL_FASTLY} radius />
                  <Text style={_.mt.xs} type='sub' size={10} align='center'>
                    fastly: {pings.fastly || 0}ms
                  </Text>
                </Flex>
              </Flex.Item>
              <Flex.Item style={_.ml.md} />
            </ItemSettingBlock>
          )}

          {/* 旧版本域 */}
          <ItemSettingBlock style={_.mt.md} title='旧版本域'>
            <Text
              style={styles.test}
              size={12}
              type='sub'
              onPress={() => setDeprecated(!deprecated)}
            >
              [待废弃]
              因国内访问困难无法恢复，v6.2.5以后不再维护，功能保留，若你的网络依然能访问可以考虑使用
              <Text size={12} type='sub'>
                ，点击{deprecated ? '收起' : '展开'}
              </Text>
            </Text>
          </ItemSettingBlock>
          {deprecated && (
            <ItemSettingBlock style={_.mt._md}>
              <ItemSettingBlock.Item
                title='jsDelivr'
                information='免费开放'
                active={cdn && origin === 'jsDelivr'}
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
              />
              <ItemSettingBlock.Item
                style={_.ml.md}
                title='fastly'
                information={'免费开放\n理论上与 jsDelivr 一样'}
                active={cdn && origin === 'fastly'}
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
              />
            </ItemSettingBlock>
          )}

          {/* 头像加速 */}
          <ItemSetting
            hd='头像加速'
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
            information={'[待废弃] 其他用户头像使用清晰快照，但不会实时更新'}
          />
        </ActionSheet>
      </>
    )
  })
}

export default CDN
