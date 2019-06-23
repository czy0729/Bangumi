/*
 * @Author: czy0729
 * @Date: 2019-05-21 04:14:14
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-06-23 11:42:29
 */
import React from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text } from '@components'
import { Avatar } from '@screens/_'
import { inject, withHeader, observer } from '@utils/decorators'
import { appNavigate } from '@utils/app'
import { analysis } from '@utils/fetch'
import _ from '@styles'
import Store from './store'

const title = '电波提醒'

export default
@inject(Store)
@withHeader()
@observer
class Notify extends React.Component {
  static navigationOptions = {
    title
  }

  static contextTypes = {
    $: PropTypes.object,
    navigation: PropTypes.object
  }

  async componentDidMount() {
    const { $ } = this.context
    await $.init()
    $.doClearNotify()

    analysis('notify/all', title)
  }

  render() {
    const { $, navigation } = this.context
    return (
      <ScrollView style={_.container.screen}>
        {$.notify.list.map((item, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Flex key={index} style={styles.container} align='start'>
            <Avatar
              style={styles.image}
              navigation={navigation}
              src={item.avatar}
              userId={item.userId}
            />
            <Flex.Item style={[styles.item, !!index && styles.border, _.ml.sm]}>
              <Text size={13}>{item.userName}</Text>
              <Text style={_.mt.sm} size={15}>
                {item.message}
                <Text
                  type='main'
                  size={15}
                  onPress={() => appNavigate(item.href, navigation)}
                >
                  {' '}
                  {item.title}{' '}
                </Text>
                {item.message2}
              </Text>
            </Flex.Item>
          </Flex>
        ))}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  }
})
