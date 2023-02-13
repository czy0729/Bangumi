/*
 * @Author: czy0729
 * @Date: 2022-01-22 15:04:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-04 20:44:51
 */
import React from 'react'
import { ActionSheet, SwitchPro, SegmentedControl, Heatmap, Text } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore, userStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import {
  MODEL_SETTING_HOME_GRID_COVER_LAYOUT,
  MODEL_SETTING_HOME_LAYOUT,
  MODEL_SETTING_HOME_SORTING,
  SETTING_HOME_COUNT_VIEW,
  SETTING_HOME_GRID_COVER_LAYOUT,
  SETTING_HOME_SORTING
} from '@constants'
import {
  SettingHomeGridCoverLayout,
  SettingHomeLayout,
  SettingHomeSorting
} from '@types'
import { getShows, getYuqueThumbs } from '../utils'
import styles from '../styles'
import { HOME_SORTING_INFORMATION, VALUES, TEXTS, HOME_COUNT_VIEW } from './ds'
import CustomBtn from './custom-btn'

function Home({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const {
      homeCountView,
      homeFilter,
      homeGridCoverLayout,
      homeLayout,
      homeOnAir,
      homeOrigin,
      homeSortSink,
      homeSorting,
      homeEpStartAtLastWathed,
      exportICS,
      showGame
    } = systemStore.setting
    const homeLayoutList = MODEL_SETTING_HOME_LAYOUT.getValue<SettingHomeLayout>('列表')
    return (
      <>
        <ItemSetting hd='进度' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet
          show={state}
          title='进度'
          height={filter ? 400 : 760}
          onClose={setFalse}
        >
          {/* 布局 */}
          <ItemSettingBlock
            show={shows.homeLayout}
            style={_.mt.sm}
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661062359544-87e2ab4e-ca1f-4e7e-8efb-ccadf891ccc0.png',
              '0/2022/png/386799/1661062365513-c52a1484-e585-48e9-b672-8a0c547543b4.png'
            ])}
            {...TEXTS.homeLayout.setting}
          >
            <ItemSettingBlock.Item
              icon='md-menu'
              active={homeLayout === homeLayoutList}
              filter={filter}
              onPress={() => {
                if (homeLayout === homeLayoutList) return

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
              filter={filter}
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
            show={shows.homeGridCoverLayout && homeLayout !== homeLayoutList}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661062400888-2f305de2-9e5a-40ac-a878-1294c4de40fa.png',
              '0/2022/png/386799/1661062406213-0d748359-9e14-41e3-88a2-eeea58a1617c.png'
            ])}
            {...TEXTS.homeGridCoverLayout}
          >
            <Heatmap id='设置.切换' title='封面形状' />
          </ItemSetting>

          {/* 列表显示最大收藏数 */}
          <ItemSetting
            style={_.mb.md}
            show={shows.homeListLimit}
            ft={
              <Text size={13} bold>
                {systemStore.advance
                  ? '当前 300 项 (非会员 100，网页 25)'
                  : '当前 100 项 (会员 300，网页 25)'}
              </Text>
            }
            filter={filter}
            {...TEXTS.homeListLimit}
          />

          {/* 右上角功能入口 */}
          <ItemSetting
            show={shows.homeCustom}
            ft={<CustomBtn />}
            filter={filter}
            {...TEXTS.homeCustom}
          >
            <Heatmap id='设置.切换' title='右上角功能入口' />
          </ItemSetting>

          {/* 放送数字显示 */}
          <ItemSettingBlock
            show={shows.homeCountView}
            style={_.mt.sm}
            filter={filter}
            {...TEXTS.homeCountView}
          >
            {SETTING_HOME_COUNT_VIEW.map((item, index) => (
              <ItemSettingBlock.Item
                style={!!index && _.ml.md}
                title={item.label}
                information={HOME_COUNT_VIEW[item.label]}
                active={homeCountView === item.value}
                filter={filter}
                onPress={() => {
                  if (homeCountView === item.value) return

                  t('设置.切换', {
                    title: '放送数字显示',
                    label: item.label
                  })
                  systemStore.setHomeCountView(item.label)
                }}
              />
            ))}
            <Heatmap id='设置.切换' title='放送数字显示' />
          </ItemSettingBlock>

          {/* 排序 */}
          <ItemSettingBlock
            show={shows.homeSorting}
            style={_.mt.sm}
            filter={filter}
            {...TEXTS.homeSorting}
          >
            {SETTING_HOME_SORTING.map((item, index) => (
              <ItemSettingBlock.Item
                style={!!index && _.ml.md}
                title={item.label}
                information={HOME_SORTING_INFORMATION[item.label]}
                active={homeSorting === item.value}
                filter={filter}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661061347638-6ba991c5-b296-43e6-8d95-2b3c9da920ab.png',
              '0/2022/png/386799/1661061354378-cc1ece33-5a8c-419c-8e05-8559106ffb9d.png',
              '0/2022/png/386799/1661060959608-f312593f-5512-4b75-9060-c9b0071ed6ce.png'
            ])}
            {...TEXTS.homeOrigin}
          >
            <Heatmap id='设置.切换' title='显示搜索源头按钮' />
          </ItemSetting>

          {/* 放送提醒菜单增加导出 ICS */}
          <ItemSetting
            show={shows.homeEpStartAtLastWathed}
            ft={
              <SwitchPro
                style={styles.switch}
                value={exportICS}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '导出ICS',
                    checked: !exportICS
                  })

                  systemStore.switchSetting('exportICS')
                }}
              />
            }
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2023/png/386799/1675513866337-d4753afd-b998-4e5a-8955-faacfb3d9eae.png',
              '0/2023/png/386799/1675513933249-3b66e0de-9c53-425d-a263-0e6047595196.png',
              '0/2023/png/386799/1675513995664-4a1cfef0-66ed-47d5-8285-29df1534c1ee.png'
            ])}
            {...TEXTS.homeICS}
          >
            <Heatmap id='设置.切换' title='导出ICS' />
          </ItemSetting>

          {/* 长篇动画从最后看过开始显示 */}
          <ItemSetting
            show={shows.homeEpStartAtLastWathed}
            ft={
              <SwitchPro
                style={styles.switch}
                value={homeEpStartAtLastWathed}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '长篇动画从最后看过开始显示',
                    checked: !homeEpStartAtLastWathed
                  })

                  systemStore.switchSetting('homeEpStartAtLastWathed')
                }}
              />
            }
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2023/png/386799/1673684120408-ee3db302-a9d2-41a3-bc53-56788d523839.png',
              '0/2023/png/386799/1673684144406-ff53b877-e632-4c13-af16-b5daad4033ba.png'
            ])}
            {...TEXTS.homeEpStartAtLastWathed}
          >
            <Heatmap id='设置.切换' title='长篇动画从最后看过开始显示' />
          </ItemSetting>

          {/* 一直显示放送时间 */}
          <ItemSetting
            show={shows.homeOnAir}
            ft={
              <SwitchPro
                style={styles.switch}
                value={homeOnAir}
                onSyncPress={() => {
                  t('设置.切换', {
                    title: '一直显示放送时间',
                    checked: !homeOnAir
                  })

                  systemStore.switchSetting('homeOnAir')
                }}
              />
            }
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661241773996-701bcab2-3841-4f04-be90-7fb7b6baaf6a.png',
              '0/2022/png/386799/1661241775968-cd2588bb-32e4-46d9-b59e-786c82c46cd8.png'
            ])}
            {...TEXTS.homeOnAir}
          >
            <Heatmap id='设置.切换' title='一直显示放送时间' />
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661045651857-7de7e8b7-34ce-4810-b6bd-d61d35412124.png',
              '0/2022/png/386799/1661045660979-be977cea-5eb2-45a7-8dd2-49ef4ec3966c.png'
            ])}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661045149065-c6d393f9-8649-4239-a459-b9f8c99c3a50.png',
              '0/2022/png/386799/1661045159272-5b09aea4-c609-4caa-b705-281d23026fa7.png'
            ])}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661060312559-a94c0975-3b5e-4623-bfd2-9e00aedc4e59.png',
              '0/2022/png/386799/1661060318569-a7c55607-7a61-489f-ae6a-7bad94a6bb41.png'
            ])}
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
