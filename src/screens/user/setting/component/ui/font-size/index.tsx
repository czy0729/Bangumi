/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:17:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 20:22:57
 */
import React from 'react'
import { Heatmap, ScrollView, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { SETTING_FONTSIZEADJUST } from '@constants'
import { TEXTS } from '../ds'
import { getYuqueThumbs } from '../../../utils'
import { styles } from './styles'

/** 字号 */
function FontSize({ filter }) {
  return useObserver(() => (
    <ItemSettingBlock
      style={styles.block}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661073553895-58817e4e-68c6-4236-9d4b-aef6a2d2eb6b.png',
        '0/2022/png/386799/1661073556659-29544f2b-ddef-443f-8d0f-b8f562536bc6.png',
        '0/2022/png/386799/1661073559152-353bcac8-6cd2-475b-8826-98288110e9cc.png',
        '0/2022/png/386799/1661073561929-ef4508fd-a12b-4c38-bb93-a7d9b0021965.png',
        '0/2022/png/386799/1661073564431-15d38cf2-04d1-4514-96cb-2f1c8ddea115.png'
      ])}
      {...TEXTS.fontSize}
    >
      <ScrollView contentContainerStyle={styles.scroll} horizontal>
        {SETTING_FONTSIZEADJUST.map((item, index) => (
          <ItemSettingBlock.Item
            key={item.label}
            style={!!index && _.ml.sm}
            title={item.label}
            active={_.fontSizeAdjust == Number(item.value)}
            filter={filter}
            onPress={() => {
              if (_.fontSizeAdjust == Number(item.value)) return

              t('设置.切换', {
                title: '字号',
                label: item.label
              })
              _.changeFontSizeAdjust(item.value)
            }}
          >
            <Text style={_.mt.sm} size={11 + Number(item.value) - _.fontSizeAdjust}>
              番组计划
            </Text>
          </ItemSettingBlock.Item>
        ))}
      </ScrollView>
      <Heatmap id='设置.切换' title='字号' />
    </ItemSettingBlock>
  ))
}

export default FontSize
