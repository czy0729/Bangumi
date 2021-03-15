/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-15 11:52:33
 */
import React from 'react'
import { Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { IOS } from '@constants'

export const IconBack = ob(({ style, navigation, color = _.colorPlain }) => (
  <Touchable style={[styles.container, style]} onPress={navigation.goBack}>
    <Iconfont
      name={IOS ? 'left' : 'arrow-left'}
      size={IOS ? 20 : 22}
      color={color}
    />
  </Touchable>
))

const styles = _.create({
  container: {
    padding: _.sm,
    paddingLeft: IOS ? _.sm : _.sm + 4
  }
})
