import { useState } from "react";
import { Text, TextInput, View } from "react-native";


type NameInputProps = {
    name: string,
    onChangeName: (newName: string) => void,
    placeholder?: string,
}

const NameInput = (props: NameInputProps) => {

    const {
        name,
        onChangeName,
        placeholder,
    } = props;

    console.log('re-rendering NameInput');

    const _placeholder = placeholder === null || placeholder === undefined ? 'Default' : placeholder;

    const _onChangeText_Name = (text: string) => {
        onChangeName(text);
    };

    return (
        <TextInput
            onChangeText={_onChangeText_Name}
            value={name}
            placeholder={_placeholder}
        />
    )
};


const TextInputContainer = () => {

    console.log('re-rendering Parent');

    const [name, setName] = useState('');

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <NameInput 
                name={name} 
                onChangeName={setName}
                 />
            <Text style={{ marginTop: 20 }}>{name}</Text>
        </View>
    );
};

export default TextInputContainer;
