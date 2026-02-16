/*
 * @Author: czy0729
 * @Date: 2024-04-20 20:04:23
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-04 01:33:47
 */
import React from 'react'
import { Heatmap } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 圆角过渡 */
function Squircle({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('squircle')

  return useObserver(() => (
    <ItemSettingBlock
      style={_.mt.sm}
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2023/jpeg/386799/1703391888067-91ac3d7e-4352-41fb-8881-27057c60c425.jpeg',
        '0/2023/jpeg/386799/1703391904875-5fe44324-295b-450d-be98-8dfcb0e4bc94.jpeg',
        '0/2023/png/386799/1703384112637-21fbcad3-fd83-4b21-a851-57410a39ca56.png',
        '0/2023/png/386799/1703384087443-6629c121-8471-4633-aaf7-7bc442dbf681.png'
      ])}
      {...TEXTS.squircle}
    >
      <ItemSettingBlock.Item
        title='系统默认'
        active={!value}
        filter={filter}
        onPress={() => {
          if (!value) return

          handleSwitch()

          t('设置.切换', {
            title: '圆角过渡',
            checked: !value
          })
        }}
      />

      <ItemSettingBlock.Item
        style={_.ml.md}
        title='开启'
        active={value}
        filter={filter}
        onPress={() => {
          if (value) return

          handleSwitch()

          t('设置.切换', {
            title: '圆角过渡',
            checked: !value
          })
        }}
      />

      <Heatmap id='设置.切换' title='圆角过渡' />
    </ItemSettingBlock>
  ))
}

export default Squircle
