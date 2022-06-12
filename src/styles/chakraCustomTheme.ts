import { theme, extendTheme } from "@chakra-ui/react";
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

const customTheme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  styles: {
    global: (props) => ({
      "html, body": {
        fontSize: "95%",
        fontFamily: "Manrope, sans-serif",
        // color: props.colorMode === "light" ? "gray.800" : "gray.200",
        color: "black"
        // rounded: "none"
        // lineHeight: "tall",
      },

      // "*:focus": {
      //   boxShadow: "none !important"
      // },

      // Eric: only used in ListItem
      ".boxText" : {
        textColor: props.colorMode === "light" ? "gray.800" : "gray.200",
        fontSize: "lg",
      }
    })
  },
  fonts: {
    ...theme.fonts,
    /** Example */
    // body: "Work Sans, sans-serif",
    // heading: "Markazi Text, serif",
  },
  colors: {
    ...theme.colors,
    secondary: "#292929",
    /** Example */
    // teal: {
    //   ...theme.colors.teal,
    //   700: "#005661",
    //   500: "#00838e",
    //   300: "#4fb3be",
    // },
    primary: {
      100: "#e35453",
      200: "#e35453",
      300: "#e35453",
      400: "#e35453",
      500: "#e35453",
      700: "#e66665",
      800: "#e66665",
      900: "#e66665"
    }
  },
  // borders: {
  //   ...theme.borders,
  //   "primary": {
  //     borderColor: 'red'
  //     // ".carouselSliderBorder": {
  //     //   //   border: props.colorMode === "light" ? props.theme.borders['2px'] : props.theme.borders['4px'],
  //     //   //   borderColor: props.colorMode === "light" ? "gray.800" : "#DCC87F"
  //     //   // },
  //   }
  // },
  components: {
    Text: {
      baseStyle: {
        color: 'black',
        fontSize: "15"
      }
    },
    Button: {
      baseStyle: {
        _hover: {
          // color: "gray.200",
          color: 'gray.200'
        },
        _focus: {
          boxShadow: 'none',
          outline: 'none',
          // borderWidth: '2px',
          transition: 'none'
        }
      }
    },
    Input: {
      sizes: {},
      defaultProps: {},
      variants: {
        outline: {
          field: {
            borderColor: '#292929',
            borderWidth: '1px',
            _hover: {
              borderColor: '#292929'
            },
            _focus: {
              boxShadow: 'none',
              outline: 'none',
              borderColor: 'primary.100',
              borderWidth: '2px',
              transition: 'none'
            }
          }
        }
      }
    },
    Steps, // From 'chakra-ui-steps' package
  }
});

export default customTheme;
