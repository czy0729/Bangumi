/*
 * @Author: czy0729
 * @Date: 2019-03-20 00:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-19 20:29:12
 */
import React, { useMemo } from 'react'
import Animated from 'react-native-reanimated'
import { observer } from 'mobx-react'
import { Component, Flex, getTextStyle, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { s2t } from '@utils/thirdParty/open-cc'
import { COLLECTION_STATUS, FROZEN_FN } from '@constants'
import { useStatusBtnGroup } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Props as StatusBtnGroupProps } from './types'
export type { StatusBtnGroupProps }

/** 条目状态选择按钮组 */
export const StatusBtnGroup = observer(
  ({ style, value = '', action = '看', onSelect = FROZEN_FN }: StatusBtnGroupProps) => {
    r(COMPONENT)

    const { blockStyle, buttonStyles, handleContainerLayout, handleButtonPress } =
      useStatusBtnGroup(value)

    const styles = memoStyles()

    const { s2t: s2tEnabled } = systemStore.setting
    const labels = useMemo(
      () =>
        COLLECTION_STATUS.map(item => {
          const text = item.label.replace('看', action)
          return s2tEnabled ? s2t(text) : text
        }),
      [action, s2tEnabled]
    )

    return (
      <Component id='base-status-btn-group'>
        <Flex style={stl(styles.group, style)} onLayout={handleContainerLayout}>
          <Animated.View style={[styles.block, blockStyle]} />
          {COLLECTION_STATUS.map((item, index) => {
            return (
              <Flex.Item key={item.label}>
                <Touchable
                  onPress={() => {
                    handleButtonPress(index)

                    setTimeout(() => {
                      onSelect(item.value)
                    }, 0)
                  }}
                >
                  <Flex style={styles.btn} justify='center'>
                    <Animated.Text
                      style={getTextStyle({
                        style: _.select(buttonStyles[index], undefined),
                        type: '__plain__'
                      })}
                      suppressHighlighting
                      textBreakStrategy='simple'
                      android_hyphenationFrequency='none'
                    >
                      {labels[index]}
                    </Animated.Text>
                  </Flex>
                </Touchable>
              </Flex.Item>
            )
          })}
        </Flex>
      </Component>
    )
  }
)

export default StatusBtnGroup
