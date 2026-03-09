/*
 * @Author: czy0729
 * @Date: 2026-03-09 22:04:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-10 07:03:56
 */
import React, { useCallback, useRef } from 'react'
import { Flex, Heatmap, Image, ScrollView } from '@components'
import { ItemSettingBlock } from '@_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { useMount, useObserver } from '@utils/hooks'
import { SETTING_LIVE2D_MODEL } from '@constants'
import { TEXTS } from '../ds'
import { useAsyncSetSetting } from '../../../hooks'
import { ITEM_WIDTH } from './ds'
import { memoStyles } from './styles'

import type { ScrollTo } from '@components'
import type { WithFilterProps } from '../../../types'

/** 看板娘 Live2D Model */
function Live2DModel({ filter }: WithFilterProps) {
  const { value, handleSet } = useAsyncSetSetting('live2DModel')
  const scrollToRef = useRef<ScrollTo>(null)
  const handleForwardRef = useCallback((scrollTo: ScrollTo) => {
    scrollToRef.current = scrollTo
  }, [])

  useMount(() => {
    setTimeout(() => {
      if (value && typeof scrollToRef.current === 'function') {
        scrollToRef.current({
          x: SETTING_LIVE2D_MODEL.findIndex(item => item.value === value) * ITEM_WIDTH,
          y: 0,
          animated: false
        })
      }
    }, 0)
  })

  return useObserver(() => {
    const styles = memoStyles()

    return (
      <ItemSettingBlock
        style={styles.block}
        filter={filter}
        sub
        subStyle={styles.sub}
        {...TEXTS.live2DModel.setting}
      >
        <ScrollView forwardRef={handleForwardRef} contentContainerStyle={styles.scroll} horizontal>
          {SETTING_LIVE2D_MODEL.map((item, index) => {
            const { title, information, src } = TEXTS.live2DModel[item.value]

            return (
              <ItemSettingBlock.Item
                key={item.value}
                style={index ? _.ml.md : undefined}
                itemStyle={styles.item}
                title={title}
                titleSize={12}
                information={information}
                active={item.value === value}
                filter={filter}
                onPress={() => {
                  if (item.value === value) return

                  handleSet(item.value)

                  t('设置.切换', {
                    title: 'Live2D Model',
                    label: item.label
                  })
                }}
                {...TEXTS.live2DModel[item.value]}
              >
                <Flex style={_.mt.sm}>
                  <Image size={44} src={src} radius={_.radiusSm} />
                </Flex>
              </ItemSettingBlock.Item>
            )
          })}
        </ScrollView>

        <Heatmap id='设置.切换' title='Live2D Model' />
      </ItemSettingBlock>
    )
  })
}

export default Live2DModel
