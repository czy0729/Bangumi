/*
 * @Author: czy0729
 * @Date: 2019-04-26 15:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-28 19:54:21
 */
import React from 'react'
import { Touchable, Image } from '@components'

const IconSearch = ({ style, navigation }) => (
  <Touchable style={style}>
    <Image
      style={{ marginLeft: 12 }}
      size={22}
      placeholder={false}
      src={require('@assets/images/icon/search.png')}
    />
  </Touchable>
)

export default IconSearch
