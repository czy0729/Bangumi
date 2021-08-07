/*
 * @Author: czy0729
 * @Date: 2021-08-05 16:47:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-08 06:34:49
 */
import React from 'react'
import { Flex } from '@components'
import { memoCompare } from '@utils'
import { MODEL_EP_TYPE } from '@constants/model'
import { Button } from './button'
import { SpButtons } from './sp-buttons'

export const NormalButtons = React.memo(({ props, eps }) => {
  // rerender('Eps / NormalButtons')

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
        <Button
          key={item.id}
          props={props}
          item={item}
          eps={eps}
          num={index + 1}
        />
      ))}
      <SpButtons props={props} eps={itemsSp} preNum={itemsNormal.length} />
    </Flex>
  )
}, memoCompare)
