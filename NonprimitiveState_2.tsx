import { useState, memo } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";


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

const MemoizedNameInput = memo(NameInput, (prevProps, nextProps) => {
    return false;
});

type NameTextProps = {
    nameSurname: {
        name: string,
        surname: string,
    }
}

const NameText = (props: NameTextProps) => {
    console.log('re-rendering NameText');
    return (
        <Text>{props.nameSurname.name}</Text>
    )
}



const TextInputContainer = () => {

    console.log('re-rendering Parent');

    const [nameSurname, setNameSurname] = useState({
        name: '',
        surname: '',
    });
    const [isTurkish, setIsTurkish] = useState(false);

    const _onChange_Name = (text: string) => {
        const copyNameSurname = { ...nameSurname };
        copyNameSurname.name = text;
        setNameSurname(copyNameSurname);
    }

    const _onChange_Surname = (text: string) => {
        const copyNameSurname = { ...nameSurname };
        copyNameSurname.surname = text;
        setNameSurname(copyNameSurname);
    }

    const _onPress_IsTurkishCheckbox = () => {
        setIsTurkish(prev => !prev);
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <MemoizedNameInput
                name={nameSurname.name}
                onChangeName={_onChange_Name}
                placeholder="Adınızı yazın"
            />
            <MemoizedNameInput
                name={nameSurname.surname}
                onChangeName={_onChange_Surname}
                placeholder="Soyadınızı yazın"
            />
            <TouchableOpacity
                style={{
                    width: 20,
                    height: 20,
                    backgroundColor: isTurkish ? 'green' : 'grey'
                }} onPress={_onPress_IsTurkishCheckbox}
            />
            <NameText nameSurname={nameSurname} />
            <Text style={{ marginTop: 20 }}>{'Surname: ' + nameSurname.surname}</Text>
        </View>
    );
};

export default TextInputContainer;
