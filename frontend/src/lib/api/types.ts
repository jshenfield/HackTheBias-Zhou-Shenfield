export interface NoiseResponse {
  isResume: boolean;
  text: string;
}

export interface AnonymizedResult {
  Education: any[];
  WorkExperience: any[];
  Skills: string[];
  Certifications: string[];
  YearsOfExperience: number | null;
}

export interface BiasFreeSummary {
  Education: any[];
  WorkExperience: any[];
  Skills: string[];
  Certifications: string[];
  YearsOfExperience: number | null;
}
