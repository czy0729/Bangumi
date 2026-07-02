/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:32
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 02:33:09
 */
import React from 'react'
import { View } from 'react-native'
import { observer } from 'mobx-react'
import { Flex, Iconfont, Text, Touchable } from '@components'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { CSV_HEADS } from '../../ds'
import { COLOR_SUCCESS, COMPONENT } from './ds'
import { styles } from './styles'

import type { Ctx } from '../../types'
function Cloud() {
  const { $ } = useStore<Ctx>(COMPONENT)

  const { includeColumns } = $.state

  const Btn = ({ title, info, onPress }: { title: string; info: string; onPress: () => void }) => (
    <Touchable style={styles.btn} onPress={onPress}>
      <Flex direction='column' align='start'>
        <Text size={12} bold>
          {title}
        </Text>
        <Text style={_.mt.xs} type='sub' size={10}>
          {info}
        </Text>
      </Flex>
    </Touchable>
  )

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
        <Text size={12} bold>
          导出列包含：
        </Text>
        {CSV_HEADS.map(head => {
          const selected = includeColumns.includes(head)
          return (
            <Touchable key={head} style={styles.head} onPress={() => $.onToggleColumn(head)}>
              <Flex>
                <Iconfont
                  name={selected ? 'md-check-circle' : 'md-radio-button-off'}
                  size={16}
                  color={selected ? COLOR_SUCCESS : undefined}
                />
                <Text style={_.ml.xs} size={12} bold type={selected ? 'desc' : 'sub'}>
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
