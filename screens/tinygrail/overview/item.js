/*
 * @Author: czy0729
 * @Date: 2019-08-25 19:51:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-14 05:06:57
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Flex, Text, Touchable } from '@components'
import { Avatar, StockPreview } from '@screens/_'
import { open } from '@utils'
import { formatTime } from '@utils/app'
import { HOST } from '@constants'
import _ from '@styles'

let timezone = new Date().getTimezoneOffset() / -60
if (String(timezone).length === 1) {
  timezone = `0${timezone}`
}

function Item(props, { navigation }) {
  const {
    index,
    id,
    name,
    icon,
    lastOrder,
    end,
    marketValue,
    total,
    users,
    bonus
  } = props
  const isTop = index === 0
  const isICO = !!users

  let marketValueText
  let totalText
  if (marketValue > 100000000) {
    marketValueText = `${(marketValue / 100000000).toFixed(1)}亿`
  } else if (marketValue > 1000) {
    marketValueText = `${(marketValue / 10000).toFixed(1)}万`
  }
  if (total > 1000) {
    totalText = `${(total / 10000).toFixed(1)}万`
  }

  let _end = end
  if (!String(_end).includes('+')) {
    _end = `${end}+${timezone}:00`
  }
  const extra = isICO
    ? `${formatTime(_end)} / ₵${totalText} / ${users}人`
    : `${formatTime(lastOrder)} / ₵${marketValueText} / ${totalText}`

  return (
    <View style={styles.container}>
      <Flex align='start'>
        <View>
          <Avatar
            style={styles.image}
            src={icon}
            size={44}
            onPress={() =>
              navigation.push('Mono', {
                monoId: `character/${id}`
              })
            }
          />
          {!!bonus && (
            <Flex style={styles.bonus} justify='center'>
              <Text size={12} type='plain'>
                {bonus}
              </Text>
            </Flex>
          )}
        </View>
        <Flex.Item style={!isTop && styles.border}>
          <Flex align='start'>
            <Flex.Item style={_.mr.sm}>
              <Touchable
                style={styles.item}
                highlight
                onPress={() => {
                  if (users) {
                    open(`${HOST}/character/${id}`)
                  } else {
                    navigation.push('TinygrailTrade', {
                      monoId: `character/${id}`
                    })
                  }
                }}
              >
                <Flex align='start'>
                  <Flex.Item>
                    <Text size={16}>
                      {index + 1}. {name}
                    </Text>
                    <Text style={_.mt.sm} type='sub' size={12}>
                      {extra}
                    </Text>
                  </Flex.Item>
                </Flex>
              </Touchable>
            </Flex.Item>
            <StockPreview style={_.mr.sm} {...props} _loaded />
          </Flex>
        </Flex.Item>
      </Flex>
    </View>
  )
}

Item.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Item)

const styles = StyleSheet.create({
  container: {
    paddingLeft: _.wind,
    backgroundColor: _.colorPlain
  },
  image: {
    marginRight: _.xs,
    marginTop: _.md
  },
  item: {
    paddingVertical: _.md,
    paddingLeft: _.sm
  },
  border: {
    borderTopColor: _.colorBorder,
    borderTopWidth: StyleSheet.hairlineWidth
  },
  bonus: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    right: 2,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: _.colorWarning,
    overflow: 'hidden'
  }
})
