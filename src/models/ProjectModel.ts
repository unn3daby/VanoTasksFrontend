interface ProjectModel {
  id: number;
  project_name: string;
  description: string;
  project_code: string;
  created_by: number;
  created_at: string;
}

interface ProjectResponseModel {
  items: ProjectModel[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export type { ProjectModel, ProjectResponseModel };
