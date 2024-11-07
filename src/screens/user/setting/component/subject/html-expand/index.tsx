/*
 * @Author: czy0729
 * @Date: 2024-11-08 07:07:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-08 07:09:13
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import commonStyles from '../../../styles'
import { TEXTS } from '../ds'
import { useAsyncSwitchSetting } from '../../../hooks'

/** 简介、详情使用新页面展开 */
function HtmlExpand({ filter }) {
  const { value, handleSwitch } = useAsyncSwitchSetting('subjectHtmlExpand')

  return useObserver(() => (
    <ItemSetting
      ft={
        <SwitchPro
          style={commonStyles.switch}
          value={!value}
          onSyncPress={() => {
            handleSwitch()

            t('设置.切换', {
              title: '简介、详情使用新页面展开',
              checked: value
            })
          }}
        />
      }
      filter={filter}
      {...TEXTS.subjectHtmlExpand}
    >
      <Heatmap id='设置.切换' title='简介、详情使用新页面展开' />
    </ItemSetting>
  ))
}

export default HtmlExpand
