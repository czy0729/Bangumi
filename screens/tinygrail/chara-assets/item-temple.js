/*
 * @Author: czy0729
 * @Date: 2019-10-05 16:22:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-10-05 16:34:28
 */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Touchable, Text, Image } from '@components'
import { HTMLDecode } from '@utils/html'
import { tinygrailOSS } from '@utils/app'
import { info } from '@utils/ui'
import _ from '@styles'
import { colorText } from '../styles'

const imageWidth = _.window.width * 0.24
const marginLeft = (_.window.width - 3 * imageWidth) / 4

function ItemTemple({ cover, name, sacrifices }) {
  return (
    <View style={styles.item}>
      <Image
        size={imageWidth}
        height={imageWidth * 1.28}
        src={tinygrailOSS(cover)}
        radius
        onPress={() => info('开发中')}
      />
      <Touchable style={_.mt.sm} withoutFeedback onPress={() => info('开发中')}>
        <Text type='plain' numberOfLines={2} align='center'>
          {HTMLDecode(name)}
        </Text>
        <Text
          style={[
            _.mt.xs,
            {
              color: colorText
            }
          ]}
          align='center'
        >
          {sacrifices}
        </Text>
      </Touchable>
    </View>
  )
}

ItemTemple.contextTypes = {
  $: PropTypes.object
}

export default observer(ItemTemple)

const styles = StyleSheet.create({
  item: {
    width: imageWidth,
    marginTop: _.lg,
    marginLeft
  }
})
