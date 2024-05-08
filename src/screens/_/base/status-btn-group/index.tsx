/*
 * @Author: czy0729
 * @Date: 2019-03-20 00:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-08 21:26:07
 */
import React from 'react'
import Animated from 'react-native-reanimated'
import { AnimatedText, Component, Flex, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { r } from '@utils/dev'
import { useObserver } from '@utils/hooks'
import { COLLECTION_STATUS } from '@constants'
import { useStatusBtnGroup } from './hooks'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as StatusBtnGroupProps } from './types'

export { StatusBtnGroupProps }

/** 条目状态选择按钮组 */
export const StatusBtnGroup = ({
  style,
  value = 'doings',
  action = '看',
  onSelect = () => {}
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
          {COLLECTION_STATUS.map((item, index) => (
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
                  <AnimatedText style={_.select(getButtonStyle(index), undefined)} type='__plain__'>
                    {item.label.replace('看', action)}
                  </AnimatedText>
                </Flex>
              </Touchable>
            </Flex.Item>
          ))}
        </Flex>
      </Component>
    )
  })
}
