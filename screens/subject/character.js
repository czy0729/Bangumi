/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-05-21 17:28:38
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import _ from '@styles'

const Character = ({ style }, { $, navigation }) => {
  const { crt = [] } = $.subject
  if (!crt.length) {
    return null
  }

  const data = crt.map(
    ({
      id,
      images = {},
      name,
      name_cn: nameCn,
      role_name: roleName,
      actors = []
    }) => ({
      id,
      image: images.grid,
      name: nameCn || name,
      desc: (actors[0] && actors[0].name) || roleName
    })
  )
  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>角色</SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={data}
        quality={false}
        onPress={id =>
          navigation.push('Mono', {
            monoId: `character/${id}`
          })
        }
      />
    </View>
  )
}

Character.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Character)
