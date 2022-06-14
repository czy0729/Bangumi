/*
 * <ScrollView> 的 section 标题
 *
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 20:49:56
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { isObject } from '@utils'
import { memo } from '@utils/decorators'
import { styles } from './styles'
import { Props as SectionTitleProps } from './types'

export { SectionTitleProps }

export const SectionTitle = memo(
  ({ style, icon, left, right, children, onPress }: SectionTitleProps) => {
    global.rerender('Component.SectionTitle')

    return (
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
    // right只会是React.Element, 若存在强制更新
    if (isObject(right) || isObject(children)) return false

    return {
      children,
      ...other
    }
  }
)
