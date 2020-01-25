/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-25 14:33:47
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'

const maxSize = _.window.width / 3

function Info(props, { $, navigation }) {
  const {
    icon,
    id,
    name,
    bonus,
    marketValue,
    current,
    total,
    level,
    fluctuation
  } = $.chara
  let color = _.colorTinygrailPlain
  if (fluctuation < 0) {
    color = _.colorAsk
  } else if (fluctuation > 0) {
    color = _.colorBid
  }

  let fluctuationText = '-%'
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  }

  return (
    <View style={styles.container}>
      {!!icon && (
        <Flex justify='center'>
          <Image
            src={tinygrailOSS(getCoverLarge(icon))}
            autoSize={maxSize}
            shadow
            placholder={false}
            imageViewer
            imageViewerSrc={tinygrailOSS(getCoverLarge(icon), 480)}
            event={{
              id: '资产重组.封面图查看',
              data: {
                monoId: $.monoId
              }
            }}
          />
        </Flex>
      )}
      <Touchable
        style={_.mt.md}
        onPress={() => {
          t('资产重组.跳转', {
            to: 'Mono',
            from: '顶部',
            monoId: $.monoId
          })

          navigation.push('Mono', {
            monoId: `character/${id}`
          })
        }}
      >
        <Flex justify='center'>
          <Text
            style={{
              color: _.colorTinygrailPlain
            }}
            size={16}
          >
            #{id} - {name}
            {!!bonus && (
              <Text size={16} type='warning'>
                {' '}
                X{bonus}
              </Text>
            )}
            <Text
              style={{
                color: _.colorAsk
              }}
              size={16}
            >
              {' '}
              lv{level}
            </Text>
          </Text>
          <Iconfont
            style={_.ml.sm}
            name='right'
            size={16}
            color={_.colorTinygrailText}
          />
        </Flex>
      </Touchable>
      <Flex
        style={[_.container.wind, _.mt.md]}
        justify='center'
        align='baseline'
      >
        <Text
          style={{
            color: _.colorTinygrailText
          }}
          align='center'
        >
          市值{formatNumber(marketValue, 0)} / 量{formatNumber(total, 0)} /
          发行价 ₵{toFixed($.issuePrice, 1)} /{' '}
          <Text
            style={{
              color: _.colorTinygrailPlain
            }}
          >
            ₵{current && toFixed(current, 2)}
          </Text>
          <Text
            style={{
              color
            }}
            align='center'
          >
            {' '}
            {fluctuationText}
          </Text>
        </Text>
      </Flex>
    </View>
  )
}

Info.contextTypes = {
  $: PropTypes.object,
  navigation: PropTypes.object
}

export default observer(Info)

const styles = StyleSheet.create({
  container: {
    padding: _.wind
  }
})
