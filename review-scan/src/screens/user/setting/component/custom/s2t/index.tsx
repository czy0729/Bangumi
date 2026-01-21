/*
 * @Author: czy0729
 * @Date: 2024-04-19 04:11:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-01-25 14:44:06
 */
import React from 'react'
import { Heatmap, SwitchPro, Text } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSetSetting, useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 繁体 */
function S2T({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('s2t')
  const { value: s2tLocal, handleSet } = useAsyncSetSetting('s2tLocal')

  return useObserver(() => (
    <>
      <ItemSetting
        ft={
          <SwitchPro
            style={commonStyles.switch}
            value={value}
            onSyncPress={() => {
              handleSwitch()

              t('设置.切换', {
                title: '繁体',
                checked: !value
              })
            }}
          />
        }
        filter={filter}
        thumb={getYuqueThumbs([
          '0/2022/png/386799/1661132384882-626c4647-44c6-4462-8f6a-6faf757590c0.png',
          '0/2022/png/386799/1661132388033-f8d5e64b-be21-4712-9c87-e15f340e9b98.png'
        ])}
        {...TEXTS.s2t}
      >
        <Heatmap id='设置.切换' title='繁体' />
      </ItemSetting>
      {value && (
        <ItemSettingBlock style={_.mt.sm} title='繁体词典' sub>
          <ItemSettingBlock.Item
            title='Hong Kong'
            active={s2tLocal === 'hk'}
            onPress={() => {
              if (s2tLocal === 'hk') return

              handleSet('hk')

              t('设置.切换', {
                title: '繁体词典',
                value: 'hk'
              })
            }}
          >
            <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center' s2t={false}>
              愛吃拉麪的小泉同學
            </Text>
            <Text type='sub' size={11} lineHeight={13} align='center' s2t={false}>
              末日列車去哪裏?
            </Text>
          </ItemSettingBlock.Item>
          <ItemSettingBlock.Item
            style={_.ml.md}
            title='Taiwan'
            active={s2tLocal === 'tw'}
            onPress={() => {
              if (s2tLocal === 'tw') return

              handleSet('tw')

              t('设置.切换', {
                title: '繁体词典',
                value: 'tw'
              })
            }}
          >
            <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center' s2t={false}>
              愛吃拉麵的小泉同學
            </Text>
            <Text type='sub' size={11} lineHeight={13} align='center' s2t={false}>
              末日列車去哪裡?
            </Text>
            <Heatmap id='设置.切换' title='繁体词典' />
          </ItemSettingBlock.Item>
        </ItemSettingBlock>
      )}
    </>
  ))
}

export default S2T
