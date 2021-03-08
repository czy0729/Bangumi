/*
 * @Author: czy0729
 * @Date: 2019-03-20 00:27:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-08 18:06:10
 */
import React from 'react'
import { Flex, Button } from '@components'
import { _ } from '@stores'
import { MODEL_COLLECTION_STATUS } from '@constants/model'
import { getType } from '@utils/app'

export const StatusBtnGroup = ({
  style,
  value = 0,
  action = '看',
  onSelect = Function.prototype
}) => (
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

const styles = _.create({
  btn0: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  btn4: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  }
})
