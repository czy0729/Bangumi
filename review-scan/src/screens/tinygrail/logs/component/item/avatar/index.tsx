/*
 * @Author: czy0729
 * @Date: 2024-03-11 06:57:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-22 05:46:59
 */
import React from 'react'
import { View } from 'react-native'
import { Avatar as AvatarComp } from '@components'
import { _ } from '@stores'
import { tinygrailOSS } from '@utils'
import { ob } from '@utils/decorators'
import { t } from '@utils/fetch'
import { useNavigation } from '@utils/hooks'

function Avatar({ charaId, icons, onPress }) {
  const navigation = useNavigation()
  if (!icons) return null

  return (
    <View style={_.mr.sm}>
      <AvatarComp
        src={tinygrailOSS(icons)}
        size={32}
        borderColor='transparent'
        skeletonType='tinygrail'
        onPress={() => {
          // ICO 的记录没有人物 ID
          if (!onPress) return

          navigation.push('Mono', {
            monoId: `character/${charaId}`
          })

          t('资金日志.跳转', {
            to: 'Mono',
            monoId: charaId
          })
        }}
      />
    </View>
  )
}

export default ob(Avatar)
