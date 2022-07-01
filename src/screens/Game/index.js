import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native"
import { View, Text, Image, TouchableOpacity, ImageBackground } from "react-native";
import { getCards } from "../../services/axiosClient";
import { styles } from "./style";
import backImage from '../../images/fundo.webp'

const Game = ({ route }) => {
  const { deckId } = route.params;
  const [cards, setCards] = useState(null);
  const [contador, setContador] = useState(3)
  const [primeiro, setPrimeiro] = useState(0)
  const navegacao = useNavigation()
  
  const adicionarCarta = async () => {
      const deck = await getCards(deckId, 3);
      setCards(deck);
      setContador(contador - 1)
        if(contador <= 0) {
          alert("GRANDE VENCEDOR")
            return navi();
      }
      
  }

  const navi = () => {
    
    setTimeout(() => {
      navegacao.navigate("Home")
    }, 3000)
  }

  const verificar = () => {
    const king = cards && cards.cards.some((card) => {
      return card.value==="QUEEN" && card.suit==="HEARTS" 
    })
  if (cards === null) {
    return
  }
  if (king) {
    alert("NÃO FOI DESSA VEZ")
      return navi()
  }
}

  useEffect(() => {
    const get = async () => {
      const deck = await getCards(deckId, 1);
      setCards(deck);
    };
    if (primeiro > 2) {
      get()
    } else {
      setPrimeiro(primeiro + 1)
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      verificar()
    }, 500)
  }, [cards]);

  return (
    <ImageBackground source={backImage} style={styles.container} imageStyle={{ resizeMode: "contain"}}>
      
      <View style={{ flex: 1 }}>
        <View style={{ flex: 2 }}>
          <Text style={{ color: 'red', marginTop: 50, fontSize: 30, fontWeight: 'bold', textAlign: "center" }}>A GRANDE DAMA DE COPAS</Text>
      </View>
      
      <View style={{ flex: 3, alignItems: 'center', flexDirection:'row', justifyContent: 'center', marginTop: 200 }}>
        {cards && cards.cards.map((card, index) => <Image key={index} source={{uri: card.image}}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}/>)}
      </View>
      
      <View style={{ flex: 2, marginTop: 200, alignItems: 'center' }}>
        <TouchableOpacity style={{ width: 380, alignItems: 'center', borderColor:'red', borderWidth: 3, borderRadius: 30  }}
          onPress={adicionarCarta}>
            <Text style={{color:'red', fontSize: 20, padding: 5, textAlign: "center", fontWeight: 'bold'}}>DAMA DE COPAS SEMPRE VENCE</Text>
        </TouchableOpacity>
       </View>
      </View>
    </ImageBackground>
    
  );
};

export default Game;