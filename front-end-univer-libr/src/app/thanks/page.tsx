import { NO_INDEX_PAGE } from '@/constants/app.constants'
import Heading from '@/ui/Heading'
import { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Thanks',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return (
		<Heading>
			Бронювання прийнято! <br /> При видачі скажіть бібліотекарю айді
			замовлення <br /> Замовлення можете подивитися натиснувши на фотографію
			профіля =&gt; Мої замовлення <br /> У вас є тиждень щоб забрати замовлення
			в бібліотеці УМСФ
		</Heading>
	)
}
