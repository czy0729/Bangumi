/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-12-26 23:17:31
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'

function SectionTitle({ style, right, children, icon, onPress }) {
  return (
    <Flex style={style}>
      <Flex.Item style={_.mr.sm}>
        <Flex>
          {onPress ? (
            <Touchable onPress={onPress}>
              <Flex>
                <Text type='title' size={18} bold>
                  {children}
                </Text>
                {!!icon && (
                  <Iconfont
                    style={_.ml.sm}
                    name={icon}
                    size={16}
                    color={_.colorIcon}
                  />
                )}
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
}

export default SectionTitle
