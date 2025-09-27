/*
 * @Author: czy0729
 * @Date: 2024-04-20 18:56:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-20 19:19:42
 */
import React from 'react'
import { Heatmap, setComponentsDefaultProps, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { loadAppFontsAsync } from '@utils/hooks/useCachedResources'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'
import { styles } from './styles'

/** 使用字体 */
function CustomFontFamily({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('customFontFamily')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2022/png/386799/1661070600959-cfe3b7a7-696b-4325-a81e-fe3f58f99edf.png',
        '0/2022/png/386799/1661070607888-446ff81c-6acf-4416-8a73-e2aca67932db.png'
      ])}
      {...TEXTS.font}
    >
      <ItemSettingBlock.Item
        title='开启'
        active={!value}
        filter={filter}
        onPress={async () => {
          if (!value) return

          await loadAppFontsAsync()
          handleSwitch()
          setComponentsDefaultProps()

          t('设置.切换', {
            title: '字体',
            checked: !value
          })
        }}
      >
        <Text overrideStyle={styles.fontStyleBold} type='sub' size={12} align='center' bold>
          Bangumi 番组计划
        </Text>
        <Text overrideStyle={styles.fontStyle} type='sub' size={10} align='center'>
          Abc ばんぐみ 123
        </Text>
      </ItemSettingBlock.Item>
      <ItemSettingBlock.Item
        style={_.ml.md}
        title='关闭'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()
          setComponentsDefaultProps()

          t('设置.切换', {
            title: '字体',
            checked: !value
          })
        }}
      >
        <Text overrideStyle={styles.fontStyleBoldCustom} type='sub' size={12} align='center' bold>
          Bangumi 番组计划
        </Text>
        <Text overrideStyle={styles.fontStyleCustom} type='sub' size={10} align='center'>
          Abc ばんぐみ 123
        </Text>
      </ItemSettingBlock.Item>
      <Heatmap id='设置.切换' title='字体' />
    </ItemSettingBlock>
  ))
}

export default CustomFontFamily
