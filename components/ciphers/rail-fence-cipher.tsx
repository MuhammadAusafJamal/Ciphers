'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from "lucide-react"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

export default function RailFenceCipher() {
  const [inputText, setInputText] = useState("")
  const [numRails, setNumRails] = useState([3])
  const [outputText, setOutputText] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")
  const [railPattern, setRailPattern] = useState<string[][]>([])

  // useEffect(() => {
  //   if (inputText) {
  //     if (mode === "encrypt") {
  //       encrypt()
  //     } else {
  //       decrypt()
  //     }
  //   } else {
  //     setOutputText("")
  //     setSteps([])
  //     setRailPattern([])
  //   }
  // }, [inputText, numRails, mode])

  const encrypt = () => {
    if (!inputText) {
      setOutputText("")
      setSteps([])
      setRailPattern([])
      return
    }

    const rails = numRails[0]
    const newSteps: string[] = []
    const filteredText = inputText.replace(/[^a-zA-Z]/g, "").toUpperCase()

    newSteps.push(`🔒 Starting encryption with text: "${inputText}"`)
    newSteps.push(`🚂 Using ${rails} rails for zigzag pattern`)
    newSteps.push(`📝 Filtered text: "${filteredText}"`)

    // Create rail pattern
    const railArray: string[][] = Array(rails)
      .fill(null)
      .map(() => Array(filteredText.length).fill(""))

    let rail = 0
    let direction = 1 // 1 for down, -1 for up

    // Place characters in zigzag pattern
    for (let i = 0; i < filteredText.length; i++) {
      railArray[rail][i] = filteredText[i]

      // Change direction at top and bottom rails
      if (rail === 0) {
        direction = 1
      } else if (rail === rails - 1) {
        direction = -1
      }

      rail += direction
    }

    setRailPattern(railArray)

    // Show the rail pattern
    newSteps.push(`🔀 Rail pattern created:`)
    for (let i = 0; i < rails; i++) {
      const railStr = railArray[i].map((char) => char || ".").join(" ")
      newSteps.push(`  Rail ${i + 1}: ${railStr}`)
    }

    // Read off the rails to get cipher text
    let result = ""
    for (let i = 0; i < rails; i++) {
      for (let j = 0; j < filteredText.length; j++) {
        if (railArray[i][j] !== "") {
          result += railArray[i][j]
        }
      }
    }

    newSteps.push(`✅ Reading rails left to right: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const decrypt = () => {
    if (!inputText) {
      setOutputText("")
      setSteps([])
      setRailPattern([])
      return
    }

    const rails = numRails[0]
    const newSteps: string[] = []
    const filteredText = inputText.replace(/[^a-zA-Z]/g, "").toUpperCase()

    newSteps.push(`🔓 Starting decryption with cipher text: "${filteredText}"`)
    newSteps.push(`🚂 Using ${rails} rails for zigzag pattern`)

    // Create the zigzag pattern to know where characters should go
    const railPattern: boolean[][] = Array(rails)
      .fill(null)
      .map(() => Array(filteredText.length).fill(false))

    let rail = 0
    let direction = 1

    // Mark the positions in the zigzag pattern
    for (let i = 0; i < filteredText.length; i++) {
      railPattern[rail][i] = true

      if (rail === 0) {
        direction = 1
      } else if (rail === rails - 1) {
        direction = -1
      }

      rail += direction
    }

    // Fill the rails with cipher text characters
    const railArray: string[][] = Array(rails)
      .fill(null)
      .map(() => Array(filteredText.length).fill(""))
    let index = 0

    for (let i = 0; i < rails; i++) {
      for (let j = 0; j < filteredText.length; j++) {
        if (railPattern[i][j] && index < filteredText.length) {
          railArray[i][j] = filteredText[index++]
        }
      }
    }

    setRailPattern(railArray)

    // Show the reconstructed rail pattern
    newSteps.push(`🔀 Reconstructed rail pattern:`)
    for (let i = 0; i < rails; i++) {
      const railStr = railArray[i].map((char) => char || ".").join(" ")
      newSteps.push(`  Rail ${i + 1}: ${railStr}`)
    }

    // Read the zigzag pattern to get the original text
    let result = ""
    rail = 0
    direction = 1

    for (let i = 0; i < filteredText.length; i++) {
      result += railArray[rail][i]

      if (rail === 0) {
        direction = 1
      } else if (rail === rails - 1) {
        direction = -1
      }

      rail += direction
    }

    newSteps.push(`✅ Reading zigzag pattern: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const reset = () => {
    setInputText("")
    setNumRails([3])
    setOutputText("")
    setSteps([])
    setRailPattern([])
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
                  onClick={reset}
                  value="encrypt"
                  className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-teal-500 data-[state=on]:to-teal-600 data-[state=on]:text-white"
                >
                  <Lock className="w-4 h-4 mr-2" />
                  Encrypt
                </ToggleGroupItem>
                <ToggleGroupItem
                  onClick={reset}
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
              <Label htmlFor="rails" className="text-white text-lg font-medium mb-3 block">
                Number of Rails: <span className="text-teal-400 font-mono">{numRails[0]}</span>
              </Label>
              <div className="bg-slate-900/30 p-4 rounded-lg">
                <Slider
                  id="rails"
                  min={2}
                  max={8}
                  step={1}
                  value={numRails}
                  onValueChange={setNumRails}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>2</span>
                  <span>5</span>
                  <span>8</span>
                </div>
              </div>
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

          {railPattern.length > 0 && (
            <div className="mt-6 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
              <h3 className="text-md font-medium mb-3">Rail Fence Pattern</h3>
              <div className="font-mono text-sm space-y-1">
                {railPattern.map((rail, railIndex) => (
                  <div key={railIndex} className="flex">
                    <span className="w-12 text-slate-400">R{railIndex + 1}:</span>
                    <div className="flex">
                      {rail.map((char, charIndex) => (
                        <span
                          key={charIndex}
                          className={`w-6 text-center ${char ? "text-teal-400" : "text-slate-600"}`}
                        >
                          {char || "·"}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <CipherWorking
        cipherName={'Rail Fence'}
        cipherText={{
          encryption: `The Rail Fence cipher writes the plaintext in a zigzag pattern across multiple "rails" or lines. The
              ciphertext is then read off by going along each rail from left to right.`,
          decryption: `To decrypt, we first determine the zigzag pattern, then fill in the rails with the ciphertext characters
              in order, and finally read the message by following the zigzag pattern.`
        }} />
    </div>
  )
}
