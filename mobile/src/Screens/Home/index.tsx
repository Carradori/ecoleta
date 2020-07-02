import React, { useEffect, useState, lazy } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import {
  View,
  Image,
  StyleSheet,
  Text,
  ImageBackground,
  Picker,
  Alert,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

interface IIBGECities {
  nome: string;
}
interface IIBGEUfs {
  sigla: string;
}

const Home: React.FC = () => {
  const { navigate } = useNavigation();

  const [cities, setCities] = useState<string[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("0");

  useEffect(() => {
    axios
      .get<IIBGEUfs[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
      )
      .then((response) => {
        const ufSiglas = response.data.map((uf) => uf.sigla);
        setUfs(ufSiglas);
      });
  }, []);

  useEffect(() => {
    if (selectedUf === "0") return;
    axios
      .get<IIBGECities[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        const cityNames = response.data.map((city) => city.nome);
        setCities(cityNames);
      });
  }, [selectedUf]);

  function handlePointPage() {
    if (selectedUf === "0" || selectedCity === "0") {
      Alert.alert(
        "Ooops...",
        "Verifique se você escolheu o estado e a cidade corretamente!"
      );
      return;
    }
    navigate("Point", { city: selectedCity, uf: selectedUf });
  }

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      imageStyle={{ width: 274, height: 368 }}
      style={styles.container}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente
        </Text>
      </View>
      <View style={styles.footer}>
        <Picker
          onValueChange={(value) => {
            setSelectedUf(value);
          }}
          selectedValue={selectedUf}
        >
          <Picker.Item label="Selecione um estado" value="0" />
          {ufs.map((uf) => (
            <Picker.Item key={uf} label={uf} value={uf} />
          ))}
        </Picker>
        <Picker
          onValueChange={(value) => {
            setSelectedCity(value);
          }}
          selectedValue={selectedCity}
        >
          <Picker.Item label="Selecione uma cidade" value={0} />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
        <RectButton style={styles.button} onPress={handlePointPage}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#fff" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

export default Home;
