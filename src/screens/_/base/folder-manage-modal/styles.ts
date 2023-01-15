/*
 * @Author: czy0729
 * @Date: 2022-06-14 13:38:59
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-06-14 13:38:59
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => {
  const textarea = {
    padding: _.sm,
    marginTop: _.sm,
    marginBottom: -4,
    color: _.colorDesc,
    ..._.fontSize10,
    backgroundColor: _.select(_.colorPlain, _._colorDarkModeLevel1),
    borderWidth: 1,
    borderColor: _.select(_.colorIcon, _.colorBorder),
    borderRadius: _.radiusXs,
    overflow: 'hidden'
  } as const
  return {
    modal: {
      width: _.r(_.window.width - 2 * _.wind),
      maxWidth: _.r(408),
      backgroundColor: _.select(_.colorBg, _.colorBg),
      borderRadius: _.radiusMd
    },
    scrollView: {
      height: _.window.height * 0.7,
      marginTop: _.md,
      marginBottom: _.sm
    },
    catalog: {
      padding: _.device(_.sm, _.md),
      paddingRight: 0,
      marginBottom: _.sm
    },
    control: {
      minWidth: 48,
      height: '100%'
    },
    subjects: {
      paddingLeft: _.sm,
      paddingBottom: _.sm,
      marginTop: -_.sm
    },
    subject: {
      paddingVertical: _.sm
    },
    subjectContent: {
      paddingLeft: 12
    },
    collection: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: 0
    },
    comment: {
      padding: _.sm,
      marginTop: _.sm,
      backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
      borderWidth: 1,
      borderColor: _.select(_.colorIcon, _.colorBorder),
      borderRadius: _.radiusXs,
      overflow: 'hidden'
    },
    textarea,
    textareaMd: {
      ...textarea,
      marginTop: _.md
    },
    editWrap: {
      height: '100%'
    },
    create: {
      paddingTop: _.sm,
      paddingRight: 48,
      paddingLeft: _.sm,
      marginBottom: _.md
    },
    btnPopover: {
      marginLeft: _.xs,
      marginRight: -2,
      borderRadius: 20,
      overflow: 'hidden'
    },
    touch: {
      width: 38,
      height: 38
    },
    btnCreate: {
      position: 'absolute',
      zIndex: 1,
      top: -31,
      right: 12
    },
    btnCreateCancel: {
      position: 'absolute',
      zIndex: 1,
      top: 0,
      right: -4
    },
    btnSubmit: {
      position: 'absolute',
      zIndex: 1,
      right: 0,
      bottom: -4
    },
    btnCreateSubmit: {
      position: 'absolute',
      zIndex: 1,
      right: -4,
      bottom: -4
    }
  }
})
