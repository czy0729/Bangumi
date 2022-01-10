/*
 * @Author: czy0729
 * @Date: 2022-01-10 11:58:42
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-01-10 12:08:21
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Heatmap } from '@components'
import { _ } from '@stores'
import { obc } from '@utils/decorators'

function BtnSubmit(props, { $, navigation }) {
  const styles = memoStyles()
  return (
    <View style={_.ml.sm}>
      <Button
        style={styles.btn}
        type='ghostPlain'
        size='sm'
        onPress={() => $.onSubmit(navigation)}
      >
        {$.isUser ? '前往' : '查询'}
      </Button>
      <Heatmap id='搜索.搜索' />
    </View>
  )
}

export default obc(BtnSubmit)

const memoStyles = _.memoStyles(() => ({
  btn: {
    width: _.r(68),
    height: _.r(34),
    borderRadius: _.r(34),
    overflow: 'hidden'
  }
}))
