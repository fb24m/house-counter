import { Button, Card, CssVarsProvider } from '@mui/joy'
import house from './battle_creek.json'
import { useEffect, useState } from 'react'

function remainEvents<T,>(startDate: Date, events: Array<T>) {
  const today = new Date() // Текущая дата
  const result: any = []

  const eventsPerDay = 2

  events.forEach((event, index) => {
    const daysToAdd = Math.floor(index / eventsPerDay)
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + daysToAdd)

    if (eventDate >= today) {
      const currentDayIndex = Math.floor(index / eventsPerDay)
      if (!result[currentDayIndex]) {
        result[currentDayIndex] = { date: eventDate, events: [] }
      }
      result[currentDayIndex].events.push(event)
    }
  });

  return result.filter((day: any) => day && day.events.length > 0); // Отфильтровать пустые дни
}

function App() {
  const starringList = ['BattleCreek', 'Josh Duamel', 'Dean Winters', 'Aubrey Dollar', 'Edward Fordham', 'Kal Penn', 'Janet McTeer', 'Vince Gilligan']
  const [isPjFirst, setIsPjFirst] = useState(false)
  const [currentStar, setCurrentStar] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStar < starringList.length) {
        setCurrentStar(currentStar + 1)
      }
      else {
        setCurrentStar(0)
      }
    }, 3000)

    return () => {
      clearInterval(interval)
    }
  }, [currentStar])

  return (
    <div className="bg-[#17212b]">
      <CssVarsProvider defaultMode="dark" defaultColorScheme="dark" modeStorageKey="dark">
        <div className="flex items-center flex-col gap-4 bg-opacity-50 py-4 h-[100vh]">
          <Card variant="outlined" className="max-w-[360px] relative h-[160px] p-8 w-full">
            {starringList.map((item, i) => <div key={i} className={`duration-500 ${i !== currentStar ? 'opacity-0' : 'opacity-100'}`}>
              <span className="absolute top-8 left-1/2 -translate-x-1/2 uppercase [letter-spacing:0.1em] font-bold">
                {i === 1 && 'starring'}
                {i === starringList.length - 3 && 'with'}
                {i === starringList.length - 2 && 'and'}
                {i === starringList.length - 1 && 'created by'}
              </span>
              <h2
                className={`duration-500 transition-all font-house-md text-2xl absolute top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap 
                ${i === currentStar ? 'left-1/2' : i > currentStar ? 'left-[45%]' : 'left-[55%]'}
                `}
              >
                {item}
              </h2>
              {currentStar === 0 &&
                <span className="font-house-md [letter-spacing:-0.2em] absolute bottom-8 left-1/2 -translate-x-1/2">
                  COUNTER
                </span>
              }
              <span className="absolute bottom-2 text-gray-500 left-1/2 -translate-x-1/2">
                {i === starringList.length - 1 && 'and David Shore'}
              </span>
            </div>
            )}
          </Card>

          <Card variant="outlined" className="max-w-[360px] p-8 w-full">
            <div className="flex gap-4 items-center justify-center text-lg font-sofia-pro font-light">
              <span>{isPjFirst ? 'Commissioner Dave' : 'Vince Gilligan'}</span>
              <Button onClick={() => { setIsPjFirst(!isPjFirst) }}>
                <span className="material-symbols-outlined">swap_horiz</span>
              </Button>
              <span>{isPjFirst ? 'Kavinsky' : 'David Shore'}</span>
            </div>
          </Card>

          <Card variant="outlined" className="max-w-[360px] w-full p-4 relative" >
            <div className="flex flex-col justify-center gap-6 items-center">
              <div className="inline-grid grid-cols-5 gap-1">
                {remainEvents(new Date(2024, 10, 2), house.episodes).map((day: any) =>
                  <Button variant={!day.events.find((e: any) => e.no_intro) ? "plain" : "outlined"} className="static-btn group inline-block p-2 px-2 rounded-xl text-sm bg-gray-800 text-gray-300">
                    {+day.date.getDate() + 1 <= 9 ? '0' + (day.date.getDate() - 1) : Number(day.date.getDate()) - 1}.{day.date.getMonth() + 1 <= 9 ? `0${day.date.getMonth() + 1}` : day.date.getMonth() + 1}
                    <div className="absolute left-0 top-full pointer-events-none z-50">
                      <Card className="w-[360px] bg-gray-800 translate-y-4 opacity-0 group-hover:opacity-100 flex flex-col transition-all duration-300">
                        {day.events.map((event: any) =>
                          <div key={JSON.stringify(event)}>
                            <div className="flex justify-between"><span>{event.name}</span> <span className="text-gray-400">{event.season}.{event.episode_number}</span> </div>
                            <span className="text-gray-400 text-left text-xs block w-full">{event.date}</span>
                            {event.no_intro && <span className="text-gray-400 text-left text-xs block w-full">В серии упрощенная заставка</span>}
                          </div>
                        )}
                      </Card>
                    </div>
                  </Button>)}
              </div>
            </div>

          </Card>
        </div>
      </CssVarsProvider >
    </div >
  )
}

function App() {
  return (
    <iframe className="w-full h-[100vh] object-cover" width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
  )
}

export default App
