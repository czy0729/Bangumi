/*
 * @Author: czy0729
 * @Date: 2024-04-24 13:42:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-04-24 13:45:04
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'
import { getYuqueThumbs } from '../../../utils'

/** 条目发布日期是否显示到月份 */
function ShowAirdayMonth({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('subjectShowAirdayMonth')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '条目发布日期是否显示到月份',
              checked: !value
            })
          }}
        />
      }
      filter={filter}
      thumb={getYuqueThumbs([
        '0/2024/png/386799/1720220476418-1e454512-acf4-45b6-b09f-f9ce5cf6b52e.png',
        '0/2024/png/386799/1720220494256-bf13ba3e-c43a-4fa4-80f9-8c559e327529.png'
      ])}
      {...TEXTS.showAirdayMonth}
    >
      <Heatmap id='设置.切换' title='条目发布日期是否显示到月份' />
    </ItemSetting>
  ))
}

export default ShowAirdayMonth
