/*
 * @Author: czy0729
 * @Date: 2021-12-25 05:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-21 17:04:38
 */
import React, { useState, useCallback } from 'react'
import { ActionSheet, Text, SwitchPro, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { IS_BEFORE_ANDROID_10 } from '@constants'
import Type from './type'
import styles from './styles'

function Theme({ navigation }) {
  const [show, setShow] = useState(false)
  const setTrue = useCallback(() => setShow(true), [])
  const setFalse = useCallback(() => setShow(false), [])

  return useObserver(() => {
    const { deepDark, autoColorScheme } = systemStore.setting
    const label = [_.isDark ? (deepDark ? '纯黑' : '黑暗') : '明亮']
    if (autoColorScheme) label.push('跟随系统')
    return (
      <>
        <ItemSetting
          hd='主题'
          ft={
            <Text type='sub' size={15}>
              {label.join('、')}
            </Text>
          }
          arrow
          highlight
          onPress={setTrue}
        />
        <ActionSheet show={show} onClose={setFalse}>
          <ItemSettingBlock
            style={_.mt.sm}
            title='主题'
            information='点击顶部Logo亦可快速切换，长按Logo则前往设置'
          >
            <ItemSettingBlock.Item
              icon='ios-sunny'
              iconColor={_.colorYellow}
              title='明亮'
              active={!_.isDark}
              onPress={async () => {
                if (!_.isDark) return

                t('设置.切换', {
                  title: '黑暗模式',
                  checked: !_.isDark
                })

                _.toggleMode()
                setTimeout(() => {
                  navigation.setParams({
                    extra: <Type />
                  })
                }, 0)
              }}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='ios-moon'
              iconColor={_.colorYellow}
              title='纯黑'
              information='AMOLED屏幕更省电'
              active={_.isDark && deepDark}
              onPress={async () => {
                if (_.isDark && deepDark) return

                t('设置.切换', {
                  title: '纯黑',
                  checked: !deepDark
                })

                if (!deepDark) systemStore.switchSetting('deepDark')
                _.toggleMode('dark')
                setTimeout(() => {
                  navigation.setParams({
                    extra: <Type />
                  })
                }, 0)
              }}
            >
              <Heatmap id='设置.切换' title='黑暗模式' />
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='ios-moon'
              iconColor={_.colorYellow}
              title='黑暗'
              active={_.isDark && !deepDark}
              onPress={async () => {
                if (_.isDark && !deepDark) return

                t('设置.切换', {
                  title: '纯黑',
                  checked: deepDark
                })

                if (deepDark) systemStore.switchSetting('deepDark')
                _.toggleMode('dark')
                setTimeout(() => {
                  navigation.setParams({
                    extra: <Type />
                  })
                }, 0)
              }}
            >
              <Heatmap id='设置.切换' title='纯黑' />
            </ItemSettingBlock.Item>
          </ItemSettingBlock>
          <ItemSetting
            show={!IS_BEFORE_ANDROID_10}
            hd='跟随系统'
            ft={
              <SwitchPro
                style={styles.switch}
                value={autoColorScheme}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '跟随系统',
                    checked: !autoColorScheme
                  })

                  systemStore.switchSetting('autoColorScheme')
                }}
              />
            }
            information='启动App时黑白主题是否跟随系统'
          >
            <Heatmap id='设置.切换' title='跟随系统' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Theme
