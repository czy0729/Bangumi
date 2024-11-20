/*
 * @Author: czy0729
 * @Date: 2024-03-11 06:57:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-19 13:36:19
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp } from '@components'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'

function Avatar({ charaId, icons, desc, onPress }) {
  const navigation = useNavigation()
  if (!icons) return null

  return (
    <View style={_.mr.sm}>
      <AvatarComp
        src={tinygrailOSS(icons)}
        size={28}
        borderColor='transparent'
        skeletonType='tinygrail'
        onPress={() => {
          // ICO 的记录没有人物 id
          if (!onPress) return

          t('资金日志.跳转', {
            to: 'Mono',
            monoId: charaId
          })

          navigation.push('Mono', {
            monoId: `character/${charaId}`,
            _name: desc
          })
        }}
      />
    </View>
  )
}

export default ob(Avatar)
