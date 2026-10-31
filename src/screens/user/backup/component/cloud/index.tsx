/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 04:03:41
 *
 * 导出入口与导出列开关
 */
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { CSV_HEADS } from '../../ds'
import Btn from './btn'
import { COLOR_SUCCESS, COMPONENT } from './ds'
import { memoStyles } from './styles'

import type { Ctx } from '../../types'

function Cloud() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const styles = memoStyles()
  const includeColumnsSet = $.includeColumnsSet

  return (
    <View style={styles.cloud}>
      <Flex wrap='wrap' style={styles.btns}>
        <Btn
          title='保存为 CSV'
          info={`已获取 ${$.data.length} 个收藏`}
          onPress={() => $.onExportLocal('csv')}
        />
        <Btn
          title='保存为 JSON'
          info={`已获取 ${$.data.length} 个收藏`}
          onPress={() => $.onExportLocal('json')}
        />
        <Btn
          title='导入 CSV'
          info='导入后进行同步'
          onPress={() => {
            confirm('导入收藏同步功能目前已不作维护，仍要尝试使用？', $.onToggleUpload)
          }}
        />
      </Flex>
      <Flex style={_.mt.sm} wrap='wrap'>
        <Text size={11} bold>
          导出列包含：
        </Text>
        {CSV_HEADS.map(head => {
          const selected = includeColumnsSet.has(head)
          return (
            <Touchable key={head} style={styles.head} onPress={() => $.onToggleColumn(head)}>
              <Flex>
                <Iconfont
                  name={selected ? 'md-check-circle' : 'md-radio-button-off'}
                  size={15}
                  color={selected ? COLOR_SUCCESS : undefined}
                />
                <Text style={_.ml.xs} size={11} bold type={selected ? 'desc' : 'sub'}>
                  {head}
                </Text>
              </Flex>
            </Touchable>
          )
        })}
      </Flex>
    </View>
  )
}

export default observer(Cloud)
