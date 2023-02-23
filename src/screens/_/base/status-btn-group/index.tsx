/*
 * 条目状态选择按钮组
 *
 * @Author: czy0729
 * @Date: 2019-03-20 00:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-23 12:43:55
 */
import React from 'react'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { getType, stl } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_COLLECTION_STATUS, COLLECTION_STATUS } from '@constants'
import { CollectionStatusCn } from '@types'
import { memoStyles } from './styles'
import { Props as StatusBtnGroupProps } from './types'

export { StatusBtnGroupProps }

export const StatusBtnGroup = ob(
  ({
    style,
    value = 'doings',
    action = '看',
    onSelect = () => {}
  }: StatusBtnGroupProps) => {
    const styles = memoStyles()
    return (
      <Flex style={stl(styles.group, style)}>
        {COLLECTION_STATUS.map(item => (
          <Flex.Item key={item.label}>
            <Button
              style={styles.btn}
              type={
                MODEL_COLLECTION_STATUS.getLabel<CollectionStatusCn>(value) ===
                item.label
                  ? getType(item.label)
                  : _.select('plain', 'ghostPlain')
              }
              onPress={() => onSelect(item.value)}
            >
              {item.label.replace('看', action)}
            </Button>
          </Flex.Item>
        ))}
      </Flex>
    )
  }
)
