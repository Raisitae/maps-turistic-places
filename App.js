import * as React from "react";
import MapView, { Marker } from "react-native-maps";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import * as Location from "expo-location";
import { useState, useEffect } from "react";

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [origin, setOrigin] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [locationes, setLocationes] = useState([]);
  const [isEnabled, setIsEnabled] = useState(false);
  const [data, setData] = useState([]);
  let thisLocation;

  const lugares = [
    {
      name: "Plaza Independencia",
      latitude: -26.83048965,
      longitude: -65.2038600956889,
      icon: "https://www.tucumanturismo.gob.ar/carga/image/1470659064%20-%20faa32a26-d1ed-4ce7-b20f-878b0fb74d14.jpg",
      description:
        "La Plaza Independencia es una importante plaza argentina de la ciudad de San Miguel de Tucumán. Se la considera el kilómetro 0 de la provincia de Tucumán y se encuentra rodeada de importantes edificios. En ella confluyen ciudadanos, turistas, comerciantes y espectáculos culturales. Las calles que la rodean son 24 de Septiembre al Sur, San Martín al norte, Laprida al Este y 25 de Mayo al oeste. Ubicada en el centro de la ciudad abarcando aproximadamente una ha, fue enmarcada originalmente en 1685. En sus orígenes cumplió la función de Plaza de Armas hasta que, en 1857, fue transformada en un paseo público y es al día de hoy el más concurrido de la capital tucumana. Bastante densamente forestada, su vegetación interior está formada por lapachos, laureles, tarcos, palmeras y naranjos.",
      direction: "Av. 24 de Septiembre 400",
    },
    {
      name: "Casa Histórica",
      latitude: -26.83301185,
      longitude: -65.204323938141,
      icon: "https://geolupa.blob.core.windows.net/decultura/Images/Companies/Company_16829/Original/572bdf1f-3e51-4dd5-909c-8f8e40be1e3e.jpg",
      description:
        "La Casa de Tucumán, Casa Histórica de la Independencia o Casita de Tucumán​ es una casa colonial localizada en el centro de la ciudad argentina de San Miguel de Tucumán, donde un cuerpo de delegados de la mayoría de las Provincias Unidas del Río de la Plata, conocido como el Congreso de Tucumán, proclamó la declaración de independencia de la Argentina el 9 de julio de 1816. Fue declarada Monumento Histórico Nacional en 1941. La casa es hoy el museo llamado oficialmente Museo casa Histórica de la Independencia.",
      direction: "Congreso de Tucumán 141",
    },
    {
      name: "Casa de Gobierno",
      latitude: -26.830028,
      longitude: -65.204778,
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e7/06._Tucuman_%2813%29%2C_Casa_de_Gobierno.JPG",
      description:
        "La Casa de Gobierno de Tucumán es un monumento histórico nacional y sede del gobierno provincial de Tucumán, en la ciudad de San Miguel de Tucumán, Argentina. A comienzos del siglo XX, la provincia de Tucumán carecía de edificios de importancia, siendo la más poblada y poderosa en el Noroeste argentino. Para remediar esa falta y para impulsar la renovación urbana y el desarrollo en la ciudad de San Miguel, el gobernador Luis Nougués impulsó la construcción de un palacio de gobierno que reemplazara al cabildo de los tiempos coloniales, que era todavía utilizado como sede de la administración provincial. Además, alojaba la casa de justicia y una pequeña cárcel",
      direction: "25 de Mayo 90",
    },
    {
      name: "Monumento al bicentenario",
      latitude: -26.82736,
      longitude: -65.2224,
      icon: "https://upload.wikimedia.org/wikipedia/commons/a/a7/Monumento_al_Bicentenario_de_la_Independencia_Argentina%2C_en_San_Miguel_de_Tucum%C3%A1n.jpg",
      description:
        "Este monumento fue creado en San Miguel de Tucumán el año 2016, al cumplirse los 200 años de la declaración de la independencia de Argentina, en la ciudad en que se declaró la misma en 1816. Está ubicado en avenida Mate de Luna 1600, una de las principales vías de comunicación de la ciudad. El monumento consiste en dos columnas de hormigón, de más de veinte metros de altura que representan la bandera argentina. Entre las dos estructuras, puede visualizarse el sol. Las columnas tienen una pequeña curvatura; según la perspectiva desde donde se lo mire, emula a la bandera flameando.       Al pie del monumento se encuentran dos estructuras de acero simbolizando cadenas rotas en honor a la libertad obtenida. Allí mismo fue enterrada una urna “cápsula del tiempo” en la que se encuentra un libro firmado por miles de tucumanos. El proyecto consiste en desenterrarlo para los festejos del Tricentenario de la Independencia. La imagen fue tomada un día después de haber nevado en el cerro San Javier",
      direction: "Av. Mate de Luna 1620",
    },
  ];

  useEffect(() => {
    setLocationes(lugares);
  }, []);

  const myLocation = () => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      let thisLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setOrigin(thisLocation);
    })();
  };

  function getLocation(lugar) {
    const thisLocation = {
      latitude: lugar.latitude,
      longitude: lugar.longitude,
    };
    setOrigin(thisLocation);
  }

  useEffect(() => {
    myLocation();
  }, []);

  const RenderDatos = () => {
    if (isEnabled) {
      console.log(data.icon);
      return (
        <View>
          <Image source={{ uri: data.icon }} style={styles.image} />
          <Text style={styles.textTitulo}>{data.name}</Text>
          <Text style={styles.text}>{data.description}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.text}>
            Toque un botón para ver más sobre el lugar escogido
          </Text>
        </View>
      );
    }
  };

  return (
    <View>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={{
            uri: "https://idep.gov.ar/webidep/wp-content/uploads/2021/06/MT-blanca.png",
          }}
          style={{ height: 100, width: 150, marginBottom: 20 }}
        />
        <View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}
            region={{
              latitude: origin.latitude,
              longitude: origin.longitude,
              latitudeDelta: 0.09,
              longitudeDelta: 0.04,
            }}
          >
            {locationes.map((marker) => (
              <Marker
                draggable
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                key={marker.id}
                title={marker.name}
                description={marker.direction}
              />
            ))}
          </MapView>
        </View>
        <View style={styles.buttonContainer}>
          {locationes.map((marker) => (
            <View style={styles.button}>
              <TouchableOpacity
                style={styles.buttons}
                key={marker.id}
                title={marker.name}
                onPress={() => {
                  getLocation(marker);
                  setIsEnabled(true);
                  setData(marker);
                }}
              >
                <Text style={styles.textButton}>{marker.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.dataContainer}>
          <RenderDatos />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get("screen").height,
    paddingTop: 50,
    flexDirection: "column",
    width: Dimensions.get("window").width,
    backgroundColor: "#cfbaf0",

    alignItems: "center",
    alignContent: "center",
  },
  map: {
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").height * 0.5,
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 15,
  },

  textTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 60,
    color: "#263E2B",
  },
  text: {
    textAlign: "justify",
    lineHeight: 24,
  },
  buttonContainer: {
    width: Dimensions.get("window").width - 50,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignContent: "space-around",
    marginTop: 20,
  },

  button: {
    width: (Dimensions.get("window").width - 50) / 2,
    padding: 5,
  },

  dataContainer: {
    backgroundColor: "white",
    marginVertical: 20,
    padding: 15,
    borderRadius: 15,
    flexDirection: "row",
    width: Dimensions.get("window").width - 50,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttons: {
    borderRadius: 20,
    backgroundColor: "#FCEFF9",
    height: 50,
    justifyContent: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  textButton: {
    color: "#263E2B",
    fontSize: 15,
    textAlign: "center",
  },
});
