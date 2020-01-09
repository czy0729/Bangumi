/*
 * @Author: czy0729
 * @Date: 2019-10-02 02:57:39
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-04 15:37:04
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Touchable, Text, Iconfont, Image } from '@components'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { info } from '@utils/ui'
import { t } from '@utils/fetch'

function Menu(props, { $, navigation }) {
  const styles = memoStyles()
  const { username, id } = $.userInfo
  return (
    <Flex style={styles.container} wrap='wrap'>
      <Touchable
        onPress={() => {
          t('发现.跳转', {
            to: 'Rank'
          })
          navigation.push('Rank')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='shou-fu' size={28} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              排行榜
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          t('发现.索引', {
            to: 'Browser'
          })
          navigation.push('Browser')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='menu' size={28} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              索引
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          t('发现.跳转', {
            to: 'Calendar'
          })
          navigation.push('Calendar')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='calendar' size={24} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              每日放送
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          t('发现.跳转', {
            to: 'Random'
          })
          navigation.push('Random')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='xin-fan' size={28} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              随便看看
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          t('发现.跳转', {
            to: 'Anitama'
          })
          navigation.push('Anitama')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Image
                src={require('@assets/images/anitama.jpg')}
                size={32}
                radius={16}
                placeholder={false}
                quality={false}
              />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              Anitama
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          t('发现.跳转', {
            to: 'Tags'
          })
          navigation.push('Tags')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='paihang' size={28} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              标签
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          t('发现.跳转', {
            to: 'Catalog'
          })
          navigation.push('Catalog')
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='bag' size={28} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              目录
            </Text>
          </Flex>
        </Flex>
      </Touchable>
      <Touchable
        onPress={() => {
          if (!username && !id) {
            info('请先登陆')
            return
          }

          t('发现.跳转', {
            to: 'Character'
          })
          navigation.push('Character', {
            userName: username || id
          })
        }}
      >
        <Flex style={styles.wrap} justify='center'>
          <Flex style={styles.item} direction='column'>
            <View style={styles.border} />
            <Flex style={styles.icon} justify='center'>
              <Iconfont name='like' size={28} color={_.__colorPlain__} />
            </Flex>
            <Text style={_.mt.sm} size={12}>
              我的人物
            </Text>
          </Flex>
        </Flex>
      </Touchable>
    </Flex>
  )
}

Menu.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Menu)

const memoStyles = _.memoStyles(_ => ({
  container: {
    paddingHorizontal: _.wind
  },
  wrap: {
    width: (_.window.width - 2 * _.wind) * 0.249,
    marginTop: _.md
  },
  item: {
    width: 56
  },
  icon: {
    width: 56,
    height: 56,
    backgroundColor: _.select(_.colorDark, _._colorDarkModeLevel1),
    borderRadius: 56
  },
  border: {
    position: 'absolute',
    zIndex: 0,
    top: 0,
    right: 0,
    width: 56,
    height: 56,
    marginTop: 1,
    marginRight: -2,
    backgroundColor: _.colorDanger,
    borderRadius: 56
  }
}))
