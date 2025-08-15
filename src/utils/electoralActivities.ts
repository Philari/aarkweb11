// Electoral Activities Data for Uganda Elections 2025-2026

export interface ElectoralActivity {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  category: 'iec' | 'internal';
  priority: 'low' | 'medium' | 'high';
  color: string;
}

export const electoralActivities: ElectoralActivity[] = [
  {
    id: 'field-demarcation-2024',
    title: 'Field demarcation of constituencies and electoral areas',
    description: 'Field demarcation of constituencies and electoral areas and reorganisation of polling stations',
    startDate: new Date(2024, 7, 6, 8, 0), // August 6, 2024, 8:00 AM
    endDate: new Date(2024, 7, 16, 17, 0), // August 16, 2024, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'display-constituencies-2024',
    title: 'Display of constituencies and electoral areas',
    description: 'Display of constituencies, electoral areas, and their polling stations at Sub Counties and Parishes',
    startDate: new Date(2024, 8, 20, 8, 0), // September 20, 2024, 8:00 AM
    endDate: new Date(2024, 9, 11, 17, 0), // October 11, 2024, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'complaints-handling-2024',
    title: 'Receipt and handling of complaints',
    description: 'Receipt and handling of complaints arising from the demarcation of electoral areas and reorganisation of polling stations',
    startDate: new Date(2024, 8, 27, 8, 0), // September 27, 2024, 8:00 AM
    endDate: new Date(2024, 9, 26, 17, 0), // October 26, 2024, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'general-update-register-2025',
    title: 'General Update of the Register',
    description: 'General Update of the Register in each parish/ward, in line with Article 61 (1)(e) of the Constitution',
    startDate: new Date(2025, 0, 3, 8, 0), // January 3, 2025, 8:00 AM
    endDate: new Date(2025, 0, 25, 17, 0), // January 25, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'compilation-special-registers-2025',
    title: 'Compilation of Special Interest Groups Registers',
    description: 'Compilation of Youth, PWDs, Older Persons, Workers, UPDF, and Professional Bodies Voters Registers, in line with The Electoral Commission Act, Sec. 18(1)',
    startDate: new Date(2025, 0, 3, 8, 0), // January 3, 2025, 8:00 AM
    endDate: new Date(2025, 0, 25, 17, 0), // January 25, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'cutoff-update-register-2025',
    title: 'Cut-off of Update of National Voters Register',
    description: 'Cut-off of Update of the National Voters\' Register and Compilation of Youth, PWDs, Older Persons & Workers Registers, in line with EC Act Sec. 19(7) & 19(8)(a)',
    startDate: new Date(2025, 0, 25, 8, 0), // January 25, 2025, 8:00 AM
    endDate: new Date(2025, 0, 25, 17, 0), // January 25, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'display-national-register-2025',
    title: 'Display of National Voters Register',
    description: 'Display of the National Voters\' Register at each Polling Station in line with EC Act, Sec 24(1) & Sec 25(1)',
    startDate: new Date(2025, 3, 18, 8, 0), // April 18, 2025, 8:00 AM
    endDate: new Date(2025, 4, 8, 17, 0), // May 8, 2025, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'display-sigs-register-2025',
    title: 'Display of Special Interest Groups Register',
    description: 'Display of Special Interest Groups (SIGs) Committees Voters Register in each Village/KCCA/UPDF/EC/Workers Offices',
    startDate: new Date(2025, 3, 18, 8, 0), // April 18, 2025, 8:00 AM
    endDate: new Date(2025, 3, 28, 17, 0), // April 28, 2025, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'display-tribunal-recommendations-2025',
    title: 'Display of Tribunal recommendations',
    description: 'Display of Tribunal recommendations at each Parish/Ward, in line with the EC Act Sec 25(1a)',
    startDate: new Date(2025, 4, 9, 8, 0), // May 9, 2025, 8:00 AM
    endDate: new Date(2025, 4, 19, 17, 0), // May 19, 2025, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'resignation-deadline-sigs-2025',
    title: 'Resignation deadline for SIGs candidates',
    description: 'Deadline for resignation by public servants wishing to contest in Special Interest Groups (SIGs) Committee Elections',
    startDate: new Date(2025, 3, 28, 8, 0), // April 28, 2025, 8:00 AM
    endDate: new Date(2025, 3, 28, 17, 0), // April 28, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-village-sigs-2025',
    title: 'Nomination of Village SIGs Committees',
    description: 'Nomination of Village SIGs Committees Candidates: Older Persons, Persons with Disabilities and Youth',
    startDate: new Date(2025, 5, 2, 8, 0), // June 2, 2025, 8:00 AM
    endDate: new Date(2025, 5, 10, 17, 0), // June 10, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-parish-sigs-2025',
    title: 'Nomination of Parish/Ward SIGs Committees',
    description: 'Nomination of Parish/Ward SIGs Committee Candidates, Older Persons (OP), Persons with Disabilities (PWDs) and Youth',
    startDate: new Date(2025, 5, 26, 8, 0), // June 26, 2025, 8:00 AM
    endDate: new Date(2025, 5, 27, 17, 0), // June 27, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'academic-papers-local-govt-2025',
    title: 'Academic papers deadline - Local Government',
    description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Local Governments Elections',
    startDate: new Date(2025, 6, 3, 8, 0), // July 3, 2025, 8:00 AM
    endDate: new Date(2025, 6, 3, 17, 0), // July 3, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'academic-papers-parliamentary-2025',
    title: 'Academic papers deadline - Parliamentary',
    description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Parliamentary Elections',
    startDate: new Date(2025, 6, 16, 8, 0), // July 16, 2025, 8:00 AM
    endDate: new Date(2025, 6, 16, 17, 0), // July 16, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'academic-papers-presidential-2025',
    title: 'Academic papers deadline - Presidential',
    description: 'Deadline for establishing academic papers with the EC by aspiring candidates for Presidential Elections',
    startDate: new Date(2025, 7, 1, 8, 0), // August 1, 2025, 8:00 AM
    endDate: new Date(2025, 7, 1, 17, 0), // August 1, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'resignation-parliamentary-2025',
    title: 'Resignation deadline - Parliamentary',
    description: 'Deadline for resignation by public servants intending to contest Parliamentary Elections',
    startDate: new Date(2025, 5, 13, 8, 0), // June 13, 2025, 8:00 AM
    endDate: new Date(2025, 5, 13, 17, 0), // June 13, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'resignation-local-govt-2025',
    title: 'Resignation deadline - Local Government',
    description: 'Deadline for resignation by public servants intending to contest Local Governments Elections',
    startDate: new Date(2025, 7, 2, 8, 0), // August 2, 2025, 8:00 AM
    endDate: new Date(2025, 7, 2, 17, 0), // August 2, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'resignation-presidential-2025',
    title: 'Resignation deadline - Presidential',
    description: 'Deadline for resignation by public servants intending to contest Presidential Elections',
    startDate: new Date(2025, 9, 1, 8, 0), // October 1, 2025, 8:00 AM
    endDate: new Date(2025, 9, 1, 17, 0), // October 1, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-subcounty-sigs-2025',
    title: 'Nomination of Sub-County SIGs Committees',
    description: 'Nomination of Sub- County, Town & Municipal Division SIGs Committees Candidates, Older Persons, PwDs, Youth',
    startDate: new Date(2025, 6, 14, 8, 0), // July 14, 2025, 8:00 AM
    endDate: new Date(2025, 6, 15, 17, 0), // July 15, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'subcounty-conferences-2025',
    title: 'Sub-County Conferences',
    description: 'Holding Sub- County Conferences to elect Non-unionised Workers Delegates to the District/City',
    startDate: new Date(2025, 6, 11, 8, 0), // July 11, 2025, 8:00 AM
    endDate: new Date(2025, 6, 11, 17, 0), // July 11, 2025, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'nomination-municipality-sigs-2025',
    title: 'Nomination of Municipality SIGs Committees',
    description: 'Nomination of Municipality/City Division SIG Committees Candidates, Older Persons, Persons with Disabilities, Youth',
    startDate: new Date(2025, 6, 24, 8, 0), // July 24, 2025, 8:00 AM
    endDate: new Date(2025, 6, 25, 17, 0), // July 25, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-district-sigs-2025',
    title: 'Nomination of District and City SIGs Committees',
    description: 'Nomination of District and City SIGs Committee Candidates, Older Persons, Persons with Disabilities, Youth',
    startDate: new Date(2025, 7, 11, 8, 0), // August 11, 2025, 8:00 AM
    endDate: new Date(2025, 7, 12, 17, 0), // August 12, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'district-conferences-2025',
    title: 'District Conferences',
    description: 'Holding of District Conferences to elect Non-unionised Workers Delegates to the Regions',
    startDate: new Date(2025, 7, 7, 8, 0), // August 7, 2025, 8:00 AM
    endDate: new Date(2025, 7, 7, 17, 0), // August 7, 2025, 5:00 PM
    category: 'iec',
    priority: 'medium',
    color: '#FCD34D'
  },
  {
    id: 'national-youth-council-2025',
    title: 'National Youth Council Committee',
    description: 'Nomination, Campaigns, and Polling for the National Youth Council Committee',
    startDate: new Date(2025, 7, 27, 8, 0), // August 27, 2025, 8:00 AM
    endDate: new Date(2025, 7, 29, 17, 0), // August 29, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-local-govt-2025',
    title: 'Nomination - Local Governments',
    description: 'Nomination of Candidates for Local Governments, including SIGs, in line with Section 132(1) of the Local Governments Act, Cap 138',
    startDate: new Date(2025, 8, 3, 8, 0), // September 3, 2025, 8:00 AM
    endDate: new Date(2025, 8, 12, 17, 0), // September 12, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-parliamentary-2025',
    title: 'Nomination - Parliamentary',
    description: 'Nomination of Candidates for Parliamentary Elections in line with Section 26 of the Parliamentary Elections Act, Cap 177',
    startDate: new Date(2025, 8, 16, 8, 0), // September 16, 2025, 8:00 AM
    endDate: new Date(2025, 8, 17, 17, 0), // September 17, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-presidential-2025',
    title: 'Nomination - Presidential',
    description: 'Nomination of Candidates for Presidential Elections',
    startDate: new Date(2025, 8, 23, 8, 0), // September 23, 2025, 8:00 AM
    endDate: new Date(2025, 8, 24, 17, 0), // September 24, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'nomination-sigs-representatives-2025',
    title: 'Nomination - SIGs Representatives',
    description: 'Nomination of candidates for SIGs Representatives to Local Governments',
    startDate: new Date(2025, 11, 8, 8, 0), // December 8, 2025, 8:00 AM
    endDate: new Date(2025, 11, 12, 17, 0), // December 12, 2025, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'campaigns-presidential-2025-2026',
    title: 'Presidential Campaigns',
    description: 'Conduct of candidates\' campaigns (Presidential) in line with Section 22(1) of the Presidential Elections Act',
    startDate: new Date(2025, 9, 4, 8, 0), // October 4, 2025, 8:00 AM
    endDate: new Date(2026, 0, 12, 17, 0), // January 12, 2026, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'campaigns-parliamentary-2025-2026',
    title: 'Parliamentary Campaigns',
    description: 'Conduct of candidates\' campaigns (Parliamentary) in line with Section 38 of the Parliamentary Elections Act, Cap 177',
    startDate: new Date(2025, 8, 23, 8, 0), // September 23, 2025, 8:00 AM
    endDate: new Date(2026, 0, 12, 17, 0), // January 12, 2026, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'campaigns-local-govt-2025-2026',
    title: 'Local Government Campaigns',
    description: 'Conduct of candidates\' campaigns (Local Governments, including SIGs)',
    startDate: new Date(2025, 8, 13, 8, 0), // September 13, 2025, 8:00 AM
    endDate: new Date(2026, 0, 12, 17, 0), // January 12, 2026, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  },
  {
    id: 'polling-period-2026',
    title: 'Polling Period',
    description: 'Polling Period for Presidential, Parliamentary, and Local Government Councils (City/District, Municipality/City Division, and Sub County, Town, Municipal Division), including SIGs Representatives, in line with Article 61(2) of the Constitution',
    startDate: new Date(2026, 0, 12, 8, 0), // January 12, 2026, 8:00 AM
    endDate: new Date(2026, 1, 9, 17, 0), // February 9, 2026, 5:00 PM
    category: 'iec',
    priority: 'high',
    color: '#FCD34D'
  }
];