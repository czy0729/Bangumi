/*
 * @Author: czy0729
 * @Date: 2019-08-24 23:07:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-27 16:26:35
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { caculateICO } from '@utils/app'
import _ from '@styles'

export default class StockPreview extends React.Component {
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

  state = {
    showDetail: false
  }

  toggleNum = () => {
    const { showDetail } = this.state
    this.setState({
      showDetail: !showDetail
    })
  }

  renderICO() {
    const { total } = this.props
    const { level, next } = caculateICO(this.props)
    const percent = ((total / next) * 100).toFixed(0)

    let backgroundColor
    switch (level) {
      case 0:
        backgroundColor = '#aaa'
        break
      case 1:
        backgroundColor = _.colorSuccess
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
        backgroundColor = _.colorDanger
        break
    }

    return (
      <Flex style={styles.ico}>
        <Text style={styles.iconText} size={10} align='center'>
          lv.{level} {percent}%
        </Text>
        <View style={styles.icoBar}>
          <View
            style={[
              styles.icoProcess,
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

    const { showDetail } = this.state
    const fluctuationStyle = [styles.fluctuation, _.ml.sm]
    if (fluctuation < 0) {
      fluctuationStyle.push(styles.danger)
    } else if (fluctuation > 0) {
      fluctuationStyle.push(styles.success)
    } else {
      fluctuationStyle.push(styles.sub)
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
    if (showDetail) {
      if (fluctuation > 0) {
        realChange = `+${(current - current / (1 + fluctuation / 100)).toFixed(
          2
        )}`
      } else if (fluctuation < 0) {
        realChange = `-${(current / (1 + fluctuation / 100)).toFixed(2)}`
      }
    } else if (fluctuation > 0) {
      fluctuationText = `+${fluctuation.toFixed(2)}%`
    } else if (fluctuation < 0) {
      fluctuationText = `${fluctuation.toFixed(2)}%`
    }

    let fluctuationSize = 13
    if (fluctuationText.length > 8) {
      fluctuationSize = 10
    } else if (fluctuationText.length > 7) {
      fluctuationSize = 12
    }

    return (
      <Touchable style={[styles.container, style]} onPress={this.toggleNum}>
        <Flex justify='end'>
          <Text lineHeight={16}>₵{current.toFixed(2)}</Text>
          <Text
            style={fluctuationStyle}
            size={fluctuationSize}
            lineHeight={16}
            type='plain'
            align='center'
          >
            {showDetail ? realChange : fluctuationText}
          </Text>
        </Flex>
        <Flex style={styles.wrap} justify='end'>
          {showDetail && (
            <Text size={12} type='sub'>
              量{change}
            </Text>
          )}
          {showFloor ? (
            <Flex style={_.ml.sm}>
              {showDetail && (
                <Text size={12} type='success'>
                  {bids}
                </Text>
              )}
              <Flex style={[styles.floor, _.ml.xs]} justify='between'>
                <View
                  style={[
                    styles.bids,
                    {
                      width: `${bidsPercent}%`
                    }
                  ]}
                />
                <View
                  style={[
                    styles.asks,
                    {
                      width: `${asksPercent}%`
                    }
                  ]}
                />
              </Flex>
              {showDetail && (
                <Text style={[styles.small, _.ml.xs]} size={12} type='danger'>
                  {asks}
                </Text>
              )}
            </Flex>
          ) : (
            <Text style={_.ml.sm} size={12} type='sub'>
              (没有挂单)
            </Text>
          )}
        </Flex>
      </Touchable>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingVertical: _.wind,
    paddingHorizontal: _.sm
  },
  fluctuation: {
    minWidth: 72,
    paddingHorizontal: _.sm,
    borderRadius: 2,
    overflow: 'hidden',
    opacity: 0.72
  },
  danger: {
    backgroundColor: _.colorDanger
  },
  success: {
    backgroundColor: _.colorSuccess
  },
  sub: {
    backgroundColor: _.colorSub
  },
  wrap: {
    position: 'absolute',
    right: _.sm,
    bottom: _.wind,
    height: 16
  },
  floor: {
    width: 72
  },
  bids: {
    height: 2,
    backgroundColor: _.colorSuccess,
    borderRadius: 2,
    overflow: 'hidden'
  },
  asks: {
    height: 2,
    backgroundColor: _.colorDanger,
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
    backgroundColor: _.colorBorder,
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
  }
})
