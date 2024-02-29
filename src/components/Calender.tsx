import { useState } from 'react';
import { View } from 'react-native';
// import DatePicker from "react-native-modal-datetime-picker";
import { Calendar } from 'react-native-calendars';
import tw from 'twrnc';

type CalendarsProps = {
  onDateSelect: (date: string) => void;
};

const Calenders = ({ onDateSelect }: CalendarsProps) => {
  const [selectedDate, setSelectedDate] = useState<string | undefined>();

  const handleDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onDateSelect(day.dateString);
  };

  return (
    <View pointerEvents="none">
      <Calendar onDayPress={handleDayPress} markedDates={selectedDate ? { [selectedDate]: { selected: true } } : {}} />
    </View>
  );
};

export default Calenders;
