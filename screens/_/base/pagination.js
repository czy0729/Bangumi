/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-24 02:51:09
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import { Touchable, Text, Flex, Input } from '@components'
import _ from '@styles'

const Pagination = ({ style, input, onPrev, onNext, onChange, onSearch }) => (
  <Flex style={[_.container.wind, style]}>
    <Flex.Item>
      <Touchable highlight onPress={onPrev}>
        <Flex style={styles.pagination} justify='center'>
          <Text>上一页</Text>
        </Flex>
      </Touchable>
    </Flex.Item>
    <Flex.Item style={_.ml.sm}>
      <Input
        style={styles.input}
        value={input}
        keyboardType='number-pad'
        placeholder='页'
        returnKeyType='search'
        onChange={onChange}
        onSubmitEditing={onSearch}
      />
    </Flex.Item>
    <Flex.Item style={_.ml.sm}>
      <Touchable highlight onPress={onNext}>
        <Flex style={styles.pagination} justify='center'>
          <Text>下一页</Text>
        </Flex>
      </Touchable>
    </Flex.Item>
  </Flex>
)

Pagination.defaultProps = {
  onPrev: Function.prototype,
  onNext: Function.prototype,
  onChange: Function.prototype,
  onSearch: Function.prototype
}

export default Pagination

const styles = StyleSheet.create({
  pagination: {
    height: 34,
    backgroundColor: _.colorPlain,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: _.colorBorder,
    borderRadius: _.radiusXs
  },
  input: {
    height: 34,
    textAlign: 'center'
  }
})
