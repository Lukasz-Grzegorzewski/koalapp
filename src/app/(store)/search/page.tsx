export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const { query } = await searchParams;
  console.log(`query => `, query);

  return <div>Search {query}</div>;
}
