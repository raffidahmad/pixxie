import { TouchableOpacity, Text, StyleSheet } from "react-native";
function Buttons({ title, onClick }: any) {
  return (
    <TouchableOpacity onPress={onClick} style={ButtonStyle.Buttons}>
      <Text style={ButtonStyle.btntext}>{title}</Text>
    </TouchableOpacity>
  );
}

export default Buttons;
export const ButtonStyle = StyleSheet.create({
  Buttons: {
    backgroundColor: "#192A53",
    textAlign: "center",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginVertical: 10,
  },
  btntext: {
    color: "white",
    fontFamily: "UrbanistBold",
    fontWeight: "700",
    fontSize: 16,
  },
});
