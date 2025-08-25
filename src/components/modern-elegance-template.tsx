import { useState, useEffect } from 'react'
import { differenceInDays, differenceInHours, differenceInMinutes, differenceInSeconds } from 'date-fns'
import { Loader2 } from 'lucide-react'
import type { InvitationData, RSVPFormData } from './wedding-invitation-template'

interface ModernEleganceTemplateProps {
	invitation: InvitationData
	onRSVP?: (rsvpData: RSVPFormData) => Promise<void>
	isPreview?: boolean
	// When true, render only the cover (hero) section
	onlyCover?: boolean
	// When true, render everything except the cover (hero) section
	excludeCover?: boolean
}

export function ModernEleganceTemplate({ 
	invitation, 
	onRSVP, 
	isPreview = false,
	onlyCover = false,
	excludeCover = false
}: ModernEleganceTemplateProps) {
	const [countdown, setCountdown] = useState({
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0
	})

	const [rsvpData, setRsvpData] = useState({
		name: '',
		attendance: 'Will Attend' as 'Will Attend' | 'Unable To Attend',
		guestCount: 2,
		message: ''
	})
	const [isSubmitting, setIsSubmitting] = useState(false)

	useEffect(() => {
		const timer = setInterval(() => {
			const now = new Date()
			const wedding = new Date(invitation.wedding_date)
			
			setCountdown({
				days: differenceInDays(wedding, now),
				hours: differenceInHours(wedding, now) % 24,
				minutes: differenceInMinutes(wedding, now) % 60,
				seconds: differenceInSeconds(wedding, now) % 60
			})
		}, 1000)

		return () => clearInterval(timer)
	}, [invitation.wedding_date])

	const handleRSVP = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsSubmitting(true)

		try {
			if (onRSVP) {
				await onRSVP({
					guest_name: rsvpData.name,
					attendance: rsvpData.attendance === 'Will Attend' ? 'yes' : 'no',
					guest_count: rsvpData.guestCount,
					message: rsvpData.message
				})
			}
			
			// Reset form
			setRsvpData({
				name: '',
				attendance: 'Will Attend',
				guestCount: 2,
				message: ''
			})
		} catch (error) {
			console.error('RSVP submission error:', error)
		} finally {
			setIsSubmitting(false)
		}
	}

	// If only cover is requested, render just the hero section
	if (onlyCover) {
		return (
			<div className="min-h-screen bg-[#3e513c] text-[#f3dbb9] overflow-x-hidden">
				{isPreview && (
					<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
						<div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-sm text-black">
							Preview Mode
						</div>
					</div>
				)}
				<section className="min-h-screen flex flex-col items-center justify-center relative px-4">
					{/* Background Image */}
					<div 
						className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale opacity-20"
						style={{
							backgroundImage: `url(${invitation.cover_image || '/placeholder.svg'})`,
						}}
					/>
					<div className="relative z-10 text-center max-w-4xl mx-auto">
						{/* Names with Great Vibes font */}
						<div className="mb-8">
							<div className="flex items-center justify-center mb-4">
								<div className="text-center">
									<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										UCKY
									</h1>
									<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
										L
									</h2>
								</div>
								<div className="mx-4">
									<span className="text-4xl font-normal tracking-widest" style={{ fontFamily: 'Luxurious Script, cursive' }}>
										and
									</span>
								</div>
								<div className="text-center">
									<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										UNE
									</h1>
									<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
										J
									</h2>
								</div>
							</div>
						</div>
						{/* Couple Photos */}
						<div className="flex justify-center gap-8 mb-8">
							<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
								<img
									src={invitation.bride_photo || '/placeholder.svg'}
									alt="Bride"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
								<img
									src={invitation.groom_photo || '/placeholder.svg'}
									alt="Groom"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>
						{/* Wedding Info */}
						<div className="text-center">
							<p className="text-lg mb-4" style={{ fontFamily: 'Bodoni Moda, serif' }}>
								are celebrating their wedding on
							</p>
							<div className="flex justify-center items-center gap-4 mb-4">
								<div className="text-center">
									<p className="text-lg" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										{new Date(invitation.wedding_date).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric'
										})},
									</p>
									<p className="text-lg" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										{new Date(invitation.wedding_date).getFullYear()}
									</p>
								</div>
								<div className="w-px h-16 bg-[#f3dbb9]"></div>
								<div className="text-center">
									<p className="text-lg" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										{invitation.venue || 'Hotel Braja Mustika'}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-[#3e513c] text-[#f3dbb9] overflow-x-hidden">
			{/* Preview Badge */}
			{isPreview && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded text-sm text-black">
						Preview Mode
					</div>
				</div>
			)}

			{/* Frame 1: Hero Section */}
			{!excludeCover && (
				<section className="min-h-screen flex flex-col items-center justify-center relative px-4">
					{/* Background Image */}
					<div 
						className="absolute inset-0 bg-cover bg-center bg-no-repeat filter grayscale opacity-20"
						style={{
							backgroundImage: `url(${invitation.cover_image || '/placeholder.svg'})`,
						}}
					/>
					
					<div className="relative z-10 text-center max-w-4xl mx-auto">
						{/* Names with Great Vibes font */}
						<div className="mb-8">
							<div className="flex items-center justify-center mb-4">
								<div className="text-center">
									<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										UCKY
									</h1>
									<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
										L
									</h2>
								</div>
								<div className="mx-4">
									<span className="text-4xl font-normal tracking-widest" style={{ fontFamily: 'Luxurious Script, cursive' }}>
										and
									</span>
								</div>
								<div className="text-center">
									<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										UNE
									</h1>
									<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
										J
									</h2>
								</div>
							</div>
						</div>

						{/* Couple Photos */}
						<div className="flex justify-center gap-8 mb-8">
							<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
								<img
									src={invitation.bride_photo || '/placeholder.svg'}
									alt="Bride"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
								<img
									src={invitation.groom_photo || '/placeholder.svg'}
									alt="Groom"
									className="w-full h-full object-cover"
								/>
							</div>
						</div>

						{/* Wedding Info */}
						<div className="text-center">
							<p className="text-lg mb-4" style={{ fontFamily: 'Bodoni Moda, serif' }}>
								are celebrating their wedding on
							</p>
							<div className="flex justify-center items-center gap-4 mb-4">
								<div className="text-center">
									<p className="text-lg" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										{new Date(invitation.wedding_date).toLocaleDateString('en-US', {
											month: 'long',
											day: 'numeric'
										})},
									</p>
									<p className="text-lg" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										{new Date(invitation.wedding_date).getFullYear()}
									</p>
								</div>
								<div className="w-px h-16 bg-[#f3dbb9]"></div>
								<div className="text-center">
									<p className="text-lg" style={{ fontFamily: 'Bodoni Moda, serif' }}>
										{invitation.venue || 'Hotel Braja Mustika'}
									</p>
								</div>
							</div>
						</div>
					</div>
				</section>
			)}

			{/* Frame 2: Bride Profile */}
			<section className="min-h-screen bg-[#f3dbb9] text-black flex flex-col justify-center items-center px-4">
				<div className="text-center max-w-2xl mx-auto">
					{/* Names */}
					<div className="mb-8">
						<div className="flex items-center justify-center mb-4">
							<div className="text-center">
								<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
									UCKY
								</h1>
								<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
									L
								</h2>
							</div>
							<div className="mx-4">
								<span className="text-4xl font-normal tracking-widest" style={{ fontFamily: 'Luxurious Script, cursive' }}>
									and
								</span>
							</div>
							<div className="text-center">
								<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
									NDREW
								</h1>
								<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
									A
								</h2>
							</div>
						</div>
					</div>
					{/* Bride Photo */}
					<div className="mb-8">
						<div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#3e513c] mx-auto">
							<img
								src={invitation.bride_photo || '/placeholder.svg'}
								alt="Bride"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
					{/* Bride Info */}
					<div className="text-center">
						<p className="text-lg mb-4" style={{ fontFamily: 'Cardo, serif' }}>
							The Son of Mr. Kowalski & Mrs. Annie
						</p>
						<div className="flex items-center justify-center gap-2">
							<span className="text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
								andrew_lucky
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Frame 3: Groom Profile */}
			<section className="min-h-screen bg-[#f3dbb9] text-black flex flex-col justify-center items-center px-4">
				<div className="text-center max-w-2xl mx-auto">
					{/* Names */}
					<div className="mb-8">
						<div className="flex items-center justify-center mb-4">
							<div className="text-center">
								<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
									UNE
								</h1>
								<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
									J
								</h2>
							</div>
							<div className="mx-4">
								<span className="text-4xl font-normal tracking-widest" style={{ fontFamily: 'Luxurious Script, cursive' }}>
									and
								</span>
							</div>
							<div className="text-center">
								<h1 className="text-4xl font-normal tracking-wider" style={{ fontFamily: 'Bodoni Moda, serif' }}>
									AHALIE
								</h1>
								<h2 className="text-8xl font-normal tracking-widest" style={{ fontFamily: 'Great Vibes, cursive' }}>
									N
								</h2>
							</div>
						</div>
					</div>
					{/* Groom Photo */}
					<div className="mb-8">
						<div className="w-64 h-64 rounded-full overflow-hidden border-4 border-[#3e513c] mx-auto">
							<img
								src={invitation.groom_photo || '/placeholder.svg'}
								alt="Groom"
								className="w-full h-full object-cover"
							/>
						</div>
					</div>
					{/* Groom Info */}
					<div className="text-center">
						<p className="text-lg mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
							The Daughter of Mr. Kenway & Mrs. Jenifer
						</p>
						<div className="flex items-center justify-center gap-2">
							<span className="text-sm" style={{ fontFamily: 'Playfair Display, serif' }}>
								nathalie_june
							</span>
						</div>
					</div>
				</div>
			</section>

			{/* Frame 4: Our Journey */}
			<section className="min-h-screen bg-[#3e513c] text-[#f3dbb9] flex flex-col justify-center items-center px-4">
				<div className="text-center max-w-4xl mx-auto">
					<h2 className="text-4xl font-normal tracking-wider mb-4" style={{ fontFamily: 'Bodoni Moda, serif' }}>
						OUR JOURNEY
					</h2>
					<p className="text-4xl font-normal tracking-widest mb-8" style={{ fontFamily: 'Luxurious Script, cursive' }}>
						Together
					</p>
					
					{/* Journey Photos Grid */}
					<div className="grid grid-cols-2 gap-4 mb-8 max-w-md mx-auto">
						<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
							<img src="/placeholder.svg" alt="Journey 1" className="w-full h-full object-cover" />
						</div>
						<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
							<img src="/placeholder.svg" alt="Journey 2" className="w-full h-full object-cover" />
						</div>
						<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
							<img src="/placeholder.svg" alt="Journey 3" className="w-full h-full object-cover" />
						</div>
						<div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#f3dbb9]">
							<img src="/placeholder.svg" alt="Journey 4" className="w-full h-full object-cover" />
						</div>
					</div>

					{/* Love Story Quote */}
					<div className="max-w-2xl mx-auto">
						<p className="text-base leading-relaxed" style={{ fontFamily: 'Cardo, serif' }}>
							"This journey is a story of two hearts brought together by fate, traveling through time together, through smiles, laughter, and emotion. Every step we take, every moment we hold, is part of a beautiful story we are writing together. This is the beginning of a never-ending journey, where love is the direction, and togetherness is the goal."
						</p>
					</div>
				</div>
			</section>

			{/* Frame 5: The Reception */}
			<section className="min-h-screen bg-[#3e513c] text-[#f3dbb9] flex flex-col justify-center items-center px-4">
				<div className="text-center max-w-4xl mx-auto">
					<h2 className="text-4xl font-normal tracking-wider mb-8" style={{ fontFamily: 'Bodoni Moda, serif' }}>
						THE RECEPTION
					</h2>
					
					{/* Venue Info */}
					<div className="mb-8">
						<h3 className="text-2xl font-normal mb-4" style={{ fontFamily: 'Bodoni Moda, serif' }}>
							VENUE
						</h3>
						<div className="w-64 h-40 rounded-3xl overflow-hidden border-2 border-[#f3dbb9] mx-auto mb-4">
							<img src="/placeholder.svg" alt="Venue" className="w-full h-full object-cover" />
						</div>
						<p className="text-lg max-w-md mx-auto" style={{ fontFamily: 'Bodoni Moda, serif' }}>
							We're celebrating at the Brajamustika Events Hall in our hometown, Bogor.
						</p>
					</div>

					{/* Attire Info */}
					<div>
						<h3 className="text-2xl font-normal mb-4" style={{ fontFamily: 'Bodoni Moda, serif' }}>
							ATTIRE
						</h3>
						<div className="w-64 h-40 rounded-3xl overflow-hidden border-2 border-[#f3dbb9] mx-auto mb-4">
							<img src="/placeholder.svg" alt="Attire" className="w-full h-full object-cover" />
						</div>
						<p className="text-lg max-w-md mx-auto" style={{ fontFamily: 'Bodoni Moda, serif' }}>
							Please come in light and breezy smart casual attire, as our wedding will be held outdoors.
						</p>
					</div>
				</div>
			</section>

			{/* Frame 6: Save The Date */}
			<section className="min-h-screen bg-[#f3dbb9] text-[#3e513c] flex flex-col justify-center items-center px-4">
				<div className="text-center max-w-4xl mx-auto">
					<h2 className="text-4xl font-normal tracking-wider mb-8" style={{ fontFamily: 'Bodoni Moda, serif' }}>
						SAVE THE DATE
					</h2>
					
					{/* Countdown Timer */}
					<div className="grid grid-cols-2 gap-8 mb-8 max-w-xs mx-auto">
						<div className="text-center">
							<p className="text-4xl font-normal" style={{ fontFamily: 'Mrs Saint Delafield, cursive' }}>
								{countdown.days}
							</p>
							<p className="text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
								Days
							</p>
						</div>
						<div className="text-center">
							<p className="text-4xl font-normal" style={{ fontFamily: 'Mrs Saint Delafield, cursive' }}>
								{countdown.hours}
							</p>
							<p className="text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
								Hours
							</p>
						</div>
						<div className="text-center">
							<p className="text-4xl font-normal" style={{ fontFamily: 'Mrs Saint Delafield, cursive' }}>
								{countdown.minutes}
							</p>
							<p className="text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
								Minutes
							</p>
						</div>
						<div className="text-center">
							<p className="text-4xl font-normal" style={{ fontFamily: 'Mrs Saint Delafield, cursive' }}>
								{countdown.seconds}
							</p>
							<p className="text-base" style={{ fontFamily: 'Playfair Display, serif' }}>
								Seconds
							</p>
						</div>
					</div>

					{/* Wedding Date */}
					<p className="text-2xl font-normal tracking-widest" style={{ fontFamily: 'Bodoni Moda, serif' }}>
						{new Date(invitation.wedding_date).toLocaleDateString('en-US', {
							weekday: 'long',
							month: 'long',
							day: 'numeric',
							year: 'numeric'
						}).toUpperCase()}
					</p>
				</div>
			</section>

			{/* Frame 7: RSVP */}
			<section className="min-h-screen bg-[#f3dbb9] text-[#3e513c] flex flex-col justify-center items-center px-4">
				<div className="text-center max-w-4xl mx-auto">
					<h2 className="text-4xl font-normal tracking-widest mb-8" style={{ fontFamily: 'Bodoni Moda, serif' }}>
						RSVP
					</h2>
					
					<form onSubmit={handleRSVP} className="max-w-sm mx-auto space-y-6">
						<div>
							<p className="text-lg mb-2" style={{ fontFamily: 'Cardo, serif' }}>
								Please confirm your attendance before.
							</p>
							<p className="text-lg font-bold mb-4" style={{ fontFamily: 'Cardo, serif' }}>
								Oct 13, 2025
								<span className="text-sm ml-1">rd</span>
							</p>
						</div>

						<div>
							<p className="text-sm mb-2" style={{ fontFamily: 'Cardo, serif' }}>
								Will you attend our wedding?
							</p>
							<div className="space-y-2">
								<button
									type="button"
									className={`w-full py-2 px-4 rounded-lg text-sm ${
										rsvpData.attendance === 'Will Attend' 
											? 'bg-[#b4b49f] text-black' 
											: 'bg-[#b4b49f] text-black'
									}`}
									onClick={() => setRsvpData(prev => ({ ...prev, attendance: 'Will Attend' }))}
									style={{ fontFamily: 'Cardo, serif' }}
								>
									Will Attend
								</button>
								<button
									type="button"
									className={`w-full py-2 px-4 rounded-lg text-sm ${
										rsvpData.attendance === 'Unable To Attend' 
											? 'bg-[#b4b49f] text-black' 
											: 'bg-[#b4b49f] text-black'
									}`}
									onClick={() => setRsvpData(prev => ({ ...prev, attendance: 'Unable To Attend' }))}
									style={{ fontFamily: 'Cardo, serif' }}
								>
									Unable To Attend
								</button>
							</div>
						</div>

						<div>
							<p className="text-sm mb-2" style={{ fontFamily: 'Cardo, serif' }}>
								People you bring including you?
							</p>
							<div className="flex items-center justify-center gap-4">
								<button
									type="button"
									className="w-6 h-6 rounded bg-[#b4b49f] flex items-center justify-center text-sm"
									onClick={() => setRsvpData(prev => ({ ...prev, guestCount: Math.max(1, prev.guestCount - 1) }))}
									style={{ fontFamily: 'Cardo, serif' }}
								>
									-
								</button>
								<div className="w-16 py-2 px-4 rounded-lg bg-[#b4b49f] text-sm" style={{ fontFamily: 'Cardo, serif' }}>
									{rsvpData.guestCount}
								</div>
								<button
									type="button"
									className="w-6 h-6 rounded bg-[#b4b49f] flex items-center justify-center text-sm"
									onClick={() => setRsvpData(prev => ({ ...prev, guestCount: Math.min(10, prev.guestCount + 1) }))}
									style={{ fontFamily: 'Cardo, serif' }}
								>
									+
								</button>
							</div>
						</div>

						<button
							type="submit"
							className="w-full py-2 px-4 rounded-lg bg-[#b4b49f] text-sm"
							disabled={isSubmitting}
							style={{ fontFamily: 'Cardo, serif' }}
						>
							{isSubmitting ? (
								<>
									<Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
									Sending...
								</>
							) : (
								'Confirm'
							)}
						</button>
					</form>
				</div>
			</section>
		</div>
	)
}
