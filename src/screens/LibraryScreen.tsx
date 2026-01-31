import React, { useMemo, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { AtmosphericBackground } from '../components/AtmosphericBackground';
import { ChannelSwitch } from '../components/ChannelSwitch';
import { PaperCard } from '../components/PaperCard';
import { PrimaryButton } from '../components/PrimaryButton';
import { Paper, PaperLanguage } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  papers: Paper[];
  onSelectPaper: (paper: Paper) => void;
  onCreatePaper: () => void;
};

export function LibraryScreen({ papers, onSelectPaper, onCreatePaper }: Props) {
  const [channel, setChannel] = useState<PaperLanguage>('ja');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return papers.filter((paper) => {
      const matchesLang = paper.language === channel;
      const matchesQuery =
        paper.title.toLowerCase().includes(query.toLowerCase()) ||
        paper.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchesLang && matchesQuery;
    });
  }, [papers, channel, query]);

  return (
    <AtmosphericBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Paper Vault</Text>
            <Text style={styles.subtitle}>翻訳・要約・整理のダッシュボード</Text>
          </View>
          <PrimaryButton label="追加" onPress={onCreatePaper} />
        </View>
        <ChannelSwitch value={channel} onChange={setChannel} />
        <TextInput
          placeholder="タイトル・タグで検索"
          placeholderTextColor={colors.inkSoft}
          value={query}
          onChangeText={setQuery}
          style={styles.search}
        />
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <PaperCard paper={item} onPress={() => onSelectPaper(item)} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyText}>該当する論文が見つかりません。</Text>
            </View>
          }
        />
      </SafeAreaView>
    </AtmosphericBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
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
  },
  search: {
    backgroundColor: colors.white,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
    fontFamily: typography.body,
    color: colors.ink,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  empty: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: {
    fontFamily: typography.body,
    color: colors.inkSoft,
  },
});
