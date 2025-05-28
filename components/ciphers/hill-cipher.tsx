'use client'

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

const DEFAULT_2X2_MATRIX = [
  [2, 3],
  [1, 4],
]

const DEFAULT_3X3_MATRIX = [
  [2, 3, 1],
  [4, 5, 6],
  [7, 8, 9],
]

export default function HillCipher() {
  const [inputText, setInputText] = useState("")
  const [matrixSize, setMatrixSize] = useState("2")
  const [keyMatrix, setKeyMatrix] = useState<number[][]>(DEFAULT_2X2_MATRIX)
  const [outputText, setOutputText] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [error, setError] = useState("")
  const [mounted, setMounted] = useState(false)

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Initialize default matrices when size changes
    if (matrixSize === "2") {
      setKeyMatrix(DEFAULT_2X2_MATRIX.map(row => [...row]))
    } else if (matrixSize === "3") {
      setKeyMatrix(DEFAULT_3X3_MATRIX.map(row => [...row]))
    }
  }, [matrixSize])

  // useEffect(() => {
  //   if (mounted && inputText && keyMatrix.length > 0 && keyMatrix[0]?.length > 0) {
  //     if (mode === "encrypt") {
  //       encrypt()
  //     } else {
  //       decrypt()
  //     }
  //   } else {
  //     setOutputText("")
  //     setSteps([])
  //     setError("")
  //   }
  // }, [inputText, keyMatrix, matrixSize, mode, mounted])

  const handleMatrixChange = (row: number, col: number, value: string) => {
    const newValue = Number.parseInt(value) || 0
    const newMatrix = keyMatrix.map(r => [...r])

    // Ensure the matrix structure exists
    if (newMatrix[row] && typeof newMatrix[row][col] !== 'undefined') {
      newMatrix[row][col] = newValue
      setKeyMatrix(newMatrix)
    }
  }

  const modInverse = (a: number, m: number): number => {
    for (let i = 1; i < m; i++) {
      if ((a * i) % m === 1) {
        return i
      }
    }
    return -1
  }

  const determinant2x2 = (matrix: number[][]): number => {
    return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
  }

  const getInverseMatrix2x2 = (matrix: number[][]): number[][] | null => {
    const det = determinant2x2(matrix)
    const detInv = modInverse(((det % 26) + 26) % 26, 26)

    if (detInv === -1) {
      return null
    }

    return [
      [(matrix[1][1] * detInv) % 26, (-matrix[0][1] * detInv + 26 * detInv) % 26],
      [(-matrix[1][0] * detInv + 26 * detInv) % 26, (matrix[0][0] * detInv) % 26],
    ]
  }

  const encrypt = () => {
    if (!inputText || keyMatrix.length === 0) {
      setOutputText("")
      setSteps([])
      setError("")
      return
    }

    const size = Number.parseInt(matrixSize)
    const newSteps: string[] = []

    const filteredText = inputText.toUpperCase().replace(/[^A-Z]/g, "")

    newSteps.push(`🔒 Starting encryption with text: "${inputText}"`)
    newSteps.push(`📝 Filtered to: "${filteredText}"`)
    newSteps.push(`🔢 Using ${size}×${size} key matrix:`)

    for (let i = 0; i < size; i++) {
      newSteps.push(`  [${keyMatrix[i].join(", ")}]`)
    }

    const remainder = filteredText.length % size
    let paddedText = filteredText
    if (remainder !== 0) {
      const padding = size - remainder
      paddedText += "X".repeat(padding)
      newSteps.push(`📝 Padding text with ${padding} 'X's: "${paddedText}"`)
    }

    const textVector: number[] = []
    for (let i = 0; i < paddedText.length; i++) {
      textVector.push(paddedText.charCodeAt(i) - 65)
    }

    newSteps.push(`🔢 Converting to numbers: [${textVector.join(", ")}]`)

    let result = ""

    try {
      for (let i = 0; i < textVector.length; i += size) {
        const block = textVector.slice(i, i + size)
        newSteps.push(`📊 Processing block: [${block.join(", ")}]`)

        const resultBlock: number[] = []
        for (let row = 0; row < size; row++) {
          let sum = 0
          for (let col = 0; col < size; col++) {
            sum += keyMatrix[row][col] * block[col]

            if (col === 0) {
              newSteps.push(`  Row ${row + 1}: ${keyMatrix[row][col]} × ${block[col]}`)
            } else {
              newSteps[newSteps.length - 1] += ` + ${keyMatrix[row][col]} × ${block[col]}`
            }
          }

          sum = sum % 26
          resultBlock.push(sum)
          newSteps[newSteps.length - 1] += ` = ${sum} (mod 26)`
        }

        for (let j = 0; j < resultBlock.length; j++) {
          result += String.fromCharCode(resultBlock[j] + 65)
        }

        newSteps.push(`✅ Result block: [${resultBlock.join(", ")}] → "${result.slice(-size)}"`)
      }

      newSteps.push(`🎯 Final encrypted text: "${result}"`)
      setOutputText(result)
      setSteps(newSteps)
      setError("")
    } catch (err) {
      setError("Error in encryption. Check your key matrix.")
      setOutputText("")
      setSteps([])
    }
  }

  const decrypt = () => {
    if (!inputText || keyMatrix.length === 0) {
      setOutputText("")
      setSteps([])
      setError("")
      return
    }

    const size = Number.parseInt(matrixSize)
    const newSteps: string[] = []

    if (size !== 2) {
      setError("Decryption currently only supports 2×2 matrices")
      setOutputText("")
      setSteps([])
      return
    }

    const filteredText = inputText.toUpperCase().replace(/[^A-Z]/g, "")

    newSteps.push(`🔓 Starting decryption with cipher text: "${filteredText}"`)
    newSteps.push(`🔢 Using ${size}×${size} key matrix:`)

    for (let i = 0; i < size; i++) {
      newSteps.push(`  [${keyMatrix[i].join(", ")}]`)
    }

    // Calculate inverse matrix
    const inverseMatrix = getInverseMatrix2x2(keyMatrix)
    if (!inverseMatrix) {
      setError("Matrix is not invertible (determinant has no inverse mod 26)")
      setOutputText("")
      setSteps([])
      return
    }

    newSteps.push(`🔄 Inverse matrix:`)
    for (let i = 0; i < size; i++) {
      newSteps.push(`  [${inverseMatrix[i].join(", ")}]`)
    }

    const textVector: number[] = []
    for (let i = 0; i < filteredText.length; i++) {
      textVector.push(filteredText.charCodeAt(i) - 65)
    }

    newSteps.push(`🔢 Converting to numbers: [${textVector.join(", ")}]`)

    let result = ""

    try {
      for (let i = 0; i < textVector.length; i += size) {
        const block = textVector.slice(i, i + size)
        newSteps.push(`📊 Processing block: [${block.join(", ")}]`)

        const resultBlock: number[] = []
        for (let row = 0; row < size; row++) {
          let sum = 0
          for (let col = 0; col < size; col++) {
            sum += inverseMatrix[row][col] * block[col]

            if (col === 0) {
              newSteps.push(`  Row ${row + 1}: ${inverseMatrix[row][col]} × ${block[col]}`)
            } else {
              newSteps[newSteps.length - 1] += ` + ${inverseMatrix[row][col]} × ${block[col]}`
            }
          }

          sum = ((sum % 26) + 26) % 26
          resultBlock.push(sum)
          newSteps[newSteps.length - 1] += ` = ${sum} (mod 26)`
        }

        for (let j = 0; j < resultBlock.length; j++) {
          result += String.fromCharCode(resultBlock[j] + 65)
        }

        newSteps.push(`✅ Result block: [${resultBlock.join(", ")}] → "${result.slice(-size)}"`)
      }

      newSteps.push(`🎯 Final decrypted text: "${result}"`)
      setOutputText(result)
      setSteps(newSteps)
      setError("")
    } catch (err) {
      setError("Error in decryption. Check your key matrix.")
      setOutputText("")
      setSteps([])
    }
  }

  const reset = () => {
    setInputText("")
    if (matrixSize === "2") {
      setKeyMatrix([
        [2, 3],
        [1, 4],
      ])
    } else {
      setKeyMatrix([
        [2, 3, 1],
        [4, 5, 6],
        [7, 8, 9],
      ])
    }
    setOutputText("")
    setSteps([])
    setError("")
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-slate-400">Loading...</div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            {/* Mode selection */}
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

            {/* Input text */}
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

            {/* Matrix size */}
            <div className="mb-6">
              <Label htmlFor="matrixSize" className="text-white text-lg font-medium mb-3 block">
                Matrix Size
              </Label>
              <Select value={matrixSize} onValueChange={setMatrixSize}>
                <SelectTrigger className="bg-slate-900/50 border-slate-700/50 text-white">
                  <SelectValue placeholder="Select matrix size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2×2</SelectItem>
                  <SelectItem value="3">3×3 (encrypt only)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Key matrix */}
            <div className="mb-6">
              <Label className="text-white text-lg font-medium mb-3 block">Key Matrix</Label>
              <div className="grid gap-2">
                {keyMatrix.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex gap-2">
                    {row.map((value, colIndex) => (
                      <Input
                        key={`${rowIndex}-${colIndex}`}
                        type="number"
                        value={value || 0}
                        onChange={(e) => handleMatrixChange(rowIndex, colIndex, e.target.value)}
                        className="w-16 bg-slate-900/50 border-slate-700/50 text-white text-center"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
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
          {error ? (
            <div className="bg-red-900/30 border border-red-700 p-4 rounded-lg mb-4">
              <p className="text-red-400">{error}</p>
            </div>
          ) : (
            <CipherResult cipherText={outputText} steps={steps} mode={mode} />
          )}
        </div>
      </div>

      <CipherWorking
        cipherName={'Hill'}
        cipherText={{
          encryption: `The Hill cipher uses matrix multiplication to encrypt blocks of letters. Each letter is converted to a
              number (A=0, B=1, ..., Z=25), and blocks are multiplied by the key matrix modulo 26.`,
          decryption: ` To decrypt, we multiply by the inverse of the key matrix. The matrix must be invertible modulo 26, which
              means its determinant must be coprime to 26.`
        }} />

    </div>
  )
}
