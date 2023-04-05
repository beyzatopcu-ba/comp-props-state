import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Metrics } from './Metrics';
import { useState } from 'react';

/**
 * State, yalnızca tanımlandığı component'e özgüdür, onun tarafından kontrol edilir.
 * Parent, child'ın state'ine doğrudan müdahale edemez. Tam tersi, child da parent'in state'ine doğrudan müdahale edemez.
 */

/**
 * Component'te bir değişiklik istiyorsak:
 * Önce değişecek kısmı state'teki değere göre görünecek şekilde geliştiririz.
 * Sonra da istenen event gerçekleştiğinde bu state'i güncelleriz.
 * State'i güncelleme işini React dinler ve yeni state değeri ile fonksiyon componenti yeniden çağırıp,
 * yeni görünümü ekrana yansıtır.
 */

// const stateArray = useState();
// const color = stateArray[0];
// const setColor = stateArray[1];

type ButtonTextProps = {
    text: string,
}
const ButtonText = (props: ButtonTextProps) => {

    console.log('rendering ButtonText');

    return (
        <Text>{props.text}</Text>
    );
}

const Button = () => {

    const [color, setColor] = useState('red'); // [value, setValue]
    const [text, setText] = useState('Hayır');

    console.log('color', color);

    const _onPress = () => {
        setColor('yellow');
        setText('Sarı Buton');
        console.log(color, text);
    }

    const _onPress_Toggle = () => {
        // Bir önceki state değerine göre bir sonrakini belirleyeceksek,
        // bu yöntemi kullanıyoruz
        setColor((previousState) => {
            console.log('previousState', previousState);

            return previousState === 'red' ? 'green' : 'red';
        });
        setText((previousState) => {
            console.log('previousState', previousState);

            return previousState === 'Evet' ? 'Hayır' : 'Evet';
        });
    }

    const _onPress_PartyMode = () => {
        if (color === 'pink') {
            setColor('green');
        }
        else if (color === 'green') {
            setColor('blue');
        }
        else {
            setColor('pink');
        }

        console.log('after setting color', color);
    }

    return (
        <TouchableOpacity 
            style={[styles.touchable, { backgroundColor: color }]}
            onPress={_onPress_Toggle}>
            <ButtonText text={text} />
        </TouchableOpacity>
    );
};

/**
 * Bir component'in re-render olması, 
 * güncellenmesi için ya kendi state'i değişecek ya da parent'larından birinin state'i değişecek. 
 * Bazen parent'larda state değişse de, ilgili componentin propsu değişmiyorsa, React bu componenti re-render etmeyebilir.
 */

const App = () => {
    console.log('rendering app');
    
    return (
        <View style={styles.container}>
            <Button />
            <Button />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    touchable: {
        width: Metrics.measure(200),
        height: Metrics.measure(60),
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: Metrics.measure(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;