/*
 * @Author: czy0729
 * @Date: 2024-04-20 15:54:12
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-23 15:44:15
 */
import React from 'react'
import { Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import styles from '../../../styles'
import { BLUR_SETTINGS, TEXTS } from '../ds'

/** 毛玻璃可选布局 */
function AndroidBlurLayout({ shows, filter }) {
  return useObserver(() => (
    <>
      {BLUR_SETTINGS.map(item => {
        const title = TEXTS[item].hd
        const value = systemStore.setting[item]
        return (
          <ItemSetting
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
  ))
}

export default AndroidBlurLayout
