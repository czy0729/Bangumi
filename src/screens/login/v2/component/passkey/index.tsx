/*
 * @Date: 2026-11-01
 *
 * 系统凭据提供方的 Passkey 登录入口与非敏感提示, 不创建或管理凭据
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Text } from '@components'
import { _ } from '@stores'
import { r } from '@utils/dev'
import { COMPONENT } from './ds'
import Guide from './guide'
import { styles } from './styles'

import type { Props } from './types'

function Passkey({ passkey, blocked }: Props) {
  r(COMPONENT)
  if (!passkey.visible) return null

  return (
    <View style={_.mt.md}>
      <View style={styles.row}>
        <Button
          type={blocked ? 'disabled' : 'main'}
          shadow
          loading={passkey.loading}
          onPress={blocked ? undefined : passkey.onLogin}
        >
          Passkey登录
        </Button>
        <View style={styles.info} pointerEvents='box-none'>
          <Guide disabled={blocked || passkey.loading} />
        </View>
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
