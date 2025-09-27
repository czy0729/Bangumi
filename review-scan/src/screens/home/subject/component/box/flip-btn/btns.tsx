/*
 * @Author: czy0729
 * @Date: 2023-03-01 03:31:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-12-05 15:09:07
 */
import React from 'react'
import { Button, Flex, Iconfont, Text } from '@components'
import { _, systemStore } from '@stores'
import { getRating, getType } from '@utils'
import { ob } from '@utils/decorators'
import { ReactNode, ViewStyle } from '@types'
import { RATE } from '../ds'
import { styles } from './styles'

function Btns({ btnText, rating, privacy, last, onPress }) {
  const type = getType(btnText, _.select('ghostPlain', 'plain'))

  // 自己的收藏状态
  const leftStyle: ViewStyle[] = []
  const rightStyle: ViewStyle[] = []
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
          <Button
            style={rightStyle}
            type={type}
            extra={
              <>
                <Iconfont style={_.ml.sm} name='md-star' size={16} color={_.__colorPlain__} />
                <Text style={_.ml.xxs} bold>
                  {rating}
                </Text>
              </>
            }
            onPress={onPress}
          >
            {rate}
          </Button>
        </Flex.Item>
      )
    } else {
      elRating = (
        <Flex.Item>
          <Button
            style={rightStyle}
            type={type}
            extra={
              <>
                {RATE.map((item, index) => {
                  let type: 'md-star' | 'md-star-half' | 'md-star-outline'
                  if (rating / 2 >= item) {
                    type = 'md-star'
                  } else if (rating / 2 >= item - 0.5) {
                    type = 'md-star-half'
                  } else {
                    type = 'md-star-outline'
                  }
                  return (
                    <Iconfont
                      key={item}
                      style={!index && _.ml.sm}
                      name={type}
                      size={16}
                      color={_.__colorPlain__}
                    />
                  )
                })}
              </>
            }
            onPress={onPress}
          >
            {rate}
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
            privacy == 1 && (
              <Iconfont
                style={_.ml.sm}
                name='md-visibility-off'
                color={_.__colorPlain__}
                size={17}
              />
            )
          }
          onPress={onPress}
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
