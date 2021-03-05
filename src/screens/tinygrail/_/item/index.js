/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-04 17:34:13
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import { obc } from '@utils/decorators'
import Auction from './auction'
import Control from './control'
import Detail from './detail'
import Icon from './icon'
import Title from './title'

function Item(props, { $, navigation }) {
  const styles = memoStyles()
  const {
    style,
    index,
    id,
    monoId,
    event,
    type,
    users,
    withoutFeedback
  } = props
  const go = props.go || $.state.go
  const isICO = users !== undefined // 有users为ico中
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  const onPress = () => {
    if (isICO) {
      // ICO不受复写go参数影响跳转
      t(event.id, {
        to: 'TinygrailICODeal',
        monoId: monoId || id,
        ...event.data
      })
      return navigation.push('TinygrailICODeal', {
        monoId: `character/${monoId || id}`
      })
    }

    const _id = isAuction || isValhall ? monoId || id : id
    if (go) {
      return getOnPress(_id, go, navigation, event.id, event.data)()
    }

    t(event.id, {
      to: 'TinygrailDeal',
      monoId: _id,
      ...event.data
    })
    return navigation.push('TinygrailDeal', {
      monoId: `character/${_id}`
    })
  }

  return (
    <Flex style={[styles.container, style]} align='start'>
      <Icon {...props} />
      <Flex.Item style={[styles.wrap, index !== 0 && !_.flat && styles.border]}>
        <Flex align='start'>
          <Flex.Item style={_.mr.sm}>
            <Touchable
              style={styles.item}
              withoutFeedback={withoutFeedback}
              onPress={onPress}
            >
              <Flex align='start'>
                <Flex.Item>
                  <Title {...props} />
                  <Detail {...props} />
                </Flex.Item>
                {isAuction && <Auction {...props} />}
              </Flex>
            </Touchable>
          </Flex.Item>
          <Control {...props} />
        </Flex>
      </Flex.Item>
    </Flex>
  )
}

export default obc(Item, {
  event: EVENT,
  showMenu: true,
  withoutFeedback: false,
  onAuctionCancel: Function.prototype,
  onCollect: Function.prototype
})

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorTinygrailContainer
  },
  wrap: {
    paddingRight: _.wind - _._wind
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm
  },
  border: {
    borderTopColor: _.colorTinygrailBorder,
    borderTopWidth: _.hairlineWidth
  }
}))

/**
 * 路由跳转复写
 * @param {*} charaId
 * @param {*} go
 * @param {*} navigation
 */
function getOnPress(charaId, go, navigation, eventId, eventData) {
  return () => {
    let to
    let params
    switch (go) {
      case 'K线':
        to = 'TinygrailTrade'
        break

      case '买入':
        to = 'TinygrailDeal'
        params = {
          type: 'bid'
        }
        break

      case '卖出':
        to = 'TinygrailDeal'
        params = {
          type: 'asks'
        }
        break

      case '资产重组':
        to = 'TinygrailSacrifice'
        break

      default:
        return
    }

    t(eventId, {
      to,
      monoId: charaId,
      ...eventData
    })
    navigation.push(to, {
      monoId: `character/${charaId}`,
      ...params
    })
  }
}
