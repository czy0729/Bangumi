/*
 * @Author: czy0729
 * @Date: 2019-04-26 15:32:31
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-18 00:31:11
 */
import React from 'react'
import { Touchable, Iconfont } from '@components'
import _ from '@styles'

const IconSearch = ({ style, navigation }) => (
  <Touchable style={style} onPress={() => navigation.push('Search')}>
    <Iconfont name='search' color={_.colorTitle} size={24} />
  </Touchable>
)

export default IconSearch
