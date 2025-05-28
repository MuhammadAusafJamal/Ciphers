'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from "lucide-react"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

export default function ColumnarCipher() {
  const [inputText, setInputText] = useState("")
  const [key, setKey] = useState("ZEBRA")
  const [outputText, setOutputText] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [matrix, setMatrix] = useState<string[][]>([])
  const [keyOrder, setKeyOrder] = useState<number[]>([])

  const getKeyOrder = (keyStr: string) => {
    const keyChars = keyStr
      .toUpperCase()
      .replace(/[^A-Z]/g, "")
      .split("")
    const sortedChars = [...keyChars].sort()
    return keyChars.map((char) => sortedChars.indexOf(char) + 1)
  }

  const encrypt = () => {
    if (!inputText || !key) {
      setOutputText("")
      setSteps([])
      setMatrix([])
      setKeyOrder([])
      return
    }

    const filteredKey = key.toUpperCase().replace(/[^A-Z]/g, "")
    const filteredText = inputText.replace(/[^a-zA-Z]/g, "").toUpperCase()

    if (filteredKey.length === 0) {
      setOutputText("Key must contain at least one letter")
      setSteps(["Error: Key must contain at least one letter"])
      return
    }

    const newSteps: string[] = []
    const columns = filteredKey.length
    const rows = Math.ceil(filteredText.length / columns)

    newSteps.push(`🔒 Starting encryption with text: "${inputText}"`)
    newSteps.push(`🔑 Using key: "${filteredKey}"`)
    newSteps.push(`📝 Filtered text: "${filteredText}"`)

    // Get key order
    const order = getKeyOrder(filteredKey)
    setKeyOrder(order)
    newSteps.push(`🔢 Key order: ${order.join(", ")}`)

    // Create matrix
    const newMatrix: string[][] = []
    let charIndex = 0

    for (let i = 0; i < rows; i++) {
      const row: string[] = []
      for (let j = 0; j < columns; j++) {
        if (charIndex < filteredText.length) {
          row.push(filteredText[charIndex])
          charIndex++
        } else {
          row.push("X") // Padding
        }
      }
      newMatrix.push(row)
    }

    setMatrix(newMatrix)

    // Display matrix
    newSteps.push(`📊 Creating ${rows}×${columns} matrix:`)
    newSteps.push(`    ${filteredKey.split("").join("  ")}`)
    for (let i = 0; i < rows; i++) {
      newSteps.push(`    ${newMatrix[i].join("  ")}`)
    }

    // Read columns in key order
    let result = ""
    const sortedIndices = order.map((_, index) => index).sort((a, b) => order[a] - order[b])

    newSteps.push(`🔀 Reading columns in order:`)
    for (const colIndex of sortedIndices) {
      let columnText = ""
      for (let row = 0; row < rows; row++) {
        columnText += newMatrix[row][colIndex]
      }
      result += columnText
      newSteps.push(`  Column ${colIndex + 1} (${filteredKey[colIndex]}): ${columnText}`)
    }

    newSteps.push(`✅ Final encrypted text: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const decrypt = () => {
    if (!inputText || !key) {
      setOutputText("")
      setSteps([])
      setMatrix([])
      setKeyOrder([])
      return
    }

    const filteredKey = key.toUpperCase().replace(/[^A-Z]/g, "")
    const filteredText = inputText.replace(/[^a-zA-Z]/g, "").toUpperCase()

    if (filteredKey.length === 0) {
      setOutputText("Key must contain at least one letter")
      setSteps(["Error: Key must contain at least one letter"])
      return
    }

    const newSteps: string[] = []
    const columns = filteredKey.length
    const rows = Math.ceil(filteredText.length / columns)

    newSteps.push(`🔓 Starting decryption with cipher text: "${filteredText}"`)
    newSteps.push(`🔑 Using key: "${filteredKey}"`)

    // Get key order
    const order = getKeyOrder(filteredKey)
    setKeyOrder(order)
    newSteps.push(`🔢 Key order: ${order.join(", ")}`)

    // Create empty matrix
    const newMatrix: string[][] = Array(rows)
      .fill(null)
      .map(() => Array(columns).fill(""))

    // Fill matrix by columns in key order
    const sortedIndices = order.map((_, index) => index).sort((a, b) => order[a] - order[b])
    let charIndex = 0

    newSteps.push(`📊 Filling matrix by columns in key order:`)
    for (const colIndex of sortedIndices) {
      for (let row = 0; row < rows; row++) {
        if (charIndex < filteredText.length) {
          newMatrix[row][colIndex] = filteredText[charIndex]
          charIndex++
        }
      }
      const columnText = newMatrix.map((row) => row[colIndex]).join("")
      newSteps.push(`  Column ${colIndex + 1} (${filteredKey[colIndex]}): ${columnText}`)
    }

    setMatrix(newMatrix)

    // Display reconstructed matrix
    newSteps.push(`📊 Reconstructed matrix:`)
    newSteps.push(`    ${filteredKey.split("").join("  ")}`)
    for (let i = 0; i < rows; i++) {
      newSteps.push(`    ${newMatrix[i].join("  ")}`)
    }

    // Read matrix row by row
    let result = ""
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        if (newMatrix[i][j] !== "X") {
          result += newMatrix[i][j]
        }
      }
    }

    newSteps.push(`✅ Reading rows left to right: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const reset = () => {
    setInputText("")
    setKey("ZEBRA")
    setOutputText("")
    setSteps([])
    setMatrix([])
    setKeyOrder([])
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="mb-6">
              <Label className="text-white text-lg font-medium mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></span>
                Mode Selection
              </Label>
              <ToggleGroup
                type="single"
                value={mode}
                onValueChange={(value) => value && setMode(value as "encrypt" | "decrypt")}
                className="grid grid-cols-2 gap-2"
              >
                <ToggleGroupItem
                  onClick={encrypt}
                  value="encrypt"
                  className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-teal-500 data-[state=on]:to-teal-600 data-[state=on]:text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt
                </ToggleGroupItem>
                <ToggleGroupItem
                  onClick={decrypt}
                  value="decrypt"
                  className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-purple-600 data-[state=on]:text-white"
                >
                  <Unlock className="w-4 h-4 mr-2" />
                  Decrypt
                </ToggleGroupItem>
              </ToggleGroup>
            </div>

            <div className="mb-6">
              <Label htmlFor="inputText" className="text-white text-lg font-medium mb-3 block">
                {mode === "encrypt" ? "Plain Text" : "Cipher Text"}
              </Label>
              <Input
                id="inputText"
                placeholder={mode === "encrypt" ? "Enter text to encrypt" : "Enter text to decrypt"}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-slate-900/50 border-slate-700/50 text-white text-lg p-4 rounded-lg"
              />
            </div>

            <div className="mb-6">
              <Label htmlFor="key" className="text-white text-lg font-medium mb-3 block">
                Key
              </Label>
              <Input
                id="key"
                placeholder="Enter column key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                className="bg-slate-900/50 border-slate-700/50 text-white text-lg p-4 rounded-lg"
              />
              <p className="text-xs text-slate-400 mt-2">Only alphabetic characters will be used from the key</p>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={mode === "encrypt" ? encrypt : decrypt}
                className="bg-gradient-to-r from-teal-500 to-purple-500 hover:from-teal-600 hover:to-purple-600 text-white flex-1"
              >
                {mode === "encrypt" ? (
                  <>
                    <ArrowRight className="mr-2 h-4 w-4" /> Encrypt
                  </>
                ) : (
                  <>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Decrypt
                  </>
                )}
              </Button>
              <Button onClick={reset} variant="outline" className="border-slate-600 hover:bg-slate-700">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </div>

        <div>
          <CipherResult cipherText={outputText} steps={steps} mode={mode} />

          {matrix.length > 0 && keyOrder.length > 0 && (
            <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <h3 className="text-md font-medium mb-3">Columnar Matrix</h3>
              <div className="font-mono text-sm">
                {/* Key row */}
                <div className="flex mb-2">
                  <div className="w-8"></div>
                  {key
                    .toUpperCase()
                    .replace(/[^A-Z]/g, "")
                    .split("")
                    .map((char, index) => (
                      <div key={index} className="w-8 text-center text-teal-400 font-bold">
                        {char}
                      </div>
                    ))}
                </div>
                {/* Order row */}
                <div className="flex mb-3">
                  <div className="w-8"></div>
                  {keyOrder.map((order, index) => (
                    <div key={index} className="w-8 text-center text-purple-400 text-xs">
                      {order}
                    </div>
                  ))}
                </div>
                {/* Matrix rows */}
                {matrix.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
                    <div className="w-8 text-slate-400 text-xs flex items-center">R{rowIndex + 1}</div>
                    {row.map((cell, cellIndex) => (
                      <div
                        key={cellIndex}
                        className="w-8 h-8 flex items-center justify-center border border-slate-600 bg-slate-800 text-white"
                      >
                        {cell}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <CipherWorking
        cipherName={'Columnar'}
        cipherText={{
          encryption: `The Columnar cipher arranges the plaintext in a grid with columns determined by a keyword. The columns are
              then read in alphabetical order of the keyword letters to produce the ciphertext.`,
          decryption: `To decrypt, we determine the column order from the keyword, fill the matrix column by column with the
              ciphertext, then read the matrix row by row to recover the original message.`
        }} />

    </div>
  )
}
