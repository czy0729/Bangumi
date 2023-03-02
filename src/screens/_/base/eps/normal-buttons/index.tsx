/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-02 20:57:55
 */
import React from 'react'
import { Flex } from '@components'
import { ob } from '@utils/decorators'
import { MODEL_EP_TYPE } from '@constants'
import { Button } from '../button'
import { SpButtons } from '../sp-buttons'

export const NormalButtons = ob(({ props, eps }) => {
  const itemsNormal = []
  const itemsSp = []
  eps.forEach(item => {
    const label = MODEL_EP_TYPE.getLabel(item.type)
    if (label === '普通') {
      itemsSp.push(item)
    } else if (label === 'SP') {
      itemsNormal.push(item)
    }
  })

  return (
    <Flex wrap='wrap' align='start'>
      {itemsNormal.map((item, index) => (
        <Button key={item.id} props={props} item={item} eps={eps} num={index + 1} />
      ))}
      <SpButtons props={props} eps={itemsSp} preNum={itemsNormal.length} />
    </Flex>
  )
})
