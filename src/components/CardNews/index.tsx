import { format } from 'date-fns';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Card, Paragraph, Text, Title, useTheme } from 'react-native-paper';

export interface Source {
  id?: any;
  name: string;
}

export interface INews {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: Date;
  content: string;
}

interface ICardNews {
  news: INews;
}

export const CardNews: React.FC<ICardNews> = ({ news }) => {
  const theme = useTheme();
  return (
    <Card style={styles.container}>
      <Card.Cover
        source={{
          uri: news.urlToImage,
        }}
        style={styles.cover}
      />
      <Card.Content>
        <Title style={styles.title}>{news.title}</Title>
        <Paragraph>{news.description}</Paragraph>
      </Card.Content>
      <Card.Actions>
        <Text
          variant="bodyMedium"
          style={{ color: theme.colors.surfaceVariant }}>
          {`${news.source.name}   -   ${format(
            new Date(news.publishedAt),
            'dd/MM/yyyy',
          )}`}
        </Text>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
  },
  cover: {
    height: 175,
  },
  title: {
    fontWeight: '600',
  },
});
