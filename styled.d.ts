import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    breakpoints: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
  }
}
