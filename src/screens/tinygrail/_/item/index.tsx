/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 11:11:58
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT } from '@constants'
import Auction from './auction'
import Control from './control'
import Detail from './detail'
import Icon from './icon'
import Title from './title'
import { getOnPress } from './utils'
import { memoStyles } from './styles'

function Item(props, { $, navigation }) {
  const styles = memoStyles()
  const { style, id, monoId, event, type, end, withoutFeedback } = props
  const go = props.go || $.state.go
  const isICO = !!end
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  const onPress = () => {
    if (isICO) {
      // ICO 不受复写 go 参数影响跳转
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
    if (go) return getOnPress(_id, go, navigation, event.id, event.data, props)()

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
    <Flex style={stl(styles.container, style)} align='start'>
      <Icon {...props} />
      <Flex.Item style={styles.wrap}>
        <Flex align='start'>
          <Flex.Item style={_.mr.sm}>
            <Touchable style={styles.item} withoutFeedback={withoutFeedback} onPress={onPress}>
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
  onAuctionCancel: () => {},
  onCollect: () => {}
})
