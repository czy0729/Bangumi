/*
 * @Author: czy0729
 * @Date: 2021-08-05 22:19:49
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-08 04:27:18
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { Button } from './button'

export const SpButtons = React.memo(
  ({ props, eps, preNum }) => {
    // rerender('Eps / SpButtons')

    if (!eps.length) return null

    const { width, margin, numbersOfLine } = props
    const isSide = (preNum + 1) % numbersOfLine === 0
    return (
      <>
        {!!eps.length && (
          <Flex
            style={[
              styles.sp,
              {
                width,
                height: width - 4, // 感觉短一点好看
                marginRight: isSide ? 0 : margin,
                marginBottom: margin + 4
              }
            ]}
            justify='center'
          >
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
  },
  (p, n) => memoString(p) === memoString(n)
)

function memoString({ props = {}, eps = [], preNum }) {
  const { width, margin, numbersOfLine } = props
  return JSON.stringify({
    width,
    margin,
    numbersOfLine,
    eps: eps.length,
    preNum
  })
}

const styles = _.create({
  sp: {
    marginTop: 2
  }
})
