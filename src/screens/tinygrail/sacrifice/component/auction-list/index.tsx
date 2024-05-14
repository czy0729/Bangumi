/*
 * @Author: czy0729
 * @Date: 2019-11-17 14:24:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-08 02:59:33
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../types'
import LastWeek from './last-week'
import List from './list'
import { COMPONENT } from './ds'
import { memoStyles } from './styles'

function AuctionList(props, { $ }: Ctx) {
  if (!$.state.showAuction) return null

  const styles = memoStyles()
  return (
    <View style={styles.container}>
      <LastWeek />
      <List />
      {!!$.auctionList.list.length && (
        <Touchable onPress={$.toggleLogs}>
          <Flex style={styles.notice} justify='center'>
            <Iconfont
              name={$.state.showLogs ? 'md-keyboard-arrow-up' : 'md-keyboard-arrow-down'}
              color={_.colorTinygrailText}
            />
          </Flex>
        </Touchable>
      )}
    </View>
  )
}

export default obc(AuctionList, COMPONENT)
