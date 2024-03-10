import Image from 'next/image';
import TypeAhead from './components/TypeAhead';
import TimeSeriesChart from './components/TimeSeriesChart';
import { Box, Container, Section } from '@radix-ui/themes';
import { Component } from 'react';
import PlayerPool from './components/PlayerPool';

export default function Home() {
  return (
    <Container size="1" px="4">
      <TypeAhead />
      <PlayerPool />
      <TimeSeriesChart />
    </Container>
  );
}
