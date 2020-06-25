/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-25 16:06:33
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { SectionTitle, Avatar, Stars } from '@screens/_'
import { _ } from '@stores'
import { URL_DEFAULT_AVATAR } from '@constants'

function Recent({ style }, { $, navigation }) {
  const { who } = $.subjectFormHTML
  let _who = who || []
  if ($.filterDefault || $.isLimit) {
    _who = _who.filter(item => !item.avatar.includes(URL_DEFAULT_AVATAR))
  }
  if (!_who.length) {
    return null
  }
  return (
    <View style={style}>
      <SectionTitle style={_.container.wind}>动态</SectionTitle>
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {_who.map(item => (
          <Flex key={item.userId} style={styles.item}>
            <Avatar
              navigation={navigation}
              userId={item.userId}
              name={item.name}
              src={item.avatar}
              event={{
                id: '条目.跳转',
                data: {
                  from: '用户动态',
                  subjectId: $.subjectId
                }
              }}
            />
            <View style={_.ml.sm}>
              <Flex>
                <Text size={13} bold>
                  {item.name}
                </Text>
                {!$.hideScore && (
                  <Stars style={_.ml.xs} value={item.star} simple />
                )}
              </Flex>
              <Text style={_.mt.xs} size={10} type='sub'>
                {item.status}
              </Text>
            </View>
          </Flex>
        ))}
      </ScrollView>
    </View>
  )
}

Recent.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Recent)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind
  },
  item: {
    paddingRight: _.sm
  }
})
