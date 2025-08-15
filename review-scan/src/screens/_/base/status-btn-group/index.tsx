/*
 * @Author: czy0729
 * @Date: 2019-03-20 00:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-02 16:58:13
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { Component, Flex, getTextStyle, Touchable } from '@components'
import { _, systemStore } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { s2t } from '@utils/thirdParty/open-cc'
import { COLLECTION_STATUS, FROZEN_FN } from '@constants'
import { useStatusBtnGroup } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as StatusBtnGroupProps } from './types'

export { StatusBtnGroupProps }

/** 条目状态选择按钮组 */
export const StatusBtnGroup = ({
  style,
  value = '',
  action = '看',
  onSelect = FROZEN_FN
}: StatusBtnGroupProps) => {
  r(COMPONENT)

  const { blockStyle, getButtonStyle, handleContainerLayout, handleButtonPress } =
    useStatusBtnGroup(value)

  return useObserver(() => {
    const styles = memoStyles()
    return (
      <Component id='base-status-btn-group'>
        <Flex style={stl(styles.group, style)} onLayout={handleContainerLayout}>
          <Animated.View style={[styles.block, blockStyle]} />
          {COLLECTION_STATUS.map((item, index) => {
            const text = item.label.replace('看', action)
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
                        style: _.select(getButtonStyle(index), undefined),
                        type: '__plain__'
                      })}
                      suppressHighlighting
                      textBreakStrategy='simple'
                      android_hyphenationFrequency='none'
                    >
                      {systemStore.setting.s2t ? s2t(text) : text}
                    </Animated.Text>
                  </Flex>
                </Touchable>
              </Flex.Item>
            )
          })}
        </Flex>
      </Component>
    )
  })
}

export default StatusBtnGroup
