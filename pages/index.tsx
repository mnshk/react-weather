// import { Inter } from '@next/font/google'
// const inter = Inter({ subsets: ['latin'] })
import { useEffect, useState } from 'react'
import { Parallax, ParallaxLayer } from '@react-spring/parallax'
import Head from 'next/head'
import Header from '../components/Header'
import CityForm from '../components/CityForm'
import Footer from '../components/Footer'
import Spinner from '../components/Spinner'

export default function Home({ API_KEY }: { API_KEY: string }) {

	const [inputCity, setInputCity] = useState<string>("delhi");
	const [btnText, setBtnText] = useState<any>("Search");
	const [displayCity, setDisplayCity] = useState<string>("");
	const [displayTemp, setDisplayTemp] = useState<string>("");

	const [weatherData, setWeatherData] = useState<any>({});

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	const months = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

	const d = new Date()
	const displayDate = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
	const cHour = (d.getHours() > 12 ? d.getHours() - 12 : d.getHours())
	const cMinutes = d.getMinutes()
	const meridian = d.getHours() > 11 ? "PM" : "AM"
	const displayTime = `${cHour < 10 ? "0" + cHour : cHour}:${cMinutes < 10 ? "0" + cMinutes : cMinutes} ${meridian}`

	const searchWeather = async (e: any) => {
		if (e)
			e.preventDefault();
		if (inputCity.trim() == "")
			return;
		setBtnText(<Spinner />)

		await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${API_KEY}&units=metric`)
			.then((response) => {
				if (response.status == 200) {
					response.json().then((data) => {
						let main = data.main
						setWeatherData({
							temp: main.temp,
							feels_like: main.feels_like,
							temp_max: main.temp_max,
							temp_min: main.temp_min,
							main: data.weather.main,
							pressure: ((main.pressure / 1000)),
							humidity: main.humidity,
							wind_speed: data.wind.speed,
							wind_angle: data.wind.deg,
						});
						console.log(weatherData)
						setDisplayCity(`${data.name}, ${data.sys.country}`);
						// setDisplayTemp(parseInt(data.main.temp).toString());
					})
				}
				if (response.status == 404) {
					setDisplayCity(`Oops! not found.`);
					setWeatherData("");
				}
				setBtnText("Search")
				setInputCity("")
			})
			.catch((response) => {
				console.log("Fetch Error")
			})
	}

	useEffect(() => {
		searchWeather(null)
	}, [])

	return (
		<>
			<Head>
				<meta name="theme-color" content='rgb(15 23 42)'></meta>
			</Head>



			<div className={`flex flex-col h-screen w-full font-Inter bg-slate-900 text-white`}>

				<div className="flex flex-col w-full backdrop-blur-md fixed z-20">
					<Header />
					<CityForm city={inputCity} setCity={setInputCity} searchWeather={searchWeather} btn={btnText} />
				</div>

				<div className='bg-graphic bg-graphic-1' />
				<div className='bg-graphic bg-graphic-2' />
				<div className='bg-graphic bg-graphic-3' />

				<div className="flex flex-col w-full flex-grow backdrop-blur-sm z-10 max-h-full smooth-fade relative">
					<Parallax pages={1.5}>
						<ParallaxLayer speed={0.2}>
							<div className="flex flex-col w-full flex-grow">
								<div className="p-28"></div>
								<div className='max-w-lg mx-auto flex flex-col justify-center w-full'>
									<div className="text-3xl font-black my-10 flex justify-center">{displayCity}</div>
									{
										weatherData ? (
											<div className='flex flex-col'>
												<div className='flex justify-center pt-5'>
													<div className="p-3"></div>
													<div className='text-8xl font-bold'>{parseInt(weatherData.temp)}</div>
													<div className='text-4xl font-bold'>&#8451;</div>
												</div>
												<div className='text-center my-6 text-2xl font-bold'>{weatherData.main}</div>
												<div className='text-center'>{displayDate}</div>
												<div className='text-center py-3 text-xl'>{displayTime}</div>
												<div className='flex justify-center my-20 text-sm'>
													<div className='mr-5'>
														<div>Feels Like</div>
														<div>Lowest</div>
														<div>Highest</div>
														<div>Pressure</div>
														<div>Humidity</div>
														<div>Wind Speed</div>
														<div>Wind Angle</div>
													</div>
													<div>
														<div>{`${weatherData.feels_like} `}&#8451;</div>
														<div>{`${weatherData.temp_min} `}&#8451;</div>
														<div>{`${weatherData.temp_max} `}&#8451;</div>
														<div>{`${weatherData.pressure} `}bar</div>
														<div>{`${weatherData.humidity} `}gm<sup>3</sup></div>
														<div>{`${weatherData.wind_speed} `}kmph</div>
														<div>{`${weatherData.wind_angle} `}&#176;</div>
													</div>
												</div>
											</div>
										) : null
									}
								</div>
								<Footer />
							</div>
						</ParallaxLayer>
					</Parallax>
				</div>
			</div>
		</>
	)
}


export async function getServerSideProps() {
	const API_KEY = process.env.WEATHER_API_KEY;
	return {
		props: {
			API_KEY: API_KEY,
		}
	}
}