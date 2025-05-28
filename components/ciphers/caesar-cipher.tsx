'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from "lucide-react"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

export default function CaesarCipher() {
  const [inputText, setInputText] = useState("")
  const [shift, setShift] = useState([3])
  const [outputText, setOutputText] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")


  const encrypt = () => {
    if (!inputText) {
      setOutputText("")
      setSteps([])
      return
    }

    const shiftValue = shift[0]
    let result = ""
    const newSteps: string[] = []

    newSteps.push(`🔒 Starting encryption with plain text: "${inputText}"`)
    newSteps.push(`🔑 Using shift value: ${shiftValue}`)

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i]

      if (!/[a-zA-Z]/.test(char)) {
        result += char
        continue
      }

      const isUpperCase = char === char.toUpperCase()
      const baseCharCode = isUpperCase ? 65 : 97
      const charIndex = char.toUpperCase().charCodeAt(0) - 65
      const shiftedIndex = (charIndex + shiftValue) % 26
      const shiftedChar = String.fromCharCode(baseCharCode + shiftedIndex)

      result += isUpperCase ? shiftedChar : shiftedChar.toLowerCase()
      newSteps.push(`  '${char}' → '${result[result.length - 1]}' (shifted by +${shiftValue})`)
    }

    newSteps.push(`✅ Final encrypted text: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const decrypt = () => {
    if (!inputText) {
      setOutputText("")
      setSteps([])
      return
    }

    const shiftValue = shift[0]
    let result = ""
    const newSteps: string[] = []

    newSteps.push(`🔓 Starting decryption with cipher text: "${inputText}"`)
    newSteps.push(`🔑 Using shift value: ${shiftValue}`)

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i]

      if (!/[a-zA-Z]/.test(char)) {
        result += char
        continue
      }

      const isUpperCase = char === char.toUpperCase()
      const baseCharCode = isUpperCase ? 65 : 97
      const charIndex = char.toUpperCase().charCodeAt(0) - 65
      const shiftedIndex = (charIndex - shiftValue + 26) % 26
      const shiftedChar = String.fromCharCode(baseCharCode + shiftedIndex)

      result += isUpperCase ? shiftedChar : shiftedChar.toLowerCase()
      newSteps.push(`  '${char}' → '${result[result.length - 1]}' (shifted by -${shiftValue})`)
    }

    newSteps.push(`✅ Final decrypted text: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const reset = () => {
    setInputText("")
    setShift([3])
    setOutputText("")
    setSteps([])
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
              <Label htmlFor="shift" className="text-white text-lg font-medium mb-3 block">
                Shift Value: <span className="text-teal-400 font-mono">{shift[0]}</span>
              </Label>
              <div className="bg-slate-900/30 p-4 rounded-lg">
                <Slider id="shift" min={1} max={25} step={1} value={shift} onValueChange={setShift} className="py-4" />
                <div className="flex justify-between text-xs text-slate-400 mt-2">
                  <span>1</span>
                  <span>13</span>
                  <span>25</span>
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

        <CipherResult cipherText={outputText} steps={steps} mode={mode} />
      </div>

      <CipherWorking
        cipherName={'Ceaser'}
        cipherText={{
          encryption: `The Caesar Cipher shifts each letter in the plaintext by a fixed number of positions forward in the
              alphabet. For example, with a shift of 3, 'A' becomes 'D', 'B' becomes 'E', and so on.`,
          decryption: `To decrypt, we simply reverse the process by shifting each letter backward by the same number of
              positions. This cipher is named after Julius Caesar, who used it to communicate with his generals.`
        }} />

    </div>
  )
}
