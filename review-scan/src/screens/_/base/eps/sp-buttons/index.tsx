/*
 * @Author: czy0729
 * @Date: 2021-08-05 22:19:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-26 04:36:52
 */
import React from 'react'
import { Flex, Text } from '@components'
import { ob } from '@utils/decorators'
import { Button } from '../button'
import { styles } from './styles'

export const SpButtons = ob(({ props, eps, preNum }) => {
  if (!eps.length) return null

  const { width, margin, numbersOfLine } = props
  const isSide = (preNum + 1) % numbersOfLine === 0
  const style = [
    styles.sp,
    {
      width,
      height: width - 4, // 感觉短一点好看
      marginRight: isSide ? 0 : margin,
      marginBottom: margin + 4
    }
  ]
  return (
    <>
      {!!eps.length && (
        <Flex style={style} justify='center'>
          <Text type='sub' size={13}>
            SP
          </Text>
        </Flex>
      )}
      {eps.map((item, index) => (
        <Button
          key={item.id}
          props={props}
          item={item}
          eps={eps}
          isSp
          num={preNum + index + 2}
        />
      ))}
    </>
  )
})
