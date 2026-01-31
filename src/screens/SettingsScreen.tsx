import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { PrimaryButton } from '../components/PrimaryButton';
import { TagPill } from '../components/TagPill';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  userEmail: string;
  userName?: string;
  onSignOut: () => void;
};

export function SettingsScreen({ userEmail, userName, onSignOut }: Props) {
  return (
    <AtmosphericBackground>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
          <Text style={styles.title}>Settings</Text>
          <Text style={styles.subtitle}>同期・セキュリティ・プロフィール</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>アカウント</Text>
          <Text style={styles.cardLabel}>名前</Text>
          <Text style={styles.cardText}>{userName || '未設定'}</Text>
          <PrimaryButton
            label="名前を再設定する"
            onPress={() => undefined}
            variant="ocean"
            style={styles.inlineButton}
          />
          <Text style={styles.cardLabel}>メールアドレス</Text>
          <Text style={styles.cardText}>{userEmail}</Text>
          <View style={styles.row}>
            <TagPill label="Firebase 認証" tone="accent" />
            <TagPill label="2FA: 未設定" tone="warning" />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>パスワード再設定</Text>
          <Text style={styles.cardText}>
            登録済みのメールアドレス宛にリセット用リンクを送信します。
          </Text>
          <PrimaryButton
            label="送信する"
            onPress={() => undefined}
            variant="ocean"
          />
        </View>

          <PrimaryButton label="ログアウト" onPress={onSignOut} variant="dark" />
          <PrimaryButton
            label="アカウント削除"
            onPress={() => undefined}
            variant="danger"
            style={styles.deleteButton}
          />
        </ScrollView>
      </SafeAreaView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontFamily: typography.heading,
    fontSize: 26,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: typography.body,
    color: colors.inkSoft,
    marginTop: 4,
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
    fontSize: 14,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  cardLabel: {
    fontFamily: typography.mono,
    color: colors.ocean,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: spacing.xs,
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
  inlineButton: {
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
});
