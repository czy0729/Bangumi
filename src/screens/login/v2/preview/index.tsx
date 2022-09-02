/*
 * @Author: czy0729
 * @Date: 2019-07-17 10:03:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-03 03:50:40
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Mesume, Heatmap } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import i18n from '@constants/i18n'
import { styles } from './styles'

function Preview({ onLogin = () => {}, onTour = () => {} }) {
  return (
    <View style={_.container.column}>
      <Mesume />
      <View style={styles.bottomContainer}>
        <Button type='main' shadow onPress={onLogin}>
          账号{i18n.login()}
        </Button>
        <View style={_.mt.md}>
          <Button type='plain' shadow onPress={onTour}>
            游客预览
          </Button>
          <Heatmap id='登陆.游客访问' />
        </View>
      </View>
    </View>
  )
}

export default ob(Preview)
