/*
 * @Author: czy0729
 * @Date: 2022-01-28 15:31:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-07 07:40:40
 */
import React from 'react'
import { ActionSheet, Text, SegmentedControl, Heatmap } from '@components'
import { ItemSetting } from '@_'
import { _, systemStore } from '@stores'
import { useBoolean, useObserver } from '@utils/hooks'
import { t } from '@utils/fetch'
import styles from './styles'

const data = {
  showRelation: '前传 / 续作',
  showTags: '标签',
  showSummary: '简介',
  showInfo: '详情',
  showThumbs: '预览图',
  showGameInfo: '游戏条目信息',
  showRating: '评分',
  showCharacter: '角色',
  showStaff: '制作人员',
  showRelations: '关联条目',
  showCatalog: '目录',
  showRecent: '动态',
  showBlog: '日志',
  showTopic: '帖子',
  showLike: '猜你喜欢',
  showComment: '吐槽'
}
const values = ['显示', '折叠', '隐藏']
const values2 = ['显示', '隐藏']

function Subject() {
  const { state, setTrue, setFalse } = useBoolean(false)

  return useObserver(() => {
    const { setting } = systemStore
    return (
      <>
        <ItemSetting hd='条目' arrow highlight onPress={setTrue} />
        <ActionSheet show={state} height={640} onClose={setFalse}>
          {/* 其他用户收藏数量 */}
          <ItemSetting
            hd='其他用户收藏数量'
            information='站点所有用户各收藏状态计数'
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={values2}
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
          >
            <Heatmap id='设置.切换' title='条目.其他用户收藏数量' />
          </ItemSetting>

          {/* 进度输入框 */}
          <ItemSetting
            hd='进度输入框'
            information='批量快速操作章节看过，也可用于标记到没有录入的章节'
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={values2}
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
          >
            <Heatmap id='设置.切换' title='条目.进度输入框' />
          </ItemSetting>

          {/* 自定义放送时间块 */}
          <ItemSetting
            hd='自定义放送时间块'
            information='收藏状态为在看的动画，章节的右下方，默认值为线上放送时间，手动更改后首页收藏排序以此为准'
            ft={
              <SegmentedControl
                style={styles.segmentedControl}
                size={12}
                values={values2}
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
          >
            <Heatmap id='设置.切换' title='条目.自定义放送时间块' />
          </ItemSetting>

          {/* 页面布局 */}
          <Text
            style={[_.container.wind, _.mt.md, _.mb.sm]}
            type='sub'
            size={12}
            lineHeight={13}
          >
            页面布局
          </Text>
          {Object.keys(data).map(item => {
            const title = data[item]
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
                    values={values}
                    selectedIndex={selectedIndex}
                    onValueChange={label => {
                      if (label && label === values[selectedIndex]) return

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
        </ActionSheet>
      </>
    )
  })
}

export default Subject
