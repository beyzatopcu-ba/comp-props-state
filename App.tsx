import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Metrics } from './Metrics';
import { useState } from 'react';

type ButtonTextProps = {
    text: string,
}
const ButtonText = (props: ButtonTextProps) => {

    return (
        <Text>{props.text}</Text>
    );
}


type ButtonProps = {
    onStateChange: (newValue: string) => void,
}

const Button = (props: ButtonProps) => {

    const [color, setColor] = useState('red');
    const [text, setText] = useState('Hayır');

    const _onPress_Toggle = () => {
        setColor((previousState) => {
            return previousState === 'red' ? 'green' : 'red';
        });
        setText((previousState) => {
            return previousState === 'Evet' ? 'Hayır' : 'Evet';
        });

        props.onStateChange(text === 'Evet' ? 'Hayır' : 'Evet');
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
 * Child'dan yukarıya veri nasıl taşırım?
 * Parent, gidip child'in içinden veri okuyamaz. 
 * Child'da ilgili veride değişiklik olduğunda bundan haberdar olabilir.
 * Haberdar olma işini props olarak geçtiği callback function'lar ile yapar.
 * 
 * Child, ilgili değişiklik gerçekleştiğinde, parent'ın callback function'ını çağırır.
 * Çağırırken yeni veri'yi ve gerekirse başka verileri parametre olarak gönderir.
 * 
 * Parent da, callback function'ın gövdesinde bu veri ile istediği şeyi yapar. Mesela kendi state'ine atar.
 */

const App = () => {

    const [firstButtonValue, setFirstButtonValue] = useState<string>();
    const [secondButtonValue, setSecondButtonValue] = useState<string>();

    const _onStateChange = (newValue: string, buttonType: string) => {
        console.log('toggled', newValue, buttonType);

        if (buttonType === 'first') {
            setFirstButtonValue(newValue);
        }
        else {
            setSecondButtonValue(newValue);
        }
    }
    
    console.log('rerendering app', firstButtonValue, secondButtonValue);

    return (
        <View style={styles.container}>
            <Button onStateChange={(newValue) => {
                _onStateChange(newValue, 'first');
            }} />
            <Button onStateChange={(newValue) => {
                _onStateChange(newValue, 'second')
            }} />
            <Text>{firstButtonValue}</Text>
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