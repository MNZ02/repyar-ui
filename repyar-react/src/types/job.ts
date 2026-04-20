export type JobStatus = 'in-progress' | 'completed' | 'pending' | 'cancelled'

export type JobTechnician = {
  name: string
  rating: string
  jobs: string
}

export type JobVehicle = {
  registration: string
  makeModel: string
  year: string
  fuelType: string
  lastServiceDue: string
}

export type JobStage = {
  label: string
  detail: string
  progress: number
}

export type JobQuoteItem = {
  description: string
  qty: number
  rate: number
  total: number
}

export type JobQuote = {
  id: string
  code: string
  title: string
  amount: string
  status: 'pending' | 'approved' | 'rejected'
  items?: JobQuoteItem[]
}

export type JobIssue = {
  id: string
  title: string
  description: string
  severity: 'High' | 'Medium' | 'Low'
  flaggedAt: string
  partsNeeded?: string[]
}

export type TimelineEvent = {
  id: string
  icon: string
  title: string
  time: string
}

export type JobDocument = {
  id: string
  title: string
  subtitle: string
  status: 'unpaid' | 'paid' | 'partial'
  items?: JobQuoteItem[]
  amount: string
}

export type ServiceSchedule = {
  id: string
  title: string
  dueDate: string
  status: 'Upcoming' | 'Due Soon' | 'Overdue'
}

export type JobDetail = {
  job: { id: string; code: string; title: string; createdAt: string; statusPill: string }
  vehicle: JobVehicle
  stage: JobStage
  technician: JobTechnician
  quotes: JobQuote[]
  issues: JobIssue[]
  timeline: TimelineEvent[]
  inspectionPhotos: { id: string; label: string }[]
  inspectionReport: null
  documents: JobDocument[]
  commonIssues: { id: string; issue: string; frequency: string; recommendation: string }[]
  schedules: ServiceSchedule[]
}
