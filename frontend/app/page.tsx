import Image from 'next/image';
import TypeAhead from './components/TypeAhead';
import TimeSeriesChart from './components/TimeSeriesChart';
import { Box, Container, Section } from '@radix-ui/themes';
import { Component } from 'react';

export default function Home() {
  return (
    <Container size="1" px="4">
      <Section size="1" className="mx-auto">
        <TypeAhead />
      </Section>
      <Section size="1" className="mx-auto">
        <TimeSeriesChart />
      </Section>
    </Container>
  );
}
