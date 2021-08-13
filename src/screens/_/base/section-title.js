/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-13 08:50:09
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { isObject } from '@utils'
import { memo } from '@utils/decorators'

const defaultProps = {
  style: undefined,
  icon: '',
  right: undefined,
  children: undefined,
  onPress: undefined
}

export const SectionTitle = memo(
  ({ style, icon, right, children, onPress }) => {
    rerender('Component.SectionTitle')

    return (
      <Flex style={style}>
        <Flex.Item style={_.mr.sm}>
          <Flex>
            {onPress ? (
              <Touchable style={styles.touch} onPress={onPress}>
                <Flex>
                  <Text type='title' size={18} bold>
                    {children}
                  </Text>
                  {!!icon && <Iconfont name={icon} color={_.colorIcon} />}
                </Flex>
              </Touchable>
            ) : (
              <Text type='title' size={18} bold>
                {children}
              </Text>
            )}
          </Flex>
        </Flex.Item>
        {right}
      </Flex>
    )
  },
  defaultProps,
  ({ right, children, ...other }) => {
    // right只会是React.Element, 若存在强制更新
    if (isObject(right) || isObject(children)) return false

    return {
      children,
      ...other
    }
  }
)

const styles = _.create({
  touch: {
    paddingHorizontal: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
