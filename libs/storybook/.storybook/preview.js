import './styles.css';

export const parameters = {
  backgrounds: { disable: true },
  themes: {
    clearable: false,
    list: [
      {
        name: 'Default',
        class: 'theme-default',
        color: '#105a8f',
        default: true,
      },
      { name: 'Theme One', class: 'theme-one', color: '#9564b8' },
      { name: 'Theme Two', class: 'theme-two', color: '#E08700' },
    ],
  },
};
