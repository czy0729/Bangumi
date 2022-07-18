/*
 * @Author: czy0729
 * @Date: 2021-12-25 05:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:06:45
 */
import React from 'react'
import { ActionSheet, SwitchPro, Heatmap } from '@components'
import { updateHeader } from '@components/header/utils'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { IS_BEFORE_ANDROID_10 } from '@constants'
import { getShows } from '../utils'
import styles from '../styles'
import { TEXTS } from './ds'

function Theme({ navigation, filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { deepDark, autoColorScheme } = systemStore.setting
    return (
      <>
        {/* 主题 */}
        <ItemSetting hd='主题' arrow highlight onPress={setTrue} />

        <ActionSheet show={state} onClose={setFalse}>
          {/* 主题 */}
          <ItemSettingBlock style={_.mt.sm} show={shows.theme} {...TEXTS.theme.setting}>
            <ItemSettingBlock.Item
              icon='ios-sunny'
              iconColor={_.colorYellow}
              active={!_.isDark}
              onPress={async () => {
                if (!_.isDark) return

                t('设置.切换', {
                  title: '黑暗模式',
                  checked: !_.isDark
                })

                _.toggleMode()

                // 用于主动刷新头部颜色
                setTimeout(() => {
                  updateHeader({
                    navigation
                  })
                }, 0)
              }}
              {...TEXTS.theme.light}
            >
              <Heatmap id='设置.切换' title='黑暗模式' />
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='ios-moon'
              iconColor={_.colorYellow}
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
                  updateHeader({
                    navigation
                  })
                }, 0)
              }}
              {...TEXTS.theme.deepDark}
            >
              <Heatmap id='设置.切换' title='纯黑' />
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='ios-moon'
              iconColor={_.colorYellow}
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
                  updateHeader({
                    navigation
                  })
                }, 0)
              }}
              {...TEXTS.theme.dark}
            >
              <Heatmap id='设置.切换' title='黑暗模式' />
            </ItemSettingBlock.Item>
          </ItemSettingBlock>

          {/* 跟随系统 */}
          <ItemSetting
            show={shows.autoColorScheme && !IS_BEFORE_ANDROID_10}
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
            {...TEXTS.autoColorScheme}
          >
            <Heatmap id='设置.切换' title='跟随系统' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Theme
