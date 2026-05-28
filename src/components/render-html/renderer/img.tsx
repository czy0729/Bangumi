/*
 * @Author: czy0729
 * @Date: 2024-08-14 06:58:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-05-28 08:19:04
 */
import React from 'react'
import { _, rakuenStore } from '@stores'
import { TEXT_ONLY } from '@constants'
import LinkImage from '../link-image'
import ToggleImage from '../toggle-image'

export function img({
  key,
  src,
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  alt,
  autoSize,
  show,
  onImageFallback
}) {
  if (TEXT_ONLY || !Number(rakuenStore.setting.autoLoadImageV2 || 0)) {
    return <LinkImage key={key} style={_.mt.xs} src={src || ''} />
  }

  return (
    <ToggleImage
      key={key}
      style={_.mt.xs}
      src={src || ''}
      autoSize={autoSize}
      placeholder={false}
      imageViewer
      show={show}
      onImageFallback={() => onImageFallback(src)}
    />
  )
}
