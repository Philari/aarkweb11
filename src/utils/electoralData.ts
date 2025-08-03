import { CalendarEvent } from '../types/calendar';

export const generateElectoralEvents = (): CalendarEvent[] => {
  const events: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Electoral Activities Milestones',
      description: 'Field demarcation of constituencies and electoral areas and reorganisation of polling stations',
      startDate: new Date('2024-08-06'),
      endDate: new Date('2024-08-16'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Display of constituencies, electoral areas, and their polling stations at Sub Counties and Parishes',
      startDate: new Date('2024-09-20'),
      endDate: new Date('2024-10-11'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Receipt and handling of complaints arising from the demarcation of electoral areas and reorganisation of polling stations',
      startDate: new Date('2024-09-27'),
      endDate: new Date('2024-10-26'),
      category: 'work',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'General Update of the Register in each parish/ward, in line with Article 61 (1)(e) of the Constitution',
      startDate: new Date('2025-01-03'),
      endDate: new Date('2025-01-25'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Compilation of Youth, PWDs, Older Persons, Workers, UPDF, and Professional Bodies Voters Registers, in line with The Electoral Commission Act, Sec. 18(1)',
      startDate: new Date('2025-01-03'),
      endDate: new Date('2025-01-25'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Cut-off of Update of the National Voters\' Register and Compilation of Youth, PWDs, Older Persons & Workers Registers, in line with EC Act Sec. 19(7) & 19(8)(a)',
      startDate: new Date('2025-01-25'),
      endDate: new Date('2025-01-25'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Display of the National Voters\' Register at each Polling Station in line with EC Act, Sec 24(1) & Sec 25(1)',
      startDate: new Date('2025-04-18'),
      endDate: new Date('2025-05-08'),
      category: 'work',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Display of Special Interest Groups (SIGs) Committees Voters Register in each Village/KCCA/UPDF/EC/Workers Offices',
      startDate: new Date('2025-04-18'),
      endDate: new Date('2025-04-28'),
      category: 'work',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Display of Tribunal recommendations at each Parish/Ward, in line with the EC Act Sec 25(1a)',
      startDate: new Date('2025-05-09'),
      endDate: new Date('2025-05-19'),
      category: 'work',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for resignation by public servants wishing to contest in Special Interest Groups (SIGs) Committee Elections',
      startDate: new Date('2025-04-28'),
      endDate: new Date('2025-04-28'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Village SIGs Committees Candidates: Older Persons, Persons with Disabilities and Youth',
      startDate: new Date('2025-06-02'),
      endDate: new Date('2025-06-10'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Parish/Ward SIGs Committee Candidates, Older Persons (OP), Persons with Disabilities (PWDs) and Youth',
      startDate: new Date('2025-06-26'),
      endDate: new Date('2025-06-27'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Local Governments Elections',
      startDate: new Date('2025-07-03'),
      endDate: new Date('2025-07-03'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Parliamentary Elections',
      startDate: new Date('2025-07-16'),
      endDate: new Date('2025-07-16'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Presidential Elections',
      startDate: new Date('2025-08-01'),
      endDate: new Date('2025-08-01'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for resignation by public servants intending to contest Parliamentary Elections',
      startDate: new Date('2025-06-13'),
      endDate: new Date('2025-06-13'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for resignation by public servants intending to contest Local Governments Elections',
      startDate: new Date('2025-08-02'),
      endDate: new Date('2025-08-02'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Deadline for resignation by public servants intending to contest Presidential Elections',
      startDate: new Date('2025-10-01'),
      endDate: new Date('2025-10-01'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Sub-County, Town & Municipal Division SIGs Committees Candidates, Older Persons, PwDs, Youth',
      startDate: new Date('2025-07-14'),
      endDate: new Date('2025-07-15'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Holding Sub-County Conferences to elect Non-unionised Workers Delegates to the District/City',
      startDate: new Date('2025-07-11'),
      endDate: new Date('2025-07-11'),
      category: 'work',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Municipality/City Division SIG Committees Candidates, Older Persons, Persons with Disabilities, Youth',
      startDate: new Date('2025-07-24'),
      endDate: new Date('2025-07-25'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of District and City SIGs Committee Candidates, Older Persons, Persons with Disabilities, Youth',
      startDate: new Date('2025-08-11'),
      endDate: new Date('2025-08-12'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Holding of District Conferences to elect Non-unionised Workers Delegates to the Regions',
      startDate: new Date('2025-08-07'),
      endDate: new Date('2025-08-07'),
      category: 'work',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination, Campaigns, and Polling for the National Youth Council Committee',
      startDate: new Date('2025-08-27'),
      endDate: new Date('2025-08-29'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Candidates for Local Governments, including SIGs, in line with Section 132(1) of the Local Governments Act, Cap 138',
      startDate: new Date('2025-09-03'),
      endDate: new Date('2025-09-12'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Candidates for Parliamentary Elections in line with Section 26 of the Parliamentary Elections Act, Cap 177',
      startDate: new Date('2025-09-16'),
      endDate: new Date('2025-09-17'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of Candidates for Presidential Elections',
      startDate: new Date('2025-09-23'),
      endDate: new Date('2025-09-24'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Nomination of candidates for SIGs Representatives to Local Governments',
      startDate: new Date('2025-12-08'),
      endDate: new Date('2025-12-12'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Conduct of candidates\' campaigns (Presidential) in line with Section 22(1) of the Presidential Elections Act',
      startDate: new Date('2025-10-04'),
      endDate: new Date('2026-01-12'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Conduct of candidates\' campaigns (Parliamentary) in line with Section 38 of the Parliamentary Elections Act, Cap 177',
      startDate: new Date('2025-09-23'),
      endDate: new Date('2026-01-12'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Conduct of candidates\' campaigns (Local Governments, including SIGs)',
      startDate: new Date('2025-09-13'),
      endDate: new Date('2026-01-12'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Electoral Activities Milestones',
      description: 'Polling Period for Presidential, Parliamentary, and Local Government Councils (City/District, Municipality/City Division, and Sub County, Town, Municipal Division), including SIGs Representatives, in line with Article 61(2) of the Constitution',
      startDate: new Date('2026-01-12'),
      endDate: new Date('2026-02-09'),
      category: 'work',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1hour', minutesBefore: 60, enabled: true }
      ]
    }
  ];

  return events.map(event => ({
    ...event,
    id: crypto.randomUUID(),
    createdAt: new Date(),
    updatedAt: new Date()
  }));
};