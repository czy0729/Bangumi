/*
 * @Author: czy0729
 * @Date: 2022-01-28 15:31:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-18 15:06:32
 */
import React from 'react'
import { ActionSheet, SegmentedControl, Heatmap, Highlight, Text } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import i18n from '@constants/i18n'
import { getShows, getYuqueThumbs } from '../utils'
import styles from '../styles'
import { DATA, TEXTS, THUMBS, VALUES, VALUES_2 } from './ds'

function Subject({ filter }) {
  const { state, setTrue, setFalse } = useBoolean(false)
  const shows = getShows(filter, TEXTS)

  return useObserver(() => {
    if (!shows) return null

    const { setting } = systemStore
    return (
      <>
        <ItemSetting hd='条目' arrow highlight filter={filter} onPress={setTrue} />
        <ActionSheet
          show={state}
          title='条目'
          height={filter ? 400 : 760}
          onClose={setFalse}
        >
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661209187428-25d8eb90-0a10-4ec6-9ac3-0e9512fd62d5.png'
            ])}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661209205559-20bb627c-a3bc-49ef-8ead-2e5b7e557ef3.png'
            ])}
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
            filter={filter}
            thumb={getYuqueThumbs([
              '0/2022/png/386799/1661209627915-8d0fe927-8c1e-4849-9993-d87df4ea5e6d.png',
              '0/2022/png/386799/1661209631943-1d4861c5-396f-4641-9b72-c88148e2cafd.png'
            ])}
            {...TEXTS.showCustomOnair}
            information={`收藏状态为在看的动画，章节的右下方，${i18n.initial()}值为线上放送时间，手动更改后首页收藏排序以此为准`}
          >
            <Heatmap id='设置.切换' title='条目.自定义放送时间块' />
          </ItemSetting>

          {/* 页面布局 */}
          {shows.layout && (
            <>
              <Highlight
                style={[_.container.wind, _.mt.md, _.mb.sm]}
                type='sub'
                size={12}
                lineHeight={13}
                value={filter}
              >
                {TEXTS.layout.text}
              </Highlight>
              {Object.keys(DATA).map((item: keyof typeof DATA) => {
                const title = DATA[item]
                const value = setting[item]
                const selectedIndex = value === -1 ? 2 : value ? 0 : 1
                return (
                  <ItemSetting
                    key={item}
                    hd={title}
                    ft={
                      item === 'showEp' || item === 'showComic' ? (
                        <Text style={styles.segmentedControl} bold align='center'>
                          此功能块不支持自定义
                        </Text>
                      ) : (
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
                      )
                    }
                    filter={filter}
                    thumb={getYuqueThumbs(THUMBS[item])}
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
