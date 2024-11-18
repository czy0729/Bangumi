/*
 * @Author: czy0729
 * @Date: 2023-06-28 08:38:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-18 08:03:29
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { VerticalAlign } from '@_'
import { _, useStore } from '@stores'
import { ob } from '@utils/decorators'
import { Ctx } from '../../../types'
import { styles } from './styles'

function Name() {
  const { $ } = useStore<Ctx>()
  const { id, username } = $.usersInfo
  const userId = id || $.params._id
  const isRename = !!username && username != userId
  const type = _.select('plain', 'title')
  return (
    <View style={_.mt.md}>
      <Flex>
        <VerticalAlign text={$.nickname} type={type} lineHeight={14} bold shadow>
          {$.nickname}
        </VerticalAlign>
        {!!(username || userId) && (
          <Text style={_.ml.xs} type={type} bold shadow>
            @{$.state.originUid ? userId : username || userId}
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

export default ob(Name)
