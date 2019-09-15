/*
 * @Author: czy0729
 * @Date: 2019-09-15 10:54:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-09-15 13:03:00
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { Flex, Text, Touchable, Iconfont } from '@components'
import { observer } from '@utils/decorators'
import _ from '@styles'
import { colorBorder, colorPlain } from '../styles'

const sectionWidth = (_.window.width - _.wind * 3) / 2 - 1
const sectionHeight = sectionWidth / 2

function MenuItem({ style, pathname, config, title, icon }, { navigation }) {
  return (
    <Touchable onPress={() => navigation.push(pathname, config)}>
      <Flex style={[styles.block, style]}>
        <Text
          style={{
            color: colorPlain
          }}
          size={20}
          bold
        >
          {title}
        </Text>
        <Iconfont style={styles.icon} name={icon} size={64} />
      </Flex>
    </Touchable>
  )
}

MenuItem.contextTypes = {
  navigation: PropTypes.object
}

export default observer(MenuItem)

const styles = StyleSheet.create({
  block: {
    width: sectionWidth,
    height: sectionHeight,
    paddingLeft: 24,
    marginRight: _.wind,
    marginBottom: _.wind,
    backgroundColor: colorBorder,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: -16,
    marginTop: -32,
    opacity: 0.16
  }
})
