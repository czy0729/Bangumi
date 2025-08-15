/*
 * @Author: czy0729
 * @Date: 2025-04-10 23:31:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:04:15
 */
import React, { useCallback, useRef } from 'react'
import { View } from 'react-native'
import { Flex, Heatmap, ScrollTo, ScrollView, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useAsyncSetSetting, useMount, useObserver } from '@utils/hooks'
import { MODEL_SETTING_SUBJECT_SPLIT_STYLES, SETTING_SUBJECT_SPLIT_STYLES } from '@constants'
import { SettingSubjectSplitStyles } from '@types'
import { WithFilterProps } from '../../../types'
import { TEXTS } from '../ds'
import { ITEM_WIDTH } from './ds'
import { memoStyles } from './styles'

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
    const styleMap: Record<
      SettingSubjectSplitStyles,
      {
        lineStyle?: object
        titleStyle?: object
      }
    > = {
      off: { lineStyle: styles.off },
      'line-1': { lineStyle: styles.line1 },
      'line-2': { lineStyle: styles.line2 },
      'title-main': { titleStyle: styles.titleMain },
      'title-warning': { titleStyle: styles.titleWarning },
      'title-primary': { titleStyle: styles.titlePrimary },
      'title-success': { titleStyle: styles.titleSuccess }
    }

    return (
      <ItemSettingBlock style={styles.block} filter={filter} {...TEXTS.splitStyles.setting}>
        <ScrollView forwardRef={handleForwardRef} contentContainerStyle={styles.scroll} horizontal>
          {SETTING_SUBJECT_SPLIT_STYLES.map((item, index) => {
            const { value } = item
            const { title } = TEXTS.splitStyles[value]
            const { titleStyle, lineStyle } = styleMap[value] || {}
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
                  <Flex justify='center'>
                    {titleStyle && <View style={[styles.title, titleStyle]} />}
                    <Text size={12} bold align='center'>
                      版块 1
                    </Text>
                  </Flex>
                  <View style={lineStyle || styles.off} />
                  <Flex justify='center'>
                    {titleStyle && <View style={[styles.title, titleStyle]} />}
                    <Text size={12} bold align='center'>
                      版块 2
                    </Text>
                  </Flex>
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
