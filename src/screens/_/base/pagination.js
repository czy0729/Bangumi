/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-03-18 11:51:58
 */
import React from 'react'
import { Touchable, Flex, Input, Heatmap, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'

export const Pagination = ob(
  ({
    style,
    input,
    heatmaps = {},
    onPrev = Function.prototype,
    onNext = Function.prototype,
    onChange = Function.prototype,
    onSearch = Function.prototype
  }) => {
    const styles = memoStyles()
    return (
      <Flex style={[styles.container, style]}>
        <Flex.Item>
          <Touchable onPress={onPrev}>
            <Flex style={styles.pagination} justify='center'>
              <Iconfont
                name='md-navigate-before'
                size={22}
                color={_.colorDesc}
              />
            </Flex>
            {!!heatmaps.prev && <Heatmap id={heatmaps.prev} />}
          </Touchable>
        </Flex.Item>
        <Flex.Item style={_.ml.sm}>
          <Input
            style={styles.input}
            value={input}
            keyboardType='number-pad'
            placeholder='页'
            returnKeyType='search'
            returnKeyLabel='跳转'
            onChange={onChange}
            onSubmitEditing={onSearch}
          />
          {!!heatmaps.search && <Heatmap id={heatmaps.search} />}
        </Flex.Item>
        <Flex.Item style={_.ml.sm}>
          <Touchable onPress={onNext}>
            <Flex style={styles.pagination} justify='center'>
              <Iconfont name='md-navigate-next' size={22} color={_.colorDesc} />
            </Flex>
            {!!heatmaps.next && <Heatmap id={heatmaps.next} />}
          </Touchable>
        </Flex.Item>
      </Flex>
    )
  }
)

const memoStyles = _.memoStyles(_ => ({
  container: {
    marginHorizontal: _.wind
  },
  pagination: {
    height: 30
  },
  input: {
    height: 30,
    ..._.fontSize14,
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0
  }
}))
