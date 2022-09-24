/* eslint-disable @typescript-eslint/no-unused-vars */
/*
 * @Author: czy0729
 * @Date: 2021-07-10 16:08:30
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-25 08:22:27
 */
import { Fn } from '@types'

export async function saveBase64ImageToCameraRoll(
  base64Img: string,
  success: Fn = () => {},
  fail: Fn = () => {}
) {}

/**
 * Request calendar authorization. Authorization must be granted before accessing calendar events.
 * https://github.com/wmcmahan/react-native-calendar-events#requestpermissions
 */
export async function RNCalendarEventsRequestPermissions() {
  return 'undetermined' as 'denied' | 'restricted' | 'authorized' | 'undetermined'
}

/**
 * For both iOS and Android the pattern is simple; the event needs a title
 * as well as a startDate and endDate. The endDate should also be a date later than the startDate.
 * https://github.com/wmcmahan/react-native-calendar-events/wiki/Creating-basic-event#basic
 */
export async function RNCalendarEventsSaveEvent(
  title: string,
  {
    /** 传递格式 2022-09-25 12:00:00 */
    startDate = undefined,
    endDate = undefined,
    notes = undefined
  } = {}
): Promise<any> {
  return false
}
