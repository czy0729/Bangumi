/*
 * @Author: czy0729
 * @Date: 2019-05-08 20:23:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-29 05:31:34
 */
import React from 'react'
import { Touchable, Iconfont, Flex } from '@components'
import { _ } from '@stores'
import { stl } from '@utils'
import ob from '../ob'

function IconBack({ style, navigation, color }) {
  return (
    <Touchable style={stl(styles.touch, style)} onPress={navigation.goBack}>
      <Flex style={styles.container} justify='center'>
        <Iconfont name='md-arrow-back' color={color} />
      </Flex>
    </Touchable>
  )
}

export default ob(IconBack, {
  color: _.colorPlain
})

const styles = _.create({
  touch: {
    marginLeft: _.ios(0, _.xs),
    borderRadius: 20,
    overflow: 'hidden'
  },
  container: {
    width: 40,
    height: 40
  }
})
