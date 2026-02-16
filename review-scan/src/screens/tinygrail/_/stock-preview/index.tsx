/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 17:16:49
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, tinygrailStore } from '@stores'
import { caculateICO, stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { decimal } from '@tinygrail/_/utils'
import { Id, ViewStyle } from '@types'
import { memoStyles } from './styles'

const BACKGROUND_COLOR_MAP = {
  0: '#aaa',
  1: _.colorBid,
  2: _.colorPrimary,
  3: '#ffdc51',
  4: _.colorWarning,
  5: _.colorMain
} as const

const DEFAULT_PROPS = {
  style: undefined,
  id: 0 as Id,
  bids: 0,
  asks: 0,
  change: 0,
  current: 0,
  fluctuation: 0,
  total: 0,
  marketValue: 0,
  users: 0,
  theme: 'dark',
  _loaded: false as boolean
} as const

class StockPreview extends React.Component<typeof DEFAULT_PROPS> {
  static defaultProps = DEFAULT_PROPS

  renderICO() {
    const { total } = this.props
    const { level, next } = caculateICO(this.props)
    const percent = toFixed((total / next) * 100, 0)
    return (
      <Flex style={this.styles.ico}>
        <Text
          style={this.styles.iconText}
          type='tinygrailPlain'
          size={11}
          align='center'
          bold
          shadow
        >
          lv{level}·{percent}%
        </Text>
        <View style={this.styles.icoBar}>
          <View
            style={[
              this.styles.icoProcess,
              {
                width: `${Number(percent)}%`,
                backgroundColor: BACKGROUND_COLOR_MAP[level] || _.colorAsk
              }
            ]}
          />
        </View>
      </Flex>
    )
  }

  get isDark() {
    const { theme } = this.props
    return theme === 'dark'
  }

  render() {
    const { style, current, fluctuation, change, bids, asks, users, _loaded } = this.props
    if (!_loaded) return null

    if (users) return this.renderICO()

    const { _stockPreview: show } = tinygrailStore.state
    const fluctuationStyle: ViewStyle[] = [this.styles.fluctuation, _.ml.sm]
    if (fluctuation < 0) {
      fluctuationStyle.push(this.styles.danger)
    } else if (fluctuation > 0) {
      fluctuationStyle.push(this.styles.success)
    } else {
      fluctuationStyle.push(this.styles.plain)
    }

    let showFloor = true
    let bidsPercent = 0
    let asksPercent = 0
    if (!bids && !asks) {
      showFloor = false
    } else if (bids && !asks) {
      bidsPercent = 100
    } else if (!bids && asks) {
      asksPercent = 100
    } else {
      const total = (bids + asks) * 1.1
      bidsPercent = Math.min((bids / total) * 100, 100)
      asksPercent = Math.min((asks / total) * 100, 100)
    }

    let fluctuationText = '-%'
    let realChange = '0.00'
    if (show) {
      if (fluctuation > 0) {
        realChange = `+${toFixed(current - current / (1 + fluctuation / 100), 2)}`
      } else if (fluctuation < 0) {
        realChange = `-${toFixed(current / (1 + fluctuation / 100), 2)}`
      }
    } else if (fluctuation > 0) {
      fluctuationText = `+${toFixed(fluctuation, 2)}%`
    } else if (fluctuation < 0) {
      fluctuationText = `${toFixed(fluctuation, 2)}%`
    }

    let fluctuationSize = 11
    if (fluctuationText.length > 8) {
      fluctuationSize = 10
    } else if (fluctuationText.length > 7) {
      fluctuationSize = 10
    }

    const hasNoChanged = show ? realChange === '0.00' : fluctuationText === '-%'
    return (
      <Touchable
        style={stl(this.styles.container, style)}
        onPress={tinygrailStore.toggleStockPreview}
      >
        <Flex justify='end'>
          <Text
            // style={!hasNoChanged && this.styles.absolute}
            type='tinygrailPlain'
            size={13}
            lineHeight={14}
            bold
            align='right'
          >
            {current ? toFixed(current, 2) : '-'}
          </Text>
          {!hasNoChanged && (
            <Text
              style={[
                {
                  color: _.__colorPlain__
                },
                fluctuationStyle
              ]}
              size={fluctuationSize}
              lineHeight={14}
              align='center'
              bold
            >
              {show ? realChange : fluctuationText}
            </Text>
          )}
        </Flex>
        <Flex style={this.styles.bottom} justify='end'>
          {show && !!change && change >= 10 && (
            <Text type='tinygrailText' size={10}>
              量{change}{' '}
            </Text>
          )}
          {showFloor && (
            <Flex>
              {show && !!bids && (
                <Text type='bid' size={10}>
                  {decimal(bids)}
                </Text>
              )}
              {show && (
                <Flex
                  style={stl(show ? this.styles.floorShowDetail : this.styles.floor, _.ml.xs)}
                  justify='between'
                >
                  <View
                    style={[
                      this.styles.bids,
                      {
                        width: `${bidsPercent}%`
                      }
                    ]}
                  />
                  <View
                    style={[
                      this.styles.asks,
                      {
                        width: `${asksPercent}%`
                      }
                    ]}
                  />
                </Flex>
              )}
              {show && !!asks && (
                <Text style={_.ml.xs} type='ask' size={10}>
                  {decimal(asks)}
                </Text>
              )}
            </Flex>
          )}
        </Flex>
      </Touchable>
    )
  }

  get styles() {
    return memoStyles()
  }
}

export default ob(StockPreview)
