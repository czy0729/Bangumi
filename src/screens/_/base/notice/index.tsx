/*
 * @Author: czy0729
 * @Date: 2023-11-02 13:28:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-02 13:34:24
 */
import { View } from 'react-native'
import { Text } from '@components'
import { stl } from '@utils'
import { ob } from '@utils/decorators'
import { memoStyles } from './styles'
import { Props as NoticeProps } from './types'

export { NoticeProps }

export const Notice = ob(({ style, children }) => {
  const styles = memoStyles()
  return (
    <View style={stl(styles.notice, style)}>
      <Text size={12} type='sub'>
        {children}
      </Text>
    </View>
  )
})
