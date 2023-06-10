export type CVEListItem = {
  created_at: string;
  id: string;
  summary: string;
  updated_at: string;
};

export type CVE = {
  id: string;
  summary: string;
  created_at: string;
  updated_at: string;
  cvss: {
    v2: number;
    v3: number;
  };
  vendors: {
    [key: string]: string[];
  };
  cwes: string[];
  raw_nvd_data: RawNVDData;
};

type RawNVDData = {
  cve: {
    data_type: string;
    references: {
      reference_data: ReferenceData[];
    };
    data_format: string;
    description: {
      description_data: DescriptionData[];
    };
    problemtype: {
      problemtype_data: ProblemTypeData[];
    };
    data_version: string;
    CVE_data_meta: {
      ID: string;
      ASSIGNER: string;
    };
  };
  impact: {
    baseMetricV2: BaseMetricV2;
    baseMetricV3: BaseMetricV3;
  };
  publishedDate: string;
  configurations: Configurations;
  lastModifiedDate: string;
};

type ReferenceData = {
  url: string;
  name: string;
  tags: string[];
  refsource: string;
};

type DescriptionData = {
  lang: string;
  value: string;
};

type ProblemTypeData = {
  description: DescriptionData[];
};

type BaseMetricV2 = {
  cvssV2: {
    version: string;
    baseScore: number;
    accessVector: string;
    vectorString: string;
    authentication: string;
    integrityImpact: string;
    accessComplexity: string;
    availabilityImpact: string;
    confidentialityImpact: string;
  };
  severity: string;
  acInsufInfo: boolean;
  impactScore: number;
  obtainAllPrivilege: boolean;
  exploitabilityScore: number;
  obtainUserPrivilege: boolean;
  obtainOtherPrivilege: boolean;
  userInteractionRequired: boolean;
};

type BaseMetricV3 = {
  cvssV3: {
    scope: string;
    version: string;
    baseScore: number;
    attackVector: string;
    baseSeverity: string;
    vectorString: string;
    integrityImpact: string;
    userInteraction: string;
    attackComplexity: string;
    availabilityImpact: string;
    privilegesRequired: string;
    confidentialityImpact: string;
  };
  impactScore: number;
  exploitabilityScore: number;
};

type Configurations = {
  nodes: ConfigurationNode[];
  CVE_data_version: string;
};

type ConfigurationNode = {
  operator: string;
  cpe_match: CpeMatch[];
};

type CpeMatch = {
  cpe23Uri: string;
  vulnerable: boolean;
  versionEndExcluding?: string;
  versionStartIncluding?: string;
};
