import { useStorageState } from "@/hooks/useStorageState";
import { useEffect, useState } from "react";
import { ActivityIndicator, Button, FlatList, Image, Text, View } from "react-native";

type Participant = {
    avatar: {url: string};
    username: string;
    updatedAt: string;
}

type Chat = {
    _id: string;
    name: string;
    participants: Participant[];
    updatedAt: string;
};

export default function TabChat() {
    const [isLoading, setLoading] = useState(true);
    const [chats, setChats] = useState<Chat[]>([]);
    const [[_, session]] = useStorageState('session');

    const loadChats = async () => {
        if (!session) return;

        setLoading(true);
        const url = 'https://api.freeapi.app/api/v1/chat-app/chats';
        // const url = 'https://api.freeapi.app/api/v1/chat-app/chats/users';
        const token = session;
        const options = {
          headers: {
            accept: 'application/json', 'content-type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        };
    
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          setChats(json.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
        loadChats();
    }, [session]);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                data={chats}
                keyExtractor={({_id}) => _id}
                renderItem={({item}) => (
                    <View>
                        <Image 
                            style={{width: 50, height: 50}}
                            source={{uri: item.participants[0].avatar.url}}
                        />
                        <Text>
                        {item.participants[0].username}, {item.updatedAt}
                        </Text>
                    </View>
                )}
                />
            )}
        </View>
    )
}