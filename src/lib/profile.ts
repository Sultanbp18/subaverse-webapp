import type { Profile } from '@/types'

export const mockProfile: Profile = {
  name: 'Sultan Bayu',
  bio: 'Welcome to Subaverse - my personal universe where I share projects, stories, and hobbies. I explore the universe of cloud engineering, DevOps, and tech experiments — and I’d love to share my journey with you',
  professionalSummary: "Hello! I’m Sultan Bayu, a Cloud Engineer based in Indonesia. I specialize in designing and managing cloud infrastructure, container orchestration, and DevOps practices to build reliable, scalable, and secure systems.",
  profileImage: 'https://assets.subaverse.xyz/myprofile.png',
  email: 'sultanbp18@gmail.com',
  cvUrl: 'https://assets.subaverse.xyz/CV%20-%20Sultan%20Bayu%20Prasetyo.pdf',
  skills: [
    'Cloud & Infrastructure',
    'Infrastructure as Code',
    'Containers & Orchestration',
    'Monitoring & Observability',
    'CI/CD & Version Control',
    'Automation & Scripting',
    'Server Configuration',
  ],
  experience: [
    {
      title: 'EOS Cloud Engineer',
      company: 'PT. Ebconnect Indonesia',
      period: 'Jul 2025 - Present',
      startDate: '2025-01',
      location: 'Jakarta, Indonesia',
      skills:  ['GCP', 'Terraform', 'ArgoCD', 'Docker & Kubernetes'],
      description: [
        'Conducted a complete audit and documentation of 100% of cloud infrastructure in the first month, creating a baseline for optimization and troubleshooting.',
        'Migrated applications from bare metal to GKE, Cloud SQL, and Filestore, improving scalability & disaster recovery readiness.',
        'Enhanced infrastructure monitoring using Prometheus & Grafana, reducing downtime risks.',
        'Optimized provisioning by updating Terraform scripts, improving deployment consistency and speed.',
      ],
    },
    {
      title: 'Cloud Infrastructure Engineer',
      company: 'PT. Magpie Data Indonesia',
      period: 'Feb 2023 - Jun 2025',
      startDate: '2023-02',
      location: 'Remote',
      skills:  ['GCP', 'Virtualization', 'Docker & Kubernetes', 'Ansible', 'Github Action', 'Prometheus', 'Grafana', 'Loki'],
      description: [
        'Migrated Apache Airflow to GKE, boosting deployment speed 40% and cutting downtime to under 15 minutes.',
        'Reduced infrastructure costs by 60% with GCP preemptible VMs & Kubernetes optimization; Managed 50+ Proxmox VMs using Ansible.',
        'Implemented OWASP Top 10 practices, configured Passbolt for secure team credential management, and deployed a self-hosted ZeroTier solution to enable secure internal networking.',
        'Built proactive monitoring (Prometheus, Grafana) lowering incident recovery time 35%.',
      ],
    },
    {
      title: 'Data Analyst Trainee',
      company: 'Yayasan Anak Bangsa Bisa',
      period: 'Feb 2022 - Jul 2022',
      startDate: '2022-02',
      location: 'Remote',
      skills:  ['BigQuery', 'Python', 'SQL', 'Data Visualization'],
      description: [
        'Developed an interactive Google Data Studio dashboard for global heart disease analysis using Python & SQL.',
        'Delivered 100% of projects on time in a team of five, producing actionable insights for a national health program.',
      ],
    },
  ],
  education: [
    {
      degree: 'Bachelor of Science',
      school: 'University of Diponegoro',
      year: '2018 - 2022',
      description: 'Focus on Physics electrical and instrumentation',
    },
  ],
  certifications: [
    {
      name: 'AWS Cloud Practitioner Essentials',
      issuer: 'Dicoding Indonesia',
      year: '2025',
      logo: 'https://assets.subaverse.xyz/dicodingacademy_logo.jpg',
      credentialLink: 'https://www.dicoding.com/certificates/1RXYEOM61ZVM'
    },
    {
      name: 'ACA System Operator Certification',
      issuer: 'Alibaba Cloud',
      year: '2025',
      logo: 'https://assets.subaverse.xyz/alibaba_cloud_academy.png',
      credentialLink:
        'https://edu.alibabacloud.com/pearson/downloadCertificate?spm=a2c4d.11423077.0.0.781912dbOIgtdj&url=https%3A%2F%2Faliyun-aps-cloud-public.oss-cn-hangzhou.aliyuncs.com%2Fimg_0f0068e37a7e8285c10a6f43caf6f2d6.png'
    },
    {
      name: 'ACA Cloud Computing Certification',
      issuer: 'Alibaba Cloud',
      year: '2024',
      logo: 'https://assets.subaverse.xyz/alibaba_cloud_academy.png',
      credentialLink:
        'https://edu.alibabacloud.com/pearson/downloadCertificate?spm=a2c4d.11423077.0.0.265d12dbzX0Qcz&url=https%3A%2F%2Faliyun-aps-cloud-public.oss-cn-hangzhou.aliyuncs.com%2Fimg_9cbe5af679e928e69313be65450edcfc.png'
    },
    {
      name: 'Associate Cloud Engineer Certification',
      issuer: 'Google Cloud',
      year: '2024',
      logo: 'https://assets.subaverse.xyz/Google-Cloud-Platform-GCP-logo.png',
      credentialLink:
        'https://www.credly.com/badges/8094fe7a-e40b-4b7a-824a-b6523fa71e94/linked_in_profile'
    },
  ],
}