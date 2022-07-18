/*
 * @Author: czy0729
 * @Date: 2022-01-22 15:04:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:05:55
 */
import React from 'react'
import { ActionSheet, SwitchPro, SegmentedControl, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore, userStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import {
  MODEL_SETTING_HOME_GRID_COVER_LAYOUT,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  SETTING_HOME_GRID_COVER_LAYOUT,
  SETTING_HOME_SORTING
} from '@constants'
import {
  SettingHomeGridCoverLayout,
  SettingHomeLayout,
  SettingHomeSorting
} from '@types'
import { getShows } from '../utils'
import styles from '../styles'
import { HOME_SORTING_INFORMATION, VALUES, TEXTS } from './ds'

function Home({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const {
      homeFilter,
      homeGridCoverLayout,
      homeLayout,
      homeOrigin,
      homeSortSink,
      homeSorting,
      showGame
    } = systemStore.setting
    const currentHomeLayout =
      MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('列表')
    return (
      <>
        <ItemSetting hd='进度' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} height={filter ? 400 : 680} onClose={setFalse}>
          {/* 布局 */}
          <ItemSettingBlock
            show={shows.homeLayout}
            style={_.mt.sm}
            {...TEXTS.homeLayout.setting}
          >
            <ItemSettingBlock.Item
              icon='md-menu'
              active={homeLayout === currentHomeLayout}
              onPress={() => {
                if (homeLayout === currentHomeLayout) return

                t('设置.切换', {
                  title: '首页布局',
                  label: '列表'
                })
                systemStore.setHomeLayout('列表')
              }}
              {...TEXTS.homeLayout.list}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='md-grid-view'
              active={homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')}
              onPress={() => {
                if (homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')) return

                t('设置.切换', {
                  title: '首页布局',
                  label: '网格'
                })
                systemStore.setHomeLayout('网格')
              }}
              {...TEXTS.homeLayout.grid}
            />
            <Heatmap id='设置.切换' title='首页布局' />
          </ItemSettingBlock>

          {/* 封面形状 */}
          <ItemSetting
            show={shows.homeGridCoverLayout}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={SETTING_HOME_GRID_COVER_LAYOUT.map(({ label }) => label)}
                selectedIndex={SETTING_HOME_GRID_COVER_LAYOUT.findIndex(
                  item => item.value === homeGridCoverLayout
                )}
                onValueChange={label => {
                  if (label) {
                    t('设置.切换', {
                      title: '封面形状',
                      label
                    })

                    systemStore.setSetting(
                      'homeGridCoverLayout',
                      MODEL_SETTING_HOME_GRID_COVER_LAYOUT.getValue<SettingHomeGridCoverLayout>(
                        label
                      )
                    )
                  }
                }}
              />
            }
            {...TEXTS.homeGridCoverLayout}
          >
            <Heatmap id='设置.切换' title='封面形状' />
          </ItemSetting>

          {/* 排序 */}
          <ItemSettingBlock
            show={shows.homeSorting}
            style={_.mt.sm}
            {...TEXTS.homeSorting}
          >
            {SETTING_HOME_SORTING.map((item, index) => (
              <ItemSettingBlock.Item
                style={!!index && _.ml.md}
                title={item.label}
                information={HOME_SORTING_INFORMATION[item.label]}
                active={homeSorting === item.value}
                onPress={() => {
                  if (homeSorting === item.value) return

                  t('设置.切换', {
                    title: '首页排序',
                    label: item.label
                  })
                  systemStore.setHomeSorting(item.label)
                }}
              />
            ))}
            <Heatmap id='设置.切换' title='首页排序' />
          </ItemSettingBlock>

          {/* 收藏项右侧菜单 */}
          <ItemSetting
            show={shows.homeOrigin && !userStore.isLimit}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={VALUES}
                selectedIndex={homeOrigin === -1 ? 2 : homeOrigin ? 0 : 1}
                onValueChange={label => {
                  t('设置.切换', {
                    title: '显示搜索源头按钮',
                    checked: homeOrigin !== false
                  })

                  const _value =
                    label === VALUES[0] ? true : label === VALUES[1] ? false : -1
                  systemStore.setSetting('homeOrigin', _value)
                }}
              />
            }
            {...TEXTS.homeOrigin}
          >
            <Heatmap id='设置.切换' title='显示搜索源头按钮' />
          </ItemSetting>

          {/* 条目自动下沉 */}
          <ItemSetting
            show={
              shows.homeSortSink &&
              homeSorting !==
                MODEL_SETTING_HOME_SORTING.getValue<SettingHomeSorting>('网页')
            }
            ft={
              <SwitchPro
                style={styles.switch}
                value={homeSortSink}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '自动下沉',
                    checked: !homeSortSink
                  })

                  systemStore.switchSetting('homeSortSink')
                }}
              />
            }
            {...TEXTS.homeSortSink}
          >
            <Heatmap id='设置.切换' title='自动下沉' />
          </ItemSetting>

          {/* 游戏标签页 */}
          <ItemSetting
            show={shows.showGame}
            ft={
              <SwitchPro
                style={styles.switch}
                value={showGame}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '显示游戏',
                    checked: !showGame
                  })

                  systemStore.switchSetting('showGame')
                }}
              />
            }
            {...TEXTS.showGame}
          >
            <Heatmap id='设置.切换' title='显示游戏' />
          </ItemSetting>

          {/* 列表搜索框 */}
          <ItemSetting
            show={shows.homeFilter}
            ft={
              <SwitchPro
                style={styles.switch}
                value={homeFilter}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '显示列表搜索框',
                    checked: !homeFilter
                  })

                  systemStore.switchSetting('homeFilter')
                }}
              />
            }
            {...TEXTS.homeFilter}
          >
            <Heatmap id='设置.切换' title='显示列表搜索框' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Home
