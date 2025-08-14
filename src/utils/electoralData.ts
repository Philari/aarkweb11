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
      title: 'Handling complaints from demarcation process',
      description: 'Receipt and handling of complaints arising from the demarcation of electoral areas and reorganisation of polling stations',
      startDate: new Date('2024-09-27T08:00:00'),
      endDate: new Date('2024-10-26T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#EF4444',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'General Update of Voters Register',
      description: 'General Update of the Register in each parish/ward, in line with Article 61 (1)(e) of the Constitution',
      startDate: new Date('2025-01-03T08:00:00'),
      endDate: new Date('2025-01-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#10B981',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Cut-off of Voters Register Update',
      description: 'Cut-off of Update of the National Voters Register and Compilation of Special Interest Groups Registers',
      startDate: new Date('2025-01-25T08:00:00'),
      endDate: new Date('2025-01-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#DC2626',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Display of National Voters Register',
      description: 'Display of the National Voters Register at each Polling Station',
      startDate: new Date('2025-04-18T08:00:00'),
      endDate: new Date('2025-05-08T17:00:00'),
      category: 'iec',
      priority: 'medium',
      color: '#8B5CF6',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Public Servants Resignation Deadline (SIGs)',
      description: 'Deadline for resignation by public servants wishing to contest in Special Interest Groups Committee Elections',
      startDate: new Date('2025-04-28T08:00:00'),
      endDate: new Date('2025-04-28T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#F59E0B',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Village SIGs Nominations',
      description: 'Nomination of Village Special Interest Groups Committees Candidates',
      startDate: new Date('2025-06-02T08:00:00'),
      endDate: new Date('2025-06-10T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#06B6D4',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Parish/Ward SIGs Nominations',
      description: 'Nomination of Parish/Ward Special Interest Groups Committee Candidates',
      startDate: new Date('2025-06-26T08:00:00'),
      endDate: new Date('2025-06-27T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#84CC16',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Academic Papers Deadline (Local Government)',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Local Governments Elections',
      startDate: new Date('2025-07-03T08:00:00'),
      endDate: new Date('2025-07-03T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#F97316',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Academic Papers Deadline (Parliamentary)',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Parliamentary Elections',
      startDate: new Date('2025-07-16T08:00:00'),
      endDate: new Date('2025-07-16T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#EC4899',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Academic Papers Deadline (Presidential)',
      description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Presidential Elections',
      startDate: new Date('2025-08-01T08:00:00'),
      endDate: new Date('2025-08-01T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#7C3AED',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Public Servants Resignation Deadline (Parliamentary)',
      description: 'Deadline for resignation by public servants intending to contest Parliamentary Elections',
      startDate: new Date('2025-06-13T08:00:00'),
      endDate: new Date('2025-06-13T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#EF4444',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Public Servants Resignation Deadline (Local Government)',
      description: 'Deadline for resignation by public servants intending to contest Local Governments Elections',
      startDate: new Date('2025-08-02T08:00:00'),
      endDate: new Date('2025-08-02T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#10B981',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Public Servants Resignation Deadline (Presidential)',
      description: 'Deadline for resignation by public servants intending to contest Presidential Elections',
      startDate: new Date('2025-10-01T08:00:00'),
      endDate: new Date('2025-10-01T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#DC2626',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Sub-County SIGs Nominations',
      description: 'Nomination of Sub-County, Town & Municipal Division Special Interest Groups Committees Candidates',
      startDate: new Date('2025-07-14T08:00:00'),
      endDate: new Date('2025-07-15T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#06B6D4',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Municipality/City Division SIGs Nominations',
      description: 'Nomination of Municipality/City Division Special Interest Groups Committees Candidates',
      startDate: new Date('2025-07-24T08:00:00'),
      endDate: new Date('2025-07-25T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#F59E0B',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'District and City SIGs Nominations',
      description: 'Nomination of District and City Special Interest Groups Committee Candidates',
      startDate: new Date('2025-08-11T08:00:00'),
      endDate: new Date('2025-08-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#8B5CF6',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Local Government Candidates Nominations',
      description: 'Nomination of Candidates for Local Governments, including Special Interest Groups',
      startDate: new Date('2025-09-03T08:00:00'),
      endDate: new Date('2025-09-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#10B981',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Parliamentary Candidates Nominations',
      description: 'Nomination of Candidates for Parliamentary Elections',
      startDate: new Date('2025-09-16T08:00:00'),
      endDate: new Date('2025-09-17T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#3B82F6',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Presidential Candidates Nominations',
      description: 'Nomination of Candidates for Presidential Elections',
      startDate: new Date('2025-09-23T08:00:00'),
      endDate: new Date('2025-09-24T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#DC2626',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true },
        { id: crypto.randomUUID(), type: '1week', minutesBefore: 10080, enabled: true }
      ]
    },
    {
      title: 'Presidential Campaign Period',
      description: 'Conduct of Presidential candidates campaigns',
      startDate: new Date('2025-10-04T08:00:00'),
      endDate: new Date('2026-01-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#DC2626',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Parliamentary Campaign Period',
      description: 'Conduct of Parliamentary candidates campaigns',
      startDate: new Date('2025-09-23T08:00:00'),
      endDate: new Date('2026-01-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#3B82F6',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'Local Government Campaign Period',
      description: 'Conduct of Local Government candidates campaigns',
      startDate: new Date('2025-09-13T08:00:00'),
      endDate: new Date('2026-01-12T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#10B981',
      reminders: [
        { id: crypto.randomUUID(), type: '1day', minutesBefore: 1440, enabled: true }
      ]
    },
    {
      title: 'General Elections Polling Period',
      description: 'Polling Period for Presidential, Parliamentary, and Local Government Elections',
      startDate: new Date('2026-01-12T08:00:00'),
      endDate: new Date('2026-02-09T17:00:00'),
      category: 'iec',
      priority: 'high',
      color: '#7C3AED',
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