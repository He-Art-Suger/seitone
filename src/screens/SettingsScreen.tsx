import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { TagPill } from '../components/TagPill';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  userEmail: string;
  onSignOut: () => void;
};

export function SettingsScreen({ userEmail, onSignOut }: Props) {
  return (
    <AtmosphericBackground>
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>同期・セキュリティ・プロフィール</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>アカウント</Text>
          <Text style={styles.cardText}>{userEmail}</Text>
          <View style={styles.row}>
            <TagPill label="Firebase 認証" tone="accent" />
            <TagPill label="2FA: 未設定" tone="warning" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>同期ステータス</Text>
          <Text style={styles.cardText}>
            最終同期: 2026-01-30 18:20 · オフライン対応
          </Text>
          <PrimaryButton label="今すぐ同期" onPress={() => undefined} variant="ghost" />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>AI 処理</Text>
          <Text style={styles.cardText}>
            翻訳/要約の実行履歴や API 連携を管理できます。
          </Text>
          <PrimaryButton label="API 設定" onPress={() => undefined} variant="ghost" />
        </View>

        <PrimaryButton label="ログアウト" onPress={onSignOut} variant="dark" />
      </ScrollView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 24,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.lg,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 18,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardTitle: {
    fontFamily: typography.mono,
    color: colors.ocean,
    marginBottom: spacing.sm,
  },
  cardText: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
