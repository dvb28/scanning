import NextNprogress from 'nextjs-progressbar';

export default function PageLoading() {
  return (
    <>
      <NextNprogress
        color="green"
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
      />
    </>
  );
}