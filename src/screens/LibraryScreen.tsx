import React, { useMemo, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  LayoutChangeEvent,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
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
  const [pageWidth, setPageWidth] = useState(Dimensions.get('window').width);
  const pagerRef = useRef<ScrollView>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const filterPapers = (lang: PaperLanguage) => {
    return papers.filter((paper) => {
      const matchesLang = paper.language === lang;
      const matchesQuery =
        paper.title.toLowerCase().includes(query.toLowerCase()) ||
        paper.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase()));
      return matchesLang && matchesQuery;
    });
  };

  const filteredJa = useMemo(() => filterPapers('ja'), [papers, query]);
  const filteredEn = useMemo(() => filterPapers('en'), [papers, query]);

  const handleChannelChange = (next: PaperLanguage) => {
    setChannel(next);
    const xOffset = next === 'ja' ? 0 : pageWidth;
    pagerRef.current?.scrollTo({ x: xOffset, animated: true });
  };

  const handlePagerLayout = (event: LayoutChangeEvent) => {
    const width = event.nativeEvent.layout.width;
    setPageWidth(width);
    pagerRef.current?.scrollTo({
      x: channel === 'ja' ? 0 : width,
      animated: false,
    });
  };

  const handlePagerScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = pageWidth ? Math.round(offsetX / pageWidth) : 0;
    const next = index === 0 ? 'ja' : 'en';
    if (next !== channel) {
      setChannel(next);
    }
  };

  return (
    <AtmosphericBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Seitone</Text>
              <Text style={styles.subtitle}>翻訳・要約・整理のダッシュボード</Text>
            </View>
            <PrimaryButton label="＋追加" onPress={onCreatePaper} />
          </View>
          <ChannelSwitch
            value={channel}
            onChange={handleChannelChange}
            scrollX={scrollX}
            pageWidth={pageWidth}
          />
          <TextInput
            placeholder="タイトル・タグで検索"
            placeholderTextColor={colors.placeholder}
            value={query}
            onChangeText={setQuery}
            style={styles.search}
          />
        </View>
        <View style={styles.pager} onLayout={handlePagerLayout}>
          <Animated.ScrollView
            ref={pagerRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={handlePagerScrollEnd}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
          >
            <View style={[styles.page, { width: pageWidth }]}>
              <FlatList
                data={filteredJa}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PaperCard paper={item} onPress={() => onSelectPaper(item)} />
                )}
                contentContainerStyle={[styles.list, styles.listContent]}
                ListEmptyComponent={
                  <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                      該当する論文が見つかりません。
                    </Text>
                  </View>
                }
              />
            </View>
            <View style={[styles.page, { width: pageWidth }]}>
              <FlatList
                data={filteredEn}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PaperCard paper={item} onPress={() => onSelectPaper(item)} />
                )}
                contentContainerStyle={[styles.list, styles.listContent]}
                ListEmptyComponent={
                  <View style={styles.empty}>
                    <Text style={styles.emptyText}>
                      該当する論文が見つかりません。
                    </Text>
                  </View>
                }
              />
            </View>
          </Animated.ScrollView>
        </View>
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
  pager: {
    flex: 1,
  },
  page: {
    flex: 1,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
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
