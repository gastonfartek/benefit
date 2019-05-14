/** @jsx jsx */
import { useEffect } from "react"
import { Code } from "docz"
import { css } from "emotion"
import { jsx } from "../../dist/react"
import benefit from "../../dist/benefit"
import { formatDeclaration } from "../../src/createUtilitiesFromConfig"
import Grid from "./Grid"
import Icon from "./Icons"
import BrowserBox from "./BrowserBox"

const { utilities, styleWith } = benefit()

export default function Output({
  utilityClasses = ["bg-blue-500", "text-white", "p-8"],
}) {
  const styles = utilityClasses.map((className) => {
    const declarations = utilities[className]

    const rules = Object.keys(declarations).map((property) =>
      formatDeclaration(property, declarations[property])
    )

    return {
      selector: css`
        ${rules}
      `,
      rules,
    }
  })

  return (
    <div>
      <div className="bg-white rounded shadow-xl overflow-hidden">
        <div className="bg-gray-700 text-gray-100 items-center text-sm justify-center flex p-4">
          <div className="font-mono">
            {"<div class='"}
            <div className="bg-white inline-block px-2 py-1 rounded-sm text-gray-800">
              {utilityClasses.join(" ")}
            </div>
            {"'>...<div>"}
          </div>
        </div>
        <div className="text-gray-800 p-4">
          Utility classes are parsed and converted into css declarations with
          deterministic hashes.
        </div>
      </div>
      <div className="flex flex-auto justify-center text-gray-800 py-4">
        <Icon name="arrow-down" />
      </div>
      <div className="bg-white rounded shadow-xl overflow-hidden">
        <Grid minWidth="200px" className="p-4 bg-gray-700">
          {styles.map((block) => (
            <div
              style={{ fontSize: "10px" }}
              className="bg-white font-mono p-2 rounded shadow"
            >
              <pre>
                <code className="block py-1">
                  .{block.selector} {"{"}
                </code>
                {block.rules.map((rule) => (
                  <code className="block py-1">
                    {"  "}
                    {rule}
                  </code>
                ))}
                <code className="block py-1">{"}"}</code>
              </pre>
            </div>
          ))}
        </Grid>
        <div className="text-gray-800 p-4">
          These converted declarations are inserted into the DOM and the
          targeted elements are given the new hash names as classes.
        </div>
      </div>
      <div className="flex flex-auto justify-center text-gray-800 py-4">
        <Icon name="arrow-down" />
      </div>
      <div className="bg-white rounded shadow-xl overflow-hidden">
        <div className="bg-gray-700 text-gray-100 items-center text-sm justify-center flex p-4">
          <div className="font-mono">
            {"<div class='"}
            <div className="bg-white inline-block px-2 py-1 rounded-sm text-gray-800">
              {styles.map((declaration) => declaration.selector).join(" ")}
            </div>
            {"'>...<div>"}
          </div>
        </div>
        <div className="text-gray-800 p-4">
          Declarations are only inserted once so many elements can dynamically
          use the same utility class with one insert.
        </div>
      </div>
      <div>
        <div className="flex flex-auto justify-center text-gray-800 py-4">
          <Icon name="arrow-down" />
        </div>
        <div className={utilityClasses.join(" ")}>
          Lorem ipsum dolor sit amet, pro ad iudico disputationi, stet unum sale
          ei sea, an stet populo nominati sed. Eos unum munere voluptatum ex,
          ludus vituperata ad per, pri diam aeque aliquip ut. Dolores persecuti
          conceptam ei vis, duo ne clita saepe comprehensam, id mel ipsum novum.
          Duo eu reque mollis aperiri, pro discere vivendo id, ea vel scripta
          deleniti. Vel alii moderatius accommodare no, mel ex fastidii
          gloriatur. Sit ea recteque contentiones.
        </div>
      </div>
    </div>
  )
}
