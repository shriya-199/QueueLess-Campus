import { Link } from 'react-router-dom'
import { ArrowRight, CalendarCheck, Clock3, ShieldCheck, Users } from 'lucide-react'
import Navbar from '../../components/Navbar'

export default function LandingPage() {
  const features = [
    { icon: CalendarCheck, title: 'Facility booking', text: 'Students can request slots for campus facilities from one portal.' },
    { icon: Clock3, title: 'Availability checks', text: 'Capacity, booked count, and waiting count are shown before booking.' },
    { icon: Users, title: 'Queue status', text: 'Students can join waiting lists and track queue position.' },
    { icon: ShieldCheck, title: 'Admin control', text: 'Admins approve bookings, manage facilities, and block maintenance periods.' },
  ]

  return (
    <div className="page-shell">
      <Navbar />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-campus-700 dark:text-campus-100">
            Internal campus portal
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            QueueLess Campus
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
            A practical facility booking system for students and campus administrators. Book shared facilities, track queue status, and manage approvals without offline coordination.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="btn-primary" to="/register">Create student account <ArrowRight className="h-4 w-4" /></Link>
            <Link className="btn-secondary" to="/login">Login as demo user</Link>
          </div>
        </div>
        <div className="panel overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Today at North Block Gym</p>
            <h2 className="mt-1 text-xl font-semibold">10:00 - 11:00</h2>
          </div>
          <div className="grid grid-cols-3 gap-3 p-4">
            {['Booked 6/8', 'Waiting 3', 'Open 2'].map((item) => (
              <div key={item} className="rounded-md border border-slate-200 bg-white p-3 text-center text-sm font-semibold dark:border-slate-800 dark:bg-slate-950">{item}</div>
            ))}
          </div>
          <div className="space-y-2 p-4 pt-0">
            {['Aarav requested slot', 'Admin approved booking', 'Waitlist will promote after cancellation'].map((item, index) => (
              <div key={item} className="flex items-center gap-3 rounded-md border border-slate-200 p-3 text-sm dark:border-slate-800">
                <span className="flex h-6 w-6 items-center justify-center rounded bg-campus-800 text-xs font-semibold text-white">{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="features" className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <div key={feature.title} className="panel p-4">
                <Icon className="h-5 w-5 text-campus-700" />
                <h3 className="mt-3 font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{feature.text}</p>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
