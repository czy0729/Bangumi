/*
 * @Author: czy0729
 * @Date: 2019-03-26 02:28:19
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-21 20:08:01
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Flex, Text, Iconfont } from '@components'
import { SectionTitle, HorizontalList } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'

function Staff({ style }, { $, navigation }) {
  if (!$.staff.length) {
    return null
  }

  return (
    <View style={style}>
      <SectionTitle
        style={_.container.wind}
        right={
          <Touchable
            onPress={() => {
              t('条目.跳转', {
                to: 'Persons',
                from: '制作人员',
                subjectId: $.subjectId
              })

              navigation.push('Persons', {
                subjectId: $.subjectId,
                name: $.cn
              })
            }}
          >
            <Flex>
              <Text type='sub'>更多</Text>
              <Iconfont name='right' size={16} />
            </Flex>
          </Touchable>
        }
      >
        制作人员
      </SectionTitle>
      <HorizontalList
        style={_.mt.sm}
        data={$.staff}
        quality={false}
        onPress={({ id, name, nameJP, _image }) => {
          t('条目.跳转', {
            to: 'Mono',
            from: '制作人员',
            subjectId: $.subjectId
          })
          navigation.push('Mono', {
            monoId: `person/${id}`,
            _name: name,
            _jp: nameJP,
            _image
          })
        }}
      />
    </View>
  )
}

Staff.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Staff)
