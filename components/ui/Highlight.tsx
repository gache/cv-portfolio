type Props = { text: string; words: string[] };

export function Highlight({ text, words }: Props) {
  if (!words.length) return <>{text}</>;

  const escaped = words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        words.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
          <strong key={i} className="text-accent font-semibold not-italic">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}
