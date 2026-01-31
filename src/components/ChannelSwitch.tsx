import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PaperLanguage } from '../types';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = {
  value: PaperLanguage;
  onChange: (value: PaperLanguage) => void;
  scrollX?: Animated.Value;
  pageWidth?: number;
};

const PILL_PADDING = 4;

export function ChannelSwitch({ value, onChange, scrollX, pageWidth }: Props) {
  const [width, setWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  const indicatorWidth = width ? (width - PILL_PADDING * 2) / 2 : 0;
  const scrollProgress = useMemo(() => {
    if (!scrollX || !pageWidth) {
      return null;
    }
    return Animated.divide(scrollX, pageWidth);
  }, [pageWidth, scrollX]);

  const indicatorTranslateX = useMemo(() => {
    if (!indicatorWidth) {
      return translateX;
    }
    if (!scrollProgress) {
      return translateX;
    }
    return scrollProgress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, indicatorWidth],
      extrapolate: 'clamp',
    });
  }, [indicatorWidth, scrollProgress, translateX]);

  useEffect(() => {
    if (!indicatorWidth) {
      return;
    }
    if (scrollProgress) {
      return;
    }
    const toValue = value === 'ja' ? 0 : indicatorWidth;
    Animated.timing(translateX, {
      toValue,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [indicatorWidth, scrollProgress, translateX, value]);

  const handleLayout = (event: LayoutChangeEvent) => {
    setWidth(event.nativeEvent.layout.width);
  };

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {indicatorWidth > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.indicator,
            {
              width: indicatorWidth,
              transform: [{ translateX: indicatorTranslateX }],
            },
          ]}
        />
      )}
      {(['ja', 'en'] as PaperLanguage[]).map((lang) => {
        const active = value === lang;
        return (
          <TouchableOpacity
            key={lang}
            style={styles.option}
            onPress={() => onChange(lang)}
          >
            <Text style={[styles.text, active && styles.textActive]}>
              {lang === 'ja' ? '日本語論文' : 'English Paper'}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.clayDeep,
    borderRadius: 999,
    padding: PILL_PADDING,
    marginBottom: spacing.md,
  },
  indicator: {
    position: 'absolute',
    top: PILL_PADDING,
    bottom: PILL_PADDING,
    left: PILL_PADDING,
    borderRadius: 999,
    backgroundColor: colors.ocean,
  },
  option: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 999,
    alignItems: 'center',
  },
  text: {
    fontFamily: typography.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
  textActive: {
    color: colors.white,
    fontWeight: '600',
  },
});
