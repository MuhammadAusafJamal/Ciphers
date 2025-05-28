'use client'

interface CipherText {
    encryption: string
    decryption: string
}

interface CipherWorkingProps {
    cipherText: CipherText
    cipherName: string
}

export default function CipherWorking({ cipherText, cipherName }: CipherWorkingProps) {
    return (
        <div className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 p-8 rounded-xl border border-slate-700/50">
            <h3 className=" text-white text-xl font-medium mb-6 flex items-center gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-teal-400 to-purple-400 rounded-full"></span>
                How {cipherName} Cipher Works
            </h3>
            <div className="grid md:grid-cols-2 gap-6 text-slate-300">
                <div>
                    <h4 className="font-medium text-white mb-3">📊 Encryption Process</h4>
                    <p className="leading-relaxed">
                        {/* The Columnar cipher arranges the plaintext in a grid with columns determined by a keyword. The columns are
                        then read in alphabetical order of the keyword letters to produce the ciphertext. */}
                        {cipherText.encryption}
                    </p>
                </div>
                <div>
                    <h4 className="font-medium text-white mb-3">🔓 Decryption Process</h4>
                    <p className="leading-relaxed">
                        {/* To decrypt, we determine the column order from the keyword, fill the matrix column by column with the
                        ciphertext, then read the matrix row by row to recover the original message. */}
                        {cipherText.decryption}
                    </p>
                </div>
            </div>
        </div>
    )
}
