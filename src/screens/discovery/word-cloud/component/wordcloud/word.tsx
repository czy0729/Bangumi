/*
 * @Author: czy0729
 * @Date: 2024-09-27 14:28:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-06 09:02:38
 */
import React from 'react'
import Text from './text'
import { getRandomColor } from './utils'

import type { LayoutChangeEvent } from 'react-native'
import type { TextStyle } from '@types'
import type { Word, WordConfig } from './types'

/** 创建词云单词 */
export function createWord(wordConfig: WordConfig): Word {
  const word: Word = {
    index: wordConfig.index,
    _placeFirstWord: wordConfig._placeFirstWord,
    _placeOtherWord: wordConfig._placeOtherWord,
    text: wordConfig.text,
    value: wordConfig.value,
    fontFactor: wordConfig.fontFactor,
    fontOffset: wordConfig.fontOffset,
    minValue: wordConfig.minValue,
    fontFamily: wordConfig.fontFamily,
    font: 0,
    color: wordConfig.color,
    view: null,
    width: null,
    height: null
  }

  if (word.color === null || word.color === '') {
    word.color = getRandomColor()
  }

  word.font = Math.floor((word.value - word.minValue) * word.fontFactor + word.fontOffset)

  const textStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    fontSize: word.font,
    lineHeight: word.font,
    color: word.color,
    opacity: 0,
    pointerEvents: 'none'
  } as TextStyle

  word.view = (
    <Text
      key={`${word.index}|${word.text}`}
      style={textStyle}
      onLayout={(event: LayoutChangeEvent) => {
        word.width = event.nativeEvent.layout.width
        word.height = event.nativeEvent.layout.height
        if (word.index === 0) {
          word._placeFirstWord(word)
        } else {
          word._placeOtherWord(word)
        }
      }}
    >
      {word.text}
    </Text>
  )

  return word
}
