import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { FieldInput } from '../components/FieldInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  onSignIn: (email: string) => void;
  onMoveToSignUp: () => void;
};

export function SignInScreen({ onSignIn, onMoveToSignUp }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AtmosphericBackground>
      <View style={styles.container}>
        <Text style={styles.logo}>seitone</Text>
        <Text style={styles.subtitle}>
          論文の翻訳・要約・整理を一つの流れにまとめる研究ノート。
        </Text>
        <FieldInput
          label="メールアドレス"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
        />
        <FieldInput
          label="パスワード"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <PrimaryButton
          label="ログイン"
          onPress={() => onSignIn(email)}
          style={styles.primaryButton}
        />
        <TouchableOpacity onPress={onMoveToSignUp}>
          <Text style={styles.link}>アカウントを作成する</Text>
        </TouchableOpacity>
      </View>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'center',
  },
  logo: {
    fontFamily: typography.heading,
    fontSize: 36,
    color: colors.ink,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.xl,
    lineHeight: 20,
  },
  primaryButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  link: {
    fontFamily: typography.mono,
    textAlign: 'center',
    color: colors.ocean,
  },
});
