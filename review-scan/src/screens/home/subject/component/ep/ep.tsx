/*
 * @Author: czy0729
 * @Date: 2019-03-24 04:39:13
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-05-08 06:40:14
 */
import React from 'react'
import { View } from 'react-native'
import { Button, Flex, Heatmap, Input, Text } from '@components'
import { SectionTitle } from '@_'
import { _ } from '@stores'
import { memo } from '@utils/decorators'
import { FROZEN_FN } from '@constants'
import { TITLE_EP } from '../../ds'
import IconEp from '../icon/ep'
import IconEpFilter from '../icon/ep-filter'
import IconOnline from '../icon/online'
import IconReverse from '../icon/reverse'
import Eps from './eps'
import OnairCustom from './onair-custom'
import { COMPONENT_MAIN, DEFAULT_PROPS } from './ds'

const Ep = memo(
  ({
    styles,
    watchedEps = '0',
    totalEps = '0',
    onAirCustom = {},
    status = {
      name: '未收藏'
    },
    isDoing = false,
    showEpInput = true,
    showCustomOnair = true,
    focusOrigin = false,
    onChangeText = FROZEN_FN,
    onScrollIntoViewIfNeeded = FROZEN_FN,
    doUpdateSubjectEp = FROZEN_FN
  }) => {
    const _showEpInput = showEpInput
    const canSubmit = !!status.name && status.name !== '未收藏'

    const { isOnair } = onAirCustom
    const showOnair = showCustomOnair && (isOnair || isDoing)
    return (
      <View style={styles.container}>
        <SectionTitle
          right={
            <>
              <IconEpFilter />
              {!focusOrigin && <IconOnline />}
              <IconEp />
              <IconReverse />
            </>
          }
          splitStyles
        >
          {TITLE_EP}
        </SectionTitle>
        <View style={_.mt.md}>
          <Eps />
          <Heatmap id='条目.章节按钮长按' />
          <Heatmap bottom={35} id='条目.章节菜单操作' />
        </View>
        {(_showEpInput || showOnair) && (
          <Flex style={_.mt.sm}>
            <Flex.Item>
              {_showEpInput && (
                <Flex>
                  <View style={styles.input}>
                    <Input
                      style={styles.inputRaw}
                      pointerEvents='box-none'
                      keyboardType='numeric'
                      value={String(watchedEps)}
                      placeholder={String(watchedEps || '0')}
                      editable={canSubmit}
                      clearButtonMode='never'
                      returnKeyType='done'
                      returnKeyLabel='更新'
                      onChangeText={text => onChangeText('watchedEps', text.replace(/[^\d]+/, ''))}
                      onSubmitEditing={doUpdateSubjectEp}
                      onScrollIntoViewIfNeeded={onScrollIntoViewIfNeeded}
                    />
                    {!!totalEps && totalEps != 0 && (
                      <Text style={styles.total} type='sub' size={11} bold>
                        / {totalEps}
                      </Text>
                    )}
                  </View>
                  <View style={_.ml.sm}>
                    <Button
                      style={styles.btn}
                      size='sm'
                      type='ghostPrimary'
                      onPress={canSubmit ? doUpdateSubjectEp : undefined}
                    >
                      更新
                    </Button>
                  </View>
                </Flex>
              )}
            </Flex.Item>
            {showOnair && <OnairCustom />}
            <Heatmap id='条目.输入框更新章节' />
          </Flex>
        )}
      </View>
    )
  },
  DEFAULT_PROPS,
  COMPONENT_MAIN
)

export default Ep
