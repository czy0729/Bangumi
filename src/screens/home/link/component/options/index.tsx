/*
 * @Author: czy0729
 * @Date: 2025-12-16 03:31:45
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-17 04:24:58
 */
import React from 'react'
import { View } from 'react-native'
import { useObserver } from 'mobx-react'
import { ActionSheet, Divider, Flex, SwitchPro, Text, Touchable } from '@components'
import { IconTouchable, ItemSetting, Notice } from '@_'
import { _, systemStore, useStore } from '@stores'
import { stl } from '@utils'
import { MODEL_SUBJECT_TYPE, WEB } from '@constants'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Options() {
  const { $ } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()

    const { map, hideTypes, hidePlatforms, hideRelates } = $.state

    // types
    const typeCountMap = new Map<string, number>()
    map.node.forEach(item => {
      const type = item.type
      typeCountMap.set(type, (typeCountMap.get(type) || 0) + 1)
    })
    const types = Array.from(typeCountMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)

    // platforms
    const platformCountMap = new Map<string, number>()
    map.node.forEach(item => {
      const platform = item.platform
      platformCountMap.set(platform, (platformCountMap.get(platform) || 0) + 1)
    })
    const platforms = Array.from(platformCountMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)

    // relates
    const relateCountMap = new Map<string, number>()
    map.relate.forEach(item => {
      const type = item.relate
      relateCountMap.set(type, (relateCountMap.get(type) || 0) + 1)
    })
    const relates = Array.from(relateCountMap.entries())
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => b.count - a.count)

    const renderFilterSection = (
      title: string,
      tip: string,
      items: { label: string; count: number }[],
      hiddenItems: string[],
      type: 'hideTypes' | 'hidePlatforms' | 'hideRelates',
      getLabelText?: (label: string) => string
    ) => (
      <View style={styles.container}>
        <Text size={16} bold>
          {title}
        </Text>
        <Text style={_.mt.xxs} type={_.select('sub', 'icon')} size={12} lineHeight={14}>
          {tip}
        </Text>
        <Flex style={_.mt.sm} wrap='wrap'>
          {items.map(item => (
            <Touchable
              key={item.label}
              style={stl(styles.item, hiddenItems.includes(item.label) && styles.disabled)}
              onPress={() => $.toggleHide(type, item.label)}
            >
              <Flex>
                <Text size={getLabelText ? 12 : 13} bold>
                  {getLabelText?.(item.label) || item.label}{' '}
                  <Text type={_.select('sub', 'icon')} size={12} lineHeight={13} bold>
                    {item.count}
                  </Text>
                </Text>
              </Flex>
            </Touchable>
          ))}
        </Flex>
      </View>
    )

    return (
      <ActionSheet
        show={$.state.show}
        title='关联图'
        height={Math.floor(_.window.height * 0.68)}
        onClose={() => $.setOptions('show', false)}
      >
        {!WEB && (
          <View style={styles.theme}>
            <IconTouchable
              name={_.isDark ? 'moon' : 'sunny'}
              color={_.colorIcon}
              size={18}
              onPress={() => {
                setTimeout(() => {
                  _.toggleMode()
                }, 40)
              }}
            />
          </View>
        )}

        <Notice style={_.mt.md}>点击关系线可指向目标，长按节点可跳转到条目页面</Notice>
        <Divider />

        {renderFilterSection(
          '类型',
          '点击切换是否显示该类型的条目',
          types,
          hideTypes,
          'hideTypes',
          label => MODEL_SUBJECT_TYPE.getTitle(label)
        )}

        {renderFilterSection(
          '平台',
          '点击切换是否显示该平台的条目',
          platforms,
          hidePlatforms,
          'hidePlatforms'
        )}

        {renderFilterSection(
          '关联',
          '点击切换是否显示该类型的关系（实验性选项，当有禁用值时，仅会在一个条目与其他没任何关系时，才会被过滤掉）',
          relates,
          hideRelates,
          'hideRelates'
        )}

        <Divider />
        <ItemSetting
          hd='使用手机默认字体渲染页面'
          ft={
            <SwitchPro
              style={styles.switch}
              value={systemStore.setting.subjectLinkCustomFontFamily}
              onSyncPress={() => systemStore.switchSetting('subjectLinkCustomFontFamily')}
            />
          }
        />

        {/* <Divider />
        <View style={styles.container}>
          <Text size={16} bold>
            计算关系{' '}
          </Text>
          <BFS map={$.filterMap} />
        </View> */}
      </ActionSheet>
    )
  })
}

export default Options
