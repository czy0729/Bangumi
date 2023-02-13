/*
 * @Author: czy0729
 * @Date: 2023-02-13 04:48:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-13 05:41:56
 */
import React from 'react'
import { ActionSheet, SegmentedControl, Heatmap, SwitchPro } from '@components'
import { ItemSetting } from '@_'
import { systemStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { getShows } from '../utils'
import styles from '../styles'
import { TEXTS } from './ds'

function Discovery({ filter, open = false }) {
  const { state, setTrue, setFalse } = useBoolean(open)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { discoveryMenuNum, discoveryTodayOnair, live2D, live2DVoice } =
      systemStore.setting
    return (
      <>
        <ItemSetting hd='发现' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet show={state} title='发现' onClose={setFalse}>
          {/* 菜单每行个数 */}
          <ItemSetting
            show={shows.discoveryMenuNum}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={['4', '5']}
                selectedIndex={discoveryMenuNum === 4 ? 0 : 1}
                onValueChange={label => {
                  if (label) {
                    t('设置.切换', {
                      title: '发现菜单个数',
                      label
                    })

                    systemStore.setSetting(
                      'discoveryMenuNum',
                      discoveryMenuNum === 4 ? 5 : 4
                    )
                  }
                }}
              />
            }
            filter={filter}
            {...TEXTS.discoveryMenuNum}
          >
            <Heatmap id='设置.切换' title='菜单每行个数' />
          </ItemSetting>

          {/* 看板娘 Live2D */}
          <ItemSetting
            show={shows.live2D}
            ft={
              <SwitchPro
                style={styles.switch}
                value={live2D}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '看板娘 Live2D',
                    checked: !live2D
                  })

                  systemStore.switchSetting('live2D')
                }}
              />
            }
            filter={filter}
            {...TEXTS.live2D}
          >
            <Heatmap id='设置.切换' title='看板娘 Live2D' />
          </ItemSetting>

          {/* 看板娘 Live2D 声音 */}
          {live2D && (
            <ItemSetting
              show={shows.live2DVoice}
              ft={
                <SwitchPro
                  style={styles.switch}
                  value={live2DVoice}
                  onSyncPress={() => {
                    t('设置.切换', {
                      title: '看板娘 Live2D 声音',
                      checked: !live2DVoice
                    })

                    systemStore.switchSetting('live2DVoice')
                  }}
                />
              }
              filter={filter}
              {...TEXTS.live2DVoice}
            >
              <Heatmap id='设置.切换' title='看板娘 Live2D 声音' />
            </ItemSetting>
          )}

          {/* 今日放送 */}
          <ItemSetting
            show={shows.discoveryTodayOnair}
            ft={
              <SwitchPro
                style={styles.switch}
                value={discoveryTodayOnair}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '发现今日放送',
                    checked: !discoveryTodayOnair
                  })

                  systemStore.switchSetting('discoveryTodayOnair')
                }}
              />
            }
            filter={filter}
            {...TEXTS.discoveryTodayOnair}
          >
            <Heatmap id='设置.切换' title='发现今日放送' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Discovery
