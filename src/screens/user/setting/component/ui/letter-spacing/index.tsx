/*
 * @Author: czy0729
 * @Date: 2026-01-15 11:19:27
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-15 11:48:24
 */
import React, { useCallback, useRef } from 'react'
import { Heatmap, ScrollView, Text } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useMount, useObserver } from '@utils/hooks'
import { SETTING_LETTER_SPACING } from '@constants'
import { TEXTS } from '../ds'
import { styles } from './styles'

import type { ScrollTo } from '@components'
import type { WithFilterProps } from '../../../types'

/** 字间距 */
function LetterSpacing({ filter }: WithFilterProps) {
  const scrollToRef = useRef<ScrollTo>(null)
  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])

  useMount(() => {
    setTimeout(() => {
      if (_.letterSpacing && typeof scrollToRef.current === 'function') {
        scrollToRef.current({
          x: SETTING_LETTER_SPACING.findIndex(item => _.letterSpacing == Number(item.value)) * 48,
          y: 0,
          animated: false
        })
      }
    }, 0)
  })

  return useObserver(() => (
    <ItemSettingBlock style={styles.block} filter={filter} {...TEXTS.letterSpacing}>
      <ScrollView forwardRef={handleForwardRef} contentContainerStyle={styles.scroll} horizontal>
        {SETTING_LETTER_SPACING.map((item, index) => (
          <ItemSettingBlock.Item
            key={item.label}
            style={!!index && styles.margin}
            title={item.label}
            active={_.letterSpacing == Number(item.value)}
            filter={filter}
            onPress={() => {
              if (_.letterSpacing == Number(item.value)) return

              t('设置.切换', {
                title: '字间距',
                label: item.label
              })
              _.changeLetterSpacing(item.value)
            }}
          >
            <Text
              style={_.mt.sm}
              overrideStyle={{
                letterSpacing: Number(item.value)
              }}
              size={11}
            >
              番组计划
            </Text>
          </ItemSettingBlock.Item>
        ))}
      </ScrollView>
      <Heatmap id='设置.切换' title='字间距' />
    </ItemSettingBlock>
  ))
}

export default LetterSpacing
