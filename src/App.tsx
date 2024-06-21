import { Button, Card, CssVarsProvider } from '@mui/joy'
import resident_1 from './resident_1.json'

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

  return result.filter((day: any) => day && day.events.length > 0)
}

const EventCard = (day: any) => {
  return (
    <>
      {day.events.find((e: any) => e.episode_number === 1) && <Button>S{day.events[0].season > day.events[1].season ? day.events[0].season : day.events[1].season}</Button>}
      <Button variant={!day.events.find((e: any) => e.no_intro) ? "plain" : "outlined"} className="static-btn group inline-block p-2 px-2 rounded-xl text-sm bg-gray-800 text-gray-300">
        {+day.date.getDate() + 1 <= 9 ? '0' + (day.date.getDate()) : Number(day.date.getDate()) - 1}.{day.date.getMonth() <= 9 ? `0${day.date.getMonth() + 1}` : day.date.getMonth() + 1}
        <div className="absolute left-0 top-full pointer-events-none z-50">
          <Card className="w-[360px] bg-gray-800 translate-y-4 opacity-0 group-hover:opacity-100 flex flex-col transition-all duration-300">
            {day.events.map((event: any) =>
              <div>
                <div className="flex justify-between"><span>{event.name}</span> <span className="text-gray-400">{event.season}.{event.episode_number}</span> </div>
                <span className="text-gray-400 text-left text-xs block w-full">{event.date}</span>
                {!event.no_intro && <span className="text-gray-400 text-left text-xs block w-full">В серии упрощенная заставка</span>}
              </div>
            )}
          </Card>
        </div>
      </Button>
    </>
  )
}

() => {
  return (
    <div className="bg-[#17212b]">
      <CssVarsProvider defaultMode="dark" defaultColorScheme="dark" modeStorageKey="dark">
        <div className="flex items-center flex-col gap-4 bg-opacity-50 py-4 h-[100vh]">
          <Card variant="outlined" className="max-w-[360px] relative h-[160px] p-8 w-full">
            <div className="font-house-md text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 house-letter">
              R
            </div>
            <div className="font-house-md text-4xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 house-word">
              Resident
            </div>
            <div className="font-house-md absolute bottom-6 left-1/2 -translate-x-1/2 text-xl ml-1 [letter-spacing:-0.2em] house-sub">COUNTER</div>
          </Card>

          <Card variant="outlined" className="max-w-[360px] w-full p-4 relative" >
            <div className="flex flex-col justify-center gap-1 items-center">
              <div className="inline-grid grid-cols-5 gap-1">
                {remainEvents(new Date(2024, 6 - 1, 20), resident_1.episodes).map((day: any) =>
                  <EventCard {...day} />
                )}
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
