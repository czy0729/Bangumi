/*
 * @Author: czy0729
 * @Date: 2022-01-20 11:42:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-22 22:21:31
 */
import React, { useCallback } from 'react'
import { View } from 'react-native'
import { ActionSheet, Text, Heatmap, Katakana as KText } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'

function Katakana() {
  const { state, setTrue, setFalse } = useBoolean(false)
  const onToggle = useCallback(() => {
    t('设置.切换', {
      title: '片假名终结者',
      checked: !systemStore.setting.katakana
    })
    systemStore.switchSetting('katakana')
  }, [])

  return useObserver(() => {
    const { katakana } = systemStore.setting
    return (
      <>
        {/* 翻译 */}
        <ItemSetting hd='翻译' arrow highlight onPress={setTrue}>
          <Heatmap id='设置.切换' title='片假名终结者' />
        </ItemSetting>

        {/* 翻译引擎 */}
        <ActionSheet show={state} onClose={setFalse}>
          <ItemSettingBlock style={_.mt.sm} title='翻译引擎'>
            <ItemSettingBlock.Item title='百度翻译' active onPress={() => {}} />
            <ItemSettingBlock.Item
              style={_.ml.md}
              title='谷歌翻译'
              information='规划中暂不可用'
              active={false}
              onPress={() => {}}
            />
          </ItemSettingBlock>

          {/* 片假名终结者 */}
          <ItemSettingBlock
            style={_.mt.sm}
            title='片假名终结者'
            information={
              '匹配日语片假名延迟翻译，翻译成功后在上方标注英文原词\n开启后资源消耗增大，非必要请勿开启'
            }
          >
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
