import { StyleSheet } from 'react-native';

export const ScheduleStyle = StyleSheet.create({
  Now: {
    backgroundColor: '#192A53',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30
  },
  NowText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'UrbanistSemiBold'
  },
  selectTime: {
    color: '#212121',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'UrbanistBold',
    marginVertical: 10
  },
  timeBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  timeinput: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    width: 144,
    marginLeft: 10
  },
  timeinput2: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 14,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    width: 144
  },
  inpt: {
    fontFamily: 'UrbanistMedium',
    fontWeight: '500',
    fontSize: 14,
    color: '#616161',
    flex: 1
  },
  scheduleBox: {
    marginVertical: 20
  },
  childBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  childbtn: {
    borderWidth: 1,
    borderColor: '#192A53',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 5,
    color: '#192A53'
  },
  childbtnFilled: {
    color: '#fff',
    borderWidth: 1,
    borderColor: '#192A53',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 5,
    backgroundColor: '#192A53'
  },
  childText: {
    fontSize: 16,
    fontFamily: 'UrbanistSemiBold',
    fontWeight: '700'
  }
});
