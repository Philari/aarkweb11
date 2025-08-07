import { CalendarEvent } from '../types/calendar';

export const generateElectoralEvents = (): CalendarEvent[] => {
  const events: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      title: 'Field demarcation of constituencies and electoral areas and reorganisation of polling stations',
      description: 'Field demarcation of constituencies and electoral areas and reorganisation of polling stations',
      startDate: new Date('2024-08-06T08:00:00'),
      endDate: new Date('2024-08-16T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Display of constituencies, electoral areas, and their polling stations at Sub Counties and Parishes',
      description: 'Display of constituencies, electoral areas, and their polling stations at Sub Counties and Parishes',
      startDate: new Date('2024-09-20T08:00:00'),
      endDate: new Date('2024-10-11T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Receipt and handling of complaints arising from the demarcation of electoral areas and reorganisation of polling stations',
      description: 'Receipt and handling of complaints arising from the demarcation of electoral areas and reorganisation of polling stations',
      startDate: new Date('2024-09-27T08:00:00'),
      endDate: new Date('2024-10-26T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'General Update of the Register in each parish/ward, in line with Article 61 (1)(e) of the Constitution',
      description: 'General Update of the Register in each parish/ward, in line with Article 61 (1)(e) of the Constitution',
      startDate: new Date('2025-01-03T08:00:00'),
      endDate: new Date('2025-01-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Compilation of Youth, PWDs, Older Persons, Workers, UPDF, and Professional Bodies Voters Registers, in line with The Electoral Commission Act, Sec. 18(1)',
      description: 'Compilation of Youth, PWDs, Older Persons, Workers, UPDF, and Professional Bodies Voters Registers, in line with The Electoral Commission Act, Sec. 18(1)',
      startDate: new Date('2025-01-03T08:00:00'),
      endDate: new Date('2025-01-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Cut-off of Update of the National Voters\' Register and Compilation of Youth, PWDs, Older Persons & Workers Registers, in line with EC Act Sec. 19(7) & 19(8)(a)',
      description: 'Cut-off of Update of the National Voters\' Register and Compilation of Youth, PWDs, Older Persons & Workers Registers, in line with EC Act Sec. 19(7) & 19(8)(a)',
      startDate: new Date('2025-01-25T08:00:00'),
      endDate: new Date('2025-01-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Display of the National Voters\' Register at each Polling Station in line with EC Act, Sec 24(1) & Sec 25(1)',
      description: 'Display of the National Voters\' Register at each Polling Station in line with EC Act, Sec 24(1) & Sec 25(1)',
      startDate: new Date('2025-04-18T08:00:00'),
      endDate: new Date('2025-05-08T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Display of Special Interest Groups (SIGs) Committees Voters Register in each Village/KCCA/UPDF/EC/Workers Offices',
      description: 'Display of Special Interest Groups (SIGs) Committees Voters Register in each Village/KCCA/UPDF/EC/Workers Offices',
      startDate: new Date('2025-04-18T08:00:00'),
      endDate: new Date('2025-04-28T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Display of Tribunal recommendations at each Parish/Ward, in line with the EC Act Sec 25(1a)',
      description: 'Display of Tribunal recommendations at each Parish/Ward, in line with the EC Act Sec 25(1a)',
      startDate: new Date('2025-05-09T08:00:00'),
      endDate: new Date('2025-05-19T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Deadline for resignation by public servants wishing to contest in Special Interest Groups (SIGs) Committee Elections',
      description: 'Deadline for resignation by public servants wishing to contest in Special Interest Groups (SIGs) Committee Elections',
      startDate: new Date('2025-04-28T08:00:00'),
      endDate: new Date('2025-04-28T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Nomination of Village SIGs Committees Candidates: Older Persons, Persons with Disabilities and Youth',
      description: 'Nomination of Village SIGs Committees Candidates: Older Persons, Persons with Disabilities and Youth',
      startDate: new Date('2025-06-02T08:00:00'),
      endDate: new Date('2025-06-10T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Nomination of Parish/Ward SIGs Committee Candidates, Older Persons (OP), Persons with Disabilities (PWDs) and Youth',
      description: 'Nomination of Parish/Ward SIGs Committee Candidates, Older Persons (OP), Persons with Disabilities (PWDs) and Youth',
      startDate: new Date('2025-06-26T08:00:00'),
      endDate: new Date('2025-06-27T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Deadline for establishing academic papers with the EC by aspiring candidates for Local Governments Elections',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Local Governments Elections',
      startDate: new Date('2025-07-03T08:00:00'),
      endDate: new Date('2025-07-03T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Deadline for establishing academic papers with the EC by aspiring candidates for Parliamentary Elections',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Parliamentary Elections',
      startDate: new Date('2025-07-16T08:00:00'),
      endDate: new Date('2025-07-16T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Deadline for establishing academic papers with the EC by aspiring candidates for Presidential Elections',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Presidential Elections',
      startDate: new Date('2025-08-01T08:00:00'),
      endDate: new Date('2025-08-01T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Deadline for resignation by public servants intending to contest Parliamentary Elections',
      description: 'Deadline for resignation by public servants intending to contest Parliamentary Elections',
      startDate: new Date('2025-06-13T08:00:00'),
      endDate: new Date('2025-06-13T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Deadline for resignation by public servants intending to contest Local Governments Elections',
      description: 'Deadline for resignation by public servants intending to contest Local Governments Elections',
      startDate: new Date('2025-08-02T08:00:00'),
      endDate: new Date('2025-08-02T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Deadline for resignation by public servants intending to contest Presidential Elections',
      description: 'Deadline for resignation by public servants intending to contest Presidential Elections',
      startDate: new Date('2025-10-01T08:00:00'),
      endDate: new Date('2025-10-01T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Nomination of Sub-County, Town & Municipal Division SIGs Committees Candidates, Older Persons, PwDs, Youth',
      description: 'Nomination of Sub-County, Town & Municipal Division SIGs Committees Candidates, Older Persons, PwDs, Youth',
      startDate: new Date('2025-07-14T08:00:00'),
      endDate: new Date('2025-07-15T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Holding Sub-County Conferences to elect Non-unionised Workers Delegates to the District/City',
      description: 'Holding Sub-County Conferences to elect Non-unionised Workers Delegates to the District/City',
      startDate: new Date('2025-07-11T08:00:00'),
      endDate: new Date('2025-07-11T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Nomination of Municipality/City Division SIG Committees Candidates, Older Persons, Persons with Disabilities, Youth',
      description: 'Nomination of Municipality/City Division SIG Committees Candidates, Older Persons, Persons with Disabilities, Youth',
      startDate: new Date('2025-07-24T08:00:00'),
      endDate: new Date('2025-07-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Nomination of District and City SIGs Committee Candidates, Older Persons, Persons with Disabilities, Youth',
      description: 'Nomination of District and City SIGs Committee Candidates, Older Persons, Persons with Disabilities, Youth',
      startDate: new Date('2025-08-11T08:00:00'),
      endDate: new Date('2025-08-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Holding of District Conferences to elect Non-unionised Workers Delegates to the Regions',
      description: 'Holding of District Conferences to elect Non-unionised Workers Delegates to the Regions',
      startDate: new Date('2025-08-07T08:00:00'),
      endDate: new Date('2025-08-07T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Nomination, Campaigns, and Polling for the National Youth Council Committee',
      description: 'Nomination, Campaigns, and Polling for the National Youth Council Committee',
      startDate: new Date('2025-08-27T08:00:00'),
      endDate: new Date('2025-08-29T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Nomination of Candidates for Local Governments, including SIGs, in line with Section 132(1) of the Local Governments Act, Cap 138',
      description: 'Nomination of Candidates for Local Governments, including SIGs, in line with Section 132(1) of the Local Governments Act, Cap 138',
      startDate: new Date('2025-09-03T08:00:00'),
      endDate: new Date('2025-09-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Nomination of Candidates for Parliamentary Elections in line with Section 26 of the Parliamentary Elections Act, Cap 177',
      description: 'Nomination of Candidates for Parliamentary Elections in line with Section 26 of the Parliamentary Elections Act, Cap 177',
      startDate: new Date('2025-09-16T08:00:00'),
      endDate: new Date('2025-09-17T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Nomination of Candidates for Presidential Elections',
      description: 'Nomination of Candidates for Presidential Elections',
      startDate: new Date('2025-09-23T08:00:00'),
      endDate: new Date('2025-09-24T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Nomination of candidates for SIGs Representatives to Local Governments',
      description: 'Nomination of candidates for SIGs Representatives to Local Governments',
      startDate: new Date('2025-12-08T08:00:00'),
      endDate: new Date('2025-12-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Conduct of candidates\' campaigns (Presidential) in line with Section 22(1) of the Presidential Elections Act',
      description: 'Conduct of candidates\' campaigns (Presidential) in line with Section 22(1) of the Presidential Elections Act',
      startDate: new Date('2025-10-04T08:00:00'),
      endDate: new Date('2026-01-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Conduct of candidates\' campaigns (Parliamentary) in line with Section 38 of the Parliamentary Elections Act, Cap 177',
      description: 'Conduct of candidates\' campaigns (Parliamentary) in line with Section 38 of the Parliamentary Elections Act, Cap 177',
      startDate: new Date('2025-09-23T08:00:00'),
      endDate: new Date('2026-01-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Conduct of candidates\' campaigns (Local Governments, including SIGs)',
      description: 'Conduct of candidates\' campaigns (Local Governments, including SIGs)',
      startDate: new Date('2025-09-13T08:00:00'),
      endDate: new Date('2026-01-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Polling Period for Presidential, Parliamentary, and Local Government Councils (City/District, Municipality/City Division, and Sub County, Town, Municipal Division), including SIGs Representatives, in line with Article 61(2) of the Constitution',
      description: 'Polling Period for Presidential, Parliamentary, and Local Government Councils (City/District, Municipality/City Division, and Sub County, Town, Municipal Division), including SIGs Representatives, in line with Article 61(2) of the Constitution',
      startDate: new Date('2026-01-12T08:00:00'),
      endDate: new Date('2026-02-09T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#FCD34D',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
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