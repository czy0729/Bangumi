/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 16:32:49
 */
import React from 'react'
import { Flex, Touchable } from '@components'
import { _, useStore } from '@stores'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { EVENT, FROZEN_FN } from '@constants'
import Icon from '../icon'
import Auction from './auction'
import Control from './control'
import Detail from './detail'
import Title from './title'
import { getOnPress } from './utils'
import { memoStyles } from './styles'
import { Ctx } from './types'

function Item(props) {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()
  const { style, id, monoId, event, type, end, withoutFeedback } = props
  const go = props.go || $.state.go
  const isICO = !!end
  const isAuction = type === 'auction'
  const isValhall = type === 'valhall'

  const handlePress = () => {
    if (isICO) {
      // ICO 不受复写 go 参数影响跳转
      t(event.id, {
        to: 'TinygrailICODeal',
        monoId: monoId || id,
        ...event.data
      })

      navigation.push('TinygrailICODeal', {
        monoId: `character/${monoId || id}`
      })
      return
    }

    const _id = isAuction || isValhall ? monoId || id : id
    if (go) {
      getOnPress(_id, go, navigation, event.id, event.data, props)()
      return
    }

    t(event.id, {
      to: 'TinygrailDeal',
      monoId: _id,
      ...event.data
    })

    navigation.push('TinygrailDeal', {
      monoId: `character/${_id}`
    })
  }

  return (
    <Flex style={stl(styles.container, style)} align='start'>
      <Icon key={props.id} {...props} style={_.mt.md} />
      <Flex.Item>
        <Flex align='start'>
          <Flex.Item style={_.mr.sm}>
            <Touchable style={styles.item} withoutFeedback={withoutFeedback} onPress={handlePress}>
              <Flex align='start'>
                <Flex.Item>
                  <Title {...props} />
                  <Detail {...props} />
                </Flex.Item>
                {isAuction && <Auction {...props} />}
              </Flex>
            </Touchable>
          </Flex.Item>
        </Flex>
      </Flex.Item>
      <Control {...props} />
    </Flex>
  )
}

export default ob(Item, {
  event: EVENT,
  showMenu: true,
  withoutFeedback: false,
  onAuctionCancel: FROZEN_FN,
  onCollect: FROZEN_FN
})
