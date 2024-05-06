interface TaskModel {
  assigned_to: number;
  created_at: string;
  created_by: number;
  description: string;
  due_date: string;
  project_id: number;
  status_id: number;
  task_id: number;
  project_name: string;
  task_name: string;
  file_url: string;
  photo: Blob;
}

interface SingleTaskModel {
  task_id: number;
  task_name: string;
  description: string;
  status_id: number;
  assigned_to: number;
  created_by: number;
  project_id: number;
  created_at: string;
  due_date: string;
  project_name: string;
  file_url: string;
  photo: Blob;
}

export type { TaskModel, SingleTaskModel };
