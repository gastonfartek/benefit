import createVariant from "../createVariant"

export default function generate(utilityMap: any) {
  return createVariant(
    utilityMap,
    (value: string) => ({
      "&:focus": value,
    }),
    "focus"
  )
}
