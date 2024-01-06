/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-06-28 10:56:51
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Name(props, { $ }: Ctx) {
  const { _id } = $.params
  const { originUid } = $.state
  const { id, username } = $.usersInfo
  const type = _.select('plain', 'title')
  const userId = id || _id
  const isRename = !!username && username != userId
  return (
    <View style={_.mt.md}>
      <Flex>
        <Text type={type} bold>
          {$.nickname}
        </Text>
        {!!(username || userId) && (
          <Text style={_.ml.xs} type={type} bold>
            @{originUid ? userId : username || userId}
          </Text>
        )}
      </Flex>
      <Flex style={styles.icons}>
        {isRename && (
          <Touchable style={styles.icon} onPress={$.toggleOriginUid}>
            <Iconfont name='md-compare-arrows' size={17} color={_.__colorPlain__} />
          </Touchable>
        )}
      </Flex>
    </View>
  )
}

export default obc(Name)
