/*
 * @Author: czy0729
 * @Date: 2019-07-13 20:58:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-01-13 22:09:27
 */
import React from 'react'
import { observer } from 'mobx-react'
import { Touchable, Flex, Input, Heatmap, Iconfont } from '@components'
import { _ } from '@stores'

function Pagination({
  style,
  input,
  heatmaps,
  onPrev,
  onNext,
  onChange,
  onSearch
}) {
  const styles = memoStyles()
  return (
    <Flex style={[styles.container, style]}>
      <Flex.Item>
        <Touchable onPress={onPrev}>
          <Flex style={styles.pagination} justify='center'>
            <Iconfont name='arrow-left' size={18} color={_.colorDesc} />
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
            <Iconfont
              style={styles.right}
              name='arrow-left'
              size={18}
              color={_.colorDesc}
            />
          </Flex>
          {!!heatmaps.next && <Heatmap id={heatmaps.next} />}
        </Touchable>
      </Flex.Item>
    </Flex>
  )
}

Pagination.defaultProps = {
  heatmaps: {},
  onPrev: Function.prototype,
  onNext: Function.prototype,
  onChange: Function.prototype,
  onSearch: Function.prototype
}

export default observer(Pagination)

const memoStyles = _.memoStyles(_ => ({
  container: {
    marginHorizontal: _.wind
  },
  pagination: {
    height: 30
  },
  input: {
    height: 30,
    ..._.fontSize(13),
    textAlign: 'center',
    backgroundColor: 'transparent',
    borderWidth: 0
  },
  right: {
    transform: [
      {
        rotate: '180deg'
      }
    ]
  }
}))
