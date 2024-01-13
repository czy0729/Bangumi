/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-01-14 03:52:18
 */
import React from 'react'
import { Component, Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { isObject } from '@utils'
import { memo } from '@utils/decorators'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import { styles } from './styles'
import { Props as SectionTitleProps } from './types'

export { SectionTitleProps }

/** 块(章节) 标题 */
export const SectionTitle = memo(
  ({ style, icon, left, right, children, onPress }: SectionTitleProps) => {
    r(COMPONENT)

    return (
      <Component id='base-section-title'>
        <Flex style={style}>
          <Flex.Item style={_.mr.sm}>
            <Flex>
              {onPress ? (
                <Touchable style={styles.touch} onPress={onPress}>
                  <Flex>
                    <Text type='title' size={20} bold>
                      {children}
                    </Text>
                    {!!icon && <Iconfont name={icon} color={_.colorIcon} />}
                  </Flex>
                </Touchable>
              ) : (
                <Text type='title' size={20} bold>
                  {children}
                </Text>
              )}
              {left}
            </Flex>
          </Flex.Item>
          {right}
        </Flex>
      </Component>
    )
  },
  {
    style: undefined,
    icon: '',
    left: undefined,
    right: undefined,
    children: undefined,
    onPress: undefined
  },
  ({ left, right, children, ...other }) => {
    /** right 只会 React.Element, 若存在强制更新 */
    if (isObject(right) || isObject(children)) return false

    return {
      children,
      ...other
    }
  }
)
