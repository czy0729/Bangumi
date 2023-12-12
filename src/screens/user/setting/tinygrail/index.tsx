/*
 * @Author: czy0729
 * @Date: 2022-01-19 15:14:57
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-12 22:26:25
 */
import React from 'react'
import { ActionSheet, SegmentedControl, Text, SwitchPro, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useObserver, useBoolean } from '@utils/hooks'
import { t } from '@utils/fetch'
import { STORYBOOK } from '@constants'
import CustomBtn from '../home/custom-btn'
import { getShows, getYuqueThumbs } from '../utils'
import styles from '../styles'
import { DS, TEXTS } from './ds'

function Tinygrail({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (STORYBOOK || !shows) return null

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
        <ActionSheet show={state} title='小圣杯' onClose={setFalse}>
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
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661214518986-f6760da2-6a78-489b-85fc-2c7fabf97279.png',
              '0/2022/png/386799/1661214525841-58dcbaf0-c0a7-446f-8045-69d855e32914.png',
              '0/2022/png/386799/1661214653550-d0132b94-b2ff-4e6c-97ab-2cd15b1bc48b.png',
              '0/2022/png/386799/1661214535802-72f9dad6-5869-4518-86a1-048e4046c900.png',
              '0/2022/png/386799/1661214600784-c75037d5-4c7a-4022-92ad-679dc49be9b9.png',
              '0/2022/png/386799/1661214604762-9e11c96f-7841-4581-8e34-e77c5a71a139.png'
            ])}
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
                values={DS}
                selectedIndex={_.isWeb ? 2 : _.isGreen ? 0 : 1}
                onValueChange={value => {
                  if (
                    (_.isGreen && value === DS[0]) ||
                    (!_.isGreen && value === DS[1])
                    // || (_.isWeb && value === DS[2])
                  ) {
                    return
                  }

                  t('设置.切换', {
                    title: '小圣杯涨跌色',
                    label: _.isWeb ? '网页一致' : _.isGreen ? '红涨绿跌' : '绿涨红跌'
                  })

                  // if (value === DS[2]) return _.toggleTinygrailMode('web')

                  _.toggleTinygrailMode()
                }}
              />
            }
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661214673062-50a40076-90c3-499f-9ea6-bc4694a92f05.png',
              '0/2022/png/386799/1661214675966-24eb1061-9a89-4c72-8173-e3a3f3f16adb.png'
            ])}
            {...TEXTS.tinygrailMode}
          >
            <Heatmap id='设置.切换' title='小圣杯涨跌色' />
          </ItemSetting>

          {/* 右上角功能入口 */}
          <ItemSetting
            show={shows.homeCustom}
            ft={<CustomBtn />}
            filter={filter}
            {...TEXTS.homeCustom}
          >
            <Heatmap id='设置.切换' title='右上角功能入口' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Tinygrail
