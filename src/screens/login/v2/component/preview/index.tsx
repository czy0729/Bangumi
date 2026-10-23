/*
 * @Author: czy0729
 * @Date: 2019-07-17 10:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-23 10:00:00
 *
 * 登录预览: 账号登录 / 游客预览入口
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Button, Heatmap, Mesume, Page } from '@components'
import { _ } from '@stores'
import { open } from '@utils'
import { r } from '@utils/dev'
import { HOST, WEB } from '@constants'
import i18n from '@constants/i18n'
import { COMPONENT } from './ds'
import { styles } from './styles'

import type { Props } from './types'

/** 登录预览 */
function Preview({ onLogin, onTour }: Props) {
  r(COMPONENT)

  const Container = WEB ? Page : View
  return (
    <Container style={_.container.column}>
      <Mesume />
      <View style={styles.bottomContainer}>
        <Button type='main' shadow onPress={onLogin}>
          {WEB ? '' : '账号'}
          {i18n.login()}
        </Button>
        <View style={_.mt.md}>
          {WEB ? (
            <Button
              type='plain'
              shadow
              onPress={() => {
                open(`${HOST}/signup`)
              }}
            >
              注册
            </Button>
          ) : (
            <Button type='plain' shadow onPress={onTour}>
              游客预览
            </Button>
          )}
          <Heatmap id='登陆.游客访问' />
        </View>
      </View>
    </Container>
  )
}

export default observer(Preview)
