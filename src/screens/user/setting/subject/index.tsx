/*
 * @Author: czy0729
 * @Date: 2022-01-28 15:31:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:06:32
 */
import React from 'react'
import { ActionSheet, Text, SegmentedControl, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { getShows } from '../utils'
import styles from '../styles'
import { DATA, TEXTS, VALUES, VALUES_2 } from './ds'

function Subject({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { setting } = systemStore
    return (
      <>
        <ItemSetting hd='条目' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} height={filter ? 400 : 680} onClose={setFalse}>
          {/* 其他用户收藏数量 */}
          <ItemSetting
            show={shows.showCount}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={VALUES_2}
                selectedIndex={setting.showCount ? 0 : 1}
                onValueChange={label => {
                  t('设置.切换', {
                    title: '条目.其他用户收藏数量',
                    label
                  })

                  systemStore.setSetting('showCount', label === '显示')
                }}
              />
            }
            {...TEXTS.showCount}
          >
            <Heatmap id='设置.切换' title='条目.其他用户收藏数量' />
          </ItemSetting>

          {/* 进度输入框 */}
          <ItemSetting
            show={shows.showEpInput}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={VALUES_2}
                selectedIndex={setting.showEpInput ? 0 : 1}
                onValueChange={label => {
                  t('设置.切换', {
                    title: '条目.进度输入框',
                    label
                  })

                  systemStore.setSetting('showEpInput', label === '显示')
                }}
              />
            }
            {...TEXTS.showEpInput}
          >
            <Heatmap id='设置.切换' title='条目.进度输入框' />
          </ItemSetting>

          {/* 自定义放送时间块 */}
          <ItemSetting
            show={shows.showCustomOnair}
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={VALUES_2}
                selectedIndex={setting.showCustomOnair ? 0 : 1}
                onValueChange={label => {
                  t('设置.切换', {
                    title: '条目.自定义放送时间块',
                    label
                  })

                  systemStore.setSetting('showCustomOnair', label === '显示')
                }}
              />
            }
            {...TEXTS.showCustomOnair}
            information={`收藏状态为在看的动画，章节的右下方，${i18n.initial()}值为线上放送时间，手动更改后首页收藏排序以此为准`}
          >
            <Heatmap id='设置.切换' title='条目.自定义放送时间块' />
          </ItemSetting>

          {/* 页面布局 */}
          {shows.layout && (
            <>
              <Text
                style={[_.container.wind, _.mt.md, _.mb.sm]}
                type='sub'
                size={12}
                lineHeight={13}
              >
                {TEXTS.layout.text}
              </Text>
              {Object.keys(DATA).map((item: keyof typeof DATA) => {
                const title = DATA[item]
                const value = setting[item]
                const selectedIndex = value === -1 ? 2 : value ? 0 : 1
                return (
                  <ItemSetting
                    key={item}
                    hd={title}
                    ft={
                      <SegmentedControl
                        style={styles.segmentedControl}
                        size={12}
                        values={VALUES}
                        selectedIndex={selectedIndex}
                        onValueChange={label => {
                          if (label && label === VALUES[selectedIndex]) return

                          t('设置.切换', {
                            title: `条目.${title}`,
                            label
                          })

                          const _value =
                            label === '显示' ? true : label === '折叠' ? false : -1
                          systemStore.setSetting(item, _value)
                        }}
                      />
                    }
                  >
                    <Heatmap id='设置.切换' title={`条目.${title}`} />
                  </ItemSetting>
                )
              })}
            </>
          )}
        </ActionSheet>
      </>
    )
  })
}

export default Subject
