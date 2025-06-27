/*
 * @Author: czy0729
 * @Date: 2022-09-03 17:28:48
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-06-28 00:41:21
 */
import React, { useMemo } from 'react'
import { View } from 'react-native'
import { Button, Menu, Popover } from '@components'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { r } from '@utils/dev'
import { FROZEN_ARRAY, FROZEN_FN, FROZEN_OBJECT, IOS, WSA } from '@constants'
import FlipButton from '../flip-button'
import { getComment, getPopoverData, getType } from './utils'
import { DEFAULT_PROPS } from './ds'

export default memo(
  ({
    styles,
    heatMap = false,
    props = {
      width: 0,
      margin: 0,
      subjectId: 0,
      numbersOfLine: 8,
      canPlay: false,
      login: false,
      advance: false,
      userProgress: FROZEN_OBJECT,
      flip: false,
      onFliped: FROZEN_FN,
      onSelect: FROZEN_FN,
      onLongPress: FROZEN_FN
    },
    item = FROZEN_OBJECT,
    eps = FROZEN_ARRAY,
    isSp = false,
    num = 0
  }) => {
    r('Eps.Button.Main')

    const {
      subjectId,
      width,
      margin,
      numbersOfLine,
      canPlay,
      login,
      advance,
      userProgress,
      flip,
      onFliped,
      onSelect
    } = props
    const isSide = num % numbersOfLine === 0
    const type = getType(userProgress[item.id], item.status)

    const popoverData = getPopoverData(item, isSp, canPlay, login, advance, userProgress)
    const popoverProps = IOS
      ? {
          overlay: (
            <Menu
              title={[
                [`ep${item.sort}`, item.airdate || item.duration].filter(item => !!item).join(' · ')
              ]}
              data={popoverData}
              onSelect={value => onSelect(value, item)}
            />
          )
        }
      : {
          data: popoverData,
          date: item.airdate || item.duration,
          onSelect: (value: string) => onSelect(value, item, subjectId)
        }

    const { min, max } = getComment(eps)
    const containerStyle = {
      marginBottom: margin - 4
    }
    const style = {
      marginRight: !_.isLandscape && !_.isPad && !WSA && isSide ? 0 : margin,
      marginBottom: 6
    }
    const btnPassProps = {
      style: {
        width,
        height: width
      },
      styleText: type === 'dropped' && styles.textThrough,
      type
    } as const

    const elHeatMap = useMemo(
      () =>
        heatMap && (
          <View
            style={[
              styles.bar,
              {
                /** 1.68 是比率, 增大少回复与高回复的透明度幅度 */
                opacity: (item.comment - min / 1.68) / max
              }
            ]}
          />
        ),
      [heatMap, item.comment, max, min, styles.bar]
    )

    return (
      <View style={containerStyle}>
        {flip && <View style={styles.flip} />}
        <View style={style}>
          {flip ? (
            <View>
              <FlipButton {...btnPassProps} text={item.sort} onAnimated={onFliped} />
              {elHeatMap}
            </View>
          ) : (
            <Popover {...popoverProps}>
              <Button {...btnPassProps} size='sm' animate={false}>
                {String(item.sort)}
              </Button>
              {elHeatMap}
            </Popover>
          )}
        </View>
      </View>
    )
  },
  DEFAULT_PROPS
)
