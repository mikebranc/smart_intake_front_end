import Link from 'next/link'

export default function Home() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Intake Form Manager</h1>
      <nav>
        <ul>
          <li><Link href="/templates">Form Templates</Link></li>
          <li><Link href="/responses">Form Responses</Link></li>
        </ul>
      </nav>
    </main>
  )
}
