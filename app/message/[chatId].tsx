import { useStorageState } from "@/hooks/useStorageState";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

type Message = {
    _id: string;
    content: string;
    attachments: any[];
    updatedAt: string;
};

export default function MessagePage() {
    const { chatId } = useLocalSearchParams();

    const [isLoading, setLoading] = useState(true);
    const [messages, setMessages] = useState<Message[]>([]);
    const [[_, session]] = useStorageState('session');

    const loadMessages = async () => {
        if (!session) return;
        if (!chatId) return;

        setLoading(true);
        const url = `https://api.freeapi.app/api/v1/chat-app/messages/${chatId}`;
        const options = {
          headers: {
            accept: 'application/json', 'content-type': 'application/json',
            Authorization: `Bearer ${session}`,
        },
        };
    
        try {
          const response = await fetch(url, options);
          const json = await response.json();
          setMessages(json.data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
    }

    useEffect(() => {
        loadMessages();
    }, [session, chatId]);

    return (
        <View>
            {isLoading ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                data={messages}
                keyExtractor={({_id}) => _id}
                renderItem={({item}) => (
                    <View>
                        <Text>
                        {item.content}, {item.updatedAt}
                        </Text>
                    </View>
                )}
                />
            )}
        </View>
    );
}
