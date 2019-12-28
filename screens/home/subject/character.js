/*
 * @Author: czy0729
 * @Date: 2019-03-26 00:54:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-19 15:53:45
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Character({ style }, { $, navigation }) {
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
      _image: images.medium,
      name: nameCn || name,
      nameJP: name,
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
        onPress={({ id, name, nameJP, _image }) => {
          t('条目.跳转', {
            to: 'Mono',
            from: '角色',
            subjectId: $.subjectId
          })
          navigation.push('Mono', {
            monoId: `character/${id}`,
            _name: name,
            _jp: nameJP,
            _image
          })
        }}
      />
    </View>
  )
}

Character.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Character)
