/*
 * @Author: Q16KBreak
 * @Date: 2026-11-01
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-11 21:17:53
 *
 * 系统凭据提供方的 Passkey 登录入口与非敏感提示，不创建或管理凭据
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import Guide from './guide'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

function Passkey({ passkey, blocked }: Props) {
  r(COMPONENT)
  if (!passkey.visible) return null

  return (
    <View style={_.mt.md}>
      <View style={styles.row}>
        <Button
          style={styles.button}
          type={blocked ? 'disabled' : 'main'}
          shadow
          loading={passkey.loading}
          onPress={blocked ? undefined : () => void passkey.onLogin()}
        >
          Passkey登录
        </Button>
        <Guide disabled={blocked || passkey.loading} />
      </View>
      {!!passkey.message && (
        <Text style={_.mt.sm} size={12} lineHeight={16} type='sub'>
          {passkey.message}
        </Text>
      )}
      {passkey.loading && (
        <Text style={_.mt.sm} size={12} type='sub' underline onPress={passkey.onCancel}>
          取消本次登录
        </Text>
      )}
    </View>
  )
}

export default observer(Passkey)
