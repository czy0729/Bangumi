/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-11-17 14:10:02
 */
import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import ItemTemple from '../_/item-temple'
import { colorText } from '../styles'

function Temples({ style }, { $ }) {
  const { expand } = $.state
  const { rate } = $.chara
  const { list } = $.charaTemple
  const { amount } = $.userLogs
  return (
    <View style={[styles.container, style]}>
      <Flex style={styles.info}>
        <Flex.Item>
          <Text
            style={{
              color: colorText
            }}
            size={14}
          >
            固定资产 {list.length || '-'} /{' '}
            <Text size={18} lineHeight={14} type='warning'>
              +{rate || '-'}
            </Text>
          </Text>
        </Flex.Item>
        <Touchable
          style={{
            padding: _.sm
          }}
          onPress={() =>
            Alert.alert(
              '小圣杯助手',
              `角色每股每周派息 ₵${rate}，您拥有 ${amount} 股，税前派息 ₵${amount *
                rate}`,
              {
                text: '确定'
              }
            )
          }
        >
          <Iconfont size={16} name='information' color={colorText} />
        </Touchable>
      </Flex>
      <Flex wrap='wrap'>
        {list
          // 自己的排最前
          .sort((a, b) => (b.name === $.hash ? 1 : 0))
          .filter((item, index) => (expand ? true : index < 6))
          .map(item => (
            <ItemTemple
              key={item.id}
              cover={item.cover}
              avatar={item.avatar}
              name={item.name}
              nickname={item.nickname}
              sacrifices={item.sacrifices}
              level={item.level}
            />
          ))}
      </Flex>
      <Text
        style={styles.expand}
        size={14}
        type='warning'
        align='center'
        onPress={$.toggleExpand}
      >
        - {expand ? '收起' : '展开'} -
      </Text>
    </View>
  )
}

Temples.contextTypes = {
  $: PropTypes.object
}

export default observer(Temples)

const styles = StyleSheet.create({
  container: {
    paddingBottom: _.bottom
  },
  info: {
    paddingTop: _.md,
    paddingLeft: _.wind,
    paddingRight: _.wind - _.sm
  },
  expand: {
    paddingVertical: _.sm
  }
})
