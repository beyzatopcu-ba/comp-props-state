import { useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native"

let num = 0;
const List = () => {
    
    const [list, setList] = useState<number[]>([]);

    const _onPress_Add = () => {
        num++;
        const copyList = [...list];
        console.log('kopyalama işleminden hemen sonra: ', list === copyList);
        copyList.push(num);
        // setList(previousList => {
        //     console.log(previousList === list);
        //     return list;
        // });
        setList(copyList);
    }

    const _renderList = () => {
        return list.map(item => (
            <Text key={item}>{item.toString()}</Text>
        ))
    }

    return (
        <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
            <TouchableOpacity onPress={_onPress_Add}>
                <Text>Ekle</Text>
            </TouchableOpacity>
            {_renderList()}            
        </SafeAreaView>
    )
}

export default List;