import { profile } from '../data/portfolio'

export function AboutPage() {
  return (
    <section className="min-h-[50vh] py-9 sm:py-12" aria-labelledby="about-heading">
      <h1 id="about-heading" className="text-[clamp(1.75rem,3.5vw,2.5rem)] leading-snug font-semibold tracking-[-0.035em]">自己紹介</h1>
      {/* 自己紹介の本文は、profile.about またはこのコンポーネントに追加します。 */}
      {profile.about && (
        <p className="mt-6 max-w-2xl text-sm leading-[1.9] whitespace-pre-line text-muted">{profile.about}</p>
      )}
    </section>
  )
}
