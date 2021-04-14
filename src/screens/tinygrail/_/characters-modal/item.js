/*
 * @Author: czy0729
 * @Date: 2020-07-01 17:20:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-12 14:48:56
 */
import React from 'react'
import { Touchable, Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { tinygrailOSS } from '@utils/app'
import Rank from '../rank'

function Item({
  type,
  src,
  id,
  level,
  rank,
  name,
  extra,
  disabled,
  item,
  onPress
}) {
  const styles = memoStyles()
  return (
    <Touchable onPress={() => onPress(item)}>
      <Flex style={[styles.item, !disabled && styles[type]]}>
        {src ? (
          <Avatar style={styles.avatar} src={tinygrailOSS(src)} size={40} />
        ) : (
          <Text
            type='tinygrailPlain'
            size={9}
            lineHeight={10}
            bold
            numberOfLines={1}
          >
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
            <Text
              style={_.mt.xs}
              type='tinygrailText'
              size={9}
              numberOfLines={2}
            >
              {extra}
            </Text>
          )}
        </Flex.Item>
      </Flex>
    </Touchable>
  )
}

export default ob(Item)

const memoStyles = _.memoStyles(_ => ({
  item: {
    paddingVertical: 5,
    paddingLeft: 6,
    marginBottom: 2,
    borderWidth: 1,
    borderColor: _.colorTinygrailContainer,
    borderRadius: _.radiusXs
  },
  bid: {
    backgroundColor: _.colorDepthBid,
    borderColor: _.colorBid
  },
  ask: {
    backgroundColor: _.colorDepthAsk,
    borderColor: _.colorAsk
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  rank: {
    minWidth: 16,
    paddingHorizontal: 2
  }
}))
