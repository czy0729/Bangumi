/*
 * @Author: czy0729
 * @Date: 2023-03-01 03:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-07-27 17:56:37
 */
import React from 'react'
import { Flex, Button, Iconfont } from '@components'
import { _, systemStore } from '@stores'
import { getType, getRating } from '@utils'
import { ob } from '@utils/decorators'
import { ReactNode } from '@types'
import { RATE } from '../ds'
import { styles } from './styles'

function Btns({ btnText, rating, privacy, last }) {
  const type = getType(btnText, _.select('ghostPlain', 'plain'))

  // 自己的收藏状态
  const leftStyle = []
  const rightStyle = []
  if (rating) {
    leftStyle.push(styles.left)
    rightStyle.push(styles.right)
  }

  const { focusOrigin } = systemStore.setting
  let elRating: ReactNode
  if (rating) {
    const rate = getRating(rating)
    if (focusOrigin) {
      leftStyle.push(styles.leftFocus)
      rightStyle.push(styles.rightFocus)

      elRating = (
        <Flex.Item flex={0.75}>
          <Button style={rightStyle} type={type}>
            {rate}
            {'  '}
            <Iconfont name='ios-star' size={16} color={_.__colorPlain__} /> {rating}
          </Button>
        </Flex.Item>
      )
    } else {
      elRating = (
        <Flex.Item>
          <Button style={rightStyle} type={type}>
            {rate}{' '}
            {RATE.map(item => {
              let type: 'ios-star' | 'ios-star-half' | 'ios-star-outline'
              if (rating / 2 >= item) {
                type = 'ios-star'
              } else if (rating / 2 >= item - 0.5) {
                type = 'ios-star-half'
              } else {
                type = 'ios-star-outline'
              }
              return (
                <Iconfont key={item} name={type} size={16} color={_.__colorPlain__} />
              )
            })}
          </Button>
        </Flex.Item>
      )
    }
  }

  return (
    <Flex justify='center'>
      <Flex.Item>
        <Button
          style={leftStyle}
          type={type}
          extra={
            <>
              {privacy == 1 && (
                <Iconfont
                  style={_.ml.sm}
                  name='md-visibility-off'
                  color={_.__colorPlain__}
                  size={17}
                />
              )}
            </>
          }
        >
          {btnText}
          {!!last && ` · ${focusOrigin ? last.slice(2) : last}`}
        </Button>
      </Flex.Item>
      {elRating}
    </Flex>
  )
}

export default ob(Btns)
