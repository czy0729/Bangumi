/*
 * @Author: czy0729
 * @Date: 2024-07-28 05:05:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-07-28 05:10:25
 */
import React from 'react'
import { Button, Flex, Iconfont } from '@components'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { MODEL_PRIVATE } from '@constants'
import { styles } from './styles'

function Submit({ disabled, privacy, onSubmit, onTogglePrivacy }) {
  const label = MODEL_PRIVATE.getLabel(privacy)
  return (
    <Flex style={_.mt.md}>
      <Flex.Item>
        <Button style={styles.btn} type='main' loading={disabled} onPress={onSubmit}>
          更新
        </Button>
      </Flex.Item>
      <Button
        style={styles.privacy}
        type={label === '公开' ? 'ghostMain' : 'ghostPlain'}
        extra={
          label === '私密' && (
            <Iconfont style={_.ml.xs} name='md-visibility-off' color={_.colorSub} size={16} />
          )
        }
        onPress={onTogglePrivacy}
      >
        {label}
      </Button>
    </Flex>
  )
}

export default ob(Submit)
