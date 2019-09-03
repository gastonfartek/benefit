import App from "next/app"
import Head from "next/head"
import { ConfigProvider, StylesContainer } from "benefit-react"
import polychrome from "polychrome"

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    const primary = "#232323"

    const colors = {
      primary,
      "primary-contrast": polychrome(primary)
        .contrast()
        .hex(),
    }

    return (
      <ConfigProvider
        config={(config) => ({
          ...config,
          injectPreflight: true,
          theme: {
            ...config.theme,
            backgroundColor: {
              ...config.theme.backgroundColor,
              ...colors,
            },
            textColor: {
              ...config.theme.textColor,
              ...colors,
            },
          },
        })}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    )
  }
}
