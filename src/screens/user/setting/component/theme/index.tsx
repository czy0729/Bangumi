/*
 * @Author: czy0729
 * @Date: 2021-12-25 05:18:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-11 04:22:24
 */
import React from 'react'
import { ActionSheet, Heatmap, SwitchPro } from '@components'
import { updateHeader } from '@components/header/utils'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useBoolean, useObserver } from '@utils/hooks'
import { IOS, IS_BEFORE_ANDROID_10, STORYBOOK } from '@constants'
import styles from '../../styles'
import { getShows, getYuqueThumbs } from '../../utils'
import { BLUR_SETTINGS, COMPONENT, TEXTS } from './ds'

function Theme({ navigation, filter }) {
  r(COMPONENT)

  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { deepDark, autoColorScheme, androidBlur } = systemStore.setting
    return (
      <>
        {/* 主题 */}
        <ItemSetting hd='主题' arrow highlight filter={filter} onPress={setTrue} />

        <ActionSheet
          show={state}
          height={STORYBOOK ? 440 : filter ? 440 : IOS ? 440 : 760}
          title='主题'
          onClose={setFalse}
        >
          {/* 主题 */}
          <ItemSettingBlock
            style={_.mt.sm}
            show={shows.theme}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661068629567-49cdcbef-26cb-40f4-aff9-059427a8f27e.png',
              '0/2022/png/386799/1661068632037-870a9c78-0478-4ce9-8696-c52812f70be0.png',
              '0/2022/png/386799/1661068634586-b7c73edc-a671-4922-8f85-b04448aa4b9c.png'
            ])}
            {...TEXTS.theme.setting}
          >
            {!STORYBOOK && (
              <ItemSettingBlock.Item
                style={_.mr.md}
                icon='ios-sunny'
                iconColor={_.colorYellow}
                active={!_.isDark}
                filter={filter}
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

                  setTimeout(() => {
                    if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
                  }, 40)
                }}
                {...TEXTS.theme.light}
              >
                <Heatmap id='设置.切换' title='黑暗模式' />
              </ItemSettingBlock.Item>
            )}
            <ItemSettingBlock.Item
              style={_.mr.md}
              icon='ios-moon'
              iconColor={_.colorYellow}
              active={_.isDark && deepDark}
              filter={filter}
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

                setTimeout(() => {
                  if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
                }, 40)
              }}
              {...TEXTS.theme.deepDark}
            >
              <Heatmap id='设置.切换' title='纯黑' />
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              icon='ios-moon'
              iconColor={_.colorYellow}
              active={_.isDark && !deepDark}
              filter={filter}
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

                setTimeout(() => {
                  if (_.mode !== _.tinygrailThemeMode) _.toggleTinygrailThemeMode()
                }, 40)
              }}
              {...TEXTS.theme.dark}
            >
              <Heatmap id='设置.切换' title='黑暗模式' />
            </ItemSettingBlock.Item>
          </ItemSettingBlock>

          {/* 跟随系统 */}
          {!STORYBOOK && (
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
              filter={filter}
              {...TEXTS.autoColorScheme}
            >
              <Heatmap id='设置.切换' title='跟随系统' />
            </ItemSetting>
          )}

          {/* 毛玻璃布局 */}
          <ItemSetting
            show={!IOS && !IS_BEFORE_ANDROID_10 && shows.androidBlur}
            ft={
              <SwitchPro
                style={styles.switch}
                value={androidBlur}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '毛玻璃布局',
                    checked: !androidBlur
                  })

                  systemStore.switchSetting('androidBlur')
                }}
              />
            }
            filter={filter}
            {...TEXTS.androidBlur}
          >
            <Heatmap id='设置.切换' title='毛玻璃布局' />
          </ItemSetting>

          {/* 毛玻璃可选布局 */}
          {!IOS &&
            !IS_BEFORE_ANDROID_10 &&
            androidBlur &&
            BLUR_SETTINGS.map(item => {
              const title = TEXTS[item].hd
              const value = systemStore.setting[item]
              return (
                <ItemSetting
                  style={_.ml.md}
                  show={shows[item]}
                  ft={
                    <SwitchPro
                      style={styles.switch}
                      value={value}
                      onSyncPress={() => {
                        t('设置.切换', {
                          title,
                          checked: !value
                        })

                        systemStore.switchSetting(item)
                      }}
                    />
                  }
                  filter={filter}
                  {...TEXTS[item]}
                >
                  <Heatmap id='设置.切换' title={title} />
                </ItemSetting>
              )
            })}
        </ActionSheet>
      </>
    )
  })
}

export default Theme
