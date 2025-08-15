/*
 * @Author: czy0729
 * @Date: 2019-09-20 20:24:05
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-14 17:09:57
 */
import React from 'react'
import { View } from 'react-native'
import { CountDown, Flex, Iconfont, Image, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import {
  caculateICO,
  calculateFutureICO,
  formatNumber,
  getCoverLarge,
  getTimestamp,
  HTMLDecode,
  tinygrailOSS
} from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { Ctx } from '../../types'
import Bar from '../bar'
import Subject from '../subject'
import { COMPONENT, MAX_SIZE } from './ds'
import { memoStyles } from './styles'

const Info = () => {
  const { $, navigation } = useStore<Ctx>()
  const styles = memoStyles()

  const { icon, monoId, name, total, end = '', bonus } = $.chara
  const icoData = caculateICO($.chara)
  const { next, level, price, amount } = icoData
  const endTime = getTimestamp(end.replace('T', ' '))

  const { step } = $.state
  const futureICO = step ? calculateFutureICO($.chara, step) : null
  const textSize = step ? 14 : 15

  const handlePress = () => {
    navigation.push('Mono', {
      monoId: `character/${monoId}`,
      _name: name
    })

    t('ICO交易.跳转', {
      to: 'Mono',
      monoId
    })
  }

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
            event={{
              id: 'ICO交易.封面图查看',
              data: { monoId }
            }}
          />
        </Flex>
      )}

      <Touchable style={_.mt.md} onPress={handlePress}>
        <Flex justify='center'>
          <Text type='tinygrailPlain' size={textSize} bold>
            #{monoId} - {HTMLDecode(name)}
          </Text>
          {!!bonus && (
            <Text type='warning' size={textSize} bold>
              {' '}
              x{bonus}
            </Text>
          )}
          {level ? (
            <>
              <Text type='ask' size={textSize} bold>
                {' '}
                lv{level - 1}
              </Text>
              {futureICO && (
                <Text type='tinygrailText' size={textSize} bold>
                  {' '}
                  (至lv{futureICO.level})
                </Text>
              )}
            </>
          ) : null}
          <Iconfont name='md-navigate-next' color={_.colorTinygrailText} />
        </Flex>
      </Touchable>

      <Subject />

      <Flex style={_.mt.sm} justify='center'>
        <Text type='tinygrailText' size={textSize}>
          剩余时间：
        </Text>
        <CountDown style={{ color: _.colorTinygrailText }} size={textSize} end={endTime} />
      </Flex>

      <Text style={_.mt.md} type='tinygrailPlain' size={textSize} align='center'>
        已筹
        <Text type='warning' size={textSize}>
          {' '}
          {formatNumber(total, 0, $.short)}
        </Text>{' '}
        / 下一等级需要 {formatNumber(next, 0, $.short)}
        {futureICO && (
          <Text type='tinygrailText' size={textSize}>
            {' '}
            ({formatNumber(futureICO.next, 0, $.short)})
          </Text>
        )}
      </Text>

      <Text style={_.mt.sm} type='tinygrailPlain' size={textSize} align='center'>
        预计发行量：约 {formatNumber(amount, 0, $.short)}
        {futureICO && (
          <Text type='tinygrailText' size={textSize}>
            {' '}
            ({formatNumber(futureICO.amount, 0, $.short)})
          </Text>
        )}{' '}
        股 / 发行价 ₵{formatNumber(price)}
        {futureICO && (
          <Text type='tinygrailText' size={textSize}>
            {' '}
            (₵{formatNumber(futureICO.price, 0, $.short)})
          </Text>
        )}
      </Text>

      <Bar
        style={_.mt.md}
        total={total}
        level={futureICO?.level || level}
        next={futureICO?.next || next}
      />
    </View>
  )
}

export default ob(Info, COMPONENT)
