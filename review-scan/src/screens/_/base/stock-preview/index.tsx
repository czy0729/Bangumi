/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-08-02 02:49:12
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, tinygrailStore } from '@stores'
import { caculateICO, stl, toFixed } from '@utils'
import { ob } from '@utils/decorators'
import { ViewStyle } from '@types'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'
import { Props as StockPreviewProps } from './types'

export { StockPreviewProps }

const colorDarkText = 'rgb(99, 117, 144)'

export const StockPreview = ob(
  class StockPreview extends React.Component<StockPreviewProps> {
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
      theme: 'light',
      _loaded: false
    }

    renderICO() {
      const { total } = this.props
      const { level, next } = caculateICO(this.props)
      const percent = toFixed((total / next) * 100, 0)

      let backgroundColor
      switch (level) {
        case 0:
          backgroundColor = '#aaa'
          break
        case 1:
          backgroundColor = _.colorBid
          break
        case 2:
          backgroundColor = _.colorPrimary
          break
        case 3:
          backgroundColor = '#ffdc51'
          break
        case 4:
          backgroundColor = _.colorWarning
          break
        case 5:
          backgroundColor = _.colorMain
          break
        default:
          backgroundColor = _.colorAsk
          break
      }

      return (
        <Flex style={this.styles.ico}>
          <Text
            style={
              this.isDark ? [this.styles.iconText, this.styles.iconTextDark] : this.styles.iconText
            }
            size={11}
            align='center'
          >
            lv.{level} {percent}%
          </Text>
          <View
            style={this.isDark ? [this.styles.icoBar, this.styles.icoBarDark] : this.styles.icoBar}
          >
            <View
              style={[
                this.styles.icoProcess,
                {
                  width: `${percent}%`,
                  backgroundColor
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
      if (!_loaded) {
        return null
      }

      if (users) {
        return this.renderICO()
      }

      const { _stockPreview: show } = tinygrailStore.state
      const fluctuationStyle: ViewStyle = [this.styles.fluctuation, _.ml.sm]
      if (fluctuation < 0) {
        fluctuationStyle.push(this.styles.danger)
      } else if (fluctuation > 0) {
        fluctuationStyle.push(this.styles.success)
      } else {
        fluctuationStyle.push(this.isDark ? this.styles.defaultDark : this.styles.sub)
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
        // const distance = Math.abs(bids - asks)
        const total = (bids + asks) * 1.1
        bidsPercent = (bids / total) * 100
        asksPercent = (asks / total) * 100
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

      let fluctuationSize = 12
      if (fluctuationText.length > 8) {
        fluctuationSize = 10
      } else if (fluctuationText.length > 7) {
        fluctuationSize = 11
      }

      const hasNoChanged = (show ? realChange : fluctuationText) === '-%'
      return (
        <Touchable
          style={style ? [this.styles.container, style] : this.styles.container}
          onPress={tinygrailStore.toggleStockPreview}
        >
          <Flex justify='end'>
            <Text
              style={stl(!hasNoChanged && this.styles.current, {
                color: this.isDark ? _.__colorPlain__ : _.colorDesc
              })}
              lineHeight={16}
              align='right'
            >
              {toFixed(current, 2)}
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
                lineHeight={16}
                align='center'
              >
                {show ? realChange : fluctuationText}
              </Text>
            )}
          </Flex>
          <Flex style={show ? _.mt.xs : _.mt.sm} justify='end'>
            {show && (
              <Text
                style={{
                  paddingLeft: _.wind,
                  paddingRight: _.xs,
                  color: this.isDark ? colorDarkText : _.colorSub,
                  backgroundColor: this.isDark ? _.colorTinygrailContainer : _.colorPlain
                }}
                size={11}
              >
                量{change}
              </Text>
            )}
            {showFloor ? (
              <Flex>
                {show && (
                  <Text
                    style={{
                      color: _.colorBid
                    }}
                    size={11}
                  >
                    {bids}
                  </Text>
                )}
                <Flex
                  style={[show ? this.styles.floorShowDetail : this.styles.floor, _.ml.xs]}
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
                {show && (
                  <Text
                    style={[
                      _.ml.xs,
                      {
                        color: _.colorAsk
                      }
                    ]}
                    size={11}
                  >
                    {asks}
                  </Text>
                )}
              </Flex>
            ) : (
              <Text
                style={[
                  this.styles.noStock,
                  {
                    color: this.isDark ? colorDarkText : _.colorSub
                  }
                ]}
                size={11}
                align='right'
              >
                没挂单
              </Text>
            )}
          </Flex>
        </Touchable>
      )
    }

    get styles() {
      return memoStyles()
    }
  },
  COMPONENT
)

export default StockPreview
