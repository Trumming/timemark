import { HomeClient } from '@/components/HomeClient'

/**
 * Server component shell. The interactive tool (HomeClient) is a client island,
 * but its initial render is pre-rendered at build time, so crawlers and
 * generative engines still receive the full editorial HTML.
 */
export default function Home() {
  return <HomeClient />
}
