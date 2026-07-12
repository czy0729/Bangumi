/*
 * @Author: czy0729
 * @Date: 2025-04-10 23:31:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-09 22:37:51
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, ScrollView, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useAsyncSetSetting, useMount, useObserver } from '@utils/hooks'
import { MODEL_SETTING_SUBJECT_SPLIT_STYLES, SETTING_SUBJECT_SPLIT_STYLES } from '@constants'
import { TEXTS } from '../ds'
import { ITEM_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { ScrollTo } from '@components'
import type { SettingSubjectSplitStyles } from '@types'
import type { WithFilterProps } from '../../../types'

/** 条目版块分割线样式 */
function SplitStyles({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('subjectSplitStyles')
  const scrollToRef = useRef<ScrollTo>(null)
  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])

  useMount(() => {
    setTimeout(() => {
      if (value && typeof scrollToRef.current === 'function') {
        scrollToRef.current({
          x: SETTING_SUBJECT_SPLIT_STYLES.findIndex(item => item.value === value) * ITEM_WIDTH,
          y: 0,
          animated: false
        })
      }
    }, 0)
  })

  return useObserver(() => {
    const styles = memoStyles()

    const label = MODEL_SETTING_SUBJECT_SPLIT_STYLES.getLabel(value)

    const STYLE_KEYS = ['main', 'warning', 'primary', 'success'] as const
    const styleMap: Record<
      SettingSubjectSplitStyles,
      {
        lineStyle?: object
        titleStyle?: object
        underlineStyle?: object
      }
    > = {
      off: { lineStyle: styles.off },
      'line-1': { lineStyle: styles.line1 },
      'line-2': { lineStyle: styles.line2 },
      ...Object.fromEntries(
        STYLE_KEYS.map(key => [
          `title-${key}`,
          { titleStyle: styles[`title${key.charAt(0).toUpperCase() + key.slice(1)}`] }
        ])
      ),
      ...Object.fromEntries(
        STYLE_KEYS.map(key => [
          `underline-${key}`,
          { underlineStyle: styles[`underline${key.charAt(0).toUpperCase() + key.slice(1)}`] }
        ])
      )
    } as any

    const renderBlock = (text: string, ts?: object, us?: object) => (
      <View>
        {!!us && <View style={[styles.underline, us]} />}
        <Flex justify='center'>
          {!!ts && <View style={[styles.title, ts]} />}
          <Text size={12} bold align='center' shadow>
            {text}
          </Text>
        </Flex>
      </View>
    )

    return (
      <ItemSettingBlock style={styles.block} filter={filter} {...TEXTS.splitStyles.setting}>
        <ScrollView
          forwardRef={handleForwardRef}
          contentContainerStyle={styles.scroll}
          horizontal
          maskColors={_.select(_.colorPlainRaw, _._colorDarkModeLevel1Raw)}
        >
          {SETTING_SUBJECT_SPLIT_STYLES.map((item, index) => {
            const { value } = item
            const { title = '' } = TEXTS.splitStyles[value] || {}
            const { titleStyle, lineStyle, underlineStyle } = styleMap[value] || {}
            return (
              <ItemSettingBlock.Item
                key={value}
                style={index ? _.ml.md : undefined}
                itemStyle={styles.item}
                active={label === title}
                filter={filter}
                onPress={() => {
                  if (label === title) return

                  handleSet(MODEL_SETTING_SUBJECT_SPLIT_STYLES.getValue(title))

                  t('设置.切换', {
                    title: '条目分割线',
                    label
                  })
                }}
                {...TEXTS.splitStyles[value]}
              >
                <View style={styles.container}>
                  {renderBlock('版块 1', titleStyle, underlineStyle)}
                  <View style={lineStyle || styles.off} />
                  {renderBlock('版块 2', titleStyle, underlineStyle)}
                </View>
              </ItemSettingBlock.Item>
            )
          })}
        </ScrollView>
        <Heatmap id='设置.切换' title='切页动画' />
      </ItemSettingBlock>
    )
  })
}

export default SplitStyles
