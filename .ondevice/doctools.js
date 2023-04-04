import { extractArgTypes } from "@storybook/react/dist/modern/client/docs/extractArgTypes";
import { addArgTypesEnhancer, addParameters } from "@storybook/react-native";
import { enhanceArgTypes } from "@storybook/docs-tools";

addArgTypesEnhancer(enhanceArgTypes);
addParameters({
  docs: {
    extractArgTypes,
  },
});
