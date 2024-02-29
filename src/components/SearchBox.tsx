// SearchBox.tsx
import React, { useRef } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Search, X } from 'lucide-react-native';

// Define the props type
interface SearchBoxProps {
  onChangeText: (text: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  value: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChangeText, onFocus, onBlur, value }) => {
  const inputRef = useRef<TextInput>(null);

  const handleClearText = () => {
    onChangeText('');
    onBlur?.();
  };

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        padding: 10
      }}
    >
      <Text>
        <Search color='#212121' size={16.48} />
      </Text>
      <TextInput
        onChangeText={onChangeText}
        onFocus={onFocus} // Handle focus
        onBlur={onBlur} // Handle blur
        placeholder='Search'
        placeholderTextColor='#616161'
        style={{
          flex: 1,
          marginLeft: 10,
          fontFamily: 'UrbanistMedium',
          fontWeight: '400',
          color: '#616161',
          fontSize: 16
        }}
        value={value}
      />
      <TouchableOpacity onPress={handleClearText}>
        <Text>
          <X color='#192A53' size={20} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
