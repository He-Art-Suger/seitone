import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  label: string;
  placeholder?: string;
  value: string;
  onChangeText: (value: string) => void;
  multiline?: boolean;
  secureTextEntry?: boolean;
};

export function FieldInput({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  secureTextEntry = false,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.inputMultiline]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        placeholderTextColor={colors.inkSoft}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    fontFamily: typography.mono,
    fontSize: 12,
    color: colors.ocean,
    marginBottom: spacing.xs,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    fontFamily: typography.body,
    color: colors.ink,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
});
