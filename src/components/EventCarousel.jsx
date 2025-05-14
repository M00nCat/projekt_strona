import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const events = [
    {
      id: 1,
      img: "323.jpg",
      title: "Slide Masters – Tor Poznań",
      date: "28.05.2025r.",
      description: "Profesjonalna nawierzchnia, szerokie zakręty i miejsce na pełen gaz! Driftowe zmagania w duchu fair play z podziałem na klasy – od amatora po PRO. Idealne wydarzenie, by wejść krok dalej w świat driftu."
    },
    {
      id: 2,
      img: "speedhunter.jpg",
      title: "Street Drift Night – Tor Łódź",
      date: "01.06.2025r.",
      description: "Łódzki tor zamienia się w arenę wieczornego driftu! Klimatyczne oświetlenie, dym, muzyka i luźna atmosfera – to idealne wydarzenie dla początkujących i średniozaawansowanych drifterów."
    },
    {
      id: 3,
      img: "silvia.jpg",
      title: "Drift Attack – Tor Kielce",
      date: "15.06.2025r.",
      description: "Górzysta nitka toru w Kielcach to wyzwanie dla każdego fana driftu! Szybkie łuki, zmienne nachylenie i adrenalina na każdym zakręcie. Wydarzenie dla tych, którzy lubią jeździć agresywnie – bokiem i z charakterem."
    },
    {
      id: 4,
      img: "skyline.jpg",
      title: "Drift Training Day – Tor Poznań",
      date: "28.06.2025r.",
      description: "Luźne jazdy, dużo czasu na torze i wsparcie doświadczonych instruktorów — Drift Training Day to wydarzenie stworzone z myślą o doskonaleniu techniki. Bez presji, bez klasyfikacji, za to z maksymalną frajdą z jazdy bokiem!"
    },
    {
      id: 5,
      img: "mazda.jpg",
      title: "Amator Cup – Tor Jastrząb",
      date: "07.07.2025r.",
      description: "100% czystej pasji i emocji. Tor Jastrząb gwarantuje techniczne zakręty i świetne warunki do jazdy w parach. Puchary, nagrody i masa motywacji do dalszego rozwoju!"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      showNext();
    }, 8000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const showPrevious = () => {
    setCurrentIndex((current) => {
      if (current === 0) {
        return events.length - 2;
      }
      return current - 1;
    });
  };

  const showNext = () => {
    setCurrentIndex((current) => {
      if (current >= events.length - 2) {
        return 0;
      }
      return current + 1;
    });
  };

  const visibleEvents = events.slice(currentIndex, currentIndex + 2);
  if (visibleEvents.length < 2) {
    visibleEvents.push(...events.slice(0, 2 - visibleEvents.length));
  }

  return (
      <div className="container mx-auto px-6 py-12">
        <div className="relative">
          {/* Przycisk poprzedni */}
          <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              onClick={showPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-yellow-400 text-black p-4 rounded-full hover:bg-yellow-300 z-10 md:left-4 md:p-6 sm:left-2 sm:p-4 transform transition-all"
          >
            ←
          </motion.button>

          <div className="flex gap-8 justify-center overflow-hidden">
            <AnimatePresence mode="popLayout">
              {visibleEvents.map((event) => (
                  <motion.div
                      key={event.id}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="w-full md:w-1/2 max-w-md sm:w-full sm:mb-4"
                  >
                    <div className="bg-gray-800 h-48 flex items-center justify-center text-xl mb-4 overflow-hidden">
                      <motion.div
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                      >
                        <img src={event.img} alt="image" />
                      </motion.div>
                    </div>
                    <div className="bg-yellow-400 p-6 text-black ">
                      <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                      <p className="text-sm mb-2">{event.date}</p>
                      <p>{event.description}</p>
                    </div>
                  </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Przycisk następny */}
          <motion.button
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
              onClick={showNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-yellow-400 text-black p-4 rounded-full hover:bg-yellow-300 z-10 md:right-4 md:p-6 sm:right-2 sm:p-4 transform transition-all"
          >
            →
          </motion.button>
        </div>
      </div>
  );
}

export default EventCarousel;
