/*
 * @Author: czy0729
 * @Date: 2022-01-20 11:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-10 18:49:25
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ActionSheet, Text, Heatmap, Katakana as KText } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getShows, getYuqueThumbs } from '../utils'
import { TEXTS } from './ds'
import { styles } from './styles'

function Katakana({ navigation, filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const onToggle = useCallback(() => {
    t('设置.切换', {
      title: '片假名终结者',
      checked: !systemStore.setting.katakana
    })
    systemStore.switchSetting('katakana')
  }, [])

  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { katakana, cnFirst } = systemStore.setting
    return (
      <>
        {/* 其他 (之前是翻译, 已合并大部分功能于此项) */}
        <ItemSetting hd='其他' arrow highlight filter={filter} onPress={setTrue}>
          <Heatmap id='设置.切换' title='片假名终结者' />
        </ItemSetting>

        <ActionSheet
          show={state}
          title='其他'
          height={filter ? 400 : 640}
          onClose={setFalse}
        >
          {/* 自定义源头 */}
          <ItemSetting
            arrow
            highlight
            filter={filter}
            onPress={() => {
              t('设置.跳转', {
                title: '自定义源头',
                to: 'OriginSetting'
              })

              setFalse()
              setTimeout(() => {
                navigation.push('OriginSetting')
              }, 80)
            }}
            {...TEXTS.origin}
          >
            <Heatmap id='设置.跳转' to='OriginSetting' alias='自定义源头' />
          </ItemSetting>

          {/* Webhook */}
          <ItemSetting
            arrow
            highlight
            filter={filter}
            onPress={() => {
              t('设置.跳转', {
                title: 'Webhook',
                to: 'Webhook'
              })

              setFalse()
              setTimeout(() => {
                navigation.push('Webhook')
              }, 80)
            }}
            {...TEXTS.webhook}
          >
            <Heatmap id='设置.跳转' to='Webhook' alias='Webhook' />
          </ItemSetting>

          {/* 翻译引擎 */}
          <ItemSettingBlock
            show={shows.engine}
            style={_.mt.md}
            filter={filter}
            {...TEXTS.engine.setting}
          >
            <ItemSettingBlock.Item
              active
              filter={filter}
              onPress={() => {}}
              {...TEXTS.engine.baidu}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={false}
              filter={filter}
              onPress={() => {}}
              {...TEXTS.engine.google}
            />
          </ItemSettingBlock>

          {/* 片假名终结者 */}
          <ItemSettingBlock
            show={shows.katakana}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661142420758-e002913c-f976-4a42-943b-5e106187fc29.png',
              '0/2022/png/386799/1661142591445-037feac4-31c1-4418-a377-557d1843e1e7.png'
            ])}
            {...TEXTS.katakana}
          >
            <ItemSettingBlock.Item
              title='关闭'
              active={!katakana}
              filter={filter}
              onPress={() => {
                if (!katakana) return
                onToggle()
              }}
            >
              <Text style={_.mt.sm} type='sub' size={12} lineHeight={20} bold>
                魔法少女まどか☆マギカ
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='开启'
              active={katakana}
              filter={filter}
              onPress={() => {
                if (katakana) return
                onToggle()
              }}
            >
              <View style={_.mt.sm}>
                <KText.Provider
                  itemStyle={styles.katakana}
                  size={12}
                  lineHeight={20}
                  active
                >
                  <KText type='sub' size={12} lineHeight={20} bold>
                    魔法少女まどか☆マギカ
                  </KText>
                </KText.Provider>
              </View>
            </ItemSettingBlock.Item>
          </ItemSettingBlock>

          {/* 优先中文 */}
          <ItemSettingBlock
            show={katakana && shows.cnFirst}
            style={_.mt.sm}
            filter={filter}
            {...TEXTS.cnFirst}
          >
            <ItemSettingBlock.Item
              title='开启'
              active={cnFirst}
              filter={filter}
              onPress={() => {
                if (cnFirst) return

                t('设置.切换', {
                  title: '优先中文',
                  checked: !cnFirst
                })

                systemStore.switchSetting('cnFirst')
              }}
            >
              <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
                看过 ep.1 始まりの物語{'\n'}
                <Text type='sub' size={11} lineHeight={13} underline>
                  魔法少女小圆
                </Text>
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='关闭'
              active={!cnFirst}
              filter={filter}
              onPress={() => {
                if (!cnFirst) return

                t('设置.切换', {
                  title: '优先中文',
                  checked: !cnFirst
                })

                systemStore.switchSetting('cnFirst')
              }}
            >
              <Text style={_.mt.xs} type='sub' size={11} lineHeight={13} align='center'>
                看过 ep.1 始まりの物語{'\n'}
                <Text type='sub' size={11} lineHeight={13} underline>
                  魔法少女まどか☆マギカ
                </Text>
              </Text>
            </ItemSettingBlock.Item>
            <Heatmap id='设置.切换' title='优先中文' />
          </ItemSettingBlock>
        </ActionSheet>
      </>
    )
  })
}

export default Katakana
