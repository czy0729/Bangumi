/*
 * @Author: czy0729
 * @Date: 2019-04-10 15:28:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-04-21 17:42:34
 */
import React from 'react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const SectionTitle = ob(({ style, right, children, icon, onPress }) => (
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
))

const styles = _.create({
  touch: {
    paddingHorizontal: _.xs,
    marginLeft: -_.xs,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
})
