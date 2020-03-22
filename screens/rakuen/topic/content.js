/*
 * @Author: czy0729
 * @Date: 2020-03-19 00:38:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-03-21 23:20:02
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, RenderHtml, Loading, Text } from '@components'
import { IconTouchable } from '@screens/_'
import { _ } from '@stores'
import { appNavigate } from '@utils/app'

function Content(props, { $, navigation }) {
  const event = {
    id: '帖子.跳转',
    data: {
      from: '#1',
      topicId: $.topicId
    }
  }

  const { translateResult } = $.state
  const isGroup = $.topicId.includes('group/')
  return (
    <View style={styles.html}>
      {isGroup && !$.html && (
        <Flex style={styles.loading} justify='center'>
          <Loading />
        </Flex>
      )}
      {translateResult.length ? (
        <View>
          {translateResult.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <View key={index}>
              <Text style={_.mt.md} size={13} type='sub'>
                {item.src}
              </Text>
              <Text style={_.mt.xs} size={15}>
                {item.dst}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        !!$.html && (
          <>
            {$.isEp && (
              <IconTouchable
                style={styles.iconTranslate}
                name='translate'
                size={18}
                onPress={$.doTranslate}
              />
            )}
            <RenderHtml
              style={_.mt.md}
              html={$.html}
              onLinkPress={href => appNavigate(href, navigation, {}, event)}
            />
          </>
        )
      )}
    </View>
  )
}

Content.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Content)

const styles = StyleSheet.create({
  html: {
    minHeight: 120
  },
  loading: {
    height: 120
  },
  iconTranslate: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0
  }
})
