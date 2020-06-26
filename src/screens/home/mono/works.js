/*
 * @Author: czy0729
 * @Date: 2019-06-02 23:19:35
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-26 16:52:31
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text } from '@components'
import { SectionTitle, Cover, Tag } from '@screens/_'
import { _ } from '@stores'
import { appNavigate, findSubjectCn } from '@utils/app'
import SectionRight from './section-right'

const event = {
  id: '人物.跳转',
  data: {
    from: '最近参与'
  }
}

function Works({ style }, { $, navigation }) {
  if (!$.works.length) {
    return null
  }

  const styles = memoStyles()
  return (
    <View style={[styles.container, style]}>
      <SectionTitle
        style={styles.section}
        right={<SectionRight event={event} text='更多作品' to='Works' />}
      >
        最近参与
      </SectionTitle>
      <View style={_.mt.md}>
        {$.works.map((item, index) => (
          <Flex
            key={item.href}
            style={[styles.item, index !== 0 && !_.flat && styles.border]}
            align='start'
          >
            <Cover
              size={40}
              src={item.cover}
              radius
              shadow
              onPress={() =>
                appNavigate(
                  item.href,
                  navigation,
                  {
                    _jp: item.name,
                    _cn: item.nameCn,
                    _image: item.cover
                  },
                  event
                )
              }
            />
            <Flex.Item style={_.ml.sm}>
              <Flex align='start'>
                <Flex.Item>
                  <Text bold size={12}>
                    {findSubjectCn(item.name)}
                  </Text>
                </Flex.Item>
                <Tag style={_.ml.sm} value={item.staff} />
              </Flex>
            </Flex.Item>
          </Flex>
        ))}
      </View>
    </View>
  )
}

Works.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Works)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingLeft: _.wind,
    paddingBottom: _.md
  },
  section: {
    paddingRight: _.wind - _._wind
  },
  item: {
    paddingVertical: _.md,
    paddingRight: _.wind
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: _.hairlineWidth
  }
}))
