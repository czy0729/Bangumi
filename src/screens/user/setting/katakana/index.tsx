/*
 * @Author: czy0729
 * @Date: 2022-01-20 11:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:05:55
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ActionSheet, Text, Heatmap, Katakana as KText } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import { TEXTS } from './ds'

function Katakana({ filter }) {
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

    const { katakana } = systemStore.setting
    return (
      <>
        {/* 翻译 */}
        <ItemSetting hd='翻译' arrow highlight onPress={setTrue}>
          <Heatmap id='设置.切换' title='片假名终结者' />
        </ItemSetting>

        <ActionSheet show={state} onClose={setFalse}>
          {/* 翻译引擎 */}
          <ItemSettingBlock
            show={shows.engine}
            style={_.mt.sm}
            {...TEXTS.engine.setting}
          >
            <ItemSettingBlock.Item active onPress={() => {}} {...TEXTS.engine.baidu} />
            <ItemSettingBlock.Item
              style={_.ml.md}
              active={false}
              onPress={() => {}}
              {...TEXTS.engine.google}
            />
          </ItemSettingBlock>

          {/* 片假名终结者 */}
          <ItemSettingBlock show={shows.katakana} style={_.mt.sm} {...TEXTS.katakana}>
            <ItemSettingBlock.Item
              title='关闭'
              active={!katakana}
              onPress={() => {
                if (!katakana) return
                onToggle()
              }}
            >
              <Text style={_.mt.sm} type='sub' size={12} lineHeight={20} bold>
                例：魔法少女まどか☆マギカ
              </Text>
            </ItemSettingBlock.Item>
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='开启'
              active={katakana}
              onPress={() => {
                if (katakana) return
                onToggle()
              }}
            >
              <View style={_.mt.sm}>
                <KText.Provider size={12} lineHeight={20} active>
                  <KText type='sub' size={12} lineHeight={20} bold>
                    例：魔法少女まどか☆マギカ
                  </KText>
                </KText.Provider>
              </View>
            </ItemSettingBlock.Item>
          </ItemSettingBlock>
        </ActionSheet>
      </>
    )
  })
}

export default Katakana
