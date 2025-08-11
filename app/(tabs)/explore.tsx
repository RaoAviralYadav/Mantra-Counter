import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About This App</Text>
      <Text style={styles.description}>
        This Mantra Counter app helps you keep track of your mantra repetitions with a simple,
        easy-to-use interface. You can set your target, track your progress, and get notified when
        you reach it.
      </Text>
      <Text style={styles.description}>
        Your progress is saved automatically, so you can continue your practice anytime without
        losing your count.
      </Text>
      <Text style={styles.footer}>Built with React Native & Expo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf0e6", // matches mantra counter background
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d35400",
    marginBottom: 20,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#6d4c41",
    marginBottom: 15,
    textAlign: "center",
  },
  footer: {
    fontSize: 14,
    color: "#a1887f",
    marginTop: 40,
    textAlign: "center",
    fontStyle: "italic",
  },
});
