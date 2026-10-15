/*
 * @Author: czy0729
 * @Date: 2025-06-10 17:43:36
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-15 12:00:00
 *
 * 无结果占位
 */
import { Flex, Text } from '@components'
import { _ } from '@stores'
import Pagination from '../pagination'
import { memoStyles } from './styles'

function Empty() {
  const styles = memoStyles()

  return (
    <>
      <Flex style={styles.container} direction='column' justify='center'>
        <Text style={_.mt.md} type='sub' size={16} bold>
          没有相关数据
        </Text>
      </Flex>

      <Pagination />
    </>
  )
}

export default Empty
