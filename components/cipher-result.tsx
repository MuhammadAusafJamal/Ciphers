"use client"

import { Button } from "@/components/ui/button"
import { Copy, Download } from 'lucide-react'
import { useState } from "react"

interface CipherResultProps {
  cipherText: string
  steps: string[]
  mode?: "encrypt" | "decrypt"
}

export default function CipherResult({ cipherText, steps, mode = "encrypt" }: CipherResultProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (cipherText) {
      await navigator.clipboard.writeText(cipherText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const downloadResult = () => {
    if (cipherText) {
      const blob = new Blob([cipherText], { type: "text/plain" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${mode}ed-text.txt`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white text-lg font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></span>
            {mode === "encrypt" ? "Encrypted" : "Decrypted"} Result
          </h3>
          <div className="flex gap-2">
            <Button
              onClick={copyToClipboard}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700"
              disabled={!cipherText}
            >
              <Copy className="w-4 h-4 mr-1" />
              {copied ? "Copied!" : "Copy"}
            </Button>
            <Button
              onClick={downloadResult}
              size="sm"
              variant="outline"
              className="border-slate-600 hover:bg-slate-700"
              disabled={!cipherText}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
        {cipherText ? (
          <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-700/30">
            <p className="font-mono text-teal-400 break-all text-lg leading-relaxed">{cipherText}</p>
          </div>
        ) : (
          <div className="bg-slate-950/30 p-4 rounded-lg border border-slate-700/30 border-dashed">
            <p className="text-slate-400 italic text-center">Enter text to see {mode}ion result</p>
          </div>
        )}
      </div>

      <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm max-h-[400px] overflow-hidden">
        <h3 className="text-white text-lg font-medium mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></span>
          {mode === "encrypt" ? "Encryption" : "Decryption"} Steps
        </h3>
        {steps.length > 0 ? (
          <div className="overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
            <ol className="list-decimal list-inside space-y-2 text-sm text-slate-300">
              {steps.map((step, index) => (
                <li key={index} className="pl-2 py-1 hover:bg-slate-800/30 rounded transition-colors">
                  <span className="ml-2">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="bg-slate-950/30 p-4 rounded-lg border border-slate-700/30 border-dashed">
            <p className="text-slate-400 italic text-center">Enter text to see {mode}ion steps</p>
          </div>
        )}
      </div>
    </div>
  )
}
