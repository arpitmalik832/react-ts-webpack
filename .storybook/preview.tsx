import React from 'react';
import { StoryFn } from '@storybook/react';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: StoryFn) => (
    <div style={{ margin: '3em' }}>
      <Story />
    </div>
  ),
];
