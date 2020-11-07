/*
 * @Author: czy0729
 * @Date: 2020-10-28 15:10:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-11-07 17:37:27
 */
import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { SectionTitle, Cover } from '@screens/_'
import { _ } from '@stores'
import { t } from '@utils/fetch'
import { cnjp } from '@utils/app'
import { URL_DEFAULT_AVATAR } from '@constants'

function Catalog({ style }, { $, navigation }) {
  const { catalog } = $.subjectFormHTML
  let _catalog = catalog || []
  if ($.filterDefault || $.isLimit) {
    _catalog = _catalog.filter(
      item => !item.avatar.includes(URL_DEFAULT_AVATAR)
    )
  }
  if (!_catalog.length) {
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
                to: 'SubjectCatalogs',
                from: '目录',
                subjectId: $.subjectId
              })

              navigation.push('SubjectCatalogs', {
                subjectId: $.subjectId,
                name: cnjp($.cn, $.jp)
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
        目录
      </SectionTitle>
      <ScrollView
        style={{
          marginTop: _.md,
          marginBottom: -_.md
        }}
        contentContainerStyle={styles.contentContainerStyle}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {_catalog.map(item => (
          <Touchable
            key={item.id}
            style={styles.item}
            onPress={() => {
              t('条目.跳转', {
                to: 'CatalogDetail',
                from: '条目',
                subjectId: $.subjectId,
                catalogId: item.id
              })

              navigation.push('CatalogDetail', {
                catalogId: item.id
              })
            }}
          >
            <Flex>
              <Cover src={item.avatar} size={40} radius shadow type='目录' />
              <Flex.Item style={_.ml.md}>
                <Text size={12} bold numberOfLines={2}>
                  {item.title}
                  <Text style={_.mt.xs} size={10} lineHeight={12} type='sub'>
                    {' '}
                    {item.name}
                  </Text>
                </Text>
              </Flex.Item>
            </Flex>
          </Touchable>
        ))}
      </ScrollView>
    </View>
  )
}

Catalog.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Catalog)

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingTop: _.sm,
    paddingHorizontal: _.wind,
    paddingBottom: _.md + 4
  },
  item: {
    width: 120,
    marginRight: _.sm
  }
})
