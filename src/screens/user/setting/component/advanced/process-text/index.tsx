/*
 * @Author: czy0729
 * @Date: 2026-11-21 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-21 10:00:00
 */
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { syncProcessTextEnabled } from '@utils/text-share'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { IconTextSearch } from '../../icons'

import type { WithFilterProps } from '../../../types'

/** 接管系统长按文字菜单 (Android) */
function ProcessText({ filter }: WithFilterProps) {
  const { value, handleSwitch } = useAsyncSwitchSetting('processText')

  return (
    <ItemSetting
      icon={<IconTextSearch />}
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()
            // store 的更新有 40ms 延迟, 显式传目标值保证立即生效
            syncProcessTextEnabled(!value)

            t('设置.切换', {
              title: TEXTS.processText.hd,
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.processText}
    >
      <Heatmap id='设置.切换' title={TEXTS.processText.hd} />
    </ItemSetting>
  )
}

export default observer(ProcessText)
