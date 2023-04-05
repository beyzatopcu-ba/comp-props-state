import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Props, yukarıdan aşağıya yani parent'tan child'a değerleri aktarmak için kullanılır.
 * Child componentler, parent'tan gelen propsları değiştiremezler. Daha doğrusu,
 * bu değişikliğin herhangi bir etkisi olmaz.
 */

type AppContentProps = {
    message: string,
};

const AppContent = (props: AppContentProps) => {
  console.log('props',props);
  return (
    //  Boş braketler
    <> 
      <Text>{props.message}</Text>
      <StatusBar style="auto" />
    </>
  )
};

type AlertButtonProps = {
  label: string,
  onPress: () => void,
}

const AlertButton = (props: AlertButtonProps) => {

  const _onPress = () => {
    Alert.alert('Butona basıldı!!!');
    props.onPress();
  }

  return (
    <TouchableOpacity onPress={_onPress}>
      <Text>{props.label}</Text>
    </TouchableOpacity>
  )
}

function App() {
  const data = {
    profileData: {},
    notifications: [],
  }; // Çoook büyük data, child'lara olabildiğince ufak veriler gönderelim

  const _onPress_AlertButton = () => {
    console.log('parent\'tan giden callback çağırıldı.');
  }

  return (
    <View style={styles.container}>
      <AppContent message='Props ile gönderiyorum'/>
      <AlertButton label='Buton' onPress={_onPress_AlertButton}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
