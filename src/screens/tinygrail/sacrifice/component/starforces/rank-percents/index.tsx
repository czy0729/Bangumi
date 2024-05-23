/*
 * @Author: czy0729
 * @Date: 2024-03-07 17:40:17
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-05-19 11:54:24
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { calculateRatio, decimal } from '@screens/tinygrail/_/utils'
import Rank from '@tinygrail/_/rank'
import { Ctx } from '../../../types'
import { styles } from './styles'

function RankPercents(props, { $ }: Ctx) {
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
                {last ? `已转化 ${item.text}` : `再转化 ${decimal(item.distance)}`}
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

export default obc(RankPercents)
