import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface BankAccount {
  bank: string
  name: string
  number: string
}

interface WeddingGiftSectionProps {
  title?: string
  message?: string
  bankAccounts?: BankAccount[]
}

export function WeddingGiftSection({
  title = "Wedding Gift",
  message = "Your blessing and coming to our wedding are enough for us. However, if you want to give a gift we provide a Digital Envelope to make it easier for you. thank you",
  bankAccounts = [
    {
      bank: "BANK BCA",
      name: "Muhammad Fanny Al farizzy", 
      number: "8375180797"
    }
  ]
}: WeddingGiftSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    accountOwnerName: '',
    message: '',
    amount: ''
  })

  const handleCopyAccount = async (accountNumber: string, walletName: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopiedAccount(walletName)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch {
      console.error('Failed to copy account number')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <section ref={ref} className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Image with grayscale filter */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale"
        style={{
          backgroundImage: `url('/placeholder.svg')`,
        }}
      />
      <div className="absolute inset-0 bg-black/70" />
      
      <div className="relative z-10 min-h-screen flex flex-col justify-center p-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-8 font-light tracking-wider">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto font-light leading-relaxed">
            {message}
          </p>
        </motion.div>

        {/* Gift Form */}
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-md w-full"
          >
            <div className="space-y-6">
              {/* Bank Account Selector */}
              <div>
                <select className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-none px-4 py-3 text-white font-light">
                  {bankAccounts.map((account, index) => (
                    <option key={index} value={account.bank} className="bg-black text-white">
                      {account.bank}
                    </option>
                  ))}
                </select>
                <div className="flex items-center justify-end mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopyAccount(bankAccounts[0]?.number || '', bankAccounts[0]?.bank || '')}
                    className="text-white/80 hover:text-white p-2"
                  >
                    {copiedAccount === bankAccounts[0]?.bank ? (
                      <>
                        <Check className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Account Details */}
              <div className="bg-white/10 backdrop-blur-sm rounded-none p-6 border border-white/20">
                <div className="text-center space-y-2">
                  <p className="text-2xl md:text-3xl font-serif text-white font-light">
                    {bankAccounts[0]?.number}
                  </p>
                  <p className="text-white/80 font-light">
                    {bankAccounts[0]?.name}
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Account Owner Name */}
                <div>
                  <input
                    type="text"
                    name="accountOwnerName"
                    placeholder="Account Owner Name"
                    value={formData.accountOwnerName}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/60 font-light"
                  />
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/60 font-light resize-none"
                  />
                </div>

                {/* Amount */}
                <div>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-none px-4 py-3 text-white placeholder-white/60 font-light"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 