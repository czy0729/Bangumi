/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-02 15:35:05
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { SectionTitle, Avatar, Stars } from '@screens/_'
import { _ } from '@stores'

function Recent({ style }, { $, navigation }) {
  const { who } = $.subjectFormHTML
  if (!who || !who.length) {
    return null
  }
  return (
    <View style={[styles.container, style]}>
      <SectionTitle style={_.container.wind}>用户动态</SectionTitle>
      <ScrollView
        style={_.mt.md}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {who.map(item => (
          <Flex key={item.userId} style={styles.item}>
            <Avatar
              navigation={navigation}
              userId={item.userId}
              src={item.avatar}
              size={40}
            />
            <View style={_.ml.sm}>
              <Flex>
                <Text size={12}>{item.name}</Text>
                <Stars style={_.ml.xs} value={item.star} />
              </Flex>
              <Text style={_.mt.xs} size={12} type='sub'>
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
    paddingRight: _.wind
  }
})
