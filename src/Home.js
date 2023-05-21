// @ts-nocheck
import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import * as ExpoClipboard from "expo-clipboard";
const copyIcon = require("./copy-icon.png");
export const Home = () => {
  const [link, setLink] = useState("");
  const [result, setResult] = useState("");
  const getShortenedLink = () => {
    fetch("https://cutit-server.onrender.com/", {
      method: "post",
      body: JSON.stringify({ url: link }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(await response.text());
        }
        return response.json();
      })
      .then((data) => setResult(data.short_url))
      .catch((error) => alert(error));
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
        <View style={{ flexDirection: "column" }}>
          <Text>{`The shortened link is `}</Text>
          <View style={{ flexDirection: "row", gap: 4 }}>
            <Text
              style={{ color: "blue" }}
              selectable={true}
              onPress={() => Linking.openURL(result)}
            >
              {result}
            </Text>
            <TouchableOpacity
              onPress={async () => {
                await ExpoClipboard.setStringAsync(result);
              }}
            >
              <Image source={copyIcon} style={{ height: 14, width: 14 }} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
