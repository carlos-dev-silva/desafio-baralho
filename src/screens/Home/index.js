import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity } from "react-native";
import { getDeckId } from "../../services/axiosClient";
import { styles } from "./styles";
import backImg from "../../images/AAAA.webp";

const Home = ({ navigation }) => {
  const [loading, setLoading] = useState(true);
  const [idDeck, setIdDeck] = useState(null);

  useEffect(() => {
    const get = async () => {
      setLoading(true);
      const id = await getDeckId();
      setIdDeck(id);
      setLoading(false);
    };
    get();
  }, []);

  const inciarPartida = async () => {
    navigation.navigate("Game", {
      deckId: idDeck,
    });
  };

  return (
    <ImageBackground source={backImg} style={styles.container} imageStyle={{ resizeMode: "contain"}}>
      <Text style={{color:'red', marginTop: 50, fontSize: 45, textAlign: "center", fontWeight: 'bold'}}>A DAMA DE COPAS{"\n"}</Text>
             
        <Text style={{color:'red', fontSize: 25, textAlign: "center", fontWeight: 'bold'}}>Nunca pegue a Miquilina</Text>
          <View style={{ flex: 2, justifyContent: "center", alignItems:"center", paddingTop: "100%" }}>
        
      <TouchableOpacity style={{alignItems: 'center', borderColor:'red', borderWidth: 3, borderRadius: 30, width: 300,}} 
        onPress={inciarPartida}>
          <Text style={{color:'red', fontSize: 35, padding: 5, textAlign: "center", fontWeight: 'bold'}}>INICIAR PARTIDA</Text>
      </TouchableOpacity>
     </View>
    </ImageBackground>
  );
};

export default Home;

