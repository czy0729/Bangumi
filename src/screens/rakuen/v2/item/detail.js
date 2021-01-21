/*
 * @Author: czy0729
 * @Date: 2021-01-21 19:23:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-21 19:28:48
 */
import React from 'react'
import { Katakana, Text } from '@components'
import { Name } from '@screens/_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { correctAgo } from '@utils/app'

function Detail({ time, groupCn, userName, userId }) {
  return (
    <Katakana.Provider
      style={_.mt.sm}
      itemStyle={styles.katakanas}
      size={11}
      numberOfLines={2}
    >
      <Text type='sub' size={11}>
        {correctAgo(time)}
        {groupCn ? ' / ' : ''}
      </Text>
      <Katakana type='sub' size={11}>
        {groupCn}
      </Katakana>
      {!!userName && (
        <Name userId={userId} showFriend type='sub' size={11}>
          {' '}
          / {userName}
        </Name>
      )}
    </Katakana.Provider>
  )
}

export default ob(Detail)

const styles = _.create({
  katakanas: {
    marginTop: -2
  }
})
