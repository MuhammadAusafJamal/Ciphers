'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from "lucide-react"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

export default function VigenereCipher() {
  const [inputText, setInputText] = useState("")
  const [key, setKey] = useState("KEY")
  const [outputText, setOutputText] = useState("")
  const [steps, setSteps] = useState<string[]>([])
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")

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
  //   }
  // }, [inputText, key, mode])

  const encrypt = () => {
    if (!inputText || !key) {
      setOutputText("")
      setSteps([])
      return
    }

    const filteredKey = key.toUpperCase().replace(/[^A-Z]/g, "")

    if (filteredKey.length === 0) {
      setOutputText("Key must contain at least one letter")
      setSteps(["Error: Key must contain at least one letter"])
      return
    }

    let result = ""
    const newSteps: string[] = []

    newSteps.push(`🔒 Starting encryption with plain text: "${inputText}"`)
    newSteps.push(`🔑 Using key: "${filteredKey}"`)

    let keyIndex = 0

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i]

      if (!/[a-zA-Z]/.test(char)) {
        result += char
        continue
      }

      const isUpperCase = char === char.toUpperCase()
      const baseCharCode = isUpperCase ? 65 : 97

      const keyChar = filteredKey[keyIndex % filteredKey.length]
      const shift = keyChar.charCodeAt(0) - 65

      const charIndex = char.toUpperCase().charCodeAt(0) - 65
      const shiftedIndex = (charIndex + shift) % 26

      const shiftedChar = String.fromCharCode(baseCharCode + shiftedIndex)

      result += isUpperCase ? shiftedChar : shiftedChar.toLowerCase()

      newSteps.push(`  '${char}' + Key '${keyChar}' (shift +${shift}) → '${result[result.length - 1]}'`)

      keyIndex++
    }

    newSteps.push(`✅ Final encrypted text: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const decrypt = () => {
    if (!inputText || !key) {
      setOutputText("")
      setSteps([])
      return
    }

    const filteredKey = key.toUpperCase().replace(/[^A-Z]/g, "")

    if (filteredKey.length === 0) {
      setOutputText("Key must contain at least one letter")
      setSteps(["Error: Key must contain at least one letter"])
      return
    }

    let result = ""
    const newSteps: string[] = []

    newSteps.push(`🔓 Starting decryption with cipher text: "${inputText}"`)
    newSteps.push(`🔑 Using key: "${filteredKey}"`)

    let keyIndex = 0

    for (let i = 0; i < inputText.length; i++) {
      const char = inputText[i]

      if (!/[a-zA-Z]/.test(char)) {
        result += char
        continue
      }

      const isUpperCase = char === char.toUpperCase()
      const baseCharCode = isUpperCase ? 65 : 97

      const keyChar = filteredKey[keyIndex % filteredKey.length]
      const shift = keyChar.charCodeAt(0) - 65

      const charIndex = char.toUpperCase().charCodeAt(0) - 65
      const shiftedIndex = (charIndex - shift + 26) % 26

      const shiftedChar = String.fromCharCode(baseCharCode + shiftedIndex)

      result += isUpperCase ? shiftedChar : shiftedChar.toLowerCase()

      newSteps.push(`  '${char}' - Key '${keyChar}' (shift -${shift}) → '${result[result.length - 1]}'`)

      keyIndex++
    }

    newSteps.push(`✅ Final decrypted text: "${result}"`)
    setOutputText(result)
    setSteps(newSteps)
  }

  const reset = () => {
    setInputText("")
    setKey("KEY")
    setOutputText("")
    setSteps([])
  }

  return (
    <div className="space-y-8">
      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-6 rounded-xl border border-slate-700/50">
            <div className="mb-6">
              <Label className=" text-white text-lg font-medium mb-4 block flex items-center gap-2">
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

        <CipherResult cipherText={outputText} steps={steps} mode={mode} />
      </div>

      <CipherWorking
        cipherName={'Vigenère'}
        cipherText={{
          encryption: `The Vigenère cipher uses a keyword to determine different shift values for each letter. Each letter in the
              plaintext is shifted by the corresponding letter in the key, creating a polyalphabetic substitution.`,
          decryption: `To decrypt, we reverse the process by subtracting the key letter values instead of adding them. This
              cipher was considered unbreakable for centuries until frequency analysis techniques were developed.`
        }} />

    </div>
  )
}
