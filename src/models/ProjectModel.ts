interface ProjectModel {
  id: number;
  project_name: string;
  description: string;
  project_code: string;
  created_by: number;
  created_at: string;
}

interface ProjectCreationModel {
  project_name: string;
  description: string;
  project_code: string;
}

interface SingleProjectModel {
  project: ProjectModel;
  task_count: number;
}

interface ProjectResponseModel {
  items: ProjectModel[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export type {
  ProjectModel,
  ProjectResponseModel,
  SingleProjectModel,
  ProjectCreationModel,
};
