import episodes from './episodes.json'

function remainEvents(startDate, events) {
  const today = new Date() // Текущая дата
  const result = [];

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

  return result.filter(day => day && day.events.length > 0); // Отфильтровать пустые дни
}

function App() {

  console.log(remainEvents(new Date(2024, 3, 12), episodes.episodes))

  return (
    <div className="bg-gray-900 flex items-center justify-center bg-opacity-50 p-4 h-[100vh]">
      <div className="flex max-w-[720px] flex-col-reverse md:flex-row justify-center items-center p-8 gap-6 bg-gray-900 bg-opacity-50 rounded-3xl">
        <div className="inline-grid grid-cols-6 gap-1">
          {remainEvents(new Date(2024, 3, 30), episodes.episodes).map((day) =>
            <div className="group relative inline-block p-2 px-2 rounded-xl text-sm bg-gray-800 text-gray-300">
              {day.date.getDate() <= 9 ? '0' + day.date.getDate() : day.date.getDate()}.{day.date.getMonth() <= 9 ? '0' + day.date.getMonth() : day.date.getMonth()}
              <div className="shadow-lg left-0 top-full w-[300px] rounded-xl pointer-events-none z-50 absolute bg-gray-800 -translate-y-2 group-hover:translate-y-2 opacity-0 group-hover:opacity-100 p-2 flex flex-col transition-all duration-300">
                {day.events.map((event) =>
                  <div key={JSON.stringify(event)} className="p-1 px-2 rounded-lg">
                    <div className="flex justify-between"><span>{event.name}</span> <span className="text-gray-400">{event.season}.{event.episode_number}</span> </div>
                    <span className="text-gray-400 text-xs block">({event.date})</span>
                  </div>
                )}
              </div>
            </div>)}
        </div>
        <div className="p-2">
          <div className="font-house-md text-5xl">House1</div>
          <div className="font-house-md text-xl mt-2 ml-1 [letter-spacing:-0.2em]">PROGRESS</div>
        </div>
      </div>
    </div>
  )
}

export default App
