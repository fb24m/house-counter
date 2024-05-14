import { Button, Card, CssVarsProvider, getInitColorSchemeScript } from '@mui/joy';
import episodes from './episodes.json'

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

  console.log(remainEvents(new Date(2024, 3, 12), episodes.episodes))

  console.log(getInitColorSchemeScript())

  return (
    <div className="bg-[rgb(11,13,14)]">
      <CssVarsProvider defaultMode="dark" defaultColorScheme="dark" modeStorageKey="dark">
        <div className="flex items-center justify-center bg-opacity-50 p-4 h-[100vh]">
          <Card variant="outlined" className="max-w-[720px] p-8" >
            <div className="flex flex-col-reverse md:flex-row justify-center gap-6 items-center">
              <div className="inline-grid grid-cols-6 gap-1">
                {remainEvents(new Date(2024, 3, 30), episodes.episodes).map((day: any) =>
                  <Button variant="soft" className="group relative inline-block p-2 px-2 rounded-xl text-sm bg-gray-800 text-gray-300">
                    {day.date.getDate() <= 9 ? '0' + day.date.getDate() : day.date.getDate()}.{day.date.getMonth() <= 9 ? '0' + day.date.getMonth() : day.date.getMonth()}
                    <div className="absolute left-0 pointer-events-none top-full z-50">
                      <Card className="shadow-lg w-[300px] bg-gray-800 -translate-y-2 group-hover:translate-y-2 opacity-0 group-hover:opacity-100 flex flex-col transition-all duration-300">
                        {day.events.map((event: any) =>
                          <div key={JSON.stringify(event)}>
                            <div className="flex justify-between"><span>{event.name}</span> <span className="text-gray-400">{event.season}.{event.episode_number}</span> </div>
                            <span className="text-gray-400 text-left text-xs block w-full">({event.date})</span>
                          </div>
                        )}
                      </Card>
                    </div>
                  </Button>)}
              </div>
              <div className="p-2">
                <div className="font-house-md text-5xl">House1</div>
                <div className="font-house-md text-xl mt-2 ml-1 [letter-spacing:-0.2em]">PROGRESS</div>
              </div>
            </div>
          </Card>
        </div>
      </CssVarsProvider>
    </div>
  )
}

export default App
