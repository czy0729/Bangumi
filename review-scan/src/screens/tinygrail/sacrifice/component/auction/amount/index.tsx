/*
 * @Author: czy0729
 * @Date: 2024-03-07 21:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:21:33
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Iconfont, Input, Text } from '@components'
import { Popover } from '@_'
import { _, useStore } from '@stores'
import { formatNumber, lastDate } from '@utils'
import { useMount, useObserver } from '@utils/hooks'
import { Ctx } from '../../../types'
import { COUNT_DS } from '../ds'
import Stepper from '../../stepper'
import { memoStyles } from './styles'

function Amount() {
  const { $ } = useStore<Ctx>()
  useMount(() => {
    $.fetchQueueUnique([$.fetchAssets, $.fetchValhallChara, $.fetchAuctionStatus])
  })

  return useObserver(() => {
    const styles = memoStyles()
    const { auctionLoading, auctionAmount, lastAuction } = $.state
    return (
      <>
        <Flex style={_.mt.xs}>
          <Flex.Item flex={1.5}>
            <View style={styles.inputWrap}>
              <Stepper />
            </View>
          </Flex.Item>
          <Flex.Item style={_.ml.md}>
            <Flex style={styles.inputWrap}>
              <Input
                style={styles.input}
                keyboardType='numeric'
                value={String(auctionAmount)}
                clearButtonMode='never'
                returnKeyType='done'
                returnKeyLabel='竞拍'
                onChangeText={$.changeAuctionAmount}
                onSubmitEditing={$.doAuction}
              />
              <View style={styles.popover}>
                <Popover data={COUNT_DS} onSelect={$.changeAuctionAmountByMenu}>
                  <Flex style={styles.count} justify='center'>
                    <Iconfont name='md-keyboard-arrow-down' color={_.colorTinygrailText} />
                  </Flex>
                </Popover>
              </View>
            </Flex>
          </Flex.Item>
          <View style={styles.btnSubmit}>
            <Button
              style={styles.btnAuction}
              type='bid'
              radius={false}
              loading={auctionLoading}
              onPress={$.doAuction}
            >
              竞拍
            </Button>
          </View>
        </Flex>
        {!!lastAuction.time && (
          <Text style={_.mt.md} type='warning' size={12}>
            最近 ({lastAuction.price} / {formatNumber(lastAuction.amount, 0)} 股 /{' '}
            {lastDate(lastAuction.time)})
          </Text>
        )}
      </>
    )
  })
}

export default Amount
