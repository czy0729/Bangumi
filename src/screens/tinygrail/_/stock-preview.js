/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-10-24 15:43:10
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { _, tinygrailStore } from '@stores'
import { toFixed } from '@utils'
import { caculateICO } from '@utils/app'

export default
@observer
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
    const {
      style,
      current,
      fluctuation,
      change,
      bids,
      asks,
      users,
      _loaded
    } = this.props
    if (!_loaded) {
      return null
    }

    if (users) {
      return this.renderICO()
    }

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
        realChange = `+${toFixed(
          current - current / (1 + fluctuation / 100),
          2
        )}`
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
        style={[this.styles.container, style]}
        onPress={tinygrailStore.toggleStockPreview}
      >
        <Flex justify='end'>
          <Text
            style={!hasNoChanged && this.styles.current}
            type='tinygrailPlain'
            lineHeight={16}
            bold
            align='right'
          >
            {toFixed(current, 2)}{' '}
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
            <Text style={style.textChange} type='tinygrailText' size={11}>
              量{change}{' '}
            </Text>
          )}
          {showFloor ? (
            <Flex>
              {show && (
                <Text type='bid' size={11}>
                  {bids}
                </Text>
              )}
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
              {show && (
                <Text style={[this.styles.small, _.ml.xs]} type='ask' size={11}>
                  {asks}
                </Text>
              )}
            </Flex>
          ) : (
            <Text
              style={this.styles.noDeal}
              type='tinygrailText'
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
}

const memoStyles = _.memoStyles(_ => ({
  container: {
    height: '100%',
    paddingVertical: _.space,
    paddingHorizontal: _.sm
  },
  current: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginRight: 72
  },
  fluctuation: {
    minWidth: 64,
    paddingHorizontal: _.xs,
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
    width: 64
  },
  floorShowDetail: {
    width: 36
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
    paddingRight: _.wind
  },
  icoBar: {
    width: 96,
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
  textChange: {
    paddingLeft: _.wind,
    paddingRight: _.xs,
    backgroundColor: _.colorTinygrailContainer
  },
  noDeal: {
    minWidth: 40,
    marginLeft: _.sm
  }
}))
