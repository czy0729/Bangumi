/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-12-31 16:26:08
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, tinygrailStore } from '@stores'
import { toFixed } from '@utils'
import { caculateICO } from '@utils/app'
import { ob } from '@utils/decorators'
import { decimal } from '@tinygrail/_/utils'

const backgroundColorMap = {
  0: '#aaa',
  1: _.colorBid,
  2: _.colorPrimary,
  3: '#ffdc51',
  4: _.colorWarning,
  5: _.colorMain
}

export default
@ob
class StockPreview extends React.Component {
  static defaultProps = {
    style: undefined,
    id: 0,
    bids: 0,
    asks: 0,
    change: 0,
    current: 0,
    fluctuation: 0,
    total: 0,
    marketValue: 0,
    users: 0,
    _loaded: false
  }

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
        >
          lv{level} {percent}%
        </Text>
        <View style={this.styles.icoBar}>
          <View
            style={[
              this.styles.icoProcess,
              {
                width: `${percent}%`,
                backgroundColor: backgroundColorMap[level] || _.colorAsk
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
    const { style, current, fluctuation, change, bids, asks, users, _loaded } =
      this.props
    if (!_loaded) return null

    if (users) return this.renderICO()

    const { _stockPreview: show } = tinygrailStore.state
    const fluctuationStyle = [this.styles.fluctuation, _.ml.sm]
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
        style={[this.styles.container, style]}
        onPress={tinygrailStore.toggleStockPreview}
      >
        <Flex justify='end'>
          <Text
            style={!hasNoChanged && this.styles.absolute}
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
                  style={[
                    show ? this.styles.floorShowDetail : this.styles.floor,
                    _.ml.xs
                  ]}
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
                <Text style={[this.styles.small, _.ml.xs]} type='ask' size={10}>
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

const memoStyles = _.memoStyles(() => ({
  container: {
    paddingVertical: 17,
    paddingHorizontal: _.sm * _.ratio
  },
  absolute: {
    position: 'absolute',
    zIndex: 1,
    right: 64 * _.ratio
  },
  fluctuation: {
    minWidth: 56 * _.ratio,
    paddingHorizontal: _.xs,
    paddingBottom: 0.5,
    borderRadius: 2,
    overflow: 'hidden'
  },
  danger: {
    backgroundColor: _.colorAsk
  },
  success: {
    backgroundColor: _.colorBid
  },
  plain: {
    backgroundColor: _.colorTinygrailIcon
  },
  floor: {
    width: 64 * _.ratio
  },
  floorShowDetail: {
    width: 24 * _.ratio
  },
  bids: {
    height: 2,
    backgroundColor: _.colorBid,
    borderRadius: 2,
    overflow: 'hidden'
  },
  asks: {
    height: 2,
    backgroundColor: _.colorAsk,
    borderRadius: 2,
    overflow: 'hidden'
  },
  ico: {
    height: '100%',
    maxHeight: 68,
    paddingRight: _._wind
  },
  icoBar: {
    width: 96 * _.ratio,
    height: 16,
    backgroundColor: _.tSelect(_.colorTinygrailBorder, _.colorTinygrailBg),
    borderRadius: 8,
    overflow: 'hidden'
  },
  icoProcess: {
    height: 16,
    borderRadius: 8,
    overflow: 'hidden'
  },
  iconText: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    right: _.sm
  },
  bottom: {
    marginTop: 4
  }
}))
