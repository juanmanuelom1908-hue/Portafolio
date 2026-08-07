const { useState } = React;

const SuperheroForm = () => {
  
  const powerSourceOptions = [
    'Bitten by a strange creature',
    'Radioactive exposure',
    'Science experiment',
    'Alien heritage',
    'Ancient artifact discovery',
    'Other'
  ];
  
  const powersOptions = [
    'Super Strength',
    'Super Speed',
    'Flight',
    'Invisibility',
    'Telekinesis',
    'Other'
  ];
  
  const [heroName, setHeroName] = useState('');
  const [realName, setRealName] = useState('');
  const [powerSource, setPowerSource] = useState('');
  const [powers, setPowers] = useState([]);
  
  const handlePowersChange = e => {
    const { value, checked } = e.target;
    setPowers(checked ? [...powers, value] : powers.filter(p => p !== value));
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-950 to-fuchsia-950 flex items-center justify-center p-6">
    <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10">
      <h1 className="text-4xl font-bold text-center text-slate-900">Superhero Application Form</h1>
      <p className="text-center text-slate-500 mt-2 mb-8">Please complete all fields</p>
       <form method='post' action='https://superhero-application-form.freecodecamp.org'>
        <div className='section'>
          <label>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Hero Name</label>
            <input
            className="space-y-6 w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type='text'
              value={heroName}
              onChange={e => setHeroName(e.target.value)}
            />
          </label>
          <label>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
    Real Name
  </label>
            <input
            className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 space-y-6"
              type='text    '
              value={realName}
              onChange={e => setRealName(e.target.value)}
            />
          </label>
        </div>
        <label className='section column'>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
    How did you get your powers?
  </label>

          <select value={powerSource} onChange={e => setPowerSource(e.target.value)} className="w-full border border-slate-300 rounded-lg px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value=''>
              Select one
            </option>
            {powerSourceOptions.map(source => (
              <option key={source} value={source}>
                {source}
              </option>
            ))}
          </select>
        </label>
        <label className='section column'>
          <p className="block text-sm font-semibold text-slate-700 mb-3">
  List your powers (select all that apply):
</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {powersOptions.map(power => (
            <label
  key={power}
  className="flex items-center gap-3 border border-slate-200 rounded-lg p-3 cursor-pointer hover:bg-indigo-50 hover:border-indigo-300 transition"
>
              <input
                type='checkbox'
                value={power}
                checked={powers.includes(power)}
                onChange={handlePowersChange}
              />
              <span className="text-slate-700">{power}</span>
            </label>
          ))}
          </div>
        </label>
        <button
          className="w-full mt-6 bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 transition disabled:bg-slate-300 disabled:cursor-not-allowed"
          type='submit'
          disabled = {!heroName || !realName || !powerSource || powers.length === 0} 
        >
          Join the League
        </button>
      </form>
      </div>
    </div>
  )
};