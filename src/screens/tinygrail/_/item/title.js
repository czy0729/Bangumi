/*
 * @Author: czy0729
 * @Date: 2021-03-03 22:55:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-04 01:56:52
 */
import React from 'react'
import { Flex, Text } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

function Title({ rank, name, level, bonus }) {
  const styles = memoStyles()
  return (
    <Flex wrap='wrap'>
      {!!rank && (
        <Text
          style={[
            styles.rank,
            {
              backgroundColor: rank <= 500 ? '#ffc107' : '#aaa'
            }
          ]}
          size={10}
          bold
          align='center'
        >
          {rank}
        </Text>
      )}
      <Text
        type='tinygrailPlain'
        size={name.length > 12 ? 9 : name.length > 8 ? 11 : 13}
        lineHeight={13}
        bold
      >
        {name}
      </Text>
      {parseInt(level) > 1 && (
        <Text style={_.ml.xs} type='ask' size={10} lineHeight={13} bold>
          lv{level}
        </Text>
      )}
      {!!bonus && (
        <Text style={_.ml.xs} type='warning' size={10} lineHeight={13} bold>
          x{bonus}
        </Text>
      )}
    </Flex>
  )
}

export default ob(Title)

const memoStyles = _.memoStyles(_ => ({
  rank: {
    width: 30,
    marginRight: 6,
    color: _.__colorPlain__,
    textShadowOffset: {
      width: 1,
      hegith: 1
    },
    textShadowRadius: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.48)',
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  }
}))
