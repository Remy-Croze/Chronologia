export default function WriterItem({ writer }) {
  return (
    <div className="bg-blue-100 rounded-xl p-4 mb-4 shadow-md">
      <h2 className="text-lg font-bold text-blue-800">{writer.name}</h2>
      <p className="text-sm text-gray-600">
        {writer.country} • {writer.birthYear} - {writer.deathYear}
      </p>
      <ul className="mt-2 pl-4 list-disc text-gray-700">
        {writer.works.map((work, index) => (
          <li key={index}>
            <span className="font-medium">{work.title}</span> ({work.year})
          </li>
        ))}
      </ul>
    </div>
  );
}
