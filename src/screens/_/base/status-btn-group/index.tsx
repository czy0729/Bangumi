/*
 * 条目状态选择按钮组
 *
 * @Author: czy0729
 * @Date: 2019-03-20 00:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-13 20:29:05
 */
import React from 'react'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import { getType } from '@utils/app'
import { styles } from './styles'
import { Props as StatusBtnGroupProps } from './types'

export { StatusBtnGroupProps }

export const StatusBtnGroup = ({
  style,
  value = 'doings',
  action = '看',
  onSelect = () => {}
}: StatusBtnGroupProps) => (
  <Flex style={style}>
    {MODEL_COLLECTION_STATUS.data.map((item, index) => (
      <Flex.Item key={item.label}>
        <Button
          style={styles[`btn${index}`]}
          type={
            MODEL_COLLECTION_STATUS.getLabel(value) === item.label
              ? getType(item.label)
              : _.select('plain', 'ghostPlain')
          }
          radius={!(index !== 0 && index !== 4)}
          onPress={() => onSelect(item.value)}
        >
          {item.label.replace('看', action)}
        </Button>
      </Flex.Item>
    ))}
  </Flex>
)
