/*
 * @Author: czy0729
 * @Date: 2022-01-19 15:14:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:06:47
 */
import React from 'react'
import { ActionSheet, SegmentedControl, Text, SwitchPro, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import styles from '../styles'
import { TEXTS } from './ds'

function Tinygrail({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const tinygrailModeDS = ['绿涨红跌', '红涨绿跌']
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { tinygrail } = systemStore.setting
    return (
      <>
        <ItemSetting
          hd='小圣杯'
          ft={
            tinygrail ? (
              <Text type='sub' size={15}>
                开启
              </Text>
            ) : null
          }
          arrow
          highlight
          filter={filter}
          onPress={setTrue}
        />
        <ActionSheet show={state} onClose={setFalse}>
          {/* 小圣杯 */}
          <ItemSetting
            show={shows.tinygrail}
            ft={
              <SwitchPro
                style={styles.switch}
                value={tinygrail}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '小圣杯',
                    checked: !tinygrail
                  })
                  systemStore.switchSetting('tinygrail')
                }}
              />
            }
            filter={filter}
            {...TEXTS.tinygrail}
          >
            <Heatmap id='设置.切换' title='小圣杯' />
          </ItemSetting>

          {/* 涨跌色 */}
          <ItemSetting
            show={shows.tinygrailMode}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={tinygrailModeDS}
                selectedIndex={_.isWeb ? 2 : _.isGreen ? 0 : 1}
                onValueChange={value => {
                  if (
                    (_.isGreen && value === tinygrailModeDS[0]) ||
                    (!_.isGreen && value === tinygrailModeDS[1]) ||
                    (_.isWeb && value === tinygrailModeDS[2])
                  ) {
                    return
                  }

                  t('设置.切换', {
                    title: '小圣杯涨跌色',
                    label: _.isWeb ? '网页一致' : _.isGreen ? '红涨绿跌' : '绿涨红跌'
                  })

                  if (value === tinygrailModeDS[2]) return _.toggleTinygrailMode('web')

                  _.toggleTinygrailMode()
                }}
              />
            }
            filter={filter}
            {...TEXTS.tinygrailMode}
          >
            <Heatmap id='设置.切换' title='小圣杯涨跌色' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Tinygrail
