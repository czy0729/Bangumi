/*
 * @Author: czy0729
 * @Date: 2025-07-28 21:43:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-07-30 05:13:06
 */
import React from 'react'
import { Avatar, Flex, Text, TextType, Touchable } from '@components'
import { Rate } from '@_'
import { _, useStore } from '@stores'
import { TinygrailTopWeekItem } from '@stores/tinygrail/types'
import { alert, formatNumber, stl, tinygrailOSS, titleCase } from '@utils'
import { r } from '@utils/dev'
import { t } from '@utils/fetch'
import { useObserver } from '@utils/hooks'
import { M } from '@constants'
import { Ctx } from '../../types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function Item({
  assets,
  avatar,
  extra,
  extraChange,
  id,
  name,
  price,
  rank,
  rankChange,
  sacrifices,
  type,
  typeChange
}: TinygrailTopWeekItem) {
  r(COMPONENT)

  const { navigation } = useStore<Ctx>()

  return useObserver(() => {
    const styles = memoStyles()
    const size = rank <= 1 ? 'lg' : rank <= 3 ? 'md' : rank <= 6 ? 'sm' : 'xs'
    const textSize = 14 - (size === 'lg' ? 0 : size === 'md' ? 2 : 4)
    const subTextProps = {
      type: 'tinygrailText',
      size: 10,
      lineHeight: 12,
      align: 'center',
      bold: true
    } as const

    let changeColor: TextType
    if (rankChange === 'new') {
      changeColor = 'warning'
    } else if (rankChange < 0) {
      changeColor = 'ask'
    } else {
      changeColor = 'bid'
    }

    let extraText: string
    if (extra > M) {
      extraText = `${formatNumber(extra / M, 1)}万`
    } else {
      extraText = formatNumber(extra, 1)
    }

    let extraChangeColor: TextType
    if (extraChange < 0) {
      extraChangeColor = 'ask'
    } else {
      extraChangeColor = 'bid'
    }

    let extraChangeText: string
    if (Math.abs(extraChange) > M) {
      extraChangeText = `${formatNumber(extraChange / M, 1)}万`
    } else {
      extraChangeText = formatNumber(Math.abs(extraChange), 1)
    }

    let typeChangeColor: TextType
    if (typeChange < 0) {
      typeChangeColor = 'ask'
    } else {
      typeChangeColor = 'bid'
    }

    return (
      <Flex
        style={stl(styles.item, styles[`item${titleCase(size)}`])}
        direction='column'
        justify='center'
        align='center'
      >
        <Avatar
          style={styles.avatar}
          src={tinygrailOSS(avatar)}
          size={size === 'lg' ? 64 : size === 'md' ? 48 : 32}
          borderColor='transparent'
          name={name}
          skeletonType='tinygrail'
          onPress={() => {
            navigation.push('Mono', {
              monoId: `character/${id}`,
              _name: name
            })

            t('每周萌王.跳转', {
              to: 'Mono',
              monoId: id
            })
          }}
        />

        <Touchable
          style={_.mt.sm}
          onPress={() => {
            navigation.push('TinygrailSacrifice', {
              monoId: `character/${id}`
            })
          }}
        >
          <Text
            style={_.mb.xs}
            type='tinygrailPlain'
            size={textSize}
            bold
            numberOfLines={2}
            align='center'
          >
            {name}
            {!!rankChange && (
              <Text type={changeColor} size={textSize - 1} lineHeight={textSize} bold>
                {' '}
                {rankChange === 'new'
                  ? 'new'
                  : `${rankChange > 0 ? '↑' : '↓'}${Math.abs(rankChange)}`}
              </Text>
            )}
          </Text>
          <Text {...subTextProps}>
            +{extraText}
            {type ? `·${type}人` : ''}
          </Text>
          {!!extraChange && String(extraChange) !== String(extraText) && typeChange !== type && (
            <Text {...subTextProps} type={extraChangeColor}>
              {' '}
              {extraChange > 0 && '+'}
              {extraChangeText}
              {!!typeChange && (
                <Text {...subTextProps} type={typeChangeColor}>
                  {' '}
                  {typeChange > 0 && '+'}
                  {typeChange}人
                </Text>
              )}
            </Text>
          )}
          {!!type && (
            <Text {...subTextProps}>
              {size === 'lg' ? '平均拍价 ' : ''} ₵
              {formatNumber((extra + price * sacrifices) / assets)}
            </Text>
          )}
        </Touchable>

        <Rate
          style={styles.rec}
          textStyle={stl(styles.recText, styles[`rec${titleCase(size)}`])}
          value={rank}
          onPress={() => {
            const text: string[] = []

            // 1. 增发股票数量
            const shares = rank <= 3 ? [2000, 1500, 1000][rank - 1] : 500 - 50 * (rank - 4)
            text.push(`增发 ${shares}股`)

            // 2. 拍卖失败提示
            if (rank <= 3) text.push('拍卖失败时资金不会返还')

            // 3. 大乐透和分红逻辑
            const hasLottery = rank <= 6
            const hasDividend = rank > 3

            text.push(hasDividend ? '参与分红' : '不参与分红')
            text.push(hasLottery ? '参与大乐透' : '取消参与大乐透')

            alert(text.join('\n'), `RANK ${rank}`)
          }}
        />
      </Flex>
    )
  })
}

export default Item
