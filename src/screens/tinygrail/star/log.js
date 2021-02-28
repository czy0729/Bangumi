/*
 * @Author: czy0729
 * @Date: 2021-02-28 17:51:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-28 20:04:16
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { tinygrailOSS } from '@utils/app'
import { EVENT } from '@constants'

function Item(
  { id, name, icon, amount, rank = 0, oldRank = 0, userName },
  { navigation }
) {
  const styles = memoStyles()
  const rankChange = oldRank - rank
  return (
    <Flex style={styles.container}>
      <Avatar
        style={styles.avatar}
        src={tinygrailOSS(icon)}
        size={36}
        name={name}
        borderColor='transparent'
        onPress={() => {}}
      />
      <Flex.Item style={_.ml.sm}>
        <Text type='tinygrailPlain' size={12} bold>
          {name}
          <Text type='warning' size={10} lineHeight={13} bold>
            {' '}
            #{rank}{' '}
          </Text>
          {rankChange !== 0 && (
            <Text
              type={rankChange >= 0 ? 'bid' : 'ask'}
              size={10}
              lineHeight={13}
              bold
            >
              {' '}
              {rankChange >= 0 ? '↑' : '↓'}
              {Math.abs(rankChange)}
            </Text>
          )}
        </Text>
        {userName ? (
          <Text style={_.mt.xs} type='bid' size={10} bold>
            <Text type='tinygrailText' size={10}>
              @{userName}{' '}
            </Text>
            +{formatNumber(amount, 0)}
          </Text>
        ) : (
          <Text style={_.mt.xs} type='ask' size={10} bold>
            <Text type='tinygrailText' size={10}>
              受到攻击{' '}
            </Text>
            -{formatNumber(amount, 0)}
          </Text>
        )}
      </Flex.Item>
    </Flex>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

Item.defaultProps = {
  event: EVENT,
  assets: undefined
}

export default observer(Item)

const memoStyles = _.memoStyles(_ => ({
  container: {
    marginTop: _.md,
    backgroundColor: _.colorTinygrailContainer
  },
  avatar: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  rank: {
    color: _.__colorPlain__,
    backgroundColor: _.colorWarning
  }
}))
