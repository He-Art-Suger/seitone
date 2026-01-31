import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { FieldInput } from '../components/FieldInput';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  onSignUp: (email: string, name: string) => void;
  onMoveToSignIn: () => void;
};

export function SignUpScreen({ onSignUp, onMoveToSignIn }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AtmosphericBackground>
      <View style={styles.container}>
        <Text style={styles.logo}>seitone</Text>
        <Text style={styles.subtitle}>
          研究用ノートを同期し、翻訳と要約をまとめて管理できます。
        </Text>
        <FieldInput
          label="表示名"
          placeholder="研究者 太郎"
          value={name}
          onChangeText={setName}
        />
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
          label="アカウントを作成"
          onPress={() => onSignUp(email, name)}
          style={styles.primaryButton}
        />
        <TouchableOpacity onPress={onMoveToSignIn}>
          <Text style={styles.link}>ログインへ戻る</Text>
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
    fontSize: 34,
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
