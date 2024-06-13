/*
 * @Author: czy0729
 * @Date: 2024-06-13 22:34:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-06-14 00:52:34
 */
import React, { useCallback, useState } from 'react'
import { NativeSyntheticEvent, TextLayoutEventData } from 'react-native'
import { Text } from '@components'
import { stl } from '@utils'
import { Props as VerticalAlignProps } from './types'

export { VerticalAlignProps }

const memo = new Map<string, boolean>()

function calc(lineHeight: number) {
  const value = lineHeight * 2
  return {
    lineHeight: value,
    marginBottom: Math.floor(lineHeight / 2) * -1
  }
}

/**
 * 对于安卓端某些特殊字符, 存在超过行高的高度会看不全,
 * 自动改变行高然后垂直居中尽量显示, 仅安卓需要
 * */
export const VerticalAlign = ({
  style,
  text,
  lineHeight = 14,
  children,
  ...other
}: VerticalAlignProps) => {
  let temp1 = lineHeight
  let temp2 = 0
  if (typeof text === 'string' && text && memo.get(text) === true) {
    const values = calc(lineHeight)
    temp1 = values.lineHeight
    temp2 = values.marginBottom
  }

  const [currentLineHeight, setLineHeight] = useState(temp1)
  const [marginBottom, setMarginBottom] = useState(temp2)

  const handleTextLayout = useCallback(
    (e: NativeSyntheticEvent<TextLayoutEventData>) => {
      if (typeof text === 'string' && text) {
        const line = e.nativeEvent.lines?.[0]

        // ascender 正常显示的文字是有值的, 但是撑满的时候都会很小
        if (line?.ascender <= 2) {
          const values = calc(lineHeight)
          setLineHeight(values.lineHeight)
          setMarginBottom(values.marginBottom)
          memo.set(text, true)
        } else {
          memo.set(text, false)
        }
      }
    },
    [lineHeight, text]
  )

  return (
    <Text
      {...other}
      style={stl(
        style,
        marginBottom && {
          marginBottom
        }
      )}
      lineHeight={currentLineHeight}
      onTextLayout={
        typeof text === 'string' && text && marginBottom === 0 ? handleTextLayout : undefined
      }
    >
      {children}
    </Text>
  )
}
