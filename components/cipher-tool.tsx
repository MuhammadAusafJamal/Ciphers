"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import CaesarCipher from "@/components/ciphers/caesar-cipher"
import VigenereCipher from "@/components/ciphers/vigenere-cipher"
import RailFenceCipher from "@/components/ciphers/rail-fence-cipher"
import ColumnarCipher from "@/components/ciphers/columnar-cipher"
import HillCipher from "@/components/ciphers/hill-cipher"
import PlayfairCipher from "@/components/ciphers/playfair-cipher"

export default function CipherTool() {
  const [activeTab, setActiveTab] = useState("caesar")

  const ciphers = [
    { id: "caesar", name: "Caesar", icon: "🔤", description: "Simple shift cipher" },
    { id: "vigenere", name: "Vigenère", icon: "🔑", description: "Polyalphabetic cipher" },
    { id: "railfence", name: "Rail Fence", icon: "🚂", description: "Zigzag pattern cipher" },
    { id: "columnar", name: "Columnar", icon: "📊", description: "Column-based cipher" },
    { id: "hill", name: "Hill", icon: "🔢", description: "Matrix-based cipher" },
    { id: "playfair", name: "Playfair", icon: "⬜", description: "5×5 grid cipher" },
  ]

  return (
    <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm shadow-2xl">
      <CardContent className="p-8">
        <Tabs defaultValue="caesar" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-auto grid grid-cols-6 mb-8 bg-slate-900/50 p-2 rounded-xl">
            {ciphers.map((cipher) => (
              <TabsTrigger
                key={cipher.id}
                value={cipher.id}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-purple-500 data-[state=active]:text-white transition-all duration-300 rounded-lg p-3 hover:bg-slate-500 hover:text-white"
              >
                <div className="flex flex-col items-center gap-1">
                  <span className="text-lg">{cipher.icon}</span>
                  <span className="font-medium text-xs">{cipher.name}</span>
                  <span className="text-xs opacity-70 hidden lg:block">{cipher.description}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value="caesar" className="mt-0">
            <CaesarCipher />
          </TabsContent>
          <TabsContent value="vigenere" className="mt-0">
            <VigenereCipher />
          </TabsContent>
          <TabsContent value="railfence" className="mt-0">
            <RailFenceCipher />
          </TabsContent>
          <TabsContent value="columnar" className="mt-0">
            <ColumnarCipher />
          </TabsContent>
          <TabsContent value="hill" className="mt-0">
            <HillCipher />
          </TabsContent>
          <TabsContent value="playfair" className="mt-0">
            <PlayfairCipher />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
