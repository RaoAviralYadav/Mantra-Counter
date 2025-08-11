import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Vibration,
  TextInput,
  Alert,
  Animated,
  Easing,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(108);
  const [inputTarget, setInputTarget] = useState<string>("");

  // Animation scale for pop effect
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("count", count.toString());
        await AsyncStorage.setItem("target", target.toString());
      } catch (e) {
        console.log("Failed to save data", e);
      }
    };

    saveData();

    if (count === target && target > 0) {
      Vibration.vibrate(500);
      Alert.alert("Target Reached!", `You have completed ${target} repetitions.`);
    }
  }, [count, target]);

  const loadData = async () => {
    try {
      const savedCount = await AsyncStorage.getItem("count");
      const savedTarget = await AsyncStorage.getItem("target");
      if (savedCount !== null) setCount(parseInt(savedCount));
      if (savedTarget !== null) setTarget(parseInt(savedTarget));
    } catch (e) {
      console.log("Failed to load data", e);
    }
  };

  const triggerPop = () => {
    scaleAnim.setValue(1);
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.2,
        duration: 120,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  };

  const increment = () => {
    triggerPop();
    setCount(count + 1);
  };

  const reset = () => setCount(0);

  const updateTarget = () => {
    const num = parseInt(inputTarget);
    if (!isNaN(num) && num > 0) {
      setTarget(num);
      setInputTarget("");
    } else {
      Alert.alert("Invalid Target", "Please enter a positive number.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mantra Counter</Text>

      <Animated.Text style={[styles.counter, { transform: [{ scale: scaleAnim }] }]}>
        {count} / {target}
      </Animated.Text>

      <View style={styles.buttonContainer}>
        <Button title="Increment" onPress={increment} color="#e67e22" />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter target"
        keyboardType="numeric"
        value={inputTarget}
        onChangeText={setInputTarget}
        placeholderTextColor="#b98b73"
      />
      <View style={styles.buttonContainer}>
        <Button title="Set Target" onPress={updateTarget} color="#27ae60" />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Reset" color="#c0392b" onPress={reset} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#ffe8d6", // warm light peach
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#b3541e",
  },
  counter: {
    fontSize: 32,
    marginBottom: 25,
    color: "#6d4c41",
    fontWeight: "600",
  },
  buttonContainer: {
    marginVertical: 8,
    width: "70%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d8a48f",
    padding: 10,
    width: "70%",
    marginVertical: 10,
    textAlign: "center",
    borderRadius: 8,
    backgroundColor: "#fff4ec",
    fontSize: 16,
    color: "#5e3c2b",
  },
});
