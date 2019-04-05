/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-04-02 14:10:50
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import { Characters } from '@screens/_'
import _ from '@styles'

const Character = ({ style }, { $ }) => {
  const { crt } = $.subject
  if (!crt) {
    return null
  }
  return (
    <View style={[_.container.wind, style]}>
      <Text size={20}>角色</Text>
      <Characters
        style={_.mt.md}
        data={crt.map(
          ({
            id,
            images,
            name,
            name_cn: nameCn,
            role_name: roleName,
            actors
          }) => ({
            id,
            image: images && images.grid,
            name: nameCn || name,
            desc: (actors && actors[0] && actors[0].name) || roleName
          })
        )}
      />
    </View>
  )
}

Character.contextTypes = {
  $: PropTypes.object
}

export default observer(Character)
