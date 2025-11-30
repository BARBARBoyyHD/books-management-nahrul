export type ErrorType = {
  success?: boolean;
  status?: number;
  message?: string;
  error?: unknown; 
};

export type SuccessType<T> = {
  success: boolean;
  status: number;
  message: string;
  data: T;
};