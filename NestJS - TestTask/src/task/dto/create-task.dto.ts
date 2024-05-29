export class CreateTaskDto {
      readonly title: string;
      readonly status: string;
      readonly assignedTo: string;
      readonly createdBy: string;
      readonly permissions: any;
      readonly createdAt: Date;
      readonly updateddAt: Date;
    }
