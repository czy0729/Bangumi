/*
 * @Author: czy0729
 * @Date: 2022-01-19 15:14:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-20 12:02:14
 */
import React, { useState, useCallback } from 'react'
import { ActionSheet, SegmentedControl, Text, SwitchPro, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'

const tinygrailModeDS = ['绿涨红跌', '红涨绿跌']

function Tinygrail() {
  const [show, setShow] = useState(false)
  const setTrue = useCallback(() => setShow(true), [])
  const setFalse = useCallback(() => setShow(false), [])

  return useObserver(() => {
    const { tinygrail } = systemStore.setting
    const label = [tinygrail ? '开启' : '关闭']
    return (
      <>
        <ItemSetting
          hd='小圣杯'
          ft={
            <Text type='sub' size={15}>
              {label.join('、')}
            </Text>
          }
          arrow
          highlight
          onPress={setTrue}
        />
        <ActionSheet show={show} onClose={setFalse}>
          <ItemSetting
            hd='小圣杯'
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
            information='人物卡片交易模块'
          >
            <Heatmap
              id='设置.切换'
              data={{
                title: '小圣杯'
              }}
            />
          </ItemSetting>
          <ItemSetting
            hd='涨跌色'
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

                  if (value === tinygrailModeDS[2]) {
                    _.toggleTinygrailMode('web')
                    return
                  }
                  _.toggleTinygrailMode()
                }}
              />
            }
          >
            <Heatmap
              id='设置.切换'
              data={{
                title: '小圣杯涨跌色'
              }}
            />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Tinygrail

const styles = _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.8, 1.12)
      }
    ]
  },
  segmentedControl: {
    height: _.r(28),
    width: _.r(164)
  }
})
