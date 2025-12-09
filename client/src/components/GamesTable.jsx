export default function GamesTable({ games }) {
  if (!games || games.length === 0) {
    return <p className="text-center mt-4 text-gray-400">No games found.</p>;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-gray-900 text-white rounded-lg text-sm">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="px-4 py-2 text-left">Date</th>
            <th className="px-4 py-2 text-left">Home Team</th>
            <th className="px-4 py-2 text-left">Score</th>
            <th className="px-4 py-2 text-left">Away Team</th>
            <th className="px-4 py-2 text-left">Score</th>
          </tr>
        </thead>

        <tbody>
          {games.map((g) => (
            <tr
              key={g.id}
              className="border-b border-gray-800 hover:bg-gray-800 transition"
            >
              <td className="px-4 py-2">
                {new Date(g.date).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{g.home_team.full_name}</td>
              <td className="px-4 py-2">{g.home_team_score}</td>
              <td className="px-4 py-2">{g.visitor_team.full_name}</td>
              <td className="px-4 py-2">{g.visitor_team_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
