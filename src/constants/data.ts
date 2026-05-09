import { Employee, DepartmentRisk } from "@/types";

export const EMPLOYEES: Employee[] = [
  { id:"EMP-001", name:"Adaeze Okonkwo",   dept:"Education",    grade:9,  salary:285000, bvn:"22187654321", account:"0123456789", bank:"GTBank",    sts:872, behavioural:91, document:88, network:84, verdict:"TRUSTED",   flags:[] },
  { id:"EMP-002", name:"Musa Lawal",        dept:"Health",       grade:7,  salary:198000, bvn:"22198765432", account:"0234567890", bank:"Access",    sts:763, behavioural:79, document:82, network:71, verdict:"VERIFIED",  flags:[] },
  { id:"EMP-003", name:"Chioma Nwosu",      dept:"Finance",      grade:12, salary:420000, bvn:"22209876543", account:"0345678901", bank:"Zenith",    sts:541, behavioural:52, document:68, network:49, verdict:"REVIEW",    flags:["Salary-grade mismatch","Record edited 2 days before payday"] },
  { id:"EMP-004", name:"Emeka Obi",         dept:"Works",        grade:6,  salary:175000, bvn:"22187654321", account:"0456789012", bank:"UBA",       sts:198, behavioural:11, document:34, network:8, verdict:"FLAGGED",   flags:["BVN shared with EMP-001","Salary withdrawn within 4 min of credit","No attendance log in 7 months"] },
  { id:"EMP-005", name:"Fatima Abdullahi",  dept:"Education",    grade:8,  salary:240000, bvn:"22221098765", account:"0567890123", bank:"First Bank", sts:812, behavioural:85, document:83, network:79, verdict:"TRUSTED",   flags:[] },
  { id:"EMP-006", name:"Tunde Adeyemi",     dept:"Agriculture",  grade:5,  salary:142000, bvn:"22232109876", account:"0678901234", bank:"Polaris",   sts:334, behavioural:28, document:41, network:37, verdict:"SUSPECT",   flags:["On 2 agency payrolls simultaneously","Certificate authority: NOT FOUND"] },
  { id:"EMP-007", name:"Grace Eze",         dept:"Health",       grade:10, salary:310000, bvn:"22243210987", account:"0789012345", bank:"GTBank",    sts:695, behavioural:73, document:70, network:66, verdict:"VERIFIED",  flags:[] },
  { id:"EMP-008", name:"Ibrahim Suleiman",  dept:"Finance",      grade:7,  salary:201000, bvn:"22254321098", account:"0890123456", bank:"Fidelity",  sts:448, behavioural:44, document:51, network:42, verdict:"REVIEW",    flags:["Name mismatch on certificate (similarity: 0.61)"] },
  { id:"EMP-009", name:"Ngozi Okafor",      dept:"Education",    grade:6,  salary:160000, bvn:"22265432109", account:"0901234567", bank:"Sterling",  sts:155, behavioural:9, document:22, network:18, verdict:"FLAGGED",   flags:["Copy-move detected on WAEC certificate","Shared device fingerprint with EMP-004","No NIN match"] },
  { id:"EMP-010", name:"Segun Olawale",     dept:"Works",        grade:9,  salary:278000, bvn:"22276543210", account:"1012345678", bank:"Access",    sts:780, behavioural:80, document:79, network:77, verdict:"VERIFIED",  flags:[] },
];

export const VERDICTS = ["TRUSTED","VERIFIED","REVIEW","SUSPECT","FLAGGED"] as const;

export const DEPARTMENT_RISKS: DepartmentRisk[] = [
  {dept:"Education",risk:28},
  {dept:"Health",risk:15},
  {dept:"Finance",risk:61},
  {dept:"Works",risk:12},
  {dept:"Agriculture",risk:74},
];
