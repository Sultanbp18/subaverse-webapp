import type { Project } from '@/types'

export const projects: Project[] = [
  {
    id: '1',
    date: '2023-10-01',
    title: 'Learning Ansible',
    description: 'Ansible for provisioning debian web server with vagrant and virtualbox',
    category: 'Tutorials',
    tags: ['Ansible', 'IaC', 'Nginx', 'Linux', 'VirtualBox'],
    link: 'https://github.com/Sultanbp18/ansible-training'
  },
  // {
  //   id: '2',
  //   title: 'Cloud Infrastructure Automation',
  //   description: 'Automated cloud infrastructure deployment using Terraform and AWS',
  //   category: 'Cloud',
  //   tags: ['AWS', 'Terraform', 'Docker', 'Python', 'Cloud'],
  //   image: '/images/projects/cloud.jpg',
  //   link: 'https://github.com/example/cloud-automation'
  // },
  {
    id: '3',
    date: '2023-09-15',
    title: 'DevOps Pipeline',
    description: 'End-to-end CI/CD pipeline with monitoring and alerting',
    category: 'DevOps',
    tags: ['Jenkins', 'Kubernetes', 'Prometheus', 'Grafana', 'DevOps'],
    image: '/images/projects/devops.jpg',
    link: 'https://github.com/example/devops-pipeline'
  }
]
