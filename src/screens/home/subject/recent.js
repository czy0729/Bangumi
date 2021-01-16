/*
 * @Author: czy0729
 * @Date: 2019-08-24 01:29:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-17 01:23:33
 */
import React from 'react'
import { ScrollView, View } from 'react-native'
import { Flex, Text, Heatmap } from '@components'
import { SectionTitle, Avatar, Stars } from '@screens/_'
import { _, systemStore } from '@stores'
import { obc } from '@utils/decorators'
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

  const { showRecent } = systemStore.setting
  return (
    <View style={[style, !showRecent && _.short]}>
      <SectionTitle
        style={_.container.wind}
        icon={!showRecent && 'right'}
        onPress={() => $.switchBlock('showRecent')}
      >
        动态
      </SectionTitle>
      {showRecent && (
        <>
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
          <Heatmap
            id='条目.跳转'
            data={{
              from: '用户动态'
            }}
          />
        </>
      )}
    </View>
  )
}

export default obc(Recent)

const styles = _.create({
  contentContainerStyle: {
    paddingHorizontal: _.wind
  },
  item: {
    paddingRight: _.sm
  }
})
