/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-03-11 10:26:15
 */
import React from 'react'
import { View } from 'react-native'
import { CountDown, Flex, Iconfont, Image, Text, Touchable } from '@components'
import { _ } from '@stores'
import {
  caculateICO,
  formatNumber,
  getCoverLarge,
  getTimestamp,
  HTMLDecode,
  tinygrailOSS
} from '@utils'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../../types'
import Bar from '../bar'
import { COMPONENT, MAX_SIZE } from './ds'
import { memoStyles } from './styles'

function Info(props, { $, navigation }: Ctx) {
  const styles = memoStyles()
  const { icon, monoId, name, total, end = '', bonus } = $.chara
  const { next, level, price, amount } = caculateICO($.chara)
  const endTime = getTimestamp(end.replace('T', ' '))
  const EVENT = {
    id: 'ICO交易.封面图查看',
    data: {
      monoId
    }
  } as const
  return (
    <View style={styles.container}>
      {!!icon && (
        <Flex justify='center'>
          <Image
            src={tinygrailOSS(getCoverLarge(icon), 150)}
            autoSize={MAX_SIZE}
            imageViewer
            imageViewerSrc={tinygrailOSS(getCoverLarge(icon), 480)}
            skeletonType='tinygrail'
            event={EVENT}
          />
        </Flex>
      )}
      <Touchable
        style={_.mt.md}
        onPress={() => {
          t('ICO交易.跳转', {
            to: 'Mono',
            monoId
          })

          navigation.push('Mono', {
            monoId: `character/${monoId}`,
            _name: name
          })
        }}
      >
        <Flex justify='center'>
          <Text type='tinygrailPlain' size={15} bold>
            #{monoId} -
          </Text>
          {!!level && (
            <Text type='ask' size={15} bold>
              {' '}
              lv{level}{' '}
            </Text>
          )}
          <Text type='tinygrailPlain' size={15} bold>
            {HTMLDecode(name)}
          </Text>
          {!!bonus && (
            <Text type='warning' size={15} bold>
              {' '}
              x{bonus}
            </Text>
          )}
          <Iconfont name='md-navigate-next' color={_.colorTinygrailText} />
        </Flex>
      </Touchable>
      <Flex style={_.mt.sm} justify='center'>
        <Text type='tinygrailText' size={15}>
          剩余时间:{' '}
        </Text>
        <CountDown
          style={{
            color: _.colorTinygrailText
          }}
          size={15}
          end={endTime}
        />
      </Flex>
      <Text style={_.mt.md} type='tinygrailPlain' align='center'>
        已筹
        <Text type='warning'> {formatNumber(total, 0, $.short)}</Text> / 下一等级需要{' '}
        {formatNumber(next, 0, $.short)}
      </Text>
      <Text style={_.mt.sm} type='tinygrailPlain' align='center'>
        预计发行量: 约 {formatNumber(amount, 0, $.short)} 股 / 发行价 ₵{formatNumber(price)}
      </Text>
      <Bar style={_.mt.md} total={total} level={level} next={next} />
    </View>
  )
}

export default obc(Info, COMPONENT)
