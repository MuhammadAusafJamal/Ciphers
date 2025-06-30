'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { ArrowRight, ArrowLeft, RefreshCw, Lock, Unlock } from "lucide-react"
import CipherResult from "@/components/cipher-result"
import CipherWorking from "../cipher-working"

export default function OneTimePadCipher() {
    const [inputText, setInputText] = useState("")
    const [key, setKey] = useState("")
    const [outputText, setOutputText] = useState("")
    const [steps, setSteps] = useState<string[]>([])
    const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt")

    const generateRandomKey = (length: number) => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        let result = ""
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    const reset = () => {
        setInputText("")
        setKey("")
        setOutputText("")
        setSteps([])
    }

    const isValidKey = (text: string, key: string) =>
        key.length >= text.length && /^[A-Za-z]+$/.test(key)

    const processText = (text: string) =>
        text.toUpperCase().replace(/[^A-Z]/g, "")

    const otp = () => {
        const cleanText = processText(inputText)
        const cleanKey = processText(key)

        if (!isValidKey(cleanText, cleanKey)) {
            setOutputText("")
            setSteps(["❌ Invalid key: Key must be alphabetic and at least as long as the message."])
            return
        }

        const newSteps: string[] = []
        newSteps.push(`🔒 Mode: ${mode.toUpperCase()}`)
        newSteps.push(`📝 Processed Text: ${cleanText}`)
        newSteps.push(`🔑 Key Used: ${cleanKey}`)

        let result = ""

        for (let i = 0; i < cleanText.length; i++) {
            const textChar = cleanText.charCodeAt(i) - 65
            const keyChar = cleanKey.charCodeAt(i) - 65

            let newCharCode
            if (mode === "encrypt") {
                newCharCode = (textChar + keyChar) % 26
            } else {
                newCharCode = (textChar - keyChar + 26) % 26
            }

            const resultChar = String.fromCharCode(newCharCode + 65)
            newSteps.push(
                `  ${cleanText[i]} (${textChar}) ${mode === "encrypt" ? "+" : "-"} ${cleanKey[i]} (${keyChar}) → ${resultChar}`
            )

            result += resultChar
        }

        newSteps.push(`✅ Final ${mode}ed text: "${result}"`)
        setOutputText(result)
        setSteps(newSteps)
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
                                    <Lock className="w-4 h-4 mr-2" /> Encrypt
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    onClick={reset}
                                    value="decrypt"
                                    className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-purple-500 data-[state=on]:to-purple-600 data-[state=on]:text-white"
                                >
                                    <Unlock className="w-4 h-4 mr-2" /> Decrypt
                                </ToggleGroupItem>
                            </ToggleGroup>
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="inputText" className="text-white text-lg font-medium mb-3 block">
                                {mode === "encrypt" ? "Plain Text" : "Cipher Text"}
                            </Label>
                            <Input
                                id="inputText"
                                placeholder={`Enter text to ${mode}`}
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                className="bg-slate-900/50 border-slate-700/50 text-white text-lg p-4 rounded-lg"
                            />
                        </div>

                        <div className="mb-6">
                            <Label htmlFor="key" className="text-white text-lg font-medium mb-3 block">
                                One-Time Pad Key
                            </Label>
                            <Input
                                id="key"
                                placeholder="Key must be same or longer than the text"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                                className="bg-slate-900/50 border-slate-700/50 text-white text-lg p-4 rounded-lg"
                            />
                            <div className="flex items-center justify-between mt-2">
                                <p className="text-xs text-slate-400">Only A-Z letters allowed. Length ≥ message</p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                        if (inputText.length < 1) {
                                            setSteps(["❌ Enter some text before generating the key."])
                                        } else {
                                            setKey(generateRandomKey(inputText.length))
                                            setSteps(prev => [...prev, `🔑 Random key generated for length ${inputText.length}.`])
                                        }
                                    }}
                                >
                                    Generate Key
                                </Button>
                            </div>
                        </div>


                        <div className="flex gap-3">
                            <Button
                                onClick={otp}
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
                </div>
            </div>

            <CipherWorking
                cipherName={"One-Time Pad"}
                cipherText={{
                    encryption: `The OTP cipher adds each letter of the message with the corresponding letter of the key (A=0 to Z=25) and wraps around using modulo 26. It is considered unbreakable if the key is truly random and never reused.`,
                    decryption: `Decryption subtracts the key letter from the message letter (again using modulo 26). The key must be at least as long as the message.`
                }}
            />
        </div>
    )
}
