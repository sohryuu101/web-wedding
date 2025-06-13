import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Quote } from "lucide-react"
import { useState } from "react"

export function QuotesSection() {

  const quoteTemplates = [
    {
      text: '“Dan segala sesuatu Kami Ciptakan Berpasang-pasangan supaya kamu mengingat kebesaran Allah.” (QS Az-Zariyat: 49)',
    },
    {
      text: '“Hai manusia, bertakwalah kepada Tuhan-mu Yang menciptakan kamu dari satu jiwa dan darinya Dia menciptakan jodohnya, dan mengembang-biakan dari keduanya banyak laki-laki dan perempuan; dan bertakwalah kepada Allah SWT yang dengan nama-Nya kamu saling bertanya, terutama mengenai hubungan tali kekerabatan. Sesungguhnya Allah SWT adalah pengawas atas kamu.” (QS An-Nisa: 1)',
    },
    {
      text: '“Dan nikahkanlah orang-orang yang sendirian di antara kamu, dan orang-orang yang layak (berkawin) dari hamba-hamba sahayamu yang lelaki dan hamba-hamba sahayamu yang perempuan. jika mereka miskin, Allah akan memampukan mereka dengan kurnia-Nya. dan Allah Maha Luas (pemberian-Nya) lagi Maha mengetahui.” (QS An-Nur: 32)',
    },
    {
      text: '“Bagaimana kamu akan mengambilnya kembali, padahal sebagian kamu telah bercampur (bergaul) dengan yang lain sebagai suami-isteri. Dan mereka (isteri-isterimu) telah mengambil dari kamu perjanjian yang kuat.” (QS An-Nisa: 21)',
    },
    {
      text: '“Hai manusia, sesungguhnya Kami menciptakan kamu dari seorang laki-laki dan seorang perempuan dan menjadikan kamu berbangsa-bangsa dan bersuku-suku supaya kamu saling kenal-mengenal. Sesungguhnya orang yang paling mulia diantara kamu disisi Allah ialah orang yang paling takwa di antara kamu. Sesungguhnya Allah Maha Mengetahui lagi Maha Mengenal.” (QS Al-Hujurat: 13)',
    },
    {
      text: '“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang. Sesungguhnya pada yang demikian itu benar-benar terdapat tanda-tanda bagi kaum yang berfikir.”',
    },
  ]
  const [selectedQuoteIdx, setSelectedQuoteIdx] = useState<number | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-gray-900">Quotes</h2>
        <p className="text-gray-600 mt-2">Add meaningful quotes and messages to your invitation</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Quote className="h-5 w-5 mr-2 text-rose-500" />
            Featured Quote
          </CardTitle>
          <CardDescription>Main quote that will appear prominently</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Choose a Quote</Label>
            <div className="space-y-3 mt-2">
              {quoteTemplates.map((q, idx) => (
                <label key={idx} className="flex items-start space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="main-quote"
                    checked={selectedQuoteIdx === idx}
                    onChange={() => setSelectedQuoteIdx(idx)}
                    className="mt-1"
                  />
                  <span className="text-sm text-gray-700">{q.text}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
