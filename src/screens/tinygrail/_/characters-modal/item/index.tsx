/*
 * @Author: czy0729
 * @Date: 2020-07-01 17:20:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-06 19:15:17
 */
import React from 'react'
import { Avatar, Flex, Text, Touchable } from '@components'
import { _ } from '@stores'
import { stl, tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import Level from '../../level'
import Progress from '../../progress'
import Rank from '../../rank'
import { memoStyles } from './styles'

function Item({
  type,
  src,
  id,
  level,
  rank,
  name,
  extra,
  assets = 0,
  sacrifices = 0,
  disabled,
  item,
  onPress
}) {
  const styles = memoStyles()
  return (
    <Touchable onPress={() => onPress(item)}>
      <Flex style={stl(styles.item, !disabled && styles[type])}>
        {src ? (
          <Avatar
            key={tinygrailOSS(src)}
            src={tinygrailOSS(src)}
            size={30}
            radius={_.radiusXs}
            skeletonType='tinygrail'
          />
        ) : (
          <Text type='tinygrailPlain' size={9} lineHeight={10} bold numberOfLines={1}>
            #{id}{' '}
          </Text>
        )}
        <Flex.Item style={_.ml.xs}>
          <Flex>
            {rank <= 500 && <Rank style={styles.rank} size={8} value={rank} />}
            <Flex.Item>
              <Text type='tinygrailPlain' size={9} bold numberOfLines={1}>
                <Level value={level} size={9} lineHeight={9} />
                {name}
              </Text>
            </Flex.Item>
          </Flex>
          {assets && sacrifices ? (
            <Progress style={_.mt.xs} size='xs' assets={assets} sacrifices={sacrifices} />
          ) : (
            !!extra && (
              <Text style={_.mt.xs} type='tinygrailText' size={9} numberOfLines={1}>
                {extra}
              </Text>
            )
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(Item)
