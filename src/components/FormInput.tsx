import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller } from "react-hook-form";
import { LoginStyle } from "@/styles/LoginStyle";
import { Eye, EyeOff } from "lucide-react-native"; // Import icons for visibility toggle

interface FormInputProps {
  control: any; // Adjust the type as per your setup
  name: string;

  iconComponent?: JSX.Element;
  isPassword?: boolean;
  showPassword?: boolean;
  togglePasswordVisibility?: () => void;
  [x: string]: any; // for other props
}

const FormInput: React.FC<FormInputProps> = ({
  control,

  name,
  iconComponent,
  isPassword = false,
  showPassword = false,
  togglePasswordVisibility,
  ...otherProps
}) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <View>
          <View style={LoginStyle.inpBox}>
            {iconComponent && <View>{iconComponent}</View>}
            <TextInput
              style={LoginStyle.inp}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={isPassword && !showPassword}
              {...otherProps}
            />
            {isPassword && (
              <TouchableOpacity onPress={togglePasswordVisibility}>
                <Text>
                  {showPassword ? (
                    <Eye size={16} color={"#212121"} />
                  ) : (
                    <EyeOff size={16} color={"#212121"} />
                  )}
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {error && <Text style={styles.errorMessage}>{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  icon: {
    marginRight: 10,
    // Adjust your icon styles here
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    flex: 1, // Take up remaining space
    textAlign: "left",
    padding: 10,
    borderRadius: 10,
  },
  errorMessage: {
    color: "red",
    alignSelf: "stretch",
    fontSize: 12,
    marginLeft: 12,
  },
});
