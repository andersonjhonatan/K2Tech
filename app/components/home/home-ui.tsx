import Image from "next/image";

export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className={diagonal ? "arrow diagonal" : "arrow"} aria-hidden="true">↗</span>;
}

export function K2Mark() {
  return (
    <span className="official-logo">
      <Image
        src="/images/k2-tech-logo-transparent-v2.webp"
        alt="K2 Tech"
        fill
        sizes="160px"
        priority
      />
    </span>
  );
}
