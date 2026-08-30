/*
 * @Author: czy0729
 * @Date: 2024-09-27 02:45:02
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 07:33:57
 */
import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { createSpace } from './space'
import Text from './text'
import { spaceTypes } from './utils'
import { createWord } from './word'
import { DEFAULT_OPTIONS } from './ds'
import { styles } from './styles'

import type { Props, Space, Word } from './types'
import type { TextStyle } from '@types'

/** 词云 */
function WordCloud({ style, options = DEFAULT_OPTIONS, onPress }: Props) {
  const [words, setWords] = useState<Word[]>([])

  const spaceDataObject = useRef<Record<string, Space | null>>({})
  const spaceIdArray = useRef<string[]>([])
  const distanceCounter = useRef(1)
  const target = useRef({
    width: options.width,
    height: options.height,
    xOffset: options.width / 2,
    yOffset: options.height / 2
  })

  const optionsRef = useRef(options)
  optionsRef.current = options

  const onPressRef = useRef(onPress)
  onPressRef.current = onPress

  const updateSpaceIdArray = useCallback((distanceS: string, distance: number) => {
    if (spaceIdArray.current.length !== 0) {
      for (let index = 0; index < spaceIdArray.current.length; index++) {
        if (distance < parseFloat(spaceIdArray.current[index].split('_')[0])) {
          spaceIdArray.current.splice(index, 0, distanceS)
          return
        }
      }
      spaceIdArray.current.push(distanceS)
    } else {
      spaceIdArray.current.push(distanceS)
    }
  }, [])

  const pushSpaceData = useCallback(
    (
      type: (typeof spaceTypes)[keyof typeof spaceTypes],
      w: number,
      h: number,
      x: number,
      y: number
    ) => {
      // Calculating Distance between (x,y): Key point of Space and Center of Container (this.target.xOffset, this.target.yOffset)
      const distance = Math.sqrt(
        (target.current.xOffset - x) * (target.current.xOffset - x) +
          (target.current.yOffset - y) * (target.current.yOffset - y)
      )

      const distanceS = `${distance}_${distanceCounter.current++}`

      // Update Space Id Array
      updateSpaceIdArray(distanceS, distance)

      // Add Space into Space Data Object
      spaceDataObject.current[distanceS] = createSpace(type, w, h, x, y)
    },
    [updateSpaceIdArray]
  )

  const updateTextPosition = useCallback((word: Word, top: number, left: number) => {
    // Update the styles of the word view
    const textStyle = {
      position: 'absolute',
      left: Math.ceil(left),
      top: Math.ceil(top),
      fontSize: word.font,
      lineHeight: Math.ceil(word.font * 1.1),
      color: word.color
    } as TextStyle

    setWords(prevState =>
      prevState.map(prevWord => {
        if (prevWord !== word) return prevWord

        return {
          ...prevWord,
          view:
            (prevWord.view && (
              <Text
                key={word.text}
                style={textStyle}
                onPress={() => onPressRef.current?.(word.text)}
              >
                {word.text}
              </Text>
            )) ||
            null
        }
      })
    )
  }, [])

  const placeFirstWord = useCallback(
    (word: Word) => {
      const w = word.width!
      const h = word.height!
      const xoff = target.current.xOffset - w / 2
      const yoff = target.current.yOffset - h / 2
      const tw = target.current.width
      const th = target.current.height

      // Update the styles of the word view
      updateTextPosition(word, yoff, xoff)

      // Call the pushSpaceData function with the appropriate parameters
      pushSpaceData(spaceTypes.LB, tw - xoff - w, h, xoff + w, yoff + h / 2) //M1
      pushSpaceData(spaceTypes.LT, w, th - yoff - h, xoff + w / 2, yoff + h) //M2
      pushSpaceData(spaceTypes.RT, xoff, h, xoff, yoff + h / 2) //M3
      pushSpaceData(spaceTypes.RB, w, yoff, xoff + w / 2, yoff) //M4

      pushSpaceData(spaceTypes.LT, w / 2, h / 2, xoff + w, yoff + h / 2) //C1
      pushSpaceData(spaceTypes.RT, w / 2, h / 2, xoff + w / 2, yoff + h) //C2
      pushSpaceData(spaceTypes.RB, w / 2, h / 2, xoff, yoff + h / 2) //C3
      pushSpaceData(spaceTypes.LB, w / 2, h / 2, xoff + w / 2, yoff) //C4

      pushSpaceData(
        spaceTypes.LT,
        tw - xoff - w - w / 2,
        th - yoff - h / 2,
        xoff + w + w / 2,
        yoff + h / 2
      ) //S1
      pushSpaceData(
        spaceTypes.RT,
        xoff + w / 2,
        th - yoff - h - h / 2,
        xoff + w / 2,
        yoff + h + h / 2
      ) //S2
      pushSpaceData(spaceTypes.RB, xoff - w / 2, yoff + h / 2, xoff - w / 2, yoff + h / 2) //S3
      pushSpaceData(spaceTypes.LB, xoff + w / 2, yoff - h / 2, xoff + w / 2, yoff - h / 2) //S4
    },
    [updateTextPosition, pushSpaceData]
  )

  const placeOtherWord = useCallback(
    (word: Word) => {
      for (let index = 0; index < spaceIdArray.current.length; index++) {
        const spaceId = spaceIdArray.current[index]
        const obj = spaceDataObject.current[spaceId]!

        let alignmentInd = 0
        let alignmentIndCount = 0

        if (word.width! <= obj.width && word.height! <= obj.height) {
          alignmentInd = spaceTypes.HR
          alignmentIndCount++
        }

        if (optionsRef.current.verticalEnabled) {
          if (word.height! <= obj.width && word.width! <= obj.height) {
            alignmentInd = spaceTypes.VR
            alignmentIndCount++
          }
        }

        if (alignmentIndCount > 0) {
          spaceDataObject.current[spaceId] = null
          spaceIdArray.current.splice(index, 1)

          // For Word's Span Position
          let xMul = 1
          let yMul = 1

          // For new Child Spaces
          let xMulS = 1
          let yMulS = 1

          switch (obj.spaceType) {
            case spaceTypes.LB:
              xMul = 0
              yMul = -1
              xMulS = 1
              yMulS = -1
              break
            case spaceTypes.LT:
              xMul = 0
              yMul = 0
              xMulS = 1
              yMulS = 1
              break
            case spaceTypes.RT:
              xMul = -1
              yMul = 0
              xMulS = -1
              yMulS = 1
              break
            case spaceTypes.RB:
              xMul = -1
              yMul = -1
              xMulS = -1
              yMulS = -1
              break
            default:
              break
          }

          if (alignmentIndCount > 1) {
            // Making Horizontal Word in Larger Number
            // Random number[0,5] is >0 and <3 --> HR
            // Random number[0,5] is >3 --> VR

            if (Math.random() * 5 > 3) alignmentInd = spaceTypes.VR
            else alignmentInd = spaceTypes.HR
          }

          const w = word.width!
          const h = word.height!

          switch (alignmentInd) {
            case spaceTypes.HR:
              // Update the styles of the word view
              updateTextPosition(word, obj.y + yMul * h, obj.x + xMul * w)

              if (Math.random() * 2 > 1) {
                /*
                 * 			_________________________________
                 *			|								|
                 *			|				T				|
                 *			|								|
                 *			|_______________________________|
                 *			|				|				|
                 *			|	  WORD		|		R		|
                 *			|	********	|				|
                 *			|_______________|_______________|
                 *
                 */

                pushSpaceData(obj.spaceType, obj.width - w, h, obj.x + xMulS * w, obj.y) //R
                pushSpaceData(obj.spaceType, obj.width, obj.height - h, obj.x, obj.y + yMulS * h) //T
              } else {
                /*
                 * 			_________________________________
                 *			|				|				|
                 *			|		T		|				|
                 *			|				|				|
                 *			|_______________|		R		|
                 *			|				|				|
                 *			|	  WORD		|				|
                 *			|	********	|				|
                 *			|_______________|_______________|
                 *
                 */

                pushSpaceData(obj.spaceType, obj.width - w, obj.height, obj.x + xMulS * w, obj.y) //R
                pushSpaceData(obj.spaceType, w, obj.height - h, obj.x, obj.y + yMulS * h) //T
              }
              break

            case spaceTypes.VR:
              // Update the styles of the word view
              updateTextPosition(
                word,
                obj.y + yMul * w + (w - h) / 2,
                obj.x + xMul * h - (w - h) / 2
              )

              if (Math.random() * 2 > 1) {
                /*
                 * 			_________________________________
                 *			|								|
                 *			|				T				|
                 *			|								|
                 *			|_______________________________|
                 *			|		D		|				|
                 *			|		R		|		R		|
                 *			|		O		|				|
                 *			|_______W_______|_______________|
                 *
                 */

                pushSpaceData(obj.spaceType, obj.width - h, w, obj.x + xMulS * h, obj.y) //R
                pushSpaceData(obj.spaceType, obj.width, obj.height - w, obj.x, obj.y + yMulS * w) //T
              } else {
                /*
                 * 			_________________________________
                 *			|				|				|
                 *			|		T		|				|
                 *			|				|				|
                 *			|_______________|		R		|
                 *			|		D		|				|
                 *			|	  	R		|				|
                 *			|		O		|				|
                 *			|_______W_______|_______________|
                 *
                 */

                pushSpaceData(obj.spaceType, obj.width - h, obj.height, obj.x + xMulS * h, obj.y) //R
                pushSpaceData(obj.spaceType, h, obj.height - w, obj.x, obj.y + yMulS * w) //T
              }
              break

            default:
              break
          }

          return
        }
      }
    },
    [updateTextPosition, pushSpaceData]
  )

  useEffect(() => {
    spaceDataObject.current = {}
    spaceIdArray.current = []
    const { words: initialWords, fontOffset, minFont, maxFont, fontFamily } = optionsRef.current
    initialWords.sort(function (
      a: { text: string; value: number; color: string },
      b: { text: string; value: number; color: string }
    ) {
      if (a.value < b.value) {
        return 1
      } else if (a.value > b.value) {
        return -1
      } else {
        return 0
      }
    })

    const _maxValue = initialWords[0].value
    const _minValue = initialWords[initialWords.length - 1].value
    const fontFactor = (maxFont! - minFont!) / (_maxValue - _minValue)

    const wordsArray = initialWords.map((wordConfig, index) => {
      const word = createWord({
        ...wordConfig,
        minValue: _minValue,
        fontFactor,
        fontOffset: fontOffset! + minFont!,
        fontFamily,
        index,
        _placeFirstWord: placeFirstWord,
        _placeOtherWord: placeOtherWord
      })
      return word
    })
    setWords(wordsArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <View
      style={{
        ...styles.container,
        width: optionsRef.current.width,
        height: optionsRef.current.height,
        ...(style as object)
      }}
    >
      {words.map(word => word.view)}
    </View>
  )
}

export default memo(WordCloud)
