/*
 * @Author: czy0729
 * @Date: 2020-07-01 17:20:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-12-17 04:33:52
 */
import React from 'react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@_'
import { _ } from '@stores'
import { stl, tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import Rank from '../../rank'
import { memoStyles } from './styles'

function Item({ type, src, id, level, rank, name, extra, disabled, item, onPress }) {
  const styles = memoStyles()
  return (
    <Touchable onPress={() => onPress(item)}>
      <Flex style={stl(styles.item, !disabled && styles[type])}>
        {src ? (
          <Avatar src={tinygrailOSS(src)} size={40} />
        ) : (
          <Text type='tinygrailPlain' size={9} lineHeight={10} bold numberOfLines={1}>
            #{id}{' '}
          </Text>
        )}
        <Flex.Item style={_.ml.sm}>
          <Flex>
            {rank <= 500 && <Rank style={styles.rank} value={rank} />}
            <Flex.Item>
              <Text type='tinygrailPlain' size={9} bold numberOfLines={1}>
                <Text type='ask' size={9} bold lineHeight={10}>
                  lv{level}{' '}
                </Text>
                {name}
              </Text>
            </Flex.Item>
          </Flex>
          {!!extra && (
            <Text style={_.mt.xs} type='tinygrailText' size={9} numberOfLines={2}>
              {extra}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(Item)
