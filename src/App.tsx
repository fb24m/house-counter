import { Button, Card, CssVarsProvider } from '@mui/joy'
import house from './house.json'
import { useState } from 'react'

function remainEvents<T,>(startDate: Date, events: Array<T>) {
  const today = new Date() // Текущая дата
  const result: any = []

  // Предполагаем, что каждый день происходит два события
  const eventsPerDay = 2;

  // Рассчитываем даты для каждого события, начиная с startDate
  events.forEach((event, index) => {
    const daysToAdd = Math.floor(index / eventsPerDay); // Количество полных дней, прошедших с начальной даты
    const eventDate = new Date(startDate);
    eventDate.setDate(startDate.getDate() + daysToAdd); // Установка рассчитанной даты события

    if (eventDate >= today) {
      const currentDayIndex = Math.floor(index / eventsPerDay); // Индекс дня (каждый день два события)
      if (!result[currentDayIndex]) {
        result[currentDayIndex] = { date: eventDate, events: [] };
      }
      result[currentDayIndex].events.push(event);
    }
  });

  return result.filter((day: any) => day && day.events.length > 0); // Отфильтровать пустые дни
}

function App() {
  const [isPjFirst, setIsPjFirst] = useState(true)

  const params = new URLSearchParams(location.search)

  // const [isLisaHidden, setIsLisaHidden] = useState(false)
  // const [lisaTimer, setLisaTimer] = useState('5')
  // const [lisaDuration, setLisaDuration] = useState('duration-700')

  // const setLisaTimeout = () => {
  //   setLisaTimer('5')
  //   setTimeout(() => {
  //     setIsLisaHidden(false)
  //   }, 5000)
  //   setTimeout(() => {
  //     setLisaTimer('4')
  //   }, 1000)
  //   setTimeout(() => {
  //     setLisaTimer('3')
  //   }, 2000)
  //   setTimeout(() => {
  //     setLisaTimer('2')
  //   }, 3000)
  //   setTimeout(() => {
  //     setLisaTimer('1')
  //   }, 4000)
  // }
  return (
    <div className="bg-[#17212b]">
      <CssVarsProvider defaultMode="dark" defaultColorScheme="dark" modeStorageKey="dark">
        <div className="flex items-center flex-col gap-4 bg-opacity-50 p-20 h-[100vh]">
          <Card variant="outlined" className="max-w-[400px] p-8 w-full">
            <div className="flex gap-4 items-center justify-center text-xl font-sofia-pro font-light">
              <span>{isPjFirst ? 'Peter Jacobson' : 'Jesse Spencer'}</span>
              <Button onClick={() => { setIsPjFirst(!isPjFirst) }}>
                <span className="material-symbols-outlined">swap_horiz</span>
              </Button>
              <span>{isPjFirst ? 'Jesse Spencer' : 'Peter Jacobson'}</span>
            </div>
          </Card>
          {/* <Card variant="outlined" className={`max-w-[400px] p-8 w-full`}>
            <div className="relative text-xl font-sofia-pro font-light">
              <div className={`flex gap-4 items-center transition-all ${lisaDuration} ${isLisaHidden && 'blur-xl opacity-0'}`}>
                <Button onClick={() => { setIsLisaHidden(true); setLisaTimeout() }}>
                  <span className="material-symbols-outlined">close</span>
                </Button>
                <span className="block w-full">Lisa Edelstein</span>
              </div>
              <div className={`absolute w-full left-1/2 text-center top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${isLisaHidden ? 'opacity-1' : 'opacity-0 pointer-events-none'}`}>
                {lisaTimer}
              </div>
            </div>
          </Card> */}
          <Card variant="outlined" className="max-w-[400px] w-full p-8 relative" >
            <div className="flex flex-col justify-center gap-6 items-center">
              <div className="p-2">
                <div className="font-house-md text-5xl">House1</div>
                <div className="font-house-md text-xl mt-2 ml-1 [letter-spacing:-0.2em]">COUNTER</div>
              </div>

              <div className="inline-grid grid-cols-5 gap-1">
                {remainEvents(new Date(2024, 3, 27), house.episodes).map((day: any) =>
                  <Button variant={!day.events.find((e: any) => e.no_intro) ? "plain" : "outlined"} className="static-btn group inline-block p-2 px-2 rounded-xl text-sm bg-gray-800 text-gray-300">
                    {+day.date.getDate() + 1 <= 9 ? '0' + (day.date.getDate() - 1) : Number(day.date.getDate()) - 1}.{day.date.getMonth() + 1 <= 9 ? `0${day.date.getMonth() + 1}` : day.date.getMonth() + 1}
                    <div className="absolute left-0 top-full pointer-events-none z-50">
                      <Card className="w-[400px] bg-gray-800 translate-y-2 opacity-0 group-hover:opacity-100 flex flex-col transition-all duration-300">
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

export default App
