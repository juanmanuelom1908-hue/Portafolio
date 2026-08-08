const { useState, useEffect, useRef } = React;

const SuperheroForm = () => {

  const heroCardRef = useRef(null);
  
 const powerSourceOptions = [
  '🧬 Bitten by a strange creature',
  '☢️ Radioactive exposure',
  '🧪 Science experiment',
  '👽 Alien heritage',
  '🏺 Ancient artifact discovery',
  '✨ Other'
];
  
  const powersOptions = [
  '💪 Super Strength',
  '⚡ Super Speed',
  '🪽 Flight',
  '👻 Invisibility',
  '🧠 Telekinesis',
  '✨ Other'
];
  const [hero, setHero] = useState(null);
  const [heroName, setHeroName] = useState('');
  const [realName, setRealName] = useState('');
  const [powerSource, setPowerSource] = useState('');
  const [powers, setPowers] = useState([]);
  const [powerLevel, setPowerLevel] = useState(50);
  const [animatedPower, setAnimatedPower] = useState(0);

  useEffect(() => {
  if (hero && heroCardRef.current) {
    heroCardRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  }
}, [hero]);

  useEffect(() => {
  if (!hero) return;

  setAnimatedPower(0);

  const timer = setTimeout(() => {
    setAnimatedPower(Number(hero.powerLevel));
  }, 100);

  return () => clearTimeout(timer);
}, [hero]);
  
  const handlePowersChange = e => {
    const { value, checked } = e.target;
    setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
  }
  const handleSubmit = e => {
  e.preventDefault();

  setHero({
    heroName,
    realName,
    powerSource,
    powers,
    powerLevel
  });
};
const powerColor =
  powerLevel <= 30
    ? "bg-emerald-500"
    : powerLevel <= 70
    ? "bg-amber-400"
    : "bg-red-500";

const powerRank =
  powerLevel <= 30
    ? "Rookie 🟢"
    : powerLevel <= 70
    ? "Hero 🟡"
    : powerLevel <= 90
    ? "Elite 🔥"
    : "Legendary ⚡";
  
  return (
  <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-fuchsia-950 flex flex-col items-center p-6">

    {/* FORMULARIO */}
    <div className="w-full max-w-2xl bg-gradient-to-br from-white via-slate-50 to-indigo-50 rounded-2xl shadow-2xl p-10">

      <h1 className="text-4xl font-bold text-center text-slate-900">
        Superhero Application Form
      </h1>

      <p className="text-center text-slate-500 mt-2 mb-8">
        Please complete all fields
      </p>

      <form onSubmit={handleSubmit}>

        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            🦸 Hero Name
          </label>

          <input
            className="w-full border-2 border-indigo-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 transition duration-300"
            type="text"
            value={heroName}
            onChange={e => setHeroName(e.target.value)}
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            👤 Real Name
          </label>

          <input
            className="w-full border-2 border-indigo-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 transition duration-300"
            type="text"
            value={realName}
            onChange={e => setRealName(e.target.value)}
          />
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            ⚡ How did you get your powers?
          </label>

          <select
            value={powerSource}
            onChange={e => setPowerSource(e.target.value)}
            className="w-full border-2 border-indigo-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-200 transition duration-300"
          >
            <option value="">Select one</option>

            {powerSourceOptions.map(source => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </div>

        
        <div className="mb-6">
          <p className="block text-sm font-semibold text-slate-700 mb-3">
            💥 List your powers (select all that apply):
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {powersOptions.map(power => (
              <label
                key={power}
                className={`flex items-center gap-3 border-2 rounded-lg p-3 cursor-pointer transition duration-300 ${
                  powers.includes(power)
                    ? "border-fuchsia-500 bg-indigo-100"
                    : "border-indigo-200 hover:bg-indigo-50 hover:border-fuchsia-400"
                }`}
              >
                <input
                  type="checkbox"
                  value={power}
                  checked={powers.includes(power)}
                  onChange={handlePowersChange}
                />

                <span
                  className={
                    powers.includes(power)
                      ? "text-indigo-700 font-semibold"
                      : "text-slate-700"
                  }
                >
                  {power}
                </span>
              </label>
            ))}
          </div>
        </div>

        
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            🔥 Power Level: {powerLevel}
          </label>

          <input
            type="range"
            min="1"
            max="100"
            value={powerLevel}
            onChange={e => setPowerLevel(e.target.value)}
            className="w-full accent-indigo-600"
          />
        </div>

       
        <button
          type="submit"
          disabled={!heroName || !realName || !powerSource || powers.length === 0}
          className="w-full mt-2 bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white font-bold py-3 px-4 rounded-lg hover:from-indigo-700 hover:to-fuchsia-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
        >
          ⚡ Join the League
        </button>

      </form>
    </div>

   
    {hero && (
      
      <div   ref={heroCardRef} className="w-full max-w-2xl mt-12">
        <div className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-8 text-white shadow-xl">

          <p className="text-sm uppercase tracking-widest text-indigo-100">
            Superhero Profile
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {hero.heroName}
          </h2>

          <p className="mt-2">
            Real Name: {hero.realName}
          </p>

          <p className="mt-2">
            Origin: {hero.powerSource}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">
              Powers ⚡
            </h3>

            <ul className="mt-2 space-y-1">
              {hero.powers.map(power => (
                <li key={power}>
                  ⚡ {power}
                </li>
              ))}
            </ul>
          </div>

          
          <div className="mt-6">
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                Power Level
              </span>

              <span>
                {hero.powerLevel}/100 · {powerRank}
              </span>
            </div>

            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full ${powerColor} rounded-full transition-all duration-1000`}
                style={{ width: `${animatedPower}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
    )}

  </div>
);
};