/*
 * @Author: czy0729
 * @Date: 2024-11-02 08:08:40
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-11-17 08:18:59
 */
import React from 'react'
import { View } from 'react-native'
import { Flex, Loading, Text } from '@components'
import { IconTouchable, Popover } from '@_'
import { _, useStore } from '@stores'
import { confirm } from '@utils'
import { ob } from '@utils/decorators'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { CUT_TYPE, METAS } from '../../ds'
import { Ctx } from '../../types'
import { COMPONENT, SUBJECT_TYPE_DS } from './ds'
import { styles } from './styles'

function Filter() {
  const { $ } = useStore<Ctx>()
  if (!$.userId) return null

  const positions = ['全部职位', ...$.positions]
  const elSplit = (
    <Text style={styles.split} type='__plain__' size={13} bold>
      ·
    </Text>
  )

  const years = ['收藏时间', ...$.years]
  return (
    <Flex style={styles.container} justify='center'>
      <Popover data={SUBJECT_TYPE_DS} onSelect={$.selectSubjectType}>
        <Flex style={styles.item}>
          <Text type='__plain__' size={13} bold>
            {MODEL_SUBJECT_TYPE.getTitle($.state.subjectType)}
          </Text>
          {$.state.fetchingCollections && (
            <View style={styles.loading}>
              <Loading.Mini />
            </View>
          )}
        </Flex>
      </Popover>
      {elSplit}
      <Popover data={CUT_TYPE} onSelect={$.selectCutType}>
        <View style={styles.item}>
          <Text type='__plain__' size={13} bold>
            {$.state.cutType}
          </Text>
        </View>
      </Popover>
      {$.state.cutType === '标签' ? (
        <>
          {elSplit}
          <Popover data={METAS} onSelect={$.selectSubCutType}>
            <View style={styles.item}>
              <Text type='__plain__' size={13} bold>
                {$.state.subCutType || METAS[0]}
              </Text>
            </View>
          </Popover>
        </>
      ) : (
        positions.length > 1 && (
          <>
            {elSplit}
            <Popover data={positions} onSelect={$.selectSubCutType}>
              <View style={styles.item}>
                <Text type='__plain__' size={13} bold>
                  {$.state.subCutType || positions[0]}
                </Text>
              </View>
            </Popover>
          </>
        )
      )}
      {years.length > 1 && (
        <>
          {elSplit}
          <Popover data={years} onSelect={$.selectYear}>
            <View style={styles.item}>
              <Text type='__plain__' size={13} bold>
                {$.state.year || years[0]}
              </Text>
            </View>
          </Popover>
        </>
      )}
      {!$.state.fetchingCollections && (
        <IconTouchable
          style={[_.ml._xs, _.mr._sm]}
          name='md-refresh'
          size={16}
          color='rgba(255, 255, 255, 0.64)'
          onPress={() => {
            confirm('确定重新获取收藏?', () => {
              $.batchUserSubjectThenCut(true)
            })
          }}
        />
      )}
    </Flex>
  )
}

export default ob(Filter, COMPONENT)
