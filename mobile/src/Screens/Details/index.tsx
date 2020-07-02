import React, { useEffect, useState } from "react";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Linking,
  TextInput,
  Dimensions,
  Keyboard,
} from "react-native";
import Constants from "expo-constants";

import api from "../../services/api";

interface IParams {
  point_id: number;
}

interface IData {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Details: React.FC = () => {
  const { goBack } = useNavigation();
  const { params } = useRoute();

  const routeParams = params as IParams;

  const [data, setData] = useState<IData>({} as IData);
  const [message, setMessage] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }, []);

  if (!data.point) {
    return <ActivityIndicator />;
  }

  function handleWhatsApp() {
    Keyboard.dismiss();
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=${messageText}`
    );
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="arrow-left" size={24} color="#34cb79" />
        </TouchableOpacity>
        <Image
          style={styles.pointImage}
          source={{ uri: data.point.image_url }}
        />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          O que reciclamos:{"\n"}
          {data.items.map((item) => item.title).join(", ")}
        </Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>
      </View>
      {message && (
        <View style={styles.message}>
          <Text style={styles.messageTitle}>Digite sua mensagem</Text>
          <TextInput
            style={styles.messageInput}
            onChangeText={setMessageText}
            value={messageText}
          />
          <TouchableOpacity style={styles.button} onPress={handleWhatsApp}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCancell}
            onPress={() => setMessage(!message)}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => setMessage(!message)}>
          <FontAwesome name="whatsapp" color="#fff" size={24} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button}>
          <Icon name="mail" color="#fff" size={24} onPress={() => {}} />
          <Text style={styles.buttonText}>Email</Text>
        </RectButton>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 20 + Constants.statusBarHeight,
  },

  pointImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: "#322153",
    fontSize: 28,
    fontFamily: "Ubuntu_700Bold",
    marginTop: 24,
  },

  pointItems: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: "#322153",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },

  addressContent: {
    fontFamily: "Roboto_400Regular",
    lineHeight: 24,
    marginTop: 8,
    color: "#6C6C80",
  },
  message: {
    flex: 1,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 99,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    backgroundColor: "rgba(0,0,0,.7)",
  },
  messageTitle: {
    fontSize: 25,
    color: "#f5f5f5",
    fontWeight: "bold",
  },
  messageInput: {
    marginVertical: 25,
    color: "#fff",
    fontSize: 18,
    borderRadius: 8,
    width: Dimensions.get("window").width * 0.8,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderColor: "#f5f5f5",
  },
  buttonCancell: {
    marginTop: 15,
    backgroundColor: "#eb4034",
    width: "48%",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#999",
    paddingVertical: 20,
    paddingHorizontal: 32,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    width: "48%",
    backgroundColor: "#34CB79",
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    marginLeft: 8,
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Roboto_500Medium",
  },
});

export default Details;
