import { css } from "emotion"
import defaultConfig from "./config/defaultConfig"

function formatDeclaration(property, value, isImportant) {
  const declaration = `${property}: ${value}`
  return `${declaration}${isImportant ? " !important" : ""};`
}

function parseDeclarations(declarations = {}, isImportant = false) {
  return Object.keys(declarations).map((property) => {
    if (property.indexOf("&") > -1 || property.indexOf("@") > -1) {
      // Assume we have a nested selector
      const nestedDeclarations = parseDeclarations(
        declarations[property],
        isImportant
      )

      return `${property} { ${nestedDeclarations.join("")} }`
    }

    return formatDeclaration(property, declarations[property], isImportant)
  })
}

function createUtilityMap(allUtilities = [], theme) {
  return allUtilities
    .map((utilityFn) => utilityFn(theme))
    .reduce((allRules, utility) => ({ ...allRules, ...utility }), {})
}

function createVariantMap(allVariants = [], utilityMap = {}, theme) {
  return allVariants
    .map((variantFn) => variantFn(utilityMap, theme))
    .reduce((allRules, variant) => ({ ...allRules, ...variant }), {})
}

export default function createUtilitiesFromConfig(configFn = (cfg) => cfg) {
  const config = configFn(defaultConfig)

  const {
    theme = {},
    reset = () => ({}),
    utilities = [],
    variants = [],
    apply = {},
  } = config

  const generatedUtilities = createUtilityMap(utilities, theme)

  const generatedVariants = createVariantMap(
    variants,
    generatedUtilities,
    theme
  )

  const utilityClasses = {
    ...generatedUtilities,
    ...generatedVariants,
  }

  const styleWith = (classNames = "", isImportant = false) => {
    const resetStyles = parseDeclarations(reset(theme), isImportant).join("")

    const passThroughClasses = classNames
      .split(" ")
      .filter((name) => !utilities[name])

    const activeApply = classNames.split(" ").filter((name) => apply[name])

    const defaultResetClass = css`
      ${resetStyles}
    `

    const activeUtilities = classNames
      .split(" ")
      .filter((className) => utilityClasses[className])
      .concat(
        activeApply.reduce(
          (allApply, composite) => allApply.concat(apply[composite]),
          []
        )
      )
      .reduce(
        (allActiveUtilityClasses, className) =>
          allActiveUtilityClasses.concat(
            css`
              ${parseDeclarations(utilityClasses[className]).join("")}
            `
          ),
        []
      )

    return `${defaultResetClass} ${activeUtilities.join(
      " "
    )} ${passThroughClasses.join(" ")}`
  }

  return {
    config,
    utilities: utilityClasses,
    styleWith,
  }
}
