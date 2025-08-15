/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:40:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 16:19:45
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import Rank from '@tinygrail/_/rank'
import { calculateRatio, decimal } from '@tinygrail/_/utils'
import { Ctx } from '../../../types'
import { styles } from './styles'

function RankPercents() {
  const { $ } = useStore<Ctx>()
  return (
    <View style={styles.rankPercents}>
      {$.rankPercents.map((item, index: number) => {
        const last = index === $.rankPercents.length - 1
        return (
          <Touchable
            style={[
              styles.item,
              {
                marginLeft: item.left
              }
            ]}
            onPress={() => $.changeStarForces(item.distance)}
          >
            <Flex>
              <Rank
                style={
                  item.rank !== $.rank && {
                    backgroundColor: _.colorTinygrailIcon
                  }
                }
                value={item.rank}
              />
              <Text size={10} type='tinygrailPlain'>
                {last ? `当前星之力 ${item.text}` : `再转化 ${decimal(item.distance)}`}
              </Text>
              <Text style={_.ml.xs} size={10} type='tinygrailText'>
                +{item.rate} (x{calculateRatio(item.rank)}
                {item.rank !== $.rank && `, 总 ${item.totalRate >= 0 ? '+' : ''}${item.totalRate}`})
              </Text>
            </Flex>
          </Touchable>
        )
      })}
    </View>
  )
}

export default ob(RankPercents)
