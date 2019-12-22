/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:06:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-22 18:08:37
 */
import React from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { _ } from '@stores'
import { formatNumber } from '@utils'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'
import ItemTemple from '../_/item-temple'

function Temples({ style }, { $ }) {
  const { expand } = $.state
  const { rate } = $.chara
  const { list } = $.charaTemple
  const { amount } = $.userLogs

  const levelMap = {
    1: 0,
    2: 0,
    3: 0,
    4: 0
  }
  list.forEach(item => {
    const { level } = item
    if (!levelMap[level]) {
      levelMap[level] = 1
    } else {
      levelMap[level] += 1
    }
  })

  const event = {
    id: '资产重组.圣殿图查看'
  }
  return (
    <View style={style}>
      <Flex style={styles.info}>
        <Flex.Item>
          <Text
            style={{
              color: _.colorTinygrailText
            }}
            size={14}
          >
            固定资产{list.length || '-'}{' '}
            {!!list.length &&
              `(${levelMap[3]} + ${levelMap[2]} + ${levelMap[1]})`}{' '}
            /{' '}
            <Text size={18} lineHeight={14} type='warning'>
              +{rate ? formatNumber(rate) : '-'}
            </Text>
          </Text>
        </Flex.Item>
        <Touchable
          style={{
            padding: _.sm
          }}
          onPress={() => {
            t('资产重组.股息查看', {
              monoId: $.monoId
            })

            Alert.alert(
              '小圣杯助手',
              `角色每股每周派息 ₵${rate}，您拥有 ${amount} 股，税前派息 ₵${amount *
                rate}`,
              [
                {
                  text: '确定'
                }
              ]
            )
          }}
        >
          <Iconfont size={16} name='information' color={_.colorTinygrailText} />
        </Touchable>
      </Flex>
      <Flex wrap='wrap'>
        {list
          // 自己的排最前
          .sort((a, b) => (b.name === $.hash ? 1 : 0))
          .filter((item, index) => (expand ? true : index < 6))
          .map(item => (
            <ItemTemple
              key={item.nickname}
              cover={item.cover}
              avatar={item.avatar}
              name={item.name}
              nickname={item.nickname}
              sacrifices={item.sacrifices}
              level={item.level}
              event={event}
            />
          ))}
      </Flex>
      {list.length > 6 && (
        <Text
          style={styles.expand}
          size={14}
          type='warning'
          align='center'
          onPress={$.toggleExpand}
        >
          - {expand ? '收起' : '展开'} -
        </Text>
      )}
    </View>
  )
}

Temples.contextTypes = {
  $: PropTypes.object
}

export default observer(Temples)

const styles = StyleSheet.create({
  info: {
    paddingTop: _.md,
    paddingLeft: _.wind,
    paddingRight: _.wind - _.sm
  },
  expand: {
    paddingVertical: _.md
  }
})
