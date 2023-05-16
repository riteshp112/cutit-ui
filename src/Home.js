import React, { useState } from "react";
import { View, TextInput, Button, Text, Linking } from "react-native";

export const Home = () => {
  const [link, setLink] = useState("");
  const [result, setResult] = useState("");
  const getShortenedLink = () => {
    fetch("https://cutit-server.onrender.com/", {
      method: "post",
      body: JSON.stringify({ url: link }),
    })
      .then((response) => {
        if (!response.ok) {
          alert(response.statusText);
        }
        return response.json();
      })
      .then((data) => setResult(data.short_url));
  };
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <View style={{ flexDirection: "row", gap: 4 }}>
        <TextInput
          value={link}
          onChangeText={setLink}
          style={{
            backgroundColor: "#f6f6f6f6",
            borderWidth: 1,
            borderColor: "lightgray",
          }}
        />
        <Button title="Cut" onPress={getShortenedLink} />
      </View>
      {result !== "" && (
        <View style={{ flexDirection: "row" }}>
          <Text>{`The shortened link is: `}</Text>
          <Text
            style={{ color: "blue" }}
            onPress={() => Linking.openURL(result)}
          >
            {result}
          </Text>
        </View>
      )}
    </View>
  );
};
