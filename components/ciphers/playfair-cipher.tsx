'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from "lucide-react"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

export default function PlayfairCipher() {
  const [inputText, setInputText] = useState("")
  const [key, setKey] = useState("KEYWORD")
  const [outputText, setOutputText] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [matrix, setMatrix] = useState<string[][]>([])

  // useEffect(() => {
  //   if (inputText && key) {
  //     if (mode === "encrypt") {
  //       encrypt()
  //     } else {
  //       decrypt()
  //     }
  //   } else {
  //     setOutputText("")
  //     setSteps([])
  //     setMatrix([])
  //   }
  // }, [inputText, key, mode])

  const generateMatrix = (keyStr: string) => {
    let processedKey = keyStr.toUpperCase().replace(/[^A-Z]/g, "")
    processedKey = processedKey.replace(/J/g, "I")

    const matrix: string[][] = Array(5)
      .fill(null)
      .map(() => Array(5).fill(""))

    const usedChars = new Set<string>()

    let row = 0
    let col = 0

    for (let i = 0; i < processedKey.length; i++) {
      const char = processedKey[i]
      if (!usedChars.has(char)) {
        matrix[row][col] = char
        usedChars.add(char)
        col++
        if (col === 5) {
          col = 0
          row++
        }
      }
    }

    for (let i = 0; i < 26; i++) {
      const char = String.fromCharCode(65 + i)
      if (char !== "J" && !usedChars.has(char)) {
        matrix[row][col] = char
        usedChars.add(char)
        col++
        if (col === 5) {
          col = 0
          row++
        }
        if (row === 5) break
      }
    }

    return matrix
  }

  const findPosition = (matrix: string[][], char: string) => {
    if (char === "J") char = "I"

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        if (matrix[row][col] === char) {
          return { row, col }
        }
      }
    }
    return { row: -1, col: -1 }
  }

  const encrypt = () => {
    if (!inputText || !key) {
      setOutputText("")
      setSteps([])
      setMatrix([])
      return
    }

    const playfairMatrix = generateMatrix(key)
    setMatrix(playfairMatrix)

    let processedText = inputText.toUpperCase().replace(/[^A-Z]/g, "")
    processedText = processedText.replace(/J/g, "I")

    const newSteps: string[] = []
    newSteps.push(`🔒 Starting encryption with text: "${inputText}"`)
    newSteps.push(`📝 Processed to: "${processedText}"`)
    newSteps.push(`🔑 Using key: "${key}"`)

    newSteps.push("🔤 Generated Playfair matrix:")
    for (let i = 0; i < 5; i++) {
      newSteps.push(`  ${playfairMatrix[i].join(" ")}`)
    }

    const digraphs: string[][] = []
    let i = 0

    while (i < processedText.length) {
      if (i + 1 >= processedText.length) {
        digraphs.push([processedText[i], "X"])
        i++
      } else if (processedText[i] === processedText[i + 1]) {
        digraphs.push([processedText[i], "X"])
        i++
      } else {
        digraphs.push([processedText[i], processedText[i + 1]])
        i += 2
      }
    }

    newSteps.push(`📊 Digraphs: ${digraphs.map((pair) => pair.join("")).join(" ")}`)

    let result = ""

    for (const [char1, char2] of digraphs) {
      const pos1 = findPosition(playfairMatrix, char1)
      const pos2 = findPosition(playfairMatrix, char2)

      let newChar1: string, newChar2: string

      if (pos1.row === pos2.row) {
        newChar1 = playfairMatrix[pos1.row][(pos1.col + 1) % 5]
        newChar2 = playfairMatrix[pos2.row][(pos2.col + 1) % 5]
        newSteps.push(`  "${char1}${char2}" (same row) → "${newChar1}${newChar2}"`)
      } else if (pos1.col === pos2.col) {
        newChar1 = playfairMatrix[(pos1.row + 1) % 5][pos1.col]
        newChar2 = playfairMatrix[(pos2.row + 1) % 5][pos2.col]
        newSteps.push(`  "${char1}${char2}" (same column) → "${newChar1}${newChar2}"`)
      } else {
        newChar1 = playfairMatrix[pos1.row][pos2.col]
        newChar2 = playfairMatrix[pos2.row][pos1.col]
        newSteps.push(`  "${char1}${char2}" (rectangle) → "${newChar1}${newChar2}"`)
      }

      result += newChar1 + newChar2
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
      return
    }

    const playfairMatrix = generateMatrix(key)
    setMatrix(playfairMatrix)

    let processedText = inputText.toUpperCase().replace(/[^A-Z]/g, "")
    processedText = processedText.replace(/J/g, "I")

    const newSteps: string[] = []
    newSteps.push(`🔓 Starting decryption with cipher text: "${inputText}"`)
    newSteps.push(`📝 Processed to: "${processedText}"`)
    newSteps.push(`🔑 Using key: "${key}"`)

    newSteps.push("🔤 Generated Playfair matrix:")
    for (let i = 0; i < 5; i++) {
      newSteps.push(`  ${playfairMatrix[i].join(" ")}`)
    }

    // Split into digraphs
    const digraphs: string[][] = []
    for (let i = 0; i < processedText.length; i += 2) {
      if (i + 1 < processedText.length) {
        digraphs.push([processedText[i], processedText[i + 1]])
      }
    }

    newSteps.push(`📊 Digraphs: ${digraphs.map((pair) => pair.join("")).join(" ")}`)

    let result = ""

    for (const [char1, char2] of digraphs) {
      const pos1 = findPosition(playfairMatrix, char1)
      const pos2 = findPosition(playfairMatrix, char2)

      let newChar1: string, newChar2: string

      if (pos1.row === pos2.row) {
        // Same row - move left
        newChar1 = playfairMatrix[pos1.row][(pos1.col - 1 + 5) % 5]
        newChar2 = playfairMatrix[pos2.row][(pos2.col - 1 + 5) % 5]
        newSteps.push(`  "${char1}${char2}" (same row) → "${newChar1}${newChar2}"`)
      } else if (pos1.col === pos2.col) {
        // Same column - move up
        newChar1 = playfairMatrix[(pos1.row - 1 + 5) % 5][pos1.col]
        newChar2 = playfairMatrix[(pos2.row - 1 + 5) % 5][pos2.col]
        newSteps.push(`  "${char1}${char2}" (same column) → "${newChar1}${newChar2}"`)
      } else {
        // Rectangle - swap columns
        newChar1 = playfairMatrix[pos1.row][pos2.col]
        newChar2 = playfairMatrix[pos2.row][pos1.col]
        newSteps.push(`  "${char1}${char2}" (rectangle) → "${newChar1}${newChar2}"`)
      }

      result += newChar1 + newChar2
    }

    newSteps.push(`✅ Final decrypted text: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const reset = () => {
    setInputText("")
    setKey("KEYWORD")
    setOutputText("")
    setSteps([])
    setMatrix([])
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="mb-6">
              <Label className="text-white text-lg font-medium mb-4 block flex items-center gap-2">
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
                placeholder="Enter encryption key"
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

          {matrix.length > 0 && (
            <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <h3 className="text-md font-medium mb-3">Playfair Matrix</h3>
              <div className="grid grid-cols-1 gap-2">
                {matrix.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex">
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
        cipherName={'Playfair'}
        cipherText={{
          encryption: ` The Playfair cipher uses a 5×5 matrix of letters constructed using a keyword. Text is split into pairs,
              and each pair is encrypted based on their positions: same row (move right), same column (move down), or
              rectangle (swap columns).`,
          decryption: `To decrypt, we reverse the encryption rules: same row (move left), same column (move up), rectangle (swap
              columns). The matrix wraps around, so moving left from the first column goes to the last column.`
        }} />
    </div>
  )
}
