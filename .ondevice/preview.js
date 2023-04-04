import { withBackgrounds } from "@storybook/addon-ondevice-backgrounds";

export const decorators = [withBackgrounds];
export const parameters = {
  backgrounds: [
    { name: "plain", value: "white", default: true },
    { name: "warm", value: "hotpink" },
    { name: "cool", value: "deepskyblue" },
  ],
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
