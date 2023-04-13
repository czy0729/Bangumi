/*
 * @Author: czy0729
 * @Date: 2023-03-01 03:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-13 15:35:09
 */
import React from 'react'
import { Flex, Button, Iconfont } from '@components'
import { _ } from '@stores'
import { getType, getRating } from '@utils'
import { ob } from '@utils/decorators'
import { RATE } from '../ds'
import { styles } from './styles'

function Btns({ btnText, rating, privacy, last }) {
  // 自己的收藏状态
  const leftStyle = []
  const rightStyle = []
  if (rating) {
    leftStyle.push(styles.left)
    rightStyle.push(styles.right)
  }

  return (
    <Flex justify='center'>
      <Flex.Item>
        <Button
          style={leftStyle}
          type={getType(btnText)}
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
          {!!last && ` · ${last}`}
        </Button>
      </Flex.Item>
      {!!rating && (
        <Flex.Item>
          <Button style={rightStyle} type={getType(btnText)}>
            {getRating(rating)}{' '}
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
      )}
    </Flex>
  )
}

export default ob(Btns)
