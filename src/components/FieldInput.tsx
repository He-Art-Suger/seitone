import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
} from 'react-native';
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
  labelStyle?: TextStyle;
  placeholderTextColor?: string;
  persistentPlaceholder?: boolean;
  borderless?: boolean;
};

export function FieldInput({
  label,
  placeholder,
  value,
  onChangeText,
  multiline = false,
  secureTextEntry = false,
  labelStyle,
  placeholderTextColor,
  persistentPlaceholder = false,
  borderless = false,
}: Props) {
  const [focused, setFocused] = useState(false);
  const showPersistentPlaceholder =
    persistentPlaceholder && !focused && !value && !!placeholder;
  return (
    <View style={styles.container}>
      <Text style={[styles.label, labelStyle]}>{label}</Text>
      <View
        style={[
          styles.inputWrapper,
          persistentPlaceholder && styles.inputWrapperPersistent,
        ]}
      >
        {showPersistentPlaceholder && (
          <Text
            style={[
              styles.placeholder,
              { color: placeholderTextColor ?? colors.inkSoft },
            ]}
          >
            {placeholder}
          </Text>
        )}
        <TextInput
          style={[
            styles.input,
            persistentPlaceholder && styles.inputPersistent,
            borderless && styles.inputBorderless,
            multiline && styles.inputMultiline,
          ]}
          placeholder={persistentPlaceholder ? undefined : placeholder}
          value={value}
          onChangeText={onChangeText}
          multiline={multiline}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderTextColor ?? colors.inkSoft}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </View>
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
    fontWeight: '600',
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
  inputBorderless: {
    borderWidth: 0,
    borderColor: 'transparent',
  },
  inputPersistent: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputWrapperPersistent: {
    backgroundColor: colors.white,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  placeholder: {
    position: 'absolute',
    left: spacing.md,
    top: spacing.sm,
    right: spacing.md,
    fontFamily: typography.body,
    zIndex: 1,
  },
});
