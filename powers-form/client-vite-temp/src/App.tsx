import { useState, useEffect, useRef } from  "react";

const SuperheroForm = () => {

  const heroCardRef = useRef<HTMLDivElement>(null);
  
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
  interface Hero {
  id?: number;
  heroName: string;
  realName: string;
  powerSource: string;
  powers: string[];
  powerLevel: number;
}
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
async function saveHero(newHero: Hero) {
  const res = await fetch(`${API_URL}/api/heroes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newHero),
  });
  return res.json();
}

const [hero, setHero] = useState<Hero | null>(null);
  const [heroName, setHeroName] = useState('');
  const [realName, setRealName] = useState('');
  const [powerSource, setPowerSource] = useState('');
  const [powers, setPowers] = useState<string[]>([]);
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
  
    const handlePowersChange =(e: React.ChangeEvent<HTMLInputElement>)  => {
      const { value, checked } = e.target;
      setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
    }

    const [savedHeroes, setSavedHeroes] = useState<Hero[]>([]);
    useEffect(() => {
  fetch(`${API_URL}/api/heroes`)
    .then((res) => res.json())
    .then((data: Hero[]) => setSavedHeroes(data));
}, []);
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const newHero: Hero = { heroName, realName, powerSource, powers, powerLevel };

  const saved = await saveHero(newHero);
  setSavedHeroes((prev) => [...prev, saved]);
  setHero(saved);
};



function getPowerColor(level: number) {
  return level <= 30 ? "bg-emerald-500" : level <= 70 ? "bg-amber-400" : "bg-red-500";
}

function getPowerRank(level: number) {
  if (level <= 30) return "Rookie 🎯";
  if (level <= 70) return "Hero 💫";
  if (level <= 90) return "Elite ⚡";
  return "Legendary 🔥";
}
  
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
           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPowerLevel(Number(e.target.value))}
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
                {hero.powerLevel}/100 · {getPowerRank(hero.powerLevel)}
              </span>
            </div>

            <div className="h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className={`h-full ${getPowerColor} rounded-full transition-all duration-1000`}
                style={{ width: `${animatedPower}%` }}
              ></div>
            </div>
          </div>

        </div>
      </div>
       )}

    {savedHeroes.length > 0 && (
      <div className="w-full max-w-2xl mt-8 space-y-4">
        <h3 className="text-xl font-bold text-white">Miembros de la Liga</h3>
        {savedHeroes.map((h) => (
          <div
            key={h.id}
            className="rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-600 p-6 text-white"
          >
            <p className="text-xs uppercase tracking-widest text-indigo-100">Superhero Profile</p>
            <h2 className="text-2xl font-bold mt-1">{h.heroName}</h2>
            <p className="mt-1 text-sm">Real Name: {h.realName}</p>
            <p className="text-sm">Origin: {h.powerSource}</p>

            <div className="mt-3">
              <h4 className="font-semibold text-sm">Powers ⚡</h4>
              <ul className="mt-1 space-y-1 text-sm">
                {h.powers.map((power) => (
                  <li key={power}>⚡ {power}</li>
                ))}
              </ul>
            </div>

            <div className="mt-4">
              <div className="flex justify-between mb-1 text-sm">
                <span className="font-semibold">Power Level</span>
                <span>{h.powerLevel}/100 · {getPowerRank(h.powerLevel)}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div
                  className={`h-full ${getPowerColor(h.powerLevel)} rounded-full`}
                  style={{ width: `${h.powerLevel}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    )}

  </div>
);

};

export default SuperheroForm;