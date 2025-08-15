/*
 * @Author: czy0729
 * @Date: 2024-04-21 17:40:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 01:12:28
 */
import React from 'react'
import { View } from 'react-native'
import { Heatmap } from '@components'
import { clearCache } from '@components/image/image'
import { IconTouchable, ItemSettingBlock } from '@_'
import { _, systemStore, userStore } from '@stores'
import { confirm } from '@utils'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { APP_ADVANCE_CDN, MODEL_SETTING_CDN_ORIGIN } from '@constants'
import { SettingCDNOrigin, SettingCDNOriginCn } from '@types'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { checkAdvance, waitToResetCDN } from './utils'

function CDNCover({ navigation, filter, setFalse }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('cdn')
  return useObserver(() => {
    const origin = MODEL_SETTING_CDN_ORIGIN.getLabel<SettingCDNOriginCn>(
      systemStore.setting.cdnOrigin
    )
    return (
      <ItemSettingBlock
        style={_.mt.sm}
        filter={filter}
        align='start'
        thumb={getYuqueThumbs([
          '0/2023/png/386799/1688331782002-1069824c-1d97-4695-901a-568d2b7d5ede.png',
          '0/2023/png/386799/1688331803056-2fb3c208-865b-4d8f-8ed7-d17665b37d5a.png'
        ])}
        {...TEXTS.cover.setting}
      >
        <ItemSettingBlock.Item
          active={!value}
          filter={filter}
          onPress={() => {
            if (!value) return

            handleSwitch()
            setTimeout(() => {
              clearCache()
            }, 0)

            t('设置.切换', {
              title: 'CDN加速',
              checked: !value,
              origin: 'lain.bgm.tv'
            })
          }}
          {...TEXTS.cover.lain}
        />
        <ItemSettingBlock.Item
          style={_.ml.md}
          active={value && origin === 'magma'}
          filter={filter}
          onPress={async () => {
            if (value && origin === 'magma') return

            if (!systemStore.advance) {
              confirm(
                '此域名对达到条件的高级用户开放，当前开放试用，10 分钟后或下次启动后会还原，是否试用？',
                () => {
                  if (!value) handleSwitch()
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

            const flag = await checkAdvance()
            if (!flag) return

            if (!value) handleSwitch()
            systemStore.setSetting(
              'cdnOrigin',
              MODEL_SETTING_CDN_ORIGIN.getValue<SettingCDNOrigin>('magma')
            )
            setTimeout(() => {
              clearCache()
            }, 0)

            t('设置.切换', {
              title: 'CDN加速',
              checked: !value,
              origin: 'magma'
            })
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
                    `作者与其达成了约定，因流量是需要自费的，目前仅对历史打赏达到 [${APP_ADVANCE_CDN}元] 的高级用户开放测试，恳请谅解。`,
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
    )
  })
}

export default CDNCover
