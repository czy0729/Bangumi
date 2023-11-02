/*
 * @Author: czy0729
 * @Date: 2019-07-17 10:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 14:14:15
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Mesume, Heatmap, Page } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { HOST, STORYBOOK } from '@constants'
import i18n from '@constants/i18n'
import { styles } from './styles'

function Preview({ onLogin = () => {}, onTour = () => {} }) {
  const Component = STORYBOOK ? Page : View
  return (
    <Component style={_.container.column}>
      <Mesume />
      <View style={styles.bottomContainer}>
        <Button type='main' shadow onPress={onLogin}>
          {STORYBOOK ? '' : '账号'}
          {i18n.login()}
        </Button>
        <View style={_.mt.md}>
          {STORYBOOK ? (
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
    </Component>
  )
}

export default ob(Preview)
