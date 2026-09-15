/*
 * @Author: czy0729
 * @Date: 2023-06-20 10:03:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 02:10:00
 */
import { observer } from 'mobx-react'
import { stl } from '@utils'
import { Component } from '../../component'
import { Flex } from '../../flex'
import { Squircle } from '../../squircle'
import { Text } from '../../text'
import { memoStyles } from './styles'

import type { Props } from './types'

/**
 * 纯文字封面
 *  - 有圆角时包一层 Squircle, 形状与其它封面分支 (cover-image) 保持一致
 *  - 这里是 Cover 里唯一不走 Image 的分支, 早前用硬编码 4px 圆角代替,
 *    开启平滑圆角后形状会与其它封面不一致, 故改为与 cover-image 同一套处理
 * */
function TextOnly({ width, height, radius, onPress }: Props) {
  const styles = memoStyles()

  const elContent = (
    <Flex style={stl(styles.textOnly, { width, height })} justify='center'>
      <Text
        type='sub'
        size={10}
        bold
        onPress={() => {
          onPress?.()
        }}
      >
        {/* text-only */}
      </Text>
    </Flex>
  )

  return (
    <Component id='component-cover' data-type='text-only'>
      {radius && width && height ? (
        <Squircle width={width} height={height} radius={radius}>
          {elContent}
        </Squircle>
      ) : (
        elContent
      )}
    </Component>
  )
}

export default observer(TextOnly)
