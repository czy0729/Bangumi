/*
 * @Author: czy0729
 * @Date: 2019-11-17 12:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-19 17:51:50
 */
import React from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Image, Iconfont, Touchable } from '@components'
import { _ } from '@stores'
import { formatNumber, toFixed } from '@utils'
import { observer } from '@utils/decorators'
import { tinygrailOSS, getCoverLarge } from '@utils/app'
import { t } from '@utils/fetch'

const maxSize = _.window.width / 3

function Info(props, { $, navigation }) {
  const styles = memoStyles()
  const { showCover } = $.state
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
  let color = 'tinygrailPlain'
  if (fluctuation < 0) {
    color = 'ask'
  } else if (fluctuation > 0) {
    color = 'bid'
  }

  let fluctuationText = '-%'
  if (fluctuation > 0) {
    fluctuationText = `+${toFixed(fluctuation, 2)}%`
  } else if (fluctuation < 0) {
    fluctuationText = `${toFixed(fluctuation, 2)}%`
  }

  return (
    <View style={styles.container}>
      {showCover && !!icon && (
        <Flex justify='center'>
          <Image
            style={styles.image}
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
      <Flex style={showCover && _.mt.md} justify='center'>
        <Touchable
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
            <Text type='tinygrailPlain' size={16}>
              #{id} - {name}
              {!!bonus && (
                <Text type='warning' size={16}>
                  {' '}
                  x{bonus}
                </Text>
              )}
              <Text type='ask' size={16}>
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
        <Touchable style={_.ml.md} onPress={$.toggleCover}>
          <Text type='tinygrailText' size={16}>
            [{showCover ? '隐藏' : '显示'}封面]
          </Text>
        </Touchable>
      </Flex>
      <Flex
        style={[_.container.wind, _.mt.md]}
        justify='center'
        align='baseline'
      >
        <Text type='tinygrailText' align='center'>
          市值{formatNumber(marketValue, 0)} / 量{formatNumber(total, 0)} /
          发行价 ₵{toFixed($.issuePrice, 1)} /{' '}
          <Text type='tinygrailPlain'>₵{current && toFixed(current, 2)}</Text>
          <Text type={color} align='center'>
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

const memoStyles = _.memoStyles(_ => ({
  image: {
    backgroundColor: _.tSelect(_._colorDarkModeLevel2, _.colorTinygrailBg)
  },
  container: {
    paddingVertical: _.space,
    paddingHorizontal: _.wind
  }
}))
