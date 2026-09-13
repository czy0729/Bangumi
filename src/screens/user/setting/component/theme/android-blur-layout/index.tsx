/*
 * @Author: czy0729
 * @Date: 2024-04-20 15:54:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-24 21:07:38
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { t } from '@utils/fetch'
import { IconBell, IconPanelBottom, IconPanelTop, IconSquare } from '../../icons'
import styles from '../../../styles'
import { BLUR_SETTINGS, TEXTS } from '../ds'

import type { Props } from './types'

/** 各毛玻璃位置对应的图标 */
const ICONS = {
  blurTopTabs: <IconPanelTop />,
  blurBottomTabs: <IconPanelBottom />,
  blurToast: <IconBell />,
  blurModal: <IconSquare />
}

/** 毛玻璃可选布局 */
function AndroidBlurLayout({ shows, filter }: Props) {
  return (
    <>
      {BLUR_SETTINGS.map(item => {
        const title = TEXTS[item].hd
        const value = systemStore.setting[item]

        return (
          <ItemSetting
            icon={ICONS[item]}
            key={item}
            show={shows[item]}
            ft={
              <SwitchPro
                style={styles.switch}
                value={value}
                onSyncPress={() => {
                  systemStore.switchSetting(item)

                  t('设置.切换', {
                    title,
                    checked: !value
                  })
                }}
              />
            }
            filter={filter}
            sub
            {...TEXTS[item]}
          >
            <Heatmap id='设置.切换' title={title} />
          </ItemSetting>
        )
      })}
    </>
  )
}

export default observer(AndroidBlurLayout)
