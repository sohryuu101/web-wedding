import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Gift, Heart, Copy, CreditCard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface DigitalWallet {
  name: string
  accountNumber: string
  accountName: string
  qrCode?: string
}

interface WeddingGiftSectionProps {
  title?: string
  subtitle?: string
  message?: string
  digitalWallets?: DigitalWallet[]
  bankAccounts?: DigitalWallet[]
  contactInfo?: {
    name: string
    phone?: string
    email?: string
  }
}

export function WeddingGiftSection({
  title = "Wedding Gifts",
  subtitle = "Your presence is our present, but if you'd like to give a gift",
  message = "Your presence at our wedding is the greatest gift we could ask for. However, if you would like to give us a gift, we would be honored by your generosity.",
  digitalWallets = [],
  bankAccounts = [],
  contactInfo
}: WeddingGiftSectionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const handleCopyAccount = async (accountNumber: string, walletName: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber)
      setCopiedAccount(walletName)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch {
      console.error('Failed to copy account number')
    }
  }

  const hasGiftOptions = digitalWallets.length > 0 || bankAccounts.length > 0

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Gift className="h-6 w-6 text-indigo-600" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 font-serif">
              {title}
            </h2>
            <Gift className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-indigo-100"
        >
          {/* Gift Message */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="h-8 w-8 text-indigo-600" />
            </div>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl mx-auto">
              {message}
            </p>
          </div>

          {hasGiftOptions ? (
            <div className="space-y-8">
              {/* Digital Wallets */}
              {digitalWallets.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Digital Wallets
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {digitalWallets.map((wallet, index) => (
                      <motion.div
                        key={wallet.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                        className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-200"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <CreditCard className="h-6 w-6 text-indigo-600" />
                          <h4 className="text-lg font-semibold text-gray-800">
                            {wallet.name}
                          </h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Account Number</p>
                            <div className="flex items-center space-x-2">
                              <code className="bg-white px-3 py-2 rounded-lg border text-sm font-mono flex-1">
                                {wallet.accountNumber}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyAccount(wallet.accountNumber, wallet.name)}
                                className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Account Name</p>
                            <p className="font-medium text-gray-800">{wallet.accountName}</p>
                          </div>

                          {copiedAccount === wallet.name && (
                            <div className="text-green-600 text-sm font-medium">
                              ✓ Account number copied!
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bank Accounts */}
              {bankAccounts.length > 0 && (
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
                    Bank Transfers
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {bankAccounts.map((account, index) => (
                      <motion.div
                        key={account.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200"
                      >
                        <div className="flex items-center space-x-3 mb-4">
                          <CreditCard className="h-6 w-6 text-green-600" />
                          <h4 className="text-lg font-semibold text-gray-800">
                            {account.name}
                          </h4>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Account Number</p>
                            <div className="flex items-center space-x-2">
                              <code className="bg-white px-3 py-2 rounded-lg border text-sm font-mono flex-1">
                                {account.accountNumber}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleCopyAccount(account.accountNumber, account.name)}
                                className="border-green-200 text-green-600 hover:bg-green-50"
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          <div>
                            <p className="text-sm text-gray-600 mb-1">Account Name</p>
                            <p className="font-medium text-gray-800">{account.accountName}</p>
                          </div>

                          {copiedAccount === account.name && (
                            <div className="text-green-600 text-sm font-medium">
                              ✓ Account number copied!
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Gift className="h-10 w-10 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                No Gift Information Available
              </h3>
              <p className="text-gray-600">
                Gift information will be updated soon. Your presence is all we need!
              </p>
            </div>
          )}

          {/* Contact Information */}
          {contactInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Need to Contact Us?
                </h3>
                <div className="bg-gray-50 rounded-lg p-6 max-w-md mx-auto">
                  <p className="font-medium text-gray-800 mb-2">{contactInfo.name}</p>
                  {contactInfo.phone && (
                    <p className="text-gray-600 text-sm mb-1">
                      📞 {contactInfo.phone}
                    </p>
                  )}
                  {contactInfo.email && (
                    <p className="text-gray-600 text-sm">
                      ✉️ {contactInfo.email}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Thank You Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-8 text-center"
          >
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Heart className="h-6 w-6 text-indigo-600" />
                <h4 className="text-lg font-semibold text-gray-800">
                  Thank You
                </h4>
                <Heart className="h-6 w-6 text-indigo-600" />
              </div>
              <p className="text-gray-700">
                Your love and support mean the world to us. We can't wait to celebrate with you!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 