/*
 * @Author: czy0729
 * @Date: 2022-01-22 15:04:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-28 04:07:12
 */
import React from 'react'
import { ActionSheet, SwitchPro, SegmentedControl, Heatmap } from '@components'
import { ItemSetting, ItemSettingBlock } from '@_'
import { _, systemStore, userStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import { MODEL_SETTING_HOME_LAYOUT, MODEL_SETTING_HOME_SORTING } from '@constants/model'
import styles from './styles'

const homeSortingInformation = {
  APP: '放送中未看 > 放送中 > 明天 > 本季未完结 > 网页',
  放送: '放送中 > 明天放送 > 网页',
  网页: '与网页bgm.tv一致'
}
const values = ['全部', '基本', '隐藏']

function Home() {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const { homeLayout, homeSorting, homeSortSink, showGame, homeFilter, homeOrigin } =
      systemStore.setting
    return (
      <>
        <ItemSetting hd='进度' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} height={640} onClose={setFalse}>
          {/* 布局 */}
          <ItemSettingBlock style={_.mt.sm} title='布局'>
            <ItemSettingBlock.Item
              icon='md-menu'
              title='列表'
              active={homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')}
              onPress={() => {
                if (homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('列表')) return

                t('设置.切换', {
                  title: '首页布局',
                  label: '列表'
                })
                systemStore.setHomeLayout('列表')
              }}
            />
            <ItemSettingBlock.Item
              style={_.ml.md}
              icon='md-grid-view'
              title='网格'
              active={homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')}
              onPress={() => {
                if (homeLayout === MODEL_SETTING_HOME_LAYOUT.getValue('网格')) return

                t('设置.切换', {
                  title: '首页布局',
                  label: '网格'
                })
                systemStore.setHomeLayout('网格')
              }}
            />
            <Heatmap id='设置.切换' title='首页布局' />
          </ItemSettingBlock>

          {/* 排序 */}
          <ItemSettingBlock style={_.mt.sm} title='排序'>
            {MODEL_SETTING_HOME_SORTING.data.map((item, index) => (
              <ItemSettingBlock.Item
                style={!!index && _.ml.md}
                title={item.label}
                information={homeSortingInformation[item.label]}
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
            show={!userStore.isLimit}
            hd='收藏项右侧菜单'
            information={`收藏项右侧按钮组显示菜单按钮\n全部 = 基本操作菜单 + 源头数据菜单`}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={values}
                selectedIndex={homeOrigin === -1 ? 2 : homeOrigin ? 0 : 1}
                onValueChange={label => {
                  t('设置.切换', {
                    title: '显示搜索源头按钮',
                    checked: homeOrigin !== false
                  })

                  const _value =
                    label === values[0] ? true : label === values[1] ? false : -1
                  systemStore.setSetting('homeOrigin', _value)
                }}
              />
            }
          >
            <Heatmap id='设置.切换' title='显示搜索源头按钮' />
          </ItemSetting>

          {/* 条目自动下沉 */}
          <ItemSetting
            show={homeSorting !== MODEL_SETTING_HOME_SORTING.getValue('网页')}
            hd='条目自动下沉'
            information='当条目没有未观看的已放送章节时，自动下沉到底'
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
          >
            <Heatmap id='设置.切换' title='自动下沉' />
          </ItemSetting>

          {/* 游戏标签页 */}
          <ItemSetting
            hd='游戏标签页'
            information='首页收藏显示在玩的游戏'
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
          >
            <Heatmap id='设置.切换' title='显示游戏' />
          </ItemSetting>

          {/* 列表搜索框 */}
          <ItemSetting
            hd='列表搜索框'
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
          >
            <Heatmap id='设置.切换' title='显示列表搜索框' />
          </ItemSetting>
        </ActionSheet>
      </>
    )
  })
}

export default Home
